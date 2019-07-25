---
category: Components
type: 查询过滤器
title: RangePicker
subtitle: 日期选择器
---

选择日期的控件。

## 何时使用

当用户需要得到一个范围日期，可以点击标准标签，弹出日期面板进行选择。

## API

扩展了ANTD官方的控件，增加了一些自己的功能属性。[原版链接](https://ant.design/components/date-picker-cn/)

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 控件类型，为'Input'时，就是原生的antd日期选择控件，以下配置参数都不生效 | string | 'Input' | 
| showItemSeparator | 是否显示分割线，type='Select'才生效 | boolean | false |
| title | 标题,type='Select'才生效，用于显示的label标题 | string | '' |
