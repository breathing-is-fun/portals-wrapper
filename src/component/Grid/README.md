English | [简体中文](./README-zh_CN.md)

# 简介

- 每个第三方插件的容器，处理布局及布局的保存

- 接收拖拽结束的容器

- 受控

- 基于 [react-grid-layout](https://github.com/STRML/react-grid-layout)
  
# API  

`Grid` 中包含很多组件，像外壳 `Shell`、属性面板 `PropertyBoard`，`Grid` 更多的时候被当做入口
  
换句话说，其他组件的属性在这里也可以用，`Grid` 仅作传递

## Grid的属性

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| layout | 布局数据 | [[object](#layout对象说明)] | - |
| onLayoutChange | 布局改变后的回调 | function (newLayout: []) | - |

## Shell中的属性

`isEdit`、`isDelete`、`onDelete`、`onDetail`

## PropertyBoard中的属性

`enumDatas`

## layout对象说明

除了 [react-grid-layout](https://github.com/STRML/react-grid-layout#grid-layout-props)中自带的属性，你还需要一些其他属性更好地控制[插件](http://www.baidu.com)的显示
| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 插件类型，暂时只有一种枚举 | string, enum['iframe'] | - |
| path | 插件文件地址，需要指向入口文件，[入口文件需要像这样才行](http://www.baidu.com)；如果是 `type == iframe`，则需要传 `url` 地址 | string, url | - |
| style | 控制 `Shell` 最外层的样式，比如阴影啊边框什么的。需要能用 `JSON.parse` 转成对象的字符串 | string, json | - |
| i | 用作插件的唯一标识，用这个关联数据和实际节点 | `string|number` | - |

注：这里的 `path`，不论如何都需要同源，这是因为[同源](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy)限制了浏览器行为

# 方法

| 名称 | 说明 |
| --- | --- |
| mountRoots | 封装了 `ModulesLoader`，用作加载插件，[了解更多](#ModulesLoader) |

## ModulesLoader

``` javascript
    import Loader from './ModulesLoader';

    /**
     * @param layout 布局数据
     * 可以参考Grid中的layout，这玩意跟它一样
     * @param roots 组件挂载的节点
     * { test: DOM }，传进来需要像这样
     * 到时候会把字段名也就是test当作节点的唯一标识
     * 值需要是实际的DOM
    */
    const loader = new Loader(layout, roots);

    /**
     * 上面是初始化，这里才开始加载
    */
    loader.load();
```

# 示例

![img](https://camo.githubusercontent.com/8c68a2e6d6e01364247232267a5698ac0d9b63c6/687474703a2f2f692e696d6775722e636f6d2f6f6f314e5436632e676966)
  
直接抄人家的图用来说明格子的概念