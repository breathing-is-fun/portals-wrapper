English | [简体中文](./README-zh_CN.md)

# introduction

- integration `Plugins`, and you can edit it

- when edited, you can drag `Plugin` over anywhere you want

- no matter `React`, `Vue` or any other, as long as it is a `Plugin`, it will be loaded if you want

# usage

``` bash
git clone https://github.com/zy410419243/portals-wrapper.git
cd portals-wrapper
npm install
npm run build
```

drop [`Plugins`](#Plugin) that you need to load to `dist/thirdModules` and deploy it, assume the port is 9099
  
open your browser and visit http://localhost:9099/#/edit/module

# development

``` bash
npm start
```

open your browser and visit http://localhost:9099/#/display?ticket=test

# Plugin

the file after compiling, just look like [this](./docs/plugins/demo-compile.js), and it's the only entry of the project
  
if you use `webpack`, you can build as [this](./docs/plugins/demo.js)

and then set `libraryTarget` to `commonjs2` that in `output`

## to be continued

this handbook just teach you only half of the usages now...