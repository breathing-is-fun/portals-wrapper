/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-09-21 09:03:47
 * @Last Modified by: zy9
 * @Last Modified time: 2018-10-21 12:57:35
 */
import React from 'react';
import { render, mount, shallow } from 'enzyme';
import Navigation from '..';

describe('Navigation', () => {
	it('render correctly', () => {
		const wrapper = render(
			<Navigation>test</Navigation>
		);

		expect(wrapper).toMatchSnapshot();
	});

	// it('when operate drawer is clicked, onChange should to be called', () => {
	// 	const onChange = jest.fn();
	// 	const wrapper = mount(
	// 		<Navigation visible={ true } onChange={ onChange } direction='right'>test</Navigation>
	// 	);

	// 	wrapper.find('.operate-drawer').simulate('click');

	// 	expect(onChange).toBeCalled();
	// });
});