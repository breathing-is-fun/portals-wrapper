import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import { ajax } from '../../urlHelper';
import '../../assets/global.css';
import './css/RenderHtml.css';

export interface RenderHtmlProps {
  paths: Array<string>;
}
export interface RenderHtmlState {
  markdowns: Array<any>;
}

export default class RenderHtml extends Component<
  RenderHtmlProps,
  RenderHtmlState
> {
  private prefix: string;
  constructor(props: RenderHtmlProps) {
    super(props);

    this.state = {
      markdowns: [],
    };

    this.prefix = '../../guide/';
  }

  componentWillReceiveProps = (nextProps: RenderHtmlProps) => {
    const { paths } = nextProps;

    this.loadTemplate(paths, 0, [], (markdowns: any) =>
      this.setState({ markdowns }),
    );
  };

  loadTemplate = (
    paths: Array<any>,
    index: number,
    markdowns: Array<any>,
    callback: (markdowns: any) => void,
  ) => {
    ajax({
      url: `${this.prefix}${paths[index]}.html`,
      type: 'text',
      success: markdown => {
        markdowns.push(markdown);

        if (index < paths.length - 1) {
          this.loadTemplate(paths, ++index, markdowns, callback);
        } else {
          callback && callback(markdowns);
        }
      },
    });
  };

  render = () => {
    const { markdowns } = this.state;

    return (
      <div className="RenderHtml">
        {markdowns.map((item, i) => (
          <ReactMarkdown
            source={item}
            escapeHtml={false}
            key={`mark-item-${i}`}
          />
        ))}
      </div>
    );
  };
}
