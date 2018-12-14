import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Content from './Content';
import omit from 'omit.js';
import { Modal } from 'antd';

export default class GlobalModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      visible: false,
      content: null,
      style: {},
    };
  }

  static defaultProps = {
    on: {},
    type: 'modal',
  };

  componentDidMount = () => {
    const { on, type } = this.props;

    Object.defineProperty(on, type, {
      enumerable: true,
      configurable: true,
      set: value => {
        if (!value.visible) {
          return value;
        }

        this.setState({ ...value });

        return value;
      },
    });
  };

  handleOnCancel = () => {
    this.setState({
      visible: false,
      path: null,
      content: null,
    });
  };

  render = () => {
    const { visible, title, style, width, ...restStates } = this.state;
    const newStates = omit(this.state, ['content', 'path', 'style']);

    return (
      <div className="GlobalModal">
        <Modal
          destroyOnClose
          onCancel={this.handleOnCancel}
          footer={null}
          style={Object.assign({}, { top: 65 }, style)}
          {...newStates}
        >
          <Content {...restStates} />
        </Modal>
      </div>
    );
  };
}

GlobalModal.propTypes = {
  on: PropTypes.object,
  type: PropTypes.string,
};
