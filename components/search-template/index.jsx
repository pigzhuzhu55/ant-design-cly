import React, { Component } from 'react';
import { Input, Button, Select, Icon } from 'antd';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { SelectDown,SelectBox } from '../../components'

const InputGroup = Input.Group;
const { Search } = Input;
const { Option } = Select;

export default class SearchTemplate extends Component {
    static propTypes = {
        prefixCls: PropTypes.string,
        buttons: PropTypes.array,
        searchTexts: PropTypes.array,
        filters: PropTypes.array,
        maxFilterNum: PropTypes.number,
    };

    static defaultProps = {
        prefixCls: 'ant-selectform',
        buttons: [],
        searchTexts: [],
        filters: [],
        maxFilterNum: 5,
    }

    constructor(props) {
        super(props);
        const { searchTexts, filters } = this.props;

        this.state = {
            searchText: {
                key: searchTexts[0].key,
                value: '',
                placeholder: searchTexts[0].placeholder,
            },
            filters,
            showMore: false,
        };
    }


    handleChange = value => {
        const { searchTexts } = this.props;
        const newSearchText = searchTexts.filter(x => x.key === value)[0];

        const { searchText } = this.state;

        this.setState({
            searchText: {
                key: newSearchText.key,
                value: searchText.value,
                placeholder: newSearchText.placeholder,
            },
        });
    };

    handleChangeText = e => {
        const { searchText } = this.state;
        this.setState({
            searchText: {
                key: searchText.key,
                value: e.target.value,
                placeholder: searchText.placeholder,
            },
        });
    };

    handleSearch = () => {
        if (this.props.handleSearch) {
            this.props.handleSearch();
        }
    };

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


        this.handleSearch();
    };

    handleToggleFilter() {
        const { showMore } = this.state;
        this.setState({
            showMore: !showMore,
        });
    }

    handleClearSelect() {
        const { filters } = this.state;

        filters.forEach(item => {
            item.value = '';
            item.parentValue = '';
        });
        this.setState({
            filters,
        });
        this.handleSearch();
    }

    renderHeaderBox1() {

        const { buttons, searchTexts,prefixCls } = this.props;
        const { searchText } = this.state;

        return (
            <div className={classNames(`${prefixCls}-box`, 'clearfix')}>
                <div className={classNames(`${prefixCls}-boxL`, 'floatL')}>
                    {buttons.map(
                        item =>
                            item && (
                                <Button
                                    key={item.text}
                                    type={item.type}
                                    style={{ width: 100, marginRight: 10 }}
                                    onClick={item.onClick}
                                >
                                    {item.text}
                                </Button>
                            )
                    )}
                </div>
                <div className={classNames(`${prefixCls}-boxR`, 'floatR')}>
                    <InputGroup compact>
                        <Select defaultValue={searchText.key} onChange={value => this.handleChange(value)}>
                            {searchTexts.map(item => (
                                <Option key={item.key} value={item.key}>
                                    {item.text}
                                </Option>
                            ))}
                        </Select>
                        <Search
                            value={searchText.value}
                            onChange={e => this.handleChangeText(e)}
                            placeholder={searchText.placeholder}
                            onSearch={() => this.handleSearch()}
                            style={{ width: 200 }}
                        />
                    </InputGroup>
                </div>
            </div>
        );
    }
    renderHeaderBox2() {
        const { maxFilterNum,prefixCls } = this.props;
        const { filters, showMore } = this.state;
        return (
            <div className={`${prefixCls}-box2`}>
                <div style={{ width: '100%' }}>
                    {filters.length > maxFilterNum && (
                        <a
                            className={classNames(`${prefixCls}-filterlabel`, 'floatR')}
                            onClick={() => this.handleToggleFilter()}
                        >
                            {showMore ? '收起更多' : '更多筛选'} <Icon type={showMore ? 'up' : 'down'} />
                        </a>
                    )}
                    <div className={`${prefixCls}-droplistbox`}>
                        {filters.map((item, index) => (
                            <SelectDown
                                name={item.key}
                                {...item}
                                showItemSeparator={index !== 0}
                                onChange={myProps => this.handleChangeSelect(myProps)}
                                onLoad={myProps => this.handleLoadSelect(myProps)}
                                style={{
                                    display: index < maxFilterNum || showMore ? '' : 'none',
                                }}
                            />
                        ))}
                    </div>
                    <div>
                        {filters.some(item => item.value !== '') && (
                            <a className="floatR" onClick={() => this.handleClearSelect()}>
                                清空筛选
                    </a>
                        )}
                        <div className={`${prefixCls}-selectedbox`}>
                            {filters.map(
                                item =>
                                    item.value !== '' && (
                                        <SelectBox
                                            name={item.key}
                                            {...item}
                                            onChange={childPros => this.handleChangeSelect(childPros)}
                                        />
                                    )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        
        const { prefixCls } = this.props;

        return (
            <div className={`${prefixCls}-head`}>
                {this.renderHeaderBox1()}
                {this.renderHeaderBox2()}
            </div>
        );
    }
}