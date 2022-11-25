

#### [swagger-codegen](https://github.com/swagger-api/swagger-codegen)  


#### [template from swagger-codegen-generators](https://github.com/swagger-api/swagger-codegen-generators)  

#### [swagger-codegen-cli.jar](https://repo1.maven.org/maven2/io/swagger/codegen/v3/swagger-codegen-cli/)  



```
$ npm i swagger-codegen-cli-demo
```


```
$ npx sapi -h

Usage: main [options]

Options:
  -i, --input <type>     location of  the  swagger  spec,  as  URL  or file (default: "https://petstore.swagger.io/v2/swagger.json")
  -o, --output <type>    where to write  the  generated  files(current dir by default) (default: "services")
  -t, --template <type>  folder containing the template files (default: "template/typescript-axios-custom")
  -l, --lang <type>      client language to generate (default: "typescript-axios")
  -h, --help             output usage information

```

```
$ npx sapi -i swagger.json -o my_services
```
