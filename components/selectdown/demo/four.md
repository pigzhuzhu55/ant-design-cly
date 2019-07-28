---
order: 4
title:
  zh-CN: 联动
  en-US: move in parallel
---

## zh-CN

远程加载数据，数据格式跟上例一样，增加联动效果：

## en-US

Loading data remotely, The data format is the same as the previous example, increasing the linkage effect

```jsx
import { SelectDown } from 'antdcly';
import { extend } from 'umi-request';

const request = extend({});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: [
        {
          text: '省',
          key: 'province',
          value: '',
          child: 'city',
          multiple: true,
          loadData: this.queryProvinceData,
        },
        {
          text: '市',
          key: 'city',
          value: '',
          parent: 'province',
          child: 'county',
          multiple: true,
          loadData: provinceId => this.queryCityData(provinceId),
        },
        {
          text: '县',
          key: 'county',
          value: '',
          parent: 'city',
          multiple: true,
          loadData: cityId => this.queryCountyData(cityId),
        },
      ],
    };
  }

  handleLoadSelect = myProps => {
    const { filters } = this.state;

    filters.forEach(item => {
      if (item.key === myProps.name) {
        item.value = myProps.value;
        item.options = myProps.options;
      }
    });

    this.setState({
      filters,
    });
  };

  handleChangeSelect = myProps => {
    const { filters } = this.state;

    /**
     * 遍历并重新赋值、级联赋值
     */
    let childKey = myProps.child;
    let thisVal = myProps.value;

    filters.forEach(item => {
      if (item.key === myProps.name) {
        item.value = myProps.value;
        item.options = myProps.options;
      }
      // 子节点清空
      else if (item.key === childKey) {
        item.value = '';
        item.options = [];
        item.parentValue = thisVal;

        // 当前节点有子节点，需要递归
        if (myProps.child !== '') {
          childKey = item.child;
          thisVal = item.value;
        }
      }
    });

    this.setState({
      filters,
    });
  };

  queryProvinceData = () => {
    return request(`http://test.lnxm.iqeq.cn/api/none/common/province/list`);
  };

  queryCityData = provinceId => {
    return request(`http://test.lnxm.iqeq.cn/api/none/common/city/list?provinceId=${provinceId}`);
  };

  queryCountyData = cityId => {
    return request(`http://test.lnxm.iqeq.cn/api/none/common/county/list?cityId=${cityId}`);
  };

  render() {
    const { filters } = this.state;
    return (
      <div className="example-input">
        {filters.map((item, index) => (
          <SelectDown
            name={item.key}
            {...item}
            showItemSeparator={index !== 0}
            onChange={myProps => this.handleChangeSelect(myProps)}
            onLoad={myProps => this.handleLoadSelect(myProps)}
          />
        ))}
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
```
