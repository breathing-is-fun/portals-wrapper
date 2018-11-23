import React from 'react';
import { render, mount, shallow } from 'enzyme';
import Navigation from '..';

describe('Navigation', () => {
	it('render correctly', () => {
		const wrapper = mount(
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
				'id': 'testKey'
			}
		];

		const demo = (
			<Navigation
				menu={ menu }
				menuItemOnClick={ menuItemOnClick }
			>test</Navigation>
		);
		const wrapper = mount(demo);

		wrapper.find('.ant-dropdown-trigger').simulate('click');
		expect(wrapper.find('.ant-dropdown-menu-item').exists());
		wrapper.find('[role="menuitem"]').simulate('click');
		expect(menuItemOnClick.mock.calls.length).toBe(1);
	});
});