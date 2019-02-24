import React, { Component } from 'react';

import Grid from '../../component/Grid';
import Navigation from '../../component/Navigation';
import { ajax } from '../../urlHelper';
import { message } from 'antd';
message.config({
  top: 100,
  maxCount: 3,
});
import './css/Display.css';
export interface DisplayState {
  layout: Array<any>;
  menuDatas: Array<any>;
  loading: boolean;
  size: string | number;
  isMainPage: boolean;
  detailPath: string;
  display: boolean;
}
export default class Display extends Component<any, DisplayState> {
  grid: any = {};
  constructor(props: any) {
    super(props);

    this.state = {
      layout: [],
      menuDatas: [],
      loading: true,
      size: '',
      isMainPage: false, // 判断是否是一级页面，如果是就加载iframe
      detailPath: '',
      display: false, // 导航是否显示
    };
  }

  componentDidMount = () => {
    const display = this.getParams('display') !== 'false';

    if (!display) {
      window.parent.SCTool.listener.do('destroyIframe');
    }

    if (window.SCTool) {
      SCTool.listener.on('controlSkip', (params: any) => {
        this.setState(params);
      });

      SCTool.listener.on('destroyIframe', () => {
        this.setState({ isMainPage: true }, () => {
          this.grid.mountRoots();
        });
      });
    }

    if (display) {
      if (window.SCTool) {
        SCTool.RegisterResizeDispatcher = {
          key: 'Display',
          onResize: (item: any) => {
            this.setState({ size: item.size, display: item.display });
          },
        };
      }

      this.loadMenu();

      SCTool.resize();
    } else {
      this.setState(
        {
          display,
          isMainPage: true,
          loading: false,
        },
        () => {
          this.loadMenu();
        },
      );
    }
  };

  getParams = (name: string) => {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    const href = window.location.href;
    let result = href.split('?').length > 1 ? href.split('?')[1].match(reg) : 0;

    if (result != null) {
      return result[2] === 'undefined' ? undefined : result[2];
    }

    return null;
  };

  validateTicket = (callback: any) => {
    const ticket = this.getParams('ticket');

    // if (!ticket) {
    //   message.error('ticket is null.');
    //   return;
    // }

    ajax({
      key: 'login-ticket',
      data: { ticket },
      success: ({ data }) => {
        SCTool.ticket = data;

        callback && callback();
      },
    });
  };

  loadLayout = (item: any) => {
    const { id } = item;
    this.setState({ loading: true });

    ajax({
      key: 's_slmh_meal_layout_data',
      data: { id },
      success: ({ data: result }) => {
        let layout = [];

        for (let item of result) {
          let { style } = item;

          if (typeof style == 'string') {
            item.style = JSON.parse(style);
          }

          layout.push(item);
        }
        this.setState({ layout, loading: false, isMainPage: true }, () => {
          this.validateTicket(() => {
            this.grid.mountRoots();
          });
        });
      },
    });
  };

  loadMenu = () => {
    ajax({
      key: 's_slmh_meal_switch',
      data: { id: 1 },
      success: ({ data: menuDatas }) => {
        this.setState({ menuDatas }, () => {
          menuDatas.length != 0 && this.loadLayout(menuDatas[0]);
        });
      },
    });
  };

  handleOnDetail = (item: any) => {
    const { detailpath: detailPath } = item;

    this.setState({ detailPath, isMainPage: false });
  };

  render = () => {
    const {
      layout,
      menuDatas,
      loading,
      size,
      isMainPage,
      detailPath,
      display,
    } = this.state;

    const title = SCTool.listener.get('systemTitle');

    return (
      <Navigation
        onClick={item => this.loadLayout(item)}
        datas={menuDatas}
        clock
        title={title}
        size={size}
        display={display}
      >
        {isMainPage && !loading && (
          <Grid
            showEdit={false}
            showDelete={false}
            layout={layout}
            size={size}
            onDetail={this.handleOnDetail}
            ref={ref => ref && (this.grid = ref)}
          />
        )}
        {!isMainPage && (
          <iframe
            src={detailPath}
            style={{
              width: '100%',
              border: 'none',
              height: '100%',
            }}
          />
        )}
      </Navigation>
    );
  };
}
