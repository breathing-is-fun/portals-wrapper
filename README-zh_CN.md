[English](./README.md) | 简体中文

# 简介

- 集成 [`插件`](#什么是插件) 并显示、编辑

- 编辑时 [`插件`](#什么是插件) 可拖拽

- 不管是什么 react、vue 或者 jquery、angluar，只要是 [`插件`](#什么是插件) 我都加载给你看

# 如何使用

```bash
git clone https://github.com/zy410419243/portals-wrapper.git
cd portals-wrapper
npm install
npm run build
```

把需要加载的 [`插件`](#什么是插件) 放到 `dist/thirdModules` 下并部署到服务器上，比如本地的 9099

打开你的的浏览器访问 http://localhost:9099/#/edit/module

# 本地开发

```bash
npm start
```

打开你的的浏览器访问 http://localhost:9099/#/display?ticket=test

# 什么是插件

指在编译完成后像[这样](./docs/plugins/demo-compile.js)的、且作为入口文件的模块

如果你用 `webpack` 打包，你只需要在原先的 `entry` 路径外，给你的模块套一层类，就像[这样](./docs/plugins/demo.js)

然后设置 `output` 中 `libraryTarget` 为 `commonjs2` 即可

## to be continued...
