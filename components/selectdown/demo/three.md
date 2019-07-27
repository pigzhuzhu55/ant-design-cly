---
order: 3
title:
  zh-CN: 远程加载数据
  en-US: Loading data remotely
---

## zh-CN

支持异步远程加载数据，数据格式在本例子里面定义如下： { "code":0, "data":[ { "key":"英语", "title":"英语" }, { "key":"数学", "title":"数学" }, { "key":"国学", "title":"国学" }, { "key":"钢琴", "title":"钢琴" } ] }

## en-US

Asynchronous remote loading of data is supported, and the data format is defined in this example as follows: { "code":0, "data":[ { "key":"英语", "title":"英语" }, { "key":"数学", "title":"数学" }, { "key":"国学", "title":"国学" }, { "key":"钢琴", "title":"钢琴" } ] }

```jsx
import { SelectDown } from 'antdcly';
import { extend } from 'umi-request';

const request = extend({});
function handleChangeSelect(myProps) {
  console.log(myProps);
}

function queryProvinceData() {
  return request(`http://test.lnxm.iqeq.cn/api/none/common/province/list`);
}

const data = {
  text: '省份',
  key: 'province',
  value: '',
  multiple: true,
  loadData: queryProvinceData,
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
