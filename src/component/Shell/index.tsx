import React, { Component } from 'react';
import classNames from 'classnames';
import { Icon } from 'antd';
import omit from 'omit.js';
import './css/Shell.css';

export interface ShellProps {
  showDetail: boolean;
  detailPath: string;
  showEdit: boolean;
  showDelete: boolean;
  type?: 'add' | 'module' | 'component' | string;
  showTitle: boolean;
  style: any;
  title: any;
  'data-grid': any;
  size?: string | number;
  onAdd?: (dataGrid: any) => void;
  onDelete?: (dataGrid: any) => void;
  onDetail?: (dataGrid: any) => void;
  onEdit?: (dataGrid: any) => void;
}

export default class Shell extends Component<ShellProps> {
  static defaultProps = {
    showEdit: false,
    showDelete: false,
    showDetail: false,
    detailPath: '',
    type: 'component',
    showTitle: true,
    style: {},
    title: '',
    'data-grid': {},
  };

  handleOnDelete = (e: any) => {
    const { onDelete } = this.props;
    const dataGrid = this.props['data-grid'] || {};

    this.preventBubble(e);

    onDelete && onDelete(dataGrid);
  };

  handleOnEdit = (e: any) => {
    const { onEdit } = this.props;
    const dataGrid = this.props['data-grid'] || {};

    this.preventBubble(e);

    onEdit && onEdit(dataGrid);
  };

  handleOnDetail = (e: any) => {
    const { onDetail } = this.props;
    const dataGrid = this.props['data-grid'] || {};

    this.preventBubble(e);

    onDetail && onDetail(dataGrid);
  };

  // 阻止react-grid-layout的拖拽事件在点击时生效
  preventBubble = (e: any) => {
    if (e.stopPropagation) {
      e.stopPropagation();
    } else {
      e.cancelBubble = true;
    }
  };

  render = () => {
    const {
      children,
      showEdit,
      showDelete,
      type,
      onAdd,
      showTitle,
      style,
      showDetail,
      title,
      size,
    } = this.props;

    const editButton = (
      <Icon
        type="edit"
        className="operation"
        onMouseDown={this.handleOnEdit}
        style={{ right: 40 }}
      />
    );
    const deleteButton = (
      <Icon
        type="delete"
        className="operation"
        onMouseDown={this.handleOnDelete}
        style={{ right: 10 }}
      />
    );
    // const detailButton = (
    //   <Icon
    //     type='small-dash'
    //     className='operation'
    //     onMouseDown={this.handleOnDetail}
    //     style={{ right: 10, fontSize: '2vw' }}
    //   />
    // );
    const detailButton = (
      <span
        onMouseDown={this.handleOnDetail}
        style={{
          right: 10,
          position: 'absolute',
          cursor: 'pointer',
          fontSize: 17,
          top: 6,
        }}
      >
        详情 >
      </span>
    );

    const newProps = omit(this.props, [
      'showDelete',
      'onDelete',
      'showDetail',
      'onEdit',
      'showEdit',
      'title',
      'showTitle',
      'onDetail',
      'detailPath',
      'onAdd',
    ]);

    if ((window as any).SCTool) {
      SCTool.listener.set(newProps['data-grid'].i, {
        width: newProps.style.width,
        height: newProps.style.height,
      });
    }

    return (
      <div
        {...newProps}
        style={Object.assign(
          {},
          {
            overflow: showEdit ? 'hidden' : 'auto',
          },
          style,
        )}
        className={classNames({
          Shell: true,
          'border-transition': type != 'component',
        })}
        onClick={e => type == 'add' && onAdd && onAdd(e)}
      >
        {showDelete && deleteButton}

        {showEdit && editButton}

        {showDetail && detailButton}

        {type != 'add' && showTitle && (
          <span
            className={classNames({
              'sc-title': size == '',
              'sc-title-sm': size == 'sm',
              'operation-title': true,
            })}
          >
            {title}
          </span>
        )}

        {children}
      </div>
    );
  };
}
