import React from 'react';
import { injectIntl,FormattedMessage } from 'react-intl';
import { Link } from 'bisheng/router';
import DocumentTitle from 'react-document-title';
import PropTypes from 'prop-types';
import * as utils from '../utils';

/* eslint-disable react/prefer-stateless-function */
class Home extends React.Component {
  static contextTypes = {
    intl: PropTypes.object.isRequired,
    isMobile: PropTypes.bool.isRequired,
  };

  render() {
    const {
      intl: { locale },
    } = this.context;
    const isZhCN = locale === 'zh-CN';
    return (
      <DocumentTitle title="Ant Design - CLY">
        <>
          <div className="cover-wrapper">
            <div className="cover-content">
              <div className="cover-icon">
                <img src="http://resimg.iqeq.cn/iconB.png" alt="" />
              </div>
              <h3>antd-cly</h3>
              <div className="cover-link">
                <a className="github" href="https://github.com/pigzhuzhu55/ant-design-cly" target="_blank">GitHub</a>
                <Link className="start" to={utils.getLocalizedPathname('/docs/react/getting-started', isZhCN)}>Get Started</Link>
              </div>
              <div className="slogan">
                <FormattedMessage id="app.home.slogan" />
              </div>
            </div>
          </div>
        </>
      </DocumentTitle>
        );
      }
    }
    
    export default injectIntl(Home);
