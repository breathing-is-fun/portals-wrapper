English | [简体中文](./README-zh_CN.md)

# 简介

- [格子](../Grid/README-zh_CN.md)的外壳

# API  

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data-grid | 这个参数是 `react-grid-layout` 要求的，没这个就没法布局，[了解一下](https://github.com/STRML/react-grid-layout#grid-item-props)。后续会修改 | {} | - |
| showDetail | 是否显示格子右上的详情按钮，详情以全局弹框的方式引入 | boolean | false |
| detailPath | 详情页地址，暂时只支持 `iframe` 嵌入 | string | - |
| onDetail | 点击详情按钮的回调 | function (item: data-grid) | - |
| showEdit | 是否显示右上编辑按钮 | boolean | false |
| onEdit | 点击编辑按钮回调 | function (item: data-grid) | - |
| showDelete | 是否显示右上删除按钮 | boolean | false |
| onDelete | 点击删除按钮回调 | function (data-grid) | - |
| type | 外壳类型，用作判断是谁用了 `Shell`，可以用作权限控制 | string, enum['add', 'module', 'component'] | 'component' |
| onAdd | [套餐](http://www.baidu.com)编辑页点击添加按钮的回调 | function (e: MouseEvent) | - |
| showTitle | 是否显示标题 | boolean | false |
| style | 控制最外层样式 | {} | - |
| title | 标题 | `string | ReactNode` | - |

# 示例

``` jsx
    import Shell from '.'

    render => <Shell>test</Shell>
```