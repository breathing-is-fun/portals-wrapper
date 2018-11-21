/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-11-21 17:44:32
 * @Last Modified by: zy9
 * @Last Modified time: 2018-11-21 17:59:39
 */
import React from 'react';
import { render, mount, shallow } from 'enzyme';
import GlobalModal from '..';

describe('GlobalModal', () => {
	let tool = {};
	const demo = <GlobalModal on={ tool } />;
	const wrapper = mount(demo);

	it('when visible is true, Modal should work', () => {
		tool.modal = {
			visible: true,
		};

		expect(wrapper).toMatchSnapshot();
	});

	it('when content exists, dangerouslySetInnerHTML should work', () => {
		tool.modal = {
			visible: true,
			content: '<div>test</div>',
		};

		expect(wrapper).toMatchSnapshot();

		tool.modal = {
			content: <div>test</div>,
		};

		expect(wrapper).toMatchSnapshot();
	});
});