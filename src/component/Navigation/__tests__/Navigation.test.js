/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-09-21 09:03:47
 * @Last Modified by: zy9
 * @Last Modified time: 2018-10-24 16:38:43
 */
import React from 'react';
import { render, mount, shallow } from 'enzyme';
import Navigation from '..';

describe('Navigation', () => {
	it('render correctly', () => {
		const wrapper = shallow(
			<Navigation menu={ [] }>test</Navigation>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('when Menu.item is clicked, menuItemOnClick should be called', () => {
		const menuItemOnClick = jest.fn();
		const menu = [
			{
				'text': 'testText',
				'url': 'testUrl',
				'key': 'testKey'
			}
		];

		const wrapper = mount(<Navigation menu={ menu } menuItemOnClick={ menuItemOnClick }>test</Navigation>);

		wrapper.find('.ant-dropdown-trigger').simulate('click');
		expect(wrapper.find('.ant-dropdown-menu-item').exists());
		wrapper.find('[role="menuitem"]').simulate('click');
		expect(menuItemOnClick.mock.calls.length).toBe(1);
	});
});