---
order: 1
title:
  zh-CN: 两种类型
  en-US: Two
---

## zh-CN

我们为 `<Input />` 输入框定义了三种尺寸（大、默认、小），高度分别为 `40px`、`32px` 和 `24px`。

## en-US

There are three sizes of an Input box: `large` (40px), `default` (32px) and `small` (24px).

```jsx
import { SelectDown } from 'antdcly';

function handleChangeSelect(myProps) {
  console.log(myProps);
}

const data = {
  text: '性质',
  key: 'orgType',
  value: '',
  options: [{ title: '直营', key: '0' }, { title: '加盟', key: '1' }],
};

ReactDOM.render(
  <div className="example-input">
    <SelectDown name={data.key} {...data} onChange={childPros => handleChangeSelect(childPros)} />
  </div>,
  mountNode,
);
```

```css
.example-input .ant-selectdown {
  width: 200px;
  margin: 0 8px 8px 0;
}
```
