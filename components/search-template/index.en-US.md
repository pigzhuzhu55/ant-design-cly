---
category: Components
type: 查询过滤器
title: SearchTemplate
subtitle: 查询模版
---

下拉选择器。

## 何时使用

- 作为分页列表的查询模版

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 下拉类型，`Select`为下拉选择器，`DatePicker`为日期选择器 | string | 'Select' |
| showItemSeparator | 是否显示分割线 | boolean | false |
| name | name 标识 | string | '' |
| text | 标题,用于显示的 label 标题 | string | '' |
| multiple | 是否多选 | boolean | false |
| value | 值（默认值），当组件为多选时，值按`|`拼接 | string | '' |
| options | 下拉选项值，静态数组，作为初始化下拉选择项 | object[] | [] |
| loadData | 从服务的获取数据的方法 | function | - |
| child | 作为级联功能，相关联的子控件`name` | string | '' |
| parent | 作为级联功能，相关联的父控件`name` | string | '' |
| parentValue | 作为级联功能，相关联的父控件`value` | string | '' |
| onChange | 选中 option，调用此函数 | function(optionValue) | - |
| onLoad | 加载 option 后，回调函数，用于将变化的 state 传给父组件 | function(nextProps) | - |

### Option props

| 参数 | 说明                             | 类型   | 默认值 |
| ---- | -------------------------------- | ------ | ------ |
| key  | 和 value 含义一致                | string |        |
| text | 选中该 Option 后，Select 的 text | string | -      |
