# swagger-typescript-generator
Generate typescript code from swagger.json.
Before start this project I try use [swagger-typescript-codegen](https://github.com/mtennoe/swagger-typescript-codegen) based on [mustache templates](https://github.com/mtennoe/swagger-js-codegen/tree/master/lib/templates).This library it's pretty good but It's so difficult customize mustache templates (If you can't belive try use it) so I decide write own library that use more simplest way to customize templates.
For template engine I use react - yes react for generating .ts files files. It's original idea? Maybe stupid because it's not right way for react but why not? React very popular and very simple so I don's see any problems. If you want something to customize - try use developer tools, modify components with plugins, and see preview in browser.

## Installation

```bash
// NPM
npm install --save swagger-typescript-generator

// YARN
yarn add swagger-typescript-generator
```

## How to use
Example of config file


```ts
  const parentDir = path.resolve(__dirname, '../..');

  const config: ISwaggerConfig = {
    apiFilesOutDir: `${parentDir}/gen/api`,
    modelFilesOutDir: `${parentDir}/gen/model`,
    plugin: defaultPlugin,
    swaggerInputJson: json
  };
  const swaggerGenerator = new SwaggerGenerator(config);
  swaggerGenerator.generate();
```
  
