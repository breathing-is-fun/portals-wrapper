import React, { Component } from 'react';
import './css/Ruler.css';

export interface RulerProps {
  padding: number | string;
}

export default class Ruler extends Component<RulerProps> {
  static defaultProps = {
    padding: 35,
  };

  handleScale = (type: string) => {
    let cm = [],
      mm = [];

    // mm
    for (let i = 0; i < 9; i++) {
      const wrapper = <div className={`mm-${type}`} key={`mm-${type}-${i}`} />;

      mm.push(wrapper);
    }

    // cm
    for (let i = 0; i < 10; i++) {
      cm.push(
        <div className={`cm-${type}`} key={`cm-${type}-${i}`}>
          {mm}
        </div>,
      );
    }

    return cm;
  };

  render = () => {
    const { children, padding } = this.props;

    return (
      <div className="Ruler">
        <div className="wrapper">{this.handleScale('horizontal')}</div>

        <div className="wrapper">{this.handleScale('vertical')}</div>

        <div style={{ padding }}>{children}</div>
      </div>
    );
  };
}
