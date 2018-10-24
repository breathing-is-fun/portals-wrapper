/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-10-24 17:14:50
 * @Last Modified by: zy9
 * @Last Modified time: 2018-10-24 17:16:16
 */
import React from 'react';
import { render, mount, shallow } from 'enzyme';
import Ruler from '..';

describe('Navigation', () => {
	it('render correctly', () => {
		expect(<Ruler>test</Ruler>).toMatchSnapshot();
	});
});