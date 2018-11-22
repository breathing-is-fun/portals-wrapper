English | [简体中文](./README-zh_CN.md)

# introduction

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
| shellStyleDatas | for controling style when drag event is over, not completed yet. | [] | - |
| onSave | [when click save button at top left corner](../../modules/ComponentEdit/index.js), to save layout datas | function () | - |
| type | when `component` to `save` layout datas or `module` to href to [`Display`](../../modules/Display/index.js) | string: oneOf(['component', 'module']) | - |
  
## menuItemData

| name | description | type | default value |
| --- | --- | --- | --- |
| group | as its name, for grouping | string | - |
| groupname | as its name, it would show as `menuItem`'s text | string | - |
| id | key of menuItem | string or number | - |
| key | same as id, required | - | - |
| order | the order of menuItem, not completed yet | string or number | - |
| text | same as groupname, required | - | - |

# example

![img](../../../docs/img/DraggableMenu.gif)