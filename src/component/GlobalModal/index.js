/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-11-06 12:31:43
 * @Last Modified by: zy9
 * @Last Modified time: 2018-11-08 19:22:40
 */
import React, { Component } from 'react';
import { Modal } from 'antd';

export default class GlobalModal extends Component {
	constructor (props) {
		super(props);

		this.state = {
			title: '',
			visible: false,
			content: null,
			style: {},
		};

		// 全局弹框
		if(!window.SCTool) {
			window.SCTool = {};
		}

		Object.defineProperty(window.SCTool, 'modal', {
			enumerable: true,
			configurable: true,
			set: value => {
				const { title, visible, content, style, footer } = value;

				this.setState({ title, visible, content, style, footer });

				return value;
			}
		});
	}

    componentDidMount = () => {

    }

    render = () => {
    	const { visible, title, content, style } = this.state;

    	const modalProps = {
    		title, visible, style, content,
    		onCancel: () => this.setState({ visible: !visible }),
    		footer: null,
    	};

    	return (
    		<div className='GlobalModal'>
    			<Modal { ...modalProps }>
    				{ typeof content == 'string' ? <div dangerouslySetInnerHTML={{ __html: content }} /> : content }
    			</Modal>
    		</div>
    	);
    }
}