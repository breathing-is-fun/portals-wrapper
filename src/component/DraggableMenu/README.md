English | [简体中文](./README-zh_CN.md)

# Introduction

- Just like its name, this is a draggbale menu.

- You can also use it as normal Menu. As long as data structure is correct, it can help you transform data structure to save your time

- Base on [antd的Menu](https://ant.design/components/menu/)
  
# API  

| name | description | type | default value |
| --- | --- | --- | --- |
| selectedKeys | array with the keys of currently selected menu items | [] | - |
| menuDatas | menu datas，the format of object in array is [here](#menuItemData) | [] | - |
| openKeys | array with the keys of currently opened sub menus | [] | - |
| onClick | click event of menu item，[there for detail](../../modules/ModuleEdit/index.js) about `handleMenuClick` | function (group: string, selectedKeys: string[], id: string) | - |
| onOpenChange | called when open/close sub menu | function(openKeys: string[]) | - |
| shellStyleDatas | 用于控制拖拽结束时 [`Shell`](../Shell/index.js) 的样式，尚未实装 | [] | - |
| onSave | [点击左上保存时的事件](../../modules/ComponentEdit/index.js)，多用于保存右侧布局数据 | function () | - |
| type | 控制左上显示保存或跳转到 [`Display`](../../modules/Display/index.js) | string: oneOf(['component', 'module']) | - |
  
## menuItemData

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| group | 组别，用于分组 | string | - |
| groupname | 组别中文，分组后菜单项显示名称 | string | - |
| id | 菜单项唯一标识 | string or number | - |
| key | 用途暂时同id，必需 | - | - |
| order | 菜单项顺序，尚未实装 | string or number | - |
| text | 用途暂时同group，必需 | - | - |

# 示例

![img](../../../docs/img/DraggableMenu.gif)