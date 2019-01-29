import React from 'react';
import { render, mount, shallow } from 'enzyme';
import Grid from '..';

describe('Grid', () => {
  const layoutItem = {
    h: 6,
    i: 'dbzx',
    id: 1,
    imgurl: 'http://47.95.1.229:9003/UploadFile/201808/dbzx.png',
    mealid: 1,
    path: '../../../thirdModules/dbzx/index.js',
    showtitle: false,
    style: { background: '#F96', border: '1px solid #ccc' },
    title: '代办中心',
    w: 4,
    x: 0,
    y: 0,
  };

  it('render correctly', () => {
    const wrapper = mount(<Grid layout={[layoutItem]} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('showEdit, isResizable and isDraggable should work', () => {
    const wrapper = mount(<Grid layout={[layoutItem]} />);

    wrapper.setProps({ isResizable: true });
    expect(wrapper.find('.react-resizable-handle').length).toBe(1);

    wrapper.setProps({ isResizable: false, showEdit: true });
    expect(wrapper.find('.react-resizable-handle').length).toBe(1);
  });
});
