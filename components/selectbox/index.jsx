import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'antd';


export default class SelectBox extends Component {
    static propTypes = {
        prefixCls: PropTypes.string,
        name: PropTypes.string,
        text: PropTypes.string,
        value: PropTypes.string,
        options: PropTypes.array,
        type: PropTypes.string,
    };

    static defaultProps = {
        prefixCls: 'ant-selectbox',
        name: '',
        text: '',
        options: [],
        value: '',
        type: 'Select',
    };

    constructor(props) {
        super(props);

        const { value, options } = this.props;

        this.state = {
            value,
            options,
        };
    }

    componentWillReceiveProps(nextProps) {
        const { value, options } = nextProps;

        this.setState({
            value,
            options,
        });
    }

    handleCloseTag = value => {
        const values = this.props.value.split('|').filter(val => val !== '' && val !== value);

        const nextProps = {
            ...this.props,
            value: values.join('|'),
        };
        if (this.props.onChange) {
            this.props.onChange(nextProps);
        }
    };

    render() {
        const { name, text, type,prefixCls } = this.props;
        const { value, options } = this.state;

        const keyTitles = [];
        if (value !== '') {
            const keys = value.split('|');

            if (type === 'Select') {
                keys.forEach(key => {
                    const x = options.filter(opt => opt.key.toString() === key);
                    if (x.length > 0) {
                        keyTitles.push(x[0]);
                    }
                });
            } else {
                keys.forEach(key => {
                    keyTitles.push({ key, title: key });
                });
            }
        }

        return (
            <div key={name} className={`${prefixCls}-selecteditem`}>
                <span className={`${prefixCls}-selectedlabel`}>{text}：</span>
                {keyTitles.map(item => (
                    <Tag key={item.key} closable onClose={() => this.handleCloseTag(item.key.toString())}>
                        {item.title}
                    </Tag>
                ))}
            </div>
        );
    }
}
