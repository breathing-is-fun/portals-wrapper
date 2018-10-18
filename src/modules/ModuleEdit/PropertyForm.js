/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-10-18 17:23:07
 * @Last Modified by: zy9
 * @Last Modified time: 2018-10-18 19:59:46
 */
import React, { Component } from 'react';

import { Form, Input } from 'antd';
const FormItem = Form.Item;

class PropertyForm extends Component {
	constructor (props) {
		super(props);

		this.state = {

		};
	}

    componentDidMount = () => {

    }

    handleOnChange = e => {
    	const { onChange, form } = this.props;

    	e.preventDefault();
    	form.validateFieldsAndScroll((err, values) => {
    		if(!err) {
    			onChange && onChange(values);
    		}
    	});
    }

    render = () => {
    	const { form } = this.props;
    	const { getFieldDecorator } = form;

    	const formItemLayout = {
    		labelCol: {
    			xs: { span: 24 },
    			sm: { span: 6 },
    		},
    		wrapperCol: {
    			xs: { span: 24 },
    			sm: { span: 16 },
    		},
    	};

    	return (
    		<div className='PropertyForm'>
    			<Form onSubmit={ this.handleSubmit }>
    				<FormItem { ...formItemLayout } label='标题'>
    					{
    						getFieldDecorator('title', {
    							rules: [{ required: true, message: '请输入标题' }],
    						})(<Input onBlur={ this.handleOnChange } />)
    					}
    				</FormItem>

    				<FormItem { ...formItemLayout } label='缩略图地址'>
    					{
    						getFieldDecorator('thumbnailImgUrl', {
    							rules: [{ required: true, message: '请输入像url的地址，比如http://www.github.com', type: 'url' }],
    						})(<Input onBlur={ this.handleOnChange } />)
    					}
    				</FormItem>
    			</Form>
    		</div>
    	);
    }
}

export default Form.create()(PropertyForm);