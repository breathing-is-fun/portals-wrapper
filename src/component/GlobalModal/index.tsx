import React, { Component } from 'react';
import Content from './Content';
import omit from 'omit.js';
import { Modal } from 'antd';

export interface GlobalModalProps {
  on: object;
  type?: any | 'modal';
}

export interface GlobalModalState {
  title: string;
  visible: boolean;
  content: any;
  style: object;
  mask: boolean;
  width: number | string;
  path: any;
}

export default class GlobalModal extends Component<
  GlobalModalProps,
  GlobalModalState
> {
  constructor(props: any) {
    super(props);

    this.state = {
      title: '',
      visible: false,
      content: null,
      style: {},
      mask: false,
      width: 0,
      path: '',
    };
  }

  componentDidMount = () => {
    const { on, type } = this.props;
    const defaultProps = {
      mask: false,
      width: '100%',
      style: { top: 65 },
    };

    Object.defineProperty(on, type, {
      enumerable: true,
      configurable: true,
      set: (value: any) => {
        if (!value.visible) {
          return value;
        }

        this.setState({ ...defaultProps, ...value });

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
          forceRender
          style={Object.assign({}, { top: 65 }, style)}
          {...newStates}
        >
          <Content {...restStates} />
        </Modal>
      </div>
    );
  };
}
