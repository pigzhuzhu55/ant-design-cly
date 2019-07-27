---
order: 4
title:
  zh-CN: 联动
  en-US: move in parallel
---

## zh-CN

数据格式跟上例一样，增加联动效果：

## en-US

The data format is the same as the previous example, increasing the linkage effect

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

function queryCityData(provinceId) {
  return request(`http://test.lnxm.iqeq.cn/api/none/common/city/list?provinceId=${provinceId}`);
}

function queryCountyData(cityId) {
  return request(`http://test.lnxm.iqeq.cn/api/none/common/county/list?cityId=${cityId}`);
}

const filters = [
  {
    text: '省',
    key: 'province',
    value: '',
    child: 'city',
    multiple: true,
    loadData: queryProvinceData,
  },
  {
    text: '市',
    key: 'city',
    value: '',
    parent: 'province',
    child: 'county',
    multiple: true,
    loadData: provinceId => queryCityData(provinceId),
  },
  {
    text: '县',
    key: 'county',
    value: '',
    parent: 'city',
    multiple: true,
    loadData: cityId => queryCountyData(cityId),
  },
];
ReactDOM.render(
  <div className="example-input">
    {filters.map((item, index) => (
      <SelectDown
        name={item.key}
        {...item}
        showItemSeparator={index !== 0}
        onChange={myProps => handleChangeSelect(myProps)}
        onLoad={myProps => handleLoadSelect(myProps)}
      />
    ))}
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
