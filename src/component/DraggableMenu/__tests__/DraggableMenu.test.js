import React from 'react';
import { render, mount, shallow } from 'enzyme';
import DraggableMenu from '..';

describe('DraggableMenu', () => {
  const props = {
    selectedKeys: ['all'],
    menuDatas: [
      {
        groupName: '全部',
        group: 'all',
        children: [
          {
            group: 'all',
            groupName: '全部',
            key: 'all',
            order: 0,
            text: '全部',
          },
        ],
      },
    ],
    openKeys: ['all'],
    onOpenChange: jest.fn(),
    onClick: jest.fn(),
  };

  it('module edit render correctly', () => {
    const demoProps = Object.assign({}, props, { type: 'module' });
    const demo = <DraggableMenu {...demoProps} />;
    const wrapper = shallow(demo);

    expect(wrapper).toMatchSnapshot();
  });

  it('component edit render correctly', () => {
    const shellStyleDatas = [
      {
        style: {
          border: '1px solid blue',
        },
        thumbnailColor: 'blue',
        text: '蓝色',
      },
    ];
    const demoProps = Object.assign({}, props, { shellStyleDatas });
    const demo = <DraggableMenu {...demoProps} />;

    const wrapper = shallow(demo);

    expect(wrapper).toMatchSnapshot();
  });

  it('when clicked, click event should be called', () => {
    const demoProps = Object.assign({}, props, { type: 'module' });
    const demo = <DraggableMenu {...demoProps} />;
    const wrapper = mount(demo);

    wrapper
      .find('.ant-menu-submenu-title')
      .at(0)
      .simulate('click');
    expect(props.onOpenChange.mock.calls.length).toBe(1);

    wrapper
      .find('.ant-menu-item')
      .at(0)
      .simulate('click');
    expect(props.onClick.mock.calls.length).toBe(1);
  });
});
