import React, { Component } from 'react';
import classNames from 'classnames';
import { Menu, Dropdown, Icon } from 'antd';
import moment from 'moment';
moment.locale('zh-cn');
import './css/Navigation.css';

export interface NavigationProps {
  title?: string;
  datas?: Array<any>;
  clock?: boolean;
  size?: string | number;
  display?: boolean;
  onClick?: (item: any) => void;
}
export interface NavigationState {
  CurrentTime: any;
  iconRotate: number | string;
  dropDownVisible: boolean;
  clientHeight: number;
  currentSelect: string;
}

export default class Navigation extends Component<
  NavigationProps,
  NavigationState
> {
  static defaultProps = {
    datas: [],
  };

  constructor(props: any) {
    super(props);

    this.state = {
      CurrentTime: null,
      iconRotate: 0,
      dropDownVisible: false,
      clientHeight: document.body.clientHeight,
      currentSelect: '',
    };
  }

  static getDerivedStateFromProps = (
    props: NavigationProps,
    state: NavigationState,
  ) => {
    const { datas = [] } = props;
    const { currentSelect } = state;
    const newState: any = {};

    if (!currentSelect && datas.length != 0) {
      newState.currentSelect = datas[0].title;
    }
    return newState;
  };

  componentDidMount = () => {
    if ((window as any).SCTool) {
      SCTool.RegisterResizeDispatcher = {
        key: 'Navigation',
        onResize: (item: any) => {
          this.setState({ clientHeight: item.clientHeight });
        },
      };
    }

    this.props.clock && this.loadCurrentTime();
  };

  loadCurrentTime = () => {
    import('./CurrentTime').then(CurrentTime => {
      this.setState({ CurrentTime: CurrentTime.default });
    });
  };

  handleIconType = (dropDownVisible: boolean) => {
    let { iconRotate } = this.state;
    iconRotate = dropDownVisible ? '180' : '0';

    this.setState({
      iconRotate,
      dropDownVisible,
    });
  };

  handleMenuItemClick = (item: any) => {
    const { onClick } = this.props;
    const { title } = item;

    this.setState({ currentSelect: title }, () => {
      onClick && onClick(item);
    });
  };

  render = () => {
    const { children, datas = [], clock, title, size, display } = this.props;
    const {
      CurrentTime,
      dropDownVisible,
      iconRotate,
      clientHeight,
      currentSelect,
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
            <Menu.Item
              key={id}
              onClick={(e: any) => this.handleMenuItemClick(item)}
            >
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
          style={{ display: display ? '' : 'none' }}
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

          {datas && datas.length != 0 && (
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
                  {currentSelect}
                  <Icon
                    type="down"
                    style={{
                      transform: `rotate(${iconRotate}deg)`,
                      marginLeft: 10,
                    }}
                    className="droplink-icon"
                  />
                </span>
              </Dropdown>
            </div>
          )}
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
