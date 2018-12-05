import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Content from './Content';
import { Modal } from 'antd';

export default class GlobalModal extends Component {
  constructor (props) {
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
  }

  componentDidMount = () => {
    const { on, type } = this.props;

    Object.defineProperty(on, type, {
      enumerable: true,
      configurable: true,
      set: value => {
        this.setState({ ...value });

        return value;
      }
    });
  }

  render = () => {
    const { visible, title, style, ...restStates } = this.state;

    return (
      <div className='GlobalModal'>
        <Modal
          title={title}
          visible={visible}
          style={style}
          destroyOnClose
          onCancel={() => this.setState({ visible: false })}
          footer={null}
        >
          <Content {...restStates} />
        </Modal>
      </div>
    );
  }
}

GlobalModal.propTypes = {
  on: PropTypes.object,
  type: PropTypes.string,
};