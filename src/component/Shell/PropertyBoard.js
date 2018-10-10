/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-10-10 10:12:51
 * @Last Modified by: zy9
 * @Last Modified time: 2018-10-10 16:15:23
 */
import React, { Component } from 'react';

import { Drawer, Icon, Form, Input } from 'antd';
const FormItem = Form.Item;

class PropertyBoard extends Component {
	constructor (props) {
		super(props);

		this.state = {

		};
	}

    componentDidMount = () => {

    }

	handleSubmit = e => {
		e.preventDefault();

		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
			  	console.log('Received values of form: ', values);
			}
		});
	}

    render = () => {
    	const { visible, onClose, dataSource, form } = this.props;
    	const { style, title } = dataSource;
    	const { getFieldDecorator  } = form;

    	const drawerTitle = (
    		<div>
    			<Icon type='form' theme='outlined' />
    			<span style={{ paddingLeft: 10 }}>{ `${ title } 外壳属性修改` }</span>
    		</div>
    	);

    	const drawerProps = {
    		visible,
    		className: 'PropertyBoard',
    		onClose: () => onClose && onClose(!visible),
    		title: drawerTitle,
    		width: '20%',
    	};

    	const formItemLayoutProps = {
    		labelCol: {
    			xs: { span: 24 },
    			sm: { span: 4 },
    		},
    		wrapperCol: {
    			xs: { span: 24 },
    			sm: { span: 18 },
    		},
    	};

    	return (
    		<div className='PropertyBoard'>
    			<Drawer { ...drawerProps }>
    				<Form onSubmit={ this.handleSubmit }>
    					<FormItem { ...formItemLayoutProps } label='标题'>
    						{
    							getFieldDecorator('email', {
    								rules: [{
    									type: 'email', message: 'The input is not valid E-mail!',
    								}, {
    									required: true, message: 'Please input your E-mail!',
    								}],
    							})(<Input />)
    						}
    					</FormItem>
    				</Form>
    			</Drawer>
    		</div>
    	);
    }
}

export default Form.create()(PropertyBoard);