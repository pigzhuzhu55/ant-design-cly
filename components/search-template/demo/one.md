---
order: 1
title:
  zh-CN: 普通查询
  en-US: General Query

---

## zh-CN



## en-US



```jsx
import { SearchTemplate } from 'antdcly';
import { extend } from 'umi-request';
 
const request = extend({});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttons : [
        { text: '新增机构', type: 'primary', onClick: () => this.handleModalVisible(true) },
        { text: '导入机构', onClick: () => this.handleTODO() },
      ],
      searchTexts : [
        { text: '机构名称', key: 'orgName', placeholder: '请输入机构名称' },
        { text: '电话号码', key: 'telephone', placeholder: '请输入电话号码' },
      ],
      filters: [
              {
        text: '性质',
        key: 'orgType',
        value: '',
        options: [{ title: '直营', key: '0' }, { title: '加盟', key: '1' }],
      },
            {
        text: '合同过期时间',
        key: 'expireTime',
        value: '',
        type: 'DatePicker',
      },
        {
          text: '省',
          key: 'province',
          value: '',
          child: 'city',
          multiple: true,
          loadData: ()=> request(`http://test.lnxm.iqeq.cn/api/none/common/province/list`),
        },
        {
          text: '市',
          key: 'city',
          value: '',
          parent: 'province',
          child: 'county',
          multiple: true,
          loadData: provinceId => request(`http://test.lnxm.iqeq.cn/api/none/common/city/list?provinceId=${provinceId}`),
        },
        {
          text: '县',
          key: 'county',
          value: '',
          parent: 'city',
          multiple: true,
          loadData: cityId => request(`http://test.lnxm.iqeq.cn/api/none/common/county/list?cityId=${cityId}`),
        },
      ],
    };
  }
 
  handleSearch = pagination => {
   
    console.log('');
  };

  render() {
    const { buttons,
      searchTexts,
      filters, } = this.state;
    return (
      <div >
        <SearchTemplate 
        buttons={buttons}
        searchTexts={searchTexts}
        filters = {filters}
        handleSearch = {this.handleSearch}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);

```


<style>
.ant-col-12 {
    display: block;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
}
</style>

