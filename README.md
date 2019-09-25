# swagger-typescript-generator
Generate typescript code from swagger.json.
Before start this project I try use [swagger-typescript-codegen](https://github.com/mtennoe/swagger-typescript-codegen) based on [mustache templates](https://github.com/mtennoe/swagger-js-codegen/tree/master/lib/templates).This library it's pretty good but It's so difficult customize mustache templates (If you can belive try use it) so I decide write own library that use more simplest way to customize templates.
For temple engines I use react - yes react for generating .ts files files. It's original idea? Maybe stupid but why not? React very popular and very simple so I don's see any problems. If you want something to customize - try use developer tools and see output in runtime.

## Installation

```bash
// NPM
npm install --save swagger-typescript-generator

// YARN
yarn add swagger-typescript-generator
```

## How to use
The main idea - you should strongly synchronize interfaces betwen action and reducers, with typescript interfaces.
This ideology uses a lot in .net projects and this is helpfull when you need support code.


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
