[English](./README.md) | 简体中文

# 简介

- 就像名字里写的一样，这是一个全局弹框

- 只需改变全局变量 `SCTool.modal` 的属性就可以控制弹框

- 基于 [antd的Modal](https://ant.design/components/modal-cn/)
  
# API  

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| on | 监听的对象，会寻找对象中 `modal` 对象并监听 [可用属性](https://ant.design/components/modal-cn/#API) | object | - |

关闭时默认会销毁 `content` 中的元素

# 示例

如果在被引入插件中需要弹框，就可以这么写

``` jsx
    class Demo {
        init = () => {
            window.SCTool.modal = {
                visible: true,
                content: '<div>test</div>',
                // path: '../../../thirdModules/dbzx/index.js', // 当二级页面需要动态加载时，可以试试这个
            }
        }
    }
```