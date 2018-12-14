import React, { Component } from 'react';

import LoadMenu from './LoadMenu';
import RenderHtml from './RenderHtml';

import { ajax } from '../../urlHelper';

export default class StyleDescription extends Component {
  constructor(props) {
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

  handleMenuClick = (item, selectedKey) => {
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
