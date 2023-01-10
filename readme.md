

#### [swagger-codegen](https://github.com/swagger-api/swagger-codegen)  


#### [template from swagger-codegen-generators](https://github.com/swagger-api/swagger-codegen-generators)  

#### [swagger-codegen-cli.jar](https://repo1.maven.org/maven2/io/swagger/codegen/v3/swagger-codegen-cli/)  


#### 1. 安装
```
$ npm i ssapi
```


```
$ npx ssapi -h

Usage: main [options]

Options:
  -V, --version          output the version number
  -i, --input <type>     location of  the  swagger  spec,  as  URL  or file (default: "https://petstore.swagger.io/v2/swagger.json")  -o, --output <type>    where to write  the  generated  files(current dir by default) (default: "services")
  -t, --template <type>  folder containing the template files (default: "template/typescript-axios-custom")
  -c, --config <type>    config file path
  --init                 init config file
  -l, --lang <type>      client language to generate (default: "typescript-axios")
  -h, --help             display help for command
```

#### 2. 使用
```
$ npx ssapi -i swagger.json -o services
```

#### 3. 使用配置文件 
```
$ npx ssapi --init
$ cat ssapi.config.json 

{
  "input":  "https://petstore.swagger.io/v2/swagger.json",
  "output": "services",
  "lang": "typescript-axios"
}

$ npx ssapi -c ssapi.config.json
```

#### 4. api调用
```
import * as API from "../../services"

let api = new API.DefaultApi();
api.Hello({
    Name: "tina",
}, "").then((response) => {
    let result = response.data;
    console.log(result);
}).catch((err) => {

});

```

