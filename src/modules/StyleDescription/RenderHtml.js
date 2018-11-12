/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-11-07 15:32:22
 * @Last Modified by: zy9
 * @Last Modified time: 2018-11-12 14:39:15
 */
import React, { Component } from 'react';

import ReactMarkdown from 'react-markdown/with-html';

import { ajax } from '../../urlHelper';

import '../../../assets/global.css';
import './css/RenderHtml.css';

export default class RenderHtml extends Component {
	constructor (props) {
		super(props);

		this.state = {
			markdowns: [],
		};

		this.prefix = '../../guide/';
	}

	componentDidMount = () => {
		const { paths } = this.props;

		this.loadTemplate(paths, 0, [], markdowns => this.setState({ markdowns }));
	}

	componentWillReceiveProps = nextProps => {
		const { paths } = nextProps;

		this.loadTemplate(paths, 0, [], markdowns => this.setState({ markdowns }));
	}

	loadTemplate = (paths, index, markdowns, callback) => {
		ajax({
			url: `${ this.prefix }${ paths[index] }.html`,
			type: 'text',
			success: markdown => {
				if(index < paths.length - 1) {
					markdowns.push(markdown);
					this.loadTemplate(paths, ++index, markdowns, callback);
				} else if(paths.length == 1) {
					callback && callback([markdown]);
				} else {
					callback && callback(markdowns);
				}
			},
		});
	}

	render = () => {
		const { markdowns } = this.state;

		return (
			<div className='RenderHtml'>
				{
					markdowns.map((item, i) => {
						return <ReactMarkdown source={ item } escapeHtml={ false } key={ `mark-item-${ i }` } />;
					})
				}
			</div>
		);
	}
}