import React, { Component } from 'react';

import { Form, Input, Button, Col, Row, TreeSelect } from 'antd';
const FormItem = Form.Item;

import { ajax } from '../../urlHelper';

import { handleMenuGroup } from '../../component/DraggableMenu/handler';

const egUrl = '请输入像url的地址，' +
'比如http://47.95.1.229:9003/UploadFile/201808/41509923_0.jpg';

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
	  ajax({
	    key: 's_slmh_menu_data',
	    data: { type: 1 },
	    success: ({ data }) => {
	      let departmentDatas = handleMenuGroup(data), newDepart = [];

	      // hack. Need to modify
	      // function selectGroup in /DraggableMenu/handler.js
	      // 修改参数名， group => value, groupName => title
	      for(let item of departmentDatas) {
	        const { group, groupName, key, children, id } = item;

	        if(group != 'all') {
	          newDepart.push({
	            title: groupName,
	            value: id,
	            children
	          });
	        }
	      }

	      this.setState({ departmentDatas: newDepart });
	    }
	  });
	}

	setDefaultValueOfInput = () => {
	  const { form, currentModalItem } = this.props;
	  const { title, imgurl } = currentModalItem;
    	const { setFields } = form;

	  // hack, need to filter the params of currentModalItem
	  setFields({
	    title: {
	      value: title,
	      error: null,
	    },
	    imgurl: {
	      value: imgurl,
	      error: null,
	    },
	  });
	}

	handleSubmit = e => {
	  const { form, currentModalItem } = this.props;
	  const { id = -1 } = currentModalItem;

	  e.preventDefault();

	  form.validateFields((err, values) => {
	    if (!err) {
	      values.id = id;

	      SCTool.listener.set('formData', values);

	      location.hash = '/edit/component';
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

    	const buttonGroup = (
    		<Row>
    			<Col span={ 22 } style={{ textAlign: 'right' }}>
    				<Button onClick={ () => resetFields() }>重置</Button>
    				<Button
    					type='primary'
    					style={{ marginLeft: 8 }}
    					disabled={ this.hasErrors(getFieldsError()) }
    					onClick={ this.handleSubmit }
    				>确定</Button>
    			</Col>
    		</Row>
    	);

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
    							rules: [{
    								required: true,
    								message: egUrl,
    								type: 'url' }],
    						})(<Input />)
    					}
    				</FormItem>

    				<FormItem { ...formItemLayout } label='人员权限'>
    					{
    						getFieldDecorator('department', {
    							rules: [{ required: true, message: '请勾上至少一个' }],
    						})(<TreeSelect { ...treeSelectProps } />)
    					}
    				</FormItem>

    				<FormItem>
    					{ buttonGroup }
    				</FormItem>
    			</Form>
    		</div>
    	);
    }
}

export default Form.create()(PropertyForm);