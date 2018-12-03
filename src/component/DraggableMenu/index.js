import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu;

import DragMenuItem from './DragMenuItem';

export default class DraggableMenu extends Component {
  constructor (props) {
    super(props);

    this.state = {
      currentShellStyle: {},
    };

    this.menuSelectPrefix = 'dragMenuItem';
  }

	static defaultProps = {
	  selectedKeys: [],
	  menuDatas: [],
	  openKeys: [],
	  shellStyleDatas: [],
	  type: 'component',
	}

	handleMenuClick = ({ item, keyPath }) => {
	  const { onClick } = this.props;

	  const { item: propsItem = {} } = item.props;

	  onClick && onClick(
	    propsItem ? propsItem.group : null,
	    [keyPath[keyPath.length - 1] + propsItem.id],
	    propsItem.id
	  );
	}

	handleShellStyle = currentShellStyle => {
	  this.setState({ currentShellStyle });
	};

	generateSubMenu = (children, currentShellStyle) => (
	  children.map((item, j) => {
	    const { group, id } = item;
	    const style = Object.assign({}, item, { style: currentShellStyle });

	    return (
	      <DragMenuItem
	        key={ `${ this.menuSelectPrefix }${ group }${ id }` }
	        item={ style }
	      />
	    );
	  })
	)

	render = () => {
	  const {
	    type,
	    shellStyleDatas,
	    menuDatas,
	    openKeys,
	    selectedKeys,
	    onOpenChange,
	    onSave
	  } = this.props;
	  const { currentShellStyle } = this.state;

	  const hrefToDisplay = (
	    <Menu.Item key='back' onClick={() => location.hash = '/display'}>
	      <Icon type='arrow-left' theme='outlined' />
	      <span>首页</span>
	    </Menu.Item>
	  );

	  const styleSubMenu = (
	    <Menu.Item key='back' onClick={() => onSave && onSave()}>
	      <Icon type='arrow-left' theme='outlined' />
	      <span>保存并返回</span>
	    </Menu.Item>
	  );

	  return (
	    <div className='DraggableMenu'>

	      <Menu
	        openKeys={ openKeys }
	        selectedKeys={ [this.menuSelectPrefix + selectedKeys[0]] }
	        mode='inline'
	        onOpenChange={ onOpenChange }
	        onClick={ this.handleMenuClick }
	      >
	        {type == 'module' && hrefToDisplay}

	        {type == 'component' && styleSubMenu}

	        {
	          menuDatas.map(item => {
	            const { groupName, children = [], group } = item;

	            const subMenuTitle = (
	              <span>
	                <Icon type='laptop' theme='outlined' />
	                <span>{ groupName }</span>
	              </span>
	            );

	            return (
	              <SubMenu key={ group } title={ subMenuTitle }>
	                { this.generateSubMenu(
	                  children,
	                  currentShellStyle
	                ) }
	              </SubMenu>
	            );
	          })
	        }
	      </Menu>
	    </div>
	  );
	}
}

DraggableMenu.propTypes = {
  selectedKeys: PropTypes.array,
  menuDatas: PropTypes.array,
  openKeys: PropTypes.array,
  onClick: PropTypes.func,
  onOpenChange: PropTypes.func,
  shellStyleDatas: PropTypes.array,
  onSave: PropTypes.func,
  type: PropTypes.oneOf(['component', 'module']),
};