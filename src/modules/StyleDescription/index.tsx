import React, { Component } from 'react';
import LoadMenu from './LoadMenu';
import RenderHtml from './RenderHtml';
import { ajax } from '../../urlHelper';

export interface StyleDescriptionProps {}
export interface StyleDescriptionState {
  paths: Array<any>;
  menuDatas: Array<any>;
  selectedKey: string;
}

export default class StyleDescription extends Component<
  StyleDescriptionProps,
  StyleDescriptionState
> {
  constructor(props: StyleDescriptionProps) {
    super(props);

    this.state = {
      paths: [],
      menuDatas: [],
      selectedKey: '',
    };
  }

  componentDidMount = () => {
    this.loadMenuDatas();
  };

  loadMenuDatas = () => {
    ajax({
      key: 'style_menu_data',
      success: ({ data: menuDatas }) => {
        const firstMenuItem = menuDatas.length != 0 ? menuDatas[0] : {};
        const { paths, key: selectedKey } = firstMenuItem;

        this.setState({ menuDatas, paths, selectedKey });
      },
    });
  };

  handleMenuClick = (item: any, selectedKey: any) => {
    const { paths } = item;

    this.setState({ paths, selectedKey });
  };

  render = () => {
    const { paths, menuDatas, selectedKey } = this.state;

    return (
      <div className="StyleDescription">
        <LoadMenu
          onClick={this.handleMenuClick}
          menuDatas={menuDatas}
          selectedKey={selectedKey}
        >
          <RenderHtml paths={paths} />
        </LoadMenu>
      </div>
    );
  };
}
