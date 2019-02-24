import React, { Component } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
const ResponsiveGridLayout = WidthProvider(Responsive);
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import Shell from '../../component/Shell';
import Loader from './ModulesLoader';
import './css/Grid.css';

export interface GridProps {
  layout: Array<any>;
  enumDatas: Array<string>;
  showEdit?: boolean;
  showDelete?: boolean;
  onAdd?: (dataGrid: any) => void;
  onDelete?: (dataGrid: any) => void;
  onDetail?: (dataGrid: any) => void;
  onEdit?: (dataGrid: any) => void;
  onLayoutChange?: (newLayout: Array<any>) => void;
  size?: string | number;
  isResizable?: boolean;
  isDraggable?: boolean;
}
export interface GridState {
  isDrawerOpen: boolean;
  propertyBoardDataSource: any;
  PropertyBoard: any;
  rowHeight: number;
}

export default class Grid extends Component<GridProps, GridState> {
  private roots: any;
  static defaultProps = {
    layout: [],
    enumDatas: [],
  };

  constructor(props: GridProps) {
    super(props);
    this.state = {
      isDrawerOpen: false,
      propertyBoardDataSource: {},
      PropertyBoard: null,
      rowHeight: 30,
    };
    this.roots = {};
  }

  mountRoots = () => {
    const { layout } = this.props;

    const loader = new Loader(layout, this.roots);

    loader.load(SCTool);
  };

  handleLayoutChange = (layout: Array<any>) => {
    const { onLayoutChange, layout: propsLayout } = this.props;

    let newLayout = [];

    for (let i = 0; i < layout.length; i++) {
      const item = layout[i];
      const jtem = propsLayout[i];

      newLayout.push(Object.assign({}, jtem, item));
    }

    onLayoutChange && onLayoutChange(newLayout);
  };

  handleDragDrop = (e: any) => {
    let { layout, onLayoutChange } = this.props;
    const item = JSON.parse(e.dataTransfer.getData('menuItemToGrid'));
    const { key, imgurl: imgUrl, text, style, url } = item;
    const defaultProps = {
      i: '' + key + layout.length,
      x: (layout.length * 2) % 12,
      w: 2,
      h: 9,
      y: 0,
      url,
      path: url,
      imgUrl,
      title: text,
      style,
    };

    layout.push(Object.assign({}, item, defaultProps));

    onLayoutChange && onLayoutChange(layout);
  };

  createShellChild = (showEdit: boolean, item: any) => {
    const { i, moduletype: type, imgurl, imgUrl, path } = item;
    const height = 'calc(100% - 33px)';

    if (showEdit) {
      return <img src={imgurl || imgUrl} style={{ width: '100%', height }} />;
    }

    if (type == 'iframe') {
      return <iframe src={path} style={{ height }} />;
    }

    return (
      <div
        className="render-div"
        style={{ height }}
        ref={ref => ref && (this.roots[i] = ref)}
        id={i}
      />
    );
  };

  handleShellonEdit = (item: any) => {
    import('../PropertyBoard').then(PropertyBoard => {
      this.setState({
        isDrawerOpen: true,
        propertyBoardDataSource: item,
        PropertyBoard: PropertyBoard.default || PropertyBoard,
      });
    });
  };

  handleShellStyleOnChange = (currentShellStyle: any) => {
    const { onLayoutChange, layout } = this.props;
    let newLayout = [];

    for (let item of layout) {
      const { i: key, style = {} } = item;
      const { id } = currentShellStyle;
      let obj = item;

      if (key == id) {
        obj.style = Object.assign(style, currentShellStyle);
        delete obj.style.id;
      }

      newLayout.push(obj);
    }

    onLayoutChange && onLayoutChange(newLayout);
  };

  handleBreakpointChange = (breakpoints: string | number, cols: number) => {
    this.setState({ rowHeight: cols * 2.5 });
  };

  render = () => {
    const {
      isDrawerOpen,
      propertyBoardDataSource,
      PropertyBoard,
      rowHeight,
    } = this.state;
    const {
      showEdit,
      showDelete,
      layout,
      onDelete,
      onDetail,
      enumDatas,
      size,
      onAdd,
      isDraggable,
      isResizable,
    } = this.props;

    const layoutProps = {
      className: 'layout',
      cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
      breakpoints: { lg: 1270, md: 996, sm: 768, xs: 480, xxs: 0 },
      rowHeight,
      width: document.body.clientWidth - (showEdit ? 256 : 0),
      margin: [20, 25],
      onLayoutChange: this.handleLayoutChange,
      isDraggable: showEdit || isDraggable,
      isResizable: showEdit || isResizable,
      // compactType: 'horizontal',
      style: {
        background: '#f5f6fa',
        height: layout.length != 0 ? '100%' : 500,
      },
      onBreakpointChange: this.handleBreakpointChange,
    };

    const propertyBoardProps = {
      visible: isDrawerOpen,
      onClose: (isDrawerOpen: boolean) => {
        this.setState({ isDrawerOpen }, () => {
          // 关闭抽屉时销毁外壳中的元素，好在再次点击时执行componentDidMount中的方法
          setTimeout(() => {
            this.setState({ PropertyBoard: null });
          }, 300);
        });
      },
      shellStyleDatas: propertyBoardDataSource,
      enumDatas,
      onChange: this.handleShellStyleOnChange,
    };

    return (
      <div
        className="Grid"
        onDrop={this.handleDragDrop}
        onDragOver={e => e.preventDefault()}
      >
        <ResponsiveGridLayout {...layoutProps}>
          {layout.map(item => {
            let {
              i: key,
              title,
              style = {},
              showtitle: showTitle,
              showdetail: showDetail,
              detailpath: detailPath,
            } = item;

            if (typeof style == 'string') {
              style = JSON.parse(style);
            }

            const shellProps = {
              key,
              title,
              showEdit,
              showDelete,
              onDelete,
              showTitle,
              onDetail,
              detailPath,
              showDetail,
              style,
              size,
              onAdd,
              'data-grid': item,
              onEdit: (dataGrid: any) => {
                this.handleShellonEdit(dataGrid);
              },
            };

            return (
              <Shell {...shellProps}>
                {this.createShellChild(!!showEdit, item)}
              </Shell>
            );
          })}
        </ResponsiveGridLayout>

        {PropertyBoard && <PropertyBoard {...propertyBoardProps} />}
      </div>
    );
  };
}
