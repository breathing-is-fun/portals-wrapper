import React, { Component } from 'react';
import { Upload, Form, Button, Icon, Input } from 'antd';
import Navigation from '../../component/Navigation';

export interface UploadComponentProps {
  form: any;
}
export interface UploadComponentState {
  size: string | number;
}

class UploadComponent extends Component<
  UploadComponentProps,
  UploadComponentState
> {
  constructor(props: any) {
    super(props);

    this.state = {
      size: '',
    };
  }

  componentDidMount = () => {
    if ((window as any).SCTool) {
      SCTool.RegisterResizeDispatcher = {
        key: 'UploadComponent',
        onResize: (item: any) => {
          this.setState({ size: item.size });
        },
      };
    }
  };

  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((error: any, values: any) => {
      if (!error) {
        // eslint-disable-next-line
        console.log(values);
      }
    });
  };

  getUploadParam = (file: any) => {
    let param = new FormData();

    param.append('Filedata', file);
    param.append('Filename', file.name);
    param.append(
      'fileext',
      '*.' + file.name.split('.')[file.name.split('.').length - 1],
    );
    param.append('DataType', 'UploadFile');
    param.append('UploadFolder', '/Attachement/');
    param.append('IsConvertOffice', '');
    param.append('GetFileName', 'y');
    param.append('TCID', '');
    param.append('UploadTargetKey', 'n');
    param.append('GetFileInfo', 'y');

    return param;
  };

  normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  render = () => {
    const { getFieldDecorator } = this.props.form;
    const { size } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: { span: 14, offset: 0 },
    };
    return (
      <div className="UploadComponent">
        <Navigation
          title={SCTool.listener.get('systemTitle')}
          clock
          size={size}
        >
          <Form onSubmit={this.handleSubmit} style={{ marginTop: '1%' }}>
            <Form.Item {...formItemLayout} label="入口文件名称">
              {getFieldDecorator('entry')(<Input />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="文件夹名称">
              {getFieldDecorator('folderName')(<Input />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="组件上传">
              <div className="dropbox">
                {getFieldDecorator('upload', {
                  valuePropName: 'fileList',
                  getValueFromEvent: this.normFile,
                })(
                  <Upload.Dragger
                    name="files"
                    action="SysManage/AjaxHandler/UploadHandler.ashx"
                    className="upload-list-inline"
                    data={this.getUploadParam}
                  >
                    <p className="ant-upload-drag-icon">
                      <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">
                      点击或拖动文件到此区域进行上传
                    </p>
                  </Upload.Dragger>,
                )}
              </div>
            </Form.Item>
            <Form.Item
              wrapperCol={{ offset: 2 }}
              style={{ textAlign: 'center' }}
            >
              <Button type="primary" htmlType="submit" style={{ width: '10%' }}>
                提交
              </Button>
            </Form.Item>
          </Form>
        </Navigation>
      </div>
    );
  };
}

export default Form.create()(UploadComponent);
