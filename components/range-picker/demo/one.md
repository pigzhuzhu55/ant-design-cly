---
order: 0
title:
  zh-CN: 基本
  en-US: Basic
---

## zh-CN

例子里面，第一个是原生antd输入框选择的日期，第二个点下拉标签后选择的日期。

## en-US

In the example, the first is the date selected by the native antd input box, and the second is the date selected after the drop-down tag.

```jsx
import { DatePicker } from 'antdcly';

const { RangePicker } = DatePicker;

function onChange(date, dateString) {
  console.log(date, dateString);
}

ReactDOM.render(
  <div>
    <RangePicker onChange={onChange}  />
    <br />
    <RangePicker title='创建时间' onChange={onChange} type="Select" />
  </div>,
  mountNode,
);
```
