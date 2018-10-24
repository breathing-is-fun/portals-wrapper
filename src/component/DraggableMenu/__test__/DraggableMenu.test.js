/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-10-24 20:40:30
 * @Last Modified by: zy9
 * @Last Modified time: 2018-10-24 20:54:12
 */
import React from 'react';
import { render, mount, shallow } from 'enzyme';
import DraggableMenu from '..';

describe('DraggableMenu', () => {
	it('render correctly', () => {
		const wrapper = mount(<DraggableMenu />);

		expect(wrapper).toMatchSnapshot();
	});
});