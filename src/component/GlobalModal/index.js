/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-11-06 12:31:43
 * @Last Modified by: zy9
 * @Last Modified time: 2018-11-06 13:40:34
 */
import React, { Component } from 'react';
import { Modal } from 'antd';

export default class GlobalModal extends Component {
	constructor (props) {
		super(props);

		this.state = {
			title: '',
			visible: false,
			renderType: '',
		};

		// 全局弹框
		window.SCTool = {};

		Object.defineProperty(window.SCTool, 'modal', {
			enumerable: true,
			configurable: true,
			set: value => {
				const { title, visible, content } = value;
				let renderType = 'html';

				if(typeof content == 'object') {
					renderType = 'object';
				}

				this.setState({ title, visible, content, renderType });

				return value;
			}
		});
	}

    componentDidMount = () => {
    	// window.SCTool.modal = {
    	// 	title: <div>test</div>,
    	// 	visible: true,
    	// 	content: <div>content</div>,
    	// };
    }

    render = () => {
    	const { visible, title, content, renderType } = this.state;

    	return (
    		<div className='GlobalModal'>
    			<Modal title={ title } visible={ visible }>
    				{ renderType == 'html' ? <div dangerouslySetInnerHTML={{ __html: content }} /> : content }
    			</Modal>
    		</div>
    	);
    }
}