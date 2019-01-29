import React, { Component } from 'react';

export default class UploadComponentCheck extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {};

  render = () => {
    return <div className="UploadComponentCheck">{location.hash}</div>;
  };
}
