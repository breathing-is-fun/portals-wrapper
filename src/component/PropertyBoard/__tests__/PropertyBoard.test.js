/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-11-21 18:20:03
 * @Last Modified by: zy9
 * @Last Modified time: 2018-11-21 20:00:18
 */
import React from 'react';
import { render, mount, shallow } from 'enzyme';
import PropertyBoard from '..';

describe('PropertyBoard', () => {
	it('render correctly', () => {
		const demo = (
			<PropertyBoard
				visible={ true }
				shellStyleDatas={ [] }
				enumDatas={ [] }
			/>
		);

		expect(mount(demo)).toMatchSnapshot();
	});
});