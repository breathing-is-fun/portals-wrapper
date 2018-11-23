import React from 'react';
import { render, mount, shallow } from 'enzyme';
import Ruler from '..';

describe('Ruler', () => {
	it('render correctly', () => {
		const wrapper = mount(<Ruler>test</Ruler>);

		expect(wrapper).toMatchSnapshot();
	});

	it('padding should work', () => {
		const wrapper = mount(<Ruler padding={ 20 }>test</Ruler>);

		expect(wrapper).toMatchSnapshot();
	});
});