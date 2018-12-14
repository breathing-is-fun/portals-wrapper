import React, { Component } from 'react';
import { render, mount, shallow } from 'enzyme';

import Grid from '../../../component/Grid';
import Navigation from '../../../component/Navigation';
import Loader from '../../../component/Grid/ModulesLoader';

describe('Display', () => {
  const layout = [
    {
      detailpath: 'http://www.baidu.com/',
      h: 12,
      i: 'demo1',
      id: 117,
      imgurl: 'http://47.95.1.229:9003/UploadFile/201808/szy.png',
      maxw: 0,
      mealid: 89,
      minw: 0,
      path: '../../../../thirdModules/demo1/index.js',
      showdetail: true,
      still: false,
      style: {},
      title: 'demo1',
      w: 12,
      x: 0,
      y: 0,
    },
    {
      detailpath: 'http://www.baidu.com/',
      h: 9,
      i: 'demo2',
      id: 118,
      imgurl: 'http://47.95.1.229:9003/UploadFile/201808/dzx.png',
      maxw: 0,
      mealid: 89,
      minw: 0,
      path: '../../../../thirdModules/demo2/index.js',
      showdetail: true,
      still: false,
      style: {},
      title: 'demo2',
      w: 3,
      x: 0,
      y: 12,
    },
  ];

  it('render correctly', () => {
    class Demo extends Component {
      render = () => (
        <Navigation
          datas={[
            {
              department: '4,5,1',
              group: '',
              id: 89,
              imgurl: 'http://47.95.1.229:9007/UploadFile/ddzx.jpg',
              isdelete: false,
              isedit: false,
              title: 'test',
              url: '',
            },
          ]}
          title="test"
        >
          <Grid
            showEdit={false}
            showDelete={false}
            ref={ref => (this.grid = ref)}
            layout={layout}
          />
        </Navigation>
      );
    }

    expect(mount(<Demo />)).toMatchSnapshot();
  });
});
