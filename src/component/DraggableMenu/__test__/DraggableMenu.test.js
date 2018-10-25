/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-10-24 20:40:30
 * @Last Modified by: zy9
 * @Last Modified time: 2018-10-25 16:00:44
 */
import React from 'react';
import { render, mount, shallow } from 'enzyme';
import DraggableMenu from '..';

describe('DraggableMenu', () => {
	const props = {
		selectedKeys: ['all'],
		menuDatas: [{
			groupName: '全部',
			group: 'all',
			children: [
				{
					group: 'all',
					groupName: '全部',
					key: 'all',
					order: 0,
					text: '全部',
				}
			]
		}],
		openKeys: ['all'],
		onOpenChange: jest.fn(),
		onClick: jest.fn(),
	};

	it('module edit render correctly', () => {
		const wrapper = shallow(<DraggableMenu { ...Object.assign({}, props, { type: 'module' }) } />);

		expect(wrapper).toMatchSnapshot();
	});

	it('component edit render correctly', () => {
		const shellStyleDatas = [
			{
				'style': {
					'border': '1px solid blue'
				},
				'thumbnailColor': 'blue',
				'text': '蓝色'
			},
		];

		const wrapper = shallow(<DraggableMenu { ...Object.assign({}, props, { shellStyleDatas }) } />);

		expect(wrapper).toMatchSnapshot();
	});

	it('when clicked, click event should be called', () => {
		const wrapper = mount(<DraggableMenu { ...Object.assign({}, props, { type: 'module' }) } />);

		wrapper.find('.ant-menu-submenu-title').at(0).simulate('click');
		expect(props.onOpenChange.mock.calls.length).toBe(1);

		wrapper.find('.ant-menu-item').at(0).simulate('click');
		expect(props.onClick.mock.calls.length).toBe(1);
	});
});