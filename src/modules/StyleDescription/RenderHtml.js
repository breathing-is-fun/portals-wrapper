/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-11-07 15:32:22
 * @Last Modified by: zy9
 * @Last Modified time: 2018-11-07 16:48:06
 */
import React, { Component } from 'react';

import ReactMarkdown from 'react-markdown/with-html';

import { ajax } from '../../urlHelper';

import '../../assets/global.css';
import './css/RenderHtml.css';

export default class RenderHtml extends Component {
	constructor (props) {
		super(props);

		this.state = {
			markdown: ''
		};

		this.prefix = '../../guide/';
	}

	componentDidMount = () => {
		const { path } = this.props;

		this.loadTemplate(path);
	}

	componentWillReceiveProps = nextProps => {
		const { path } = nextProps;

		this.loadTemplate(path);
	}

	loadTemplate = path => {
		ajax({
			url: `${ this.prefix }${ path }.html`,
			type: 'text',
			success: markdown => this.setState({ markdown }),
		});
	}

	render = () => {
		const { markdown } = this.state;

		return (
			<div className='RenderHtml'>
				<ReactMarkdown source={ markdown } escapeHtml={ false } />
			</div>
		);
	}
}