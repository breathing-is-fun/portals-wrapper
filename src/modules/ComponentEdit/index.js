/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-09-29 10:26:03
 * @Last Modified by: zy9
 * @Last Modified time: 2018-10-22 10:05:19
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
	constructor (props) {
		super(props);

		this.state = {
			layout: [],
		};
	}

    componentDidMount = () => {
    	this.loadLayout();
    }

	loadLayout = () => {
		fetch('../../../mock/layoutDatas.json')
			.then(result => result.json())
			.then(result => {
				const { layout } = result;

				this.setState({ layout });
			});
	}

	render = () => {
		const { layout } = this.state;

		return (
			// <Navigation type='componentEdit'>
			<Layout style={{ minHeight: '100vh' }}>
				<Sider theme='light' width='256'>
					<DraggableMenu />
				</Sider>

				<Layout style={{ position: 'relative' }}>
					<Ruler>
						<Grid isEdit={ true } isDelete={ true } layout={ layout } />
					</Ruler>
				</Layout>
			</Layout>
			// </Navigation>
		);
	}
}