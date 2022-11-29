#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('node:child_process');
const path = require("path");
const { Command } = require('commander');

function getFileFullPath(filepath) {
    var result = filepath;
    if (fs.existsSync(result) == false) {
        result = path.join(process.cwd(), filepath);
        if (fs.existsSync(result) == false) {
            result = path.join(__dirname, filepath);
        }
    }

    return {
        fullPath: result,
        exists: fs.existsSync(result)
    };
}


var program = new Command();
program
    .version(require('./package.json').version)
    .option('-i, --input <type>', 'location of  the  swagger  spec,  as  URL  or file', 'https://petstore.swagger.io/v2/swagger.json')
    .option('-o, --output <type>', 'where to write  the  generated  files(current dir by default)', 'services')
    .option('-t, --template <type>', 'folder containing the template files', 'template/typescript-axios-custom')
    .option('-c, --config <type>', 'config file path')
    .option('--init', 'init config file')
    .option('-l, --lang <type>', 'client language to generate', 'typescript-axios');

program.parse(process.argv);

var options = program.opts();
console.log(options);

var objectConfig = {
    lang: options.lang,
    jar: path.join(__dirname, 'swagger-codegen-cli.jar'),
    input: options.input,
    output: path.join(process.cwd(), options.output),
    template: options.template,
};

// config file
{
    if (options.init === undefined) {

    } else if (options.init === true) {
        var data = JSON.stringify({
            input: "https://petstore.swagger.io/v2/swagger.json",
            output: "services",
            lang: "typescript-axios"
        }, null, "  ");
        console.log(data);

        var filename = path.join(process.cwd(), "ssapi.config.json");
        console.log("ssap config file: ", filename);

        fs.writeFileSync(filename, data, { encoding: 'utf8', flag: "w+" }, function (err) {
            console.log('>> write: ', err);
        });
        return;
    }

    if (undefined === options.config) {

    } else if (options.config.length > 0) {
        var result = getFileFullPath(options.config);
        if (result.exists == false) {
            console.error(`###### [error] config path "${options.config}" not exists`);
            process.exit(1);
        } else {
            var data = fs.readFileSync(result.fullPath, { encoding: 'utf8' }, function (err) {
                console.log('>> read: ', err);
            });
            var object = JSON.parse(data);

            objectConfig.input = object.input;
            objectConfig.output = object.output;
            objectConfig.lang = object.lang;
        }
    }
}

// input
{
    if (objectConfig.input.indexOf("http") == 0) {
        // network
    } else {
        var result = getFileFullPath(objectConfig.input);

        if (result.exists == false) {
            console.error(`###### [error] input path "${objectConfig.input}" not exists`);
            process.exit(1);
        } else {
            objectConfig.input = result.fullPath;
        }
    }
}

// template
{
    var result = getFileFullPath(objectConfig.template);

    if (result.exists == false) {
        console.error(`###### [error] template dir "${objectConfig.template}" not exists`);
        process.exit(1);
    } else {
        objectConfig.template = result.fullPath;
    }
}

console.log(objectConfig);

// commond
{
    var cmd = `java -jar "${objectConfig.jar}" generate -i "${objectConfig.input}" -t "${objectConfig.template}" --lang ${objectConfig.lang} -o "${objectConfig.output}" -D modelPropertyNaming=original`;

    try {
        console.log();
        console.log(cmd);

        var msg = execSync(cmd).toString();

        console.log();
        console.log(msg);
    } catch (error) {
        console.log("status: ", error.status);  // 0 : successful exit, but here in exception it has to be greater than 0
        console.log("message: ", error.message); // Holds the message you typically want.
        console.log("stderr: ", error.stderr);  // Holds the stderr output. Use `.toString()`.
        console.log("stdout: ", error.stdout);  // Holds the stdout output. Use `.toString()`.
    }
}

// delete package.json
{
    var packetFilePath = path.join(objectConfig.output, "package.json");
    if (fs.existsSync(packetFilePath)) {
        console.log('delete ', packetFilePath);

        fs.rmSync(packetFilePath);
    }
}

