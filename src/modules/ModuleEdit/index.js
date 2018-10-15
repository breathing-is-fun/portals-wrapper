/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-10-15 17:20:47
 * @Last Modified by: zy9
 * @Last Modified time: 2018-10-15 17:23:57
 */
import React, { Component } from 'react';

import DraggableMenu from '../../component/DraggableMenu';
import Navigation from '../../component/Navigation';

import { Layout } from 'antd';
const { Sider } = Layout;

export default class ModuleEdit extends Component {
    render = () => {
    	return (
    		<Navigation>
    			<Layout style={{ minHeight: '100vh' }}>
    				<Sider theme='light' width='256'>
    					<DraggableMenu type='module' />
    				</Sider>
    			</Layout>
    		</Navigation>
    	);
    }
}