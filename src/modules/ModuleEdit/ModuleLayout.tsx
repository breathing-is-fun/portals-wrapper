import React, { Component } from 'react';
import { reject } from 'lodash';
import { Modal } from 'antd';
import Shell from '../../component/Shell';
import PropertyForm from './PropertyForm';
import './css/ModuleLayout.css';

export interface ModuleLayoutProps {
  layout: Array<any>;
  onDelete: (rejectLayout: Array<any>, id: string | number) => void;
  isAll: boolean;
}
export interface ModuleLayoutState {
  modalVisible: boolean;
  currentModalItem: object;
}

export default class ModuleLayout extends Component<
  ModuleLayoutProps,
  ModuleLayoutState
> {
  constructor(props: ModuleLayoutProps) {
    super(props);

    this.state = {
      modalVisible: false,
      currentModalItem: {},
    };
  }

  handleShellOnDelete = (dataGrid: any) => {
    const { id } = dataGrid;
    const { layout, onDelete } = this.props;

    onDelete && onDelete(reject(layout, { id }), id);
  };

  handleShellonEdit = (currentModalItem: any) => {
    this.setState({
      modalVisible: true,
      currentModalItem,
    });
  };

  generateEditShell = (
    layout: Array<any>,
    shellStyle: object,
    isAll: boolean,
  ) =>
    layout.map(item => {
      const { id, group, title, imgurl: imgUrl, showtitle: showTitle } = item;

      const shellProps = {
        key: group + id,
        title,
        showTitle,
        showEdit: isAll,
        showDelete: true,
        type: 'module',
        'data-grid': item,
        style: shellStyle,
        onDelete: this.handleShellOnDelete,
        onEdit: (dataGrid: object) => {
          this.handleShellonEdit(dataGrid);
        },
      };

      const height = showTitle ? 'calc(100% - 21px)' : '100%';

      return (
        <Shell {...shellProps}>
          <img
            src={imgUrl}
            style={{
              width: '100%',
              height,
            }}
          />
        </Shell>
      );
    });

  generateAddShell = (shellStyle: object) => (
    <Shell
      key="add"
      style={Object.assign({}, shellStyle, {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      })}
      type="add"
      onAdd={() => this.handleShellonEdit(true)}
    >
      <i className="plus-icon">+</i>
    </Shell>
  );

  render = () => {
    const { layout, isAll } = this.props;
    const { modalVisible, currentModalItem } = this.state;

    const shellStyle = {
      width: '20%',
      background: '#e0e6ee',
      float: 'left',
      margin: 30,
      position: 'relative',
    };

    const modalProps = {
      title: '套餐基础设置',
      visible: modalVisible,
      onCancel: () => this.setState({ modalVisible: !modalVisible }),
      destroyOnClose: true,
      footer: null,
      width: 700,
    };

    return (
      <div className="ModuleLayout">
        {this.generateEditShell(layout, shellStyle, isAll)}

        {this.generateAddShell(shellStyle)}

        <Modal {...modalProps}>
          <PropertyForm currentModalItem={currentModalItem} />
        </Modal>
      </div>
    );
  };
}
