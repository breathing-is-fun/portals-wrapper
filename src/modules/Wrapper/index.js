/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-09-29 10:26:03
 * @Last Modified by: zy9
 * @Last Modified time: 2018-10-08 10:33:15
 */
import React, { Component } from 'react';

import Grid from './Grid';
import DraggableMenu from '../../component/DraggableMenu';

import { Layout } from 'antd';
const { Sider } = Layout;

export default class Wrapper extends Component {
    render = () => {
    	return (
    		<div className='Wrapper'>
    			<Layout style={{ minHeight: '100vh' }}>
    				<Sider theme='light' width='256'>
    					<DraggableMenu />
    				</Sider>

    				<Layout>
    					<Grid />
    				</Layout>
    			</Layout>
    		</div>
    	);
    }
}