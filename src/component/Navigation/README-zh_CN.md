[English](./README.md) | 简体中文

# 简介

- 类似于 `banner` 的头部

- 用作切换[套餐](http://www.baidu.com)

- 基于 [antd的Dropdown](https://ant.design/components/dropdown-cn/)
  
# API  

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| clock | 是否显示时间 | boolean | - |
| title | 左上角的标题 | string | - |
| onClick | 点击菜单项回调 | function (item: object) | - |
| datas | 菜单数据，只有右边这俩参数是必须的，其他的你传进来也没问题，反正最后会把这个 `object` 传出来 | [{ text: string, id: string, url: string }] | [] |

# 示例

``` jsx
    import Navigation from '.'

    render = () => {
        return (
            <Navigation
                onClick={ ({ id }) => console.log(id) }
                datas={ [] }
                clock
            >
                test
            </Navigation>
        )
    }
```

![img](../../../docs/img/Navigation.gif)