/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-11-06 12:31:43
 * @Last Modified by: zy9
 * @Last Modified time: 2018-11-06 12:42:26
 */
import React, { Component } from 'react';
import { Modal } from 'antd';

export default class GlobalModal extends Component {
	constructor (props) {
		super(props);

		this.state = {
			title: '',
			visible: false,
		};

		// 全局弹框
		window.SCTool = {};

		Object.defineProperty(window.SCTool, 'modal', {
			enumerable: true,
			configurable: true,
			set: value => {
				const { title, visible, content } = value;

				this.setState({ title, visible, content });

				return value;
			}
		});
	}

    componentDidMount = () => {
    	window.SCTool.modal = {
    		title: <div>test</div>,
    		visible: true,
    		content: '<div>content</div>',
    	};
    }

    render = () => {
    	const { visible, title, content } = this.state;

    	return (
    		<div className='GlobalModal'>
    			<Modal title={ title } visible={ visible }>
    				<div dangerouslySetInnerHTML={{ __html: content }} />
    			</Modal>
    		</div>
    	);
    }
}