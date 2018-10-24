/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-10-24 19:17:12
 * @Last Modified by: zy9
 * @Last Modified time: 2018-10-24 20:21:23
 */
import React from 'react';
import { render, mount, shallow } from 'enzyme';
import Shell from '..';

describe('Shell', () => {
	const props = {
		'data-grid': {
			h: 6,
			i: 'dbzx',
			imgUrl: 'http://47.95.1.229:9003/UploadFile/201808/dbzx.png',
			path: '../../../thirdModules/dbzx/index.js',
			static: false,
			style: {},
			title: 'testTitle',
			w: 4,
			x: 0,
			y: 0,
		},
		isDelete: true,
		isEdit: true,
		key: 'testKey',
		onDelete: jest.fn(),
		onEdit: jest.fn(),
		style: { zIndex: 1, background: '#F96' },
		title: 'testTitle',
	};

	it('render correctly', () => {
		const wrapper = shallow(<Shell { ...props }>test</Shell>);

		expect(wrapper).toMatchSnapshot();
	});

	it('button group render correctly', () => {
		const wrapper = shallow(<Shell { ...Object.assign({}, { isDelete: false, isEdit: false }, props) }>test</Shell>);

		expect(wrapper).toMatchSnapshot();
	});

	it('when button in group is clicked, onClick should be called', () => {
		const wrapper = mount(<Shell { ...props }>test</Shell>);

		wrapper.find('i').at(0).simulate('mousedown');
		expect(props.onDelete.mock.calls.length).toBe(1);

		wrapper.find('i').at(1).simulate('mousedown');
		expect(props.onEdit.mock.calls.length).toBe(1);
	});
});