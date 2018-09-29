/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-09-29 10:26:03
 * @Last Modified by: zy9
 * @Last Modified time: 2018-09-29 15:03:28
 */
import React, { Component } from 'react';

import Grid from './Grid';
import DraggableMenu from './DraggableMenu';

import { Layout } from 'antd';
const { Content, Footer, Sider } = Layout;

export default class Wrapper extends Component {
    render = () => {
    	return (
    		<div className='Wrapper'>
    			<Layout style={{ minHeight: '100vh' }}>
    				<Sider>
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