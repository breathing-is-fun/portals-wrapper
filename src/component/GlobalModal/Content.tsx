import React, { Component } from 'react';

import Loader from '../Grid/ModulesLoader';

export interface ContentProps {
  path: string;
  content: any;
}
export default class Content extends Component<ContentProps> {
  private root: any;

  constructor(props: any) {
    super(props);

    this.state = {};

    this.root = React.createRef();
  }

  componentDidMount = () => {
    const { path } = this.props;

    if (path) {
      const loader = new Loader([{ i: 'globalModalContent', path }], {
        globalModalContent: this.root.current,
      });

      loader.load(SCTool);
    }
  };

  render = () => {
    const { content, path } = this.props;
    let renderHtml = content;

    if (path) {
      renderHtml = null;
    }

    if (!path && typeof content == 'string') {
      renderHtml = (
        <div
          dangerouslySetInnerHTML={{ __html: content }}
          style={{ width: '100%', height: '100%' }}
        />
      );
    }

    return (
      <div className="Content">
        {renderHtml}
        <div ref={this.root} />
      </div>
    );
  };
}
