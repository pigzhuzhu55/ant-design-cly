import React, { Component } from 'react';
import { Icon, Spin } from 'antd';
import moment from 'moment';
import classNames from 'classnames';
import { SelectProps, SelectDownOptionProps } from '../_util/selectProp'
import { DatePicker } from '..'

const dateFormat = 'YYYY-MM-DD';

export interface IProps extends SelectProps{
    prefixCls?: string;
    multiple?: boolean;
    text?: string;
    showItemSeparator?: boolean;
    type?: string;
    loadData?: (val?: string) => Promise<any>;
    parent?: string;
    parentValue?: string;
    style?: React.CSSProperties;
    onChange?: (myProp?: SelectProps) => void;
    onLoad?: (myProp?: IProps) => void;
}

interface IState {
    showFilterDrop?: boolean;
    options?: SelectDownOptionProps[];
    value?: string;
    parent?: string;
    parentValue?: string;
    loading?: boolean;
}

const { RangePicker } = DatePicker;

export default class SelectDown extends Component<IProps, IState> {

    static defaultProps = {
        prefixCls: 'ant-selectdown',
        multiple: false,
        name: '',
        text: '',
        value: '',
        showItemSeparator: false,
        type: 'Select',
        options: Array<SelectDownOptionProps>(),
        child: '',
        parent: '',
        parentValue: '',
    }

    constructor(props: IProps) {
        super(props);

        const { options, value, parentValue } = this.props;

        this.state = {
            options,
            value,
            parentValue,
            showFilterDrop: false,
            loading: false,
        };
    }

    componentWillReceiveProps(nextProps: IProps) {
        const { value, options, parentValue } = nextProps;

        this.setState({
            value,
            options,
            parentValue,
        });
    }

    hideDropList = () => {
        const { showFilterDrop } = this.state;
        if (showFilterDrop) {
            this.setState({
                showFilterDrop: false,
            });
        }
    };

    handleFilterClick = () => {
        const { type, loadData, parent } = this.props;
        const { showFilterDrop, value, options, parentValue } = this.state;
        if (type === 'Select') {
            // 父节点有值，且不是双值，且当前节点未加载数据，则从服务的拉取数据
            if (
                parentValue !== '' && 
                !parentValue.includes('|') &&
                value === '' &&
                options.length === 0
            ) {
                this.setState({
                    loading: true,
                });
                loadData(parentValue).then(response => {
                    if (response.code === 0) {
                        this.setState({
                            loading: false,
                            options: response.data,
                        });

                        // 这里主要是为了更新MySelectBox里面的选项,所以需要传出去
                        const nextProps = {
                            ...this.props,
                            options: response.data,
                        };
                        if (this.props.onLoad) {
                            this.props.onLoad(nextProps);
                        }
                    }
                });
            }
            // 普通节点且未加载值 // 说明是第一个下拉，直接加载数据
            else if (parent === '' && !!loadData && options.length === 0) {
                this.setState({
                    loading: true,
                });
                loadData().then(response => {
                    if (response.code === 0) {
                        this.setState({
                            loading: false,
                            options: response.data,
                        });

                        // 这里主要是为了更新MySelectBox里面的选项,所以需要传出去
                        const nextProps = {
                            ...this.props,
                            options: response.data,
                        };
                        if (this.props.onLoad) {
                            this.props.onLoad(nextProps);
                        }
                    }
                });
            }

            // 有父节点，但是父节点未选择值，或者父节点选了2个值，则不弹出
            if (parent !== '' && (parentValue === '' || parentValue.includes('|'))) {
                return;
            }
        }

        this.setState({
            showFilterDrop: !showFilterDrop,
        });
    };

    handleSelectClick = (value: string) => {
        const { type, multiple } = this.props;
        const { value: oldValue } = this.state;
        let newValues = [];
        if (type === 'Select') {
            if (multiple) {
                newValues = oldValue.split('|').filter(val => val !== '');
                if (newValues.some(val => val === value)) {
                    newValues = newValues.filter(val => val !== value);
                } else {
                    newValues.push(value);
                }
            } else // 如果是单选，要考虑子节点是否开启
            {
                if (oldValue === '' || oldValue !== value) {
                    newValues.push(value);
                } else {
                    newValues.push('');
                }
            }
        } else {
            newValues.push(`${value.split(',')[0]} ~ ${value.split(',')[1]}`);
        }



        this.setState({
            value: newValues.join('|'),
        });

        const nextProps = {
            ...this.props,
            value: newValues.join('|'),
        };

        if (this.props.onChange) {
            this.props.onChange(nextProps);
        }
    };

    render() {
        const { text, style, type, parent, prefixCls } = this.props;
        const { showFilterDrop, options, value, loading, parentValue } = this.state;
        const values = value.split('|').filter(val => val !== '');
        return (
            <div className={`${prefixCls}-filterdropitem`} style={style}>
                {type === 'Select' && (
                    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                    <div className={`${prefixCls}-filterdrop`} tabIndex={0} onBlur={() => this.hideDropList()}>
                        <div>
                            {this.props.showItemSeparator && this.props.parent === '' && (
                                <span style={{ marginRight: 10, color: '#d4dfe5' }}>|</span>
                            )}
                            {this.props.showItemSeparator && this.props.parent !== '' && (
                                <Icon style={{ marginRight: 10 }} type="link" />
                            )}
                            <span
                                className={
                                    parent !== '' && (parentValue === '' || parentValue.includes('|'))
                                        ? classNames(`${prefixCls}-filtertitle`, `${prefixCls}-disabled`)
                                        : classNames(`${prefixCls}-filtertitle`)
                                }
                                onClick={() => this.handleFilterClick()}
                            >
                                {text}
                                <Icon type={showFilterDrop ? 'up' : 'down'} />
                            </span>
                        </div>
                        <div
                            className={`${prefixCls}-poperwraper`}
                            style={{
                                display: showFilterDrop ? '' : 'none',
                            }}
                        >
                            <div className={`${prefixCls}-poper`}>
                                {loading ? (
                                    <div className="loading">
                                        <Spin />
                                    </div>
                                ) : (
                                        <div className={`${prefixCls}-filterscrollbox`}>
                                            {options.map(
                                                item =>
                                                    item && (
                                                        <li
                                                            key={item.key}
                                                            className={
                                                                values.some(x => x === item.key.toString())
                                                                    ? classNames(`${prefixCls}-selected`, `${prefixCls}-filteritem`)
                                                                    : classNames(`${prefixCls}-filteritem`)
                                                            }
                                                            value={item.key}
                                                            onClick={() => this.handleSelectClick(item.key.toString())}
                                                        >
                                                            {item.title}
                                                            {values.some(x => x === item.key.toString()) && <Icon type="check" />}
                                                        </li>
                                                    ),
                                            )}
                                        </div>
                                    )}
                            </div>
                        </div>
                    </div>
                )}

                {type === 'DatePicker' && (
                    <div className={`${prefixCls}-filterdrop`}>
                        <div>
                            <RangePicker
                                onChange={(_ment, val) => this.handleSelectClick(val.toString())}
                                value={
                                    value === ''
                                        ? null
                                        : [
                                            moment(value.split(' ~ ')[0], dateFormat),
                                            moment(value.split(' ~ ')[1], dateFormat),
                                        ]
                                }
                                title={text}
                                showItemSeparator={this.props.showItemSeparator}
                                type="Select"
                            />
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
