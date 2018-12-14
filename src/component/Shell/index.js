import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Icon } from 'antd';
import omit from 'omit.js';

import './css/Shell.css';

export default class Shell extends Component {
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

  handleOnDelete = e => {
    const { onDelete } = this.props;
    const dataGrid = this.props['data-grid'] || {};

    this.preventBubble(e);

    onDelete && onDelete(dataGrid);
  };

  handleOnEdit = e => {
    const { onEdit } = this.props;
    const dataGrid = this.props['data-grid'] || {};

    this.preventBubble(e);

    onEdit && onEdit(dataGrid);
  };

  handleOnDetail = e => {
    const { onDetail } = this.props;
    const dataGrid = this.props['data-grid'] || {};

    this.preventBubble(e);

    onDetail && onDetail(dataGrid);
  };

  // 阻止react-grid-layout的拖拽事件在点击时生效
  preventBubble = e => {
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
        className={classNames({
          'sc-title': size == '',
          'sc-title-sm': size == 'sm',
        })}
        onMouseDown={this.handleOnDetail}
        style={{
          right: 10,
          position: 'absolute',
          cursor: 'pointer',
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

    if (window.SCTool) {
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

Shell.propTypes = {
  showDetail: PropTypes.bool,
  detailPath: PropTypes.string,
  onDetail: PropTypes.func,
  showEdit: PropTypes.bool,
  showDelete: PropTypes.bool,
  type: PropTypes.oneOf(['add', 'module', 'component']),
  onAdd: PropTypes.func,
  showTitle: PropTypes.bool,
  style: PropTypes.object,
  title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  onDelete: PropTypes.func,
  'data-grid': PropTypes.object,
  onEdit: PropTypes.func,
};
