import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Menu, Dropdown, Icon } from 'antd';

import moment from 'moment';
moment.locale('zh-cn');

import './css/Navigation.css';

export default class Navigation extends Component {
  static defaultProps = {
    title: '',
    datas: [],
    clock: false,
    size: '',
  };

  constructor(props) {
    super(props);

    this.state = {
      CurrentTime: null,
      iconRotate: 0,
      dropDownVisible: false,
      clientHeight: document.body.clientHeight,
    };
  }

  componentDidMount = () => {
    if (window.SCTool) {
      SCTool.listener.on('onResize', ({ clientHeight }) => {
        this.setState({ clientHeight });
      });
    }

    this.props.clock && this.loadCurrentTime();
  };

  loadCurrentTime = () => {
    import('./CurrentTime').then(CurrentTime => {
      this.setState({ CurrentTime: CurrentTime.default });
    });
  };

  handleIconType = dropDownVisible => {
    let { iconRotate } = this.state;

    iconRotate = dropDownVisible ? '180' : '0';

    this.setState({ iconRotate, dropDownVisible });
  };

  render = () => {
    const { children, datas, onClick, clock, title, size } = this.props;
    const {
      CurrentTime,
      dropDownVisible,
      iconRotate,
      clientHeight,
    } = this.state;

    const date = (
      <div
        className={classNames({
          'content-wrapper': true,
          sm: size == 'sm',
        })}
      >
        <div
          className={classNames({
            'content-time-detail': true,
            sm: size == 'sm',
          })}
        >
          {moment().format('YYYY-MM-DD')}
        </div>
        {size != 'sm' && (
          <div
            className={classNames({
              'content-time-detail': true,
              sm: size == 'sm',
            })}
          >
            {moment().format('dddd')}
          </div>
        )}
      </div>
    );

    const switchMeal = (
      <Menu>
        {datas.map(item => {
          const { title, id } = item;

          return (
            <Menu.Item key={id} onClick={e => onClick(item)}>
              <a rel="noopener noreferrer">{title}</a>
            </Menu.Item>
          );
        })}
      </Menu>
    );

    return (
      <div className="Navigation">
        <div
          className={classNames({
            content: size == '',
            'content-sm': size == 'sm',
          })}
        >
          <div
            className={classNames({
              'content-wrapper': true,
              sm: size == 'sm',
            })}
            style={{ width: 300 }}
          >
            {title}
          </div>

          <div
            className={classNames({
              'content-wrapper': true,
              sm: size == 'sm',
            })}
            style={{ width: 300 }}
          >
            <div
              className={classNames({
                'content-time': size == '',
                sm: size == 'sm',
              })}
            >
              {CurrentTime && <CurrentTime />}
            </div>
          </div>

          {clock && date}

          <div
            className={classNames({
              'content-wrapper': true,
              'content-switch': true,
              sm: size == 'sm',
            })}
          >
            <Dropdown
              overlay={switchMeal}
              trigger={['hover', 'click']}
              onVisibleChange={this.handleIconType}
              visible={dropDownVisible}
            >
              <span className="droplink">
                套餐切换
                <Icon
                  type="down"
                  style={{
                    transform: `rotate(${iconRotate}deg)`,
                  }}
                  className="droplink-icon"
                />
              </span>
            </Dropdown>
          </div>
        </div>

        <div
          className="children-wrapper"
          style={{ height: clientHeight - 65 + 'px' }}
        >
          {children}
        </div>
      </div>
    );
  };
}

Navigation.propTypes = {
  title: PropTypes.string,
  datas: PropTypes.array,
  onClick: PropTypes.func,
  clock: PropTypes.bool,
  size: PropTypes.string,
};
