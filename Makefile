
default:
	java -jar swagger-codegen-cli.jar generate -i openapi.json -t "./template/typescript-axios" --lang typescript-axios -o services
	

