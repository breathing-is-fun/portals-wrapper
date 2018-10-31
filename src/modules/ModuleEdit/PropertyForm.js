/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-10-18 17:23:07
 * @Last Modified by: zy9
 * @Last Modified time: 2018-10-31 16:39:02
 */
import React, { Component } from 'react';

import { Form, Input, Button, Col, Row, TreeSelect } from 'antd';
const FormItem = Form.Item;
const TreeNode = TreeSelect.TreeNode;

import { handleDepartGroup, recurseTreeNode, handleMenuGroup } from '../../component/DraggableMenu/handler';

class PropertyForm extends Component {
	constructor (props) {
		super(props);

		this.state = {
			departmentDatas: [],
		};
	}

    componentDidMount = () => {
    	this.setDefaultValueOfInput();

    	this.loadDepartDatas();
    }

	loadDepartDatas = () => {
		fetch('http://47.95.1.229:9003/webapi/api/v1.1/basic/data?key=slmh_menu_data&type=1')
			.then(result => result.json())
			.then(result => {
				const { data } = result;
				let departmentDatas = handleMenuGroup(data), newDepart = [];

				// hack. Need to modify function selectGroup in handler.js
				// 修改参数名， group => value, groupName => title
				for(let item of departmentDatas) {
					const { group, groupName, key, children } = item;

					if(group != 'all') {
						newDepart.push({ title: groupName, value: group, key, children });
					}
				}

				this.setState({ departmentDatas: newDepart });
			});
	}

	setDefaultValueOfInput = () => {
		const { form, currentModalItem } = this.props;
    	const { setFields } = form;

		// hack, need to filter the params of currentModalItem
		setFields({
			title: {
				value: currentModalItem['title'],
				error: null,
			},
			imgurl: {
				value: currentModalItem['imgurl'],
				error: null
			}
		});
	}

	handleSubmit = e => {
		e.preventDefault();

		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log(values);
				// location.hash = '/edit/component';

				// window['_acrossDatas'] = Object.assign({}, window['_acrossDatas'], { moduleToComponent: { data: values }, status: 'pending' });
			}
		});
	}

	hasErrors = fieldsError => {
		return Object.keys(fieldsError).some(field => fieldsError[field]);
	}

    render = () => {
    	const { departmentDatas } = this.state;
    	const { form } = this.props;
    	const { getFieldDecorator, getFieldsError, resetFields } = form;

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

    	const treeSelectProps = {
    		dropdownStyle: { overflow: 'auto' },
    		allowClear: true,
    		multiple: true,
    		treeCheckable: true,
    		treeDefaultExpandAll: true,
    		treeData: departmentDatas,
    	};

    	return (
    		<div className='PropertyForm'>
    			<Form>
    				<FormItem { ...formItemLayout } label='标题'>
    					{
    						getFieldDecorator('title', {
    							rules: [{ required: true, message: '请输入标题' }],
    						})(<Input />)
    					}
    				</FormItem>

    				<FormItem { ...formItemLayout } label='缩略图地址'>
    					{
    						getFieldDecorator('imgurl', {
    							rules: [{ required: true, message: '请输入像url的地址，比如http://www.github.com', type: 'url' }],
    						})(<Input />)
    					}
    				</FormItem>

    				<FormItem { ...formItemLayout } label='人员权限'>
    					{
    						getFieldDecorator('deaprtment', {
    							rules: [{ required: true, message: '请勾上至少一个' }],
    						})(<TreeSelect { ...treeSelectProps } />)
    					}
    				</FormItem>

    				<FormItem>
    					<Row>
    						<Col span={ 22 } style={{ textAlign: 'right' }}>
    							<Button onClick={ () => resetFields() }>重置</Button>
    							<Button type='primary' style={{ marginLeft: 8 }} disabled={ this.hasErrors(getFieldsError()) } onClick={ this.handleSubmit }>确定</Button>
    						</Col>
    					</Row>
    				</FormItem>
    			</Form>
    		</div>
    	);
    }
}

export default Form.create()(PropertyForm);