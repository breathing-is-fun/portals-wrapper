import React from 'react';
import { render, mount, shallow } from 'enzyme';
import Navigation from '..';

describe('Navigation', () => {
  it('render correctly', () => {
    const wrapper = mount(<Navigation datas={[]}>test</Navigation>);

    expect(wrapper).toMatchSnapshot();
  });

  it('when Menu.item is clicked, menuItemOnClick should be called', () => {
    const onClick = jest.fn();
    const datas = [
      {
        text: 'testText',
        url: 'testUrl',
        id: 'testKey',
      },
    ];

    const demo = (
      <Navigation datas={datas} onClick={onClick}>
        test
      </Navigation>
    );
    const wrapper = mount(demo);

    wrapper.find('.ant-dropdown-trigger').simulate('click');
    expect(wrapper.find('.ant-dropdown-menu-item').exists());
    wrapper.find('[role="menuitem"]').simulate('click');
    expect(onClick.mock.calls.length).toBe(1);
  });
});
