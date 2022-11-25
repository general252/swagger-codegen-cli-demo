#!/usr/bin/env node

const fs = require('fs');
const { exec } = require('node:child_process');
const path = require("path");
const { Command } = require('commander');


var program = new Command();
program
    .option('-i, --input <type>', 'location of  the  swagger  spec,  as  URL  or file', 'https://petstore.swagger.io/v2/swagger.json')
    .option('-o, --output <type>', 'where to write  the  generated  files(current dir by default)', 'services')
    .option('-t, --template <type>', 'folder containing the template files', 'template/typescript-axios-custom')
    .option('-l, --lang <type>', 'client language to generate', 'typescript-axios');


program.parse(process.argv);

var options = program.opts();
console.log(options);

var JarFilePath = path.join(__dirname, 'swagger-codegen-cli.jar'); // 
var inputPath = options.input; //
var outputPath = path.join(process.cwd(), options.output); //
var lang = options.lang;

if (inputPath.indexOf("http") == 0) {
} else {
    inputPath = path.join(process.cwd(), inputPath);

    if (fs.existsSync(inputPath) == false) {
        console.error(`###### [error] input path "${inputPath}" not exists`);
        process.exit(1);
    }
}


var templatePath = options.template;
if (fs.existsSync(templatePath) == false) {
    console.log(templatePath, fs.existsSync(templatePath));

    templatePath = path.join(process.cwd(), options.template);
    if (fs.existsSync(templatePath) == false) {
        console.log(templatePath, fs.existsSync(templatePath));

        templatePath = path.join(__dirname, options.template);
    }
}

if (fs.existsSync(templatePath) == false) {
    console.error(`###### [error] template dir "${templatePath}" not exists`);
    process.exit(1);
}

console.log({
    lang: lang,
    jar: JarFilePath,
    input: inputPath,
    output: outputPath,
    template: templatePath,
});


var cmd = `java -jar ${JarFilePath} generate -i ${inputPath} -t "${templatePath}" --lang ${lang} -o "${outputPath}"`;

console.log(cmd);

if (true) {
    exec(cmd, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }

        if (stdout) {
            console.log(`stdout: ${stdout}`);
        }

        if (stderr) {
            console.error(`stderr: ${stderr}`);
        }
    });
}



