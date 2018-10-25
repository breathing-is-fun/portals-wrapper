/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-10-24 17:14:50
 * @Last Modified by: zy9
 * @Last Modified time: 2018-10-25 16:12:57
 */
import React from 'react';
import { render, mount, shallow } from 'enzyme';
import Grid from '..';

describe('Grid', () => {
	it('render correctly', () => {
		const wrapper = shallow(<Grid layout={ [] }>test</Grid>);

		expect(wrapper).toMatchSnapshot();
	});
});