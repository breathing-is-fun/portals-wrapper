import React, { Component } from 'react';
import Grid from '../../component/Grid';
import DraggableMenu from '../../component/DraggableMenu';
import Ruler from '../../component/Ruler';
import { handleMenuGroup } from '../../component/DraggableMenu/handler';
import { reject } from 'lodash';
import { ajax } from '../../urlHelper';
import { Layout } from 'antd';
const { Sider } = Layout;

export interface ComponentEditState {
  layout: Array<any>;
  menuDatas: Array<any>;
  openKeys: Array<string>;
  selectedKeys: Array<string>;
  shellStyleDatas: Array<any>;
  enumDatas: Array<string>;
}

export default class ComponentEdit extends Component<any, ComponentEditState> {
  private grid: any = {};

  constructor(props: any) {
    super(props);
    this.state = {
      layout: [],
      menuDatas: [],
      openKeys: [],
      selectedKeys: [],
      shellStyleDatas: [],
      enumDatas: [],
    };
  }

  static getDerivedStateFromProps() {
    if (!SCTool.listener.get('formData')) {
      location.hash = '/edit/module';
    }
    return null;
  }

  componentDidMount = () => {
    this.loadMenuDatas();

    this.loadPropertyBoardData();
  };

  loadPropertyBoardData = () => {
    ajax({
      key: 'propertyDatas',
      success: ({ data }) => {
        this.setState({ enumDatas: data });
      },
    });
  };

  loadMenuDatas = () => {
    ajax({
      key: 's_slmh_menu_data',
      data: { type: 2 },
      success: ({ data }) => {
        const menuDatas = handleMenuGroup(data);
        const item = data.length != 0 ? data[0] : {};

        this.setState(
          {
            menuDatas,
            openKeys: [item.roup],
            selectedKeys: [item.group + item.id],
          },
          () => this.loadLayoutDatas(),
        );
      },
    });
  };

  loadLayoutDatas = () => {
    const { id } = SCTool.listener.get('formData');

    id &&
      ajax({
        key: 's_slmh_meal_layout_data',
        data: { id },
        success: ({ data: layout }) => {
          this.setState({ layout }, () => {
            setTimeout(() => {
              this.grid.mountRoots();
            }, 0);
          });
        },
      });
  };

  handleOnSave = () => {
    const { layout } = this.state;

    const postData = Object.assign(
      {},
      { layout },
      SCTool.listener.get('formData'),
    );

    location.hash = '/edit/module';

    ajax({
      key: 'add_meal',
      method: 'POST',
      data: postData,
      success: result => {
        if (result) {
        } else {
          console.error(result);
        }
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  };

  handleOnDelete = (layoutItem: any) => {
    const { i: key } = layoutItem;
    const { layout } = this.state;

    this.setState({ layout: reject(layout, { i: key }) });
  };

  handleLayoutChange = (layout: Array<any>) => {
    this.setState({ layout });
  };

  handleMenuClick = (
    group: any,
    selectedKeys: Array<string>,
    id: string | number,
  ) => {
    this.setState({ selectedKeys });
  };

  handleOnOpenChange = (openKeys: Array<string>) => this.setState({ openKeys });

  render = () => {
    const {
      layout,
      selectedKeys,
      menuDatas,
      openKeys,
      shellStyleDatas,
      enumDatas,
    } = this.state;

    const draggableMenuProps = {
      selectedKeys,
      menuDatas,
      openKeys,
      onClick: this.handleMenuClick,
      onOpenChange: this.handleOnOpenChange,
      shellStyleDatas,
      onSave: this.handleOnSave,
    };

    const gridProps = {
      showEdit: true,
      showDelete: true,
      layout,
      onLayoutChange: this.handleLayoutChange,
      onDelete: this.handleOnDelete,
      enumDatas,
      ref: (ref: any) => ref && (this.grid = ref),
    };

    return (
      // <Navigation type='componentEdit'>
      <Layout
        style={{
          minHeight: '100vh',
          height: document.body.clientHeight,
        }}
      >
        <Sider theme="light" width="256">
          <DraggableMenu {...draggableMenuProps} />
        </Sider>

        <Layout style={{ position: 'relative' }}>
          <Ruler>
            <Grid {...gridProps} />
          </Ruler>
        </Layout>
      </Layout>
      // </Navigation>
    );
  };
}
