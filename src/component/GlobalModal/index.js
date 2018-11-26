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
				let {
					visible = false,
					content,
					...restProps
				} = value;

				if(!visible) {
					content = null;
				}

				this.setState({ visible, content, ...restProps });

				return value;
			}
		});
	}

	static defaultProps = {
		on: {},
	}

    render = () => {
    	const { visible, title, content, style, ...restProps } = this.state;
    	let renderHtml = content;

    	if(typeof content == 'string') {
    		renderHtml = (
    			<div
    				dangerouslySetInnerHTML={{ __html: content }}
    				style={{ width: '100%', height: '100%' }}
    			/>
    		);
    	}

    	return (
    		<div className='GlobalModal'>
    			<Modal
    				title={ title }
    				visible={ visible }
    				style={ style }
    				destroyOnClose
    				content={ content }
    				onCancel={ () => this.setState({ visible: !visible }) }
    				footer={ null }
    				{ ...restProps }
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