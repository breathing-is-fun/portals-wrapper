/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-11-06 12:31:43
 * @Last Modified by: zy9
 * @Last Modified time: 2018-11-21 17:09:52
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

    	const renderHtml = (
    		<div dangerouslySetInnerHTML={{ __html: content }} />
    	);

    	return (
    		<div className='GlobalModal'>
    			<Modal
    				title={ title }
    				visible={ visible }
    				style={ style }
    				content={ content }
    				onCancel={ () => this.setState({ visible: !visible }) }
    				footer={ null }
    			>
    				{ typeof content == 'string' ? renderHtml : content }
    			</Modal>
    		</div>
    	);
    }
}