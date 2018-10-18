/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-09-29 10:26:03
 * @Last Modified by: zy9
 * @Last Modified time: 2018-10-18 16:46:00
 */
import React, { Component } from 'react';

// import Grid from './Grid';
import Grid from '../../component/Gird';
import DraggableMenu from '../../component/DraggableMenu';
import Navigation from '../../component/Navigation';
import Ruler from '../../component/Ruler';

import { Layout } from 'antd';
const { Sider } = Layout;

export default class ComponentEdit extends Component {
	render = () => {
		return (
			// <Navigation type='componentEdit'>
			<Layout style={{ minHeight: '100vh' }}>
				<Sider theme='light' width='256'>
					<DraggableMenu />
				</Sider>

				<Layout style={{ position: 'relative' }}>
					<Ruler>
						<Grid isEdit={ true } />
					</Ruler>
				</Layout>
			</Layout>
			// </Navigation>
		);
	}
}