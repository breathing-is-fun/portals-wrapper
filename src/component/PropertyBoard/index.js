import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Drawer, Icon, Input } from 'antd';
import Loader from './PropertyLoader';

import './css/PropertyBoard.css';

export default class PropertyBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      propertyDatas: [],
    };

    this.loader = new Loader();
    this.currentShellStyle = {};
  }

  static defaultProps = {
    visible: false,
    shellStyleDatas: {},
    enumDatas: [],
  };

  componentDidMount = () => {
    this.loadPropertyDatas(this.props.visible);
  };

  loadPropertyDatas = visible => {
    if (visible) {
      const { shellStyleDatas, enumDatas } = this.props;
      const { i: key, style } = shellStyleDatas;

      this.loader.load(enumDatas, style, key, propertyDatas =>
        this.setState({ propertyDatas }),
      );
    }
  };

  handleInput = (value, key, id) => {
    const { onChange } = this.props;

    this.currentShellStyle[key] = value;
    this.currentShellStyle.id = id;

    onChange && onChange(this.currentShellStyle);
  };

  generateProperties = propertyDatas =>
    propertyDatas.map(item => {
      const { key, text, value, id } = item;

      return (
        <li key={`property-li-${key}`}>
          <div className="property-key">{text}：</div>
          <div className="property-value">
            <Input
              onBlur={e => {
                this.handleInput(e.target.value, key, id);
              }}
              defaultValue={value}
            />
          </div>
        </li>
      );
    });

  render = () => {
    const { visible, onClose, shellStyleDatas } = this.props;
    const { title } = shellStyleDatas;
    const { propertyDatas } = this.state;

    const drawerTitle = (
      <div>
        <Icon type="form" theme="outlined" />
        <span style={{ paddingLeft: 10 }}>{`${title} 外壳属性修改`}</span>
      </div>
    );

    return (
      <div className="PropertyBoard">
        <Drawer
          visible={visible}
          className="PropertyBoard"
          onClose={() => onClose && onClose(!visible)}
          title={drawerTitle}
          width="20%"
          destroyOnClose
        >
          <ul className="property-wrapper">
            {this.generateProperties(propertyDatas)}
          </ul>
        </Drawer>
      </div>
    );
  };
}

PropertyBoard.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  shellStyleDatas: PropTypes.object,
  enumDatas: PropTypes.array,
  onChange: PropTypes.func,
};
