/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-10-15 17:20:47
 * @Last Modified by: zy9
 * @Last Modified time: 2018-10-16 10:31:24
 */
import React, { Component } from 'react';

// import DepartMentMenu from './DepartMentMenu';
import DraggableMenu from '../../component/DraggableMenu';
import Navigation from '../../component/Navigation';
import ModuleLayout from './ModuleLayout';

import { Layout } from 'antd';
const { Sider } = Layout;

export default class ModuleEdit extends Component {
	handleMenuClick = (item, key, keyPath) => {

	}

    render = () => {
    	return (
    		<Navigation>
    			<Layout style={{ minHeight: '100vh' }}>
    				<Sider theme='light' width='256'>
    					<DraggableMenu type='module' onClick={ this.handleMenuClick } />
    				</Sider>

    				<Layout>
    					<ModuleLayout />
    				</Layout>
    			</Layout>
    		</Navigation>
    	);
    }
}