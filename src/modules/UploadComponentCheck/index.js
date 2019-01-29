import React, { Component } from 'react';
import { ajax, isDev } from '../../urlHelper';
import Grid from '../../component/Grid';
import Ruler from '../../component/Ruler';

export default class UploadComponentCheck extends Component {
  constructor(props) {
    super(props);

    this.state = {
      layout: [],
    };
  }

  componentDidMount = () => {
    this.getCheckLayout();
  };

  getCheckLayout = () => {
    const id = isDev ? 89 : this.getCheckId();
    ajax({
      url: '../../mock/UploadComponentCheck.json',
      data: { id },
      success: ({ data }) => {
        if (data && data.length != 0) {
          this.setState({ layout: data }, () => {
            setTimeout(() => {
              this.grid.mountRoots();
            }, 0);
          });
        }
      },
    });
  };

  getCheckId = () => {
    const hash = location.hash.split('/');
    return hash[hash.length - 1];
  };

  handleLayoutChange = layout => {
    this.setState({ layout });
  };

  render = () => {
    const { layout } = this.state;
    const gridProps = {
      layout,
      isResizable: true,
      isDraggable: true,
      onLayoutChange: this.handleLayoutChange,
      ref: ref => ref && (this.grid = ref),
    };
    return (
      <div className="UploadComponentCheck">
        <Ruler>
          <Grid {...gridProps} />
        </Ruler>
      </div>
    );
  };
}
