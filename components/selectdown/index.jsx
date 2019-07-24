import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Input, Icon, DatePicker, Spin } from 'antd';
import classNames from 'classnames';

export default class SelectDown extends Component {
    static propTypes = {
        prefixCls:PropTypes.string,
    }

    static defaultProps = {
        prefixCls: 'ant-selectdown',
    }

    render() {
        const {prefixCls} = this.props;
        return (
        <div>
            <span className={`${prefixCls}-selectedlabel`}>测试</span>
            <Icon style={{ marginRight: 10 }} type="link" />
        </div>
        )
    }
}
