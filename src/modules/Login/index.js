import React, { Component } from 'react';

import './css/Login.css';

/*eslint-disable */
const datas = [
  [
    '你们体会过吉娃娃丢了的感觉吗？',
    '我家的是杂交的',
    '巨小',
    '找了一下午没找到',
    '回家爬在桌子上正要号啕大哭的时候',
    '妈的抽屉里突然传来犬吠...',
  ],
  [
    '人家才子看到美景会说',
    '落霞与孤鹜齐飞，秋水共长天一色',
    '而你只会说',
    '卧槽真鸡儿好看',
  ],
  [
    '谢邀',
    '人在美国，刚下飞机',
    '博士学位',
    '月入过亿',
    '从小学习舞蹈国画乐器',
    '家父是一名黑道大哥',
    '由于某种不幸的原因开始写起了bug',
    '---------分割线---------',
    '评论区戾气太重',
    '圈内人士太多',
    '利益相关',
    '匿了',
    '侵删',
    '以上',
  ],
  ['机场验票', '"先生，您脸上这道疤是怎么回事？"', '"当年我妈剖腹产……"'],
  [
    '从前有座山',
    '山上有座庙',
    '庙里有个老和尚和小和尚',
    '有一天小和尚对老和尚说',
    '"爸爸，外面下雪了！"',
  ],
  ['小老弟', '有些事情', '要手当其冲啊'],
];

export default class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ticket: '参数获取中...',
      showDatas: datas[~~(Math.random() * 100) % datas.length],
      index: -1,
    };
  }

  componentDidMount = () => {
    let { showDatas, index } = this.state;
    // const ticket = this.getParams('ticket');

    // window.SCTool.ticket = ticket;

    // showDatas.push(`这是你要的ticket，请查收：${ ticket }`);
    showDatas.push('如果到现在页面还没加载完，请看看是不是网突然断了');

    this.setState({ showDatas }, () => {
      setTimeout(() => {
        setInterval(() => {
          if (index < showDatas.length - 1) {
            this.setState({ index: ++index });
          }
        }, 2000);
      }, 500);
    });
  };

  getParams = name => {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)'); // 匹配目标参数
    let result =
      window.location.href.split('?').length > 1
        ? window.location.href.split('?')[1].match(reg)
        : 0; // 对querystring匹配目标参数

    if (result != null) {
      return result[2] === 'undefined' ? undefined : result[2];
    }

    return null;
  };

  render = () => {
    const { showDatas, index } = this.state;

    return (
      <div
        className="Login"
        style={{
          height:
            document.documentElement.clientHeight || document.body.clientHeight,
        }}
      >
        <ul>
          {showDatas.map((item, i) => {
            return (
              <li
                key={`content${i}`}
                style={{
                  transform: `translateY(${-(index * 70)}px)`,
                  width: '100%',
                  height: '100%',
                  transition: 'all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1)',
                }}
              >
                {item}
              </li>
            );
          })}
        </ul>
      </div>
    );
  };
}
