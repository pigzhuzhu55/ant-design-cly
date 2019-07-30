---
order: 2
title:
  zh-CN: 单选、多选
  en-US: Single and Multiple Selections
---

## zh-CN

支持单选、多选，默认值

## en-US

Supports radio, multiple, default values

```jsx
import { SelectDown } from 'antd-cly';

function handleChangeSelect(myProps) {
  console.log(myProps);
}

const data = {
  text: '性质',
  key: 'orgType',
  value: '',
  options: [{ title: '直营', key: '0' }, { title: '加盟', key: '1' }],
};
const data2 = {
  text: '科目',
  key: 'subject',
  value: '2',
  multiple: true,
  options: [{ title: '数学', key: '0' }, { title: '语文', key: '1' }, { title: '英语', key: '2' }],
};

ReactDOM.render(
  <div>
    <SelectDown name={data.key} {...data} onChange={childPros => handleChangeSelect(childPros)} />
    <SelectDown
      name={data2.key}
      {...data2}
      onChange={childPros => handleChangeSelect(childPros)}
      showItemSeparator={true}
    />
  </div>,
  mountNode,
);
```
