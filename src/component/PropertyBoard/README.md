English | [简体中文](./README-zh_CN.md)

# 简介

- 属性面板，用作修改套餐编辑时的外壳属性

- 基于 [antd的Drawer](https://ant.design/components/drawer-cn/)
  
# API  

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| visible | Drawer 是否可见 | boolean | - |
| onClose | 点击遮罩层或右上角叉或取消按钮的回调 | function(e) | - |
| shellStyleDatas | 把样式属性根据 `enumDatas` 变成中文，`i` 用作标识当前操作的 `Shell` | [{ i: string, style: {} }] | - |
| enumDatas | 枚举，比如 `backgroundColor` => `背景颜色`，[详情在这里](#enumDatas的对象) | [{ text: string, key: string, isStyle: boolean }] | [] |

## enumDatas的对象

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| key | 属性名，需要写成 [`inline style`](https://reactjs.org/docs/dom-elements.html#style) | string | - |
| text | 属性中文名 | string | - |
| isStyle | 当需要修改不是css的参数比如 `title` 时，可以传 `false` 跳出遍历 | boolean | - |

# 示例

待填坑