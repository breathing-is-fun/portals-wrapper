[English](./README.md) | 简体中文

# 简介

- 就像名字里写的一样，这是一个全局弹框

- 只需改变全局变量 `SCTool` 中的变量属性就可以控制弹框

- 基于 [antd的Menu](https://ant.design/components/modal-cn/)
  
# API  

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| on | 监听的对象，会寻找对象中 `modal` 对象并监听[可用属性](#modal中的可用属性) | object | - |
  
## modal中的可用属性

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| visible | 对话框是否可见。一旦该值为 `false`，`content` 将会被销毁 | boolean | false |
| title | 标题 | string or ReactNode | - |
| content | 对话框内容。如果是字符串类型，则会被当做html，解析后显示 | string or ReactNode | - |
| style | 可用于设置浮层的样式，调整浮层位置等 | object | - |

# 示例

如果在被引入插件中需要弹框，就可以这么写

``` javascript
    class Demo {
        init = () => {
            window.SCTool.modal = {
                visible: true,
                content: '<div>test</div>',
            }
        }
    }
```