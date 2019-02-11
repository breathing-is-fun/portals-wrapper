[![CircleCI](https://circleci.com/gh/zy410419243/portals-wrapper.svg?style=svg&circle-token=404c6203d8a6b711aedd2044f065c04e51113583)](https://circleci.com/gh/zy410419243/portals-wrapper)

[![codecov](https://codecov.io/gh/zy410419243/portals-wrapper/branch/master/graph/badge.svg?token=57gr4q41PI)](https://codecov.io/gh/zy410419243/portals-wrapper)

Q：这是什么？  
A：面上标着是省水利厅集成各单位资源的门户，但其实只是个 js 加载器

Q：？？？没懂，怎么就变成加载器了？  
A：只要你打包时遵守一定的规则，你的模块就可以让我加载出来，整个项目有一半在做这件事

Q：那这个是怎么实现的？  
A：这个我得先讲一下**插件**的定义...

Q：允了  
A：指的是在编译完成后像[**这样**](./docs/plugins/demo-compile.js)的、且作为入口文件的模块

Q：为什么？  
A：因为各家单位技术栈都不同，但业主希望有代码级的交互，这就不能简简单单地套一个 `iframe`  
又因为对浏览器而言，只要是 js 代码它就能加载，刚好 `webpack` 能干这件事，所以就给静态文件写了个规范方便管理  
不管是 `jsx` 还是模版，只要最后打包出来是**插件**我就加载给你看

Q：那怎么才能用 `webpack` 打包出一个**插件**呢？  
A: 你只需要在原先的 `entry` 路径外，给你的模块套一层类，就像[**这样**](./docs/plugins/demo.js)  
然后设置 `output` 中 `libraryTarget` 为 `commonjs2` 即可

Q：那你是怎么处理布局的？  
A：用 `react-grid-layout`，内置了插件的拖拽

Q：那我该怎么在本地看到效果？  
A：

```bash
git clone https://github.com/zy410419243/portals-wrapper.git
cd portals-wrapper
npm install
npm start
```

打开你的的浏览器访问 http://localhost:9099/#/display?ticket=test
