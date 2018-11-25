import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Modal } from 'antd';

export default class GlobalModal extends Component {
	constructor (props) {
		super(props);

		const { on } = props;

		this.state = {
			title: '',
			visible: false,
			content: null,
			style: {},
		};

		Object.defineProperty(on, 'modal', {
			enumerable: true,
			configurable: true,
			set: value => {
				let { title, visible = false, content, style, footer } = value;

				if(!visible) {
					content = null;
				}

				this.setState({ title, visible, content, style, footer });

				return value;
			}
		});
	}

	static defaultProps = {
		on: {},
	}

    render = () => {
    	const { visible, title, content, style } = this.state;
    	let renderHtml = content;

    	if(typeof content == 'string') {
    		renderHtml = (
    			<div dangerouslySetInnerHTML={{ __html: content }} />
    		);
    	}

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
    				{ renderHtml }
    			</Modal>
    		</div>
    	);
    }
}

GlobalModal.propTypes = {
	on: PropTypes.object,
};