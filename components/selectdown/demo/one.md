---
order: 1
title:
  zh-CN: 两种类型
  en-US: Two Type
---

## zh-CN

当前我们为 `<SelectDown />` 定制了了两种类型的选择器 `Select`、`DatePicker`。其中 `Select` 可以多选。有人可能会疑问，这些组件官方 ANTD 已经有了，没错，但是 DatePicker 没有这种下拉的选择，所以这里只有二次封装了，满足查询列表组件中，作为筛选组合框。

## en-US

Currently, we have customized two types of selectors `Select'and`Date Picker' for `SelectDown/>'. Among them`Select'can be selected more. Some may wonder that the official ANTD of these components already exists, yes, but Date Picker does not have this drop-down option, so there is only a second encapsulation to satisfy the query list component as a filter combo box.

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
  text: '合同过期时间',
  key: 'expireTime',
  value: '',
  type: 'DatePicker',
};

ReactDOM.render(
  <div className="example-input">
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

```css
.example-input .ant-selectdown {
  width: 200px;
  margin: 0 8px 8px 0;
}
```
