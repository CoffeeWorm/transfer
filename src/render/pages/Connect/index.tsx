import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Input, Form, Button, Radio, InputNumber, Spin } from 'antd';
import { FormInstance } from 'antd/es/form/Form';
import { ipcRenderer } from 'electron';
import { serverIpc } from '../../utils/ipc';
import ip from 'ip';
import './style.less';

const { Group: RadioGroup } = Radio;
const { Item: FormItem } = Form;

class Index extends Component<RouteComponentProps> {
  state = { loading: false, submitText: 'Create' };

  form: FormInstance<any> | null = null;
  ip: string = ip.address();

  componentDidMount() {
    ipcRenderer.on('connecting', this.handleConnecting);
    ipcRenderer.on('connected', this.handleConnecting);
    ipcRenderer.once('server.created', this.handleServerCreated);
    const res = serverIpc('checkserverstatus', {}, true);
    res.value && this.handleServerCreated();
  }

  componentWillUnmount() {
    ipcRenderer.off('connecting', this.handleConnecting);
    ipcRenderer.off('connected', this.handleConnecting);
  }

  hanleSubmit = async () => {
    const value = await this.form?.validateFields();
    this.setState({ loading: true });
    const event = !value?.type ? 'connect' : 'new.server';
    serverIpc(event, { ...value });
  };

  handleConnecting = () => {
    this.setState({ loading: true });
  };

  handleConnected = () => {
    const { history } = this.props;
    history.replace('');
  };

  handleServerCreated = () => {
    this.setState({ loading: false });
    this.props.history.replace('/waiting');
  };

  handleFormValuesChange = (_: any, value: { [feild: string]: any }) => {
    if (value.type) {
      this.setState({ submitText: 'Create' });
      this.form?.setFieldsValue({ ip: this.ip });
    } else {
      this.setState({ submitText: 'Connect' });
    }
  };

  render() {
    const { loading, submitText } = this.state;
    return (
      <Spin spinning={loading}>
        <Form
          className="p-connect-form"
          layout="vertical"
          onValuesChange={this.handleFormValuesChange}
          ref={(node: FormInstance<any> | null): void => {
            this.form = node;
          }}
        >
          <h1 className="title">Transfer</h1>
          <FormItem
            name="type"
            initialValue={true}
            style={{ textAlign: 'center' }}
          >
            <RadioGroup>
              <Radio.Button value={true}>Server</Radio.Button>
              <Radio.Button value={false}>Client</Radio.Button>
            </RadioGroup>
          </FormItem>
          <FormItem shouldUpdate noStyle>
            {({ getFieldValue }) => {
              const type = getFieldValue('type');
              return (
                <FormItem
                  label={type ? 'My Local Ip' : 'IP'}
                  name="ip"
                  initialValue={this.ip}
                  rules={[
                    { required: true, message: '请输入IP地址' },
                    {
                      validator(rule: any, value: any) {
                        return value &&
                          value
                            .split('.')
                            .every((i: string) => +i < 256 && +i > -1)
                          ? Promise.resolve()
                          : Promise.reject('请输入正确IP地址');
                      },
                    },
                  ]}
                >
                  <Input disabled={type} />
                </FormItem>
              );
            }}
          </FormItem>
          <FormItem
            label="PORT"
            name="port"
            initialValue="3000"
            rules={[
              { required: true, message: '请输入端口' },
              {
                validator(rule: any, value: any) {
                  if (+value > 65535 || +value < 0) {
                    return Promise.reject('请输入正确的端口');
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <InputNumber style={{ width: '100%' }} />
          </FormItem>
          <FormItem>
            <Button
              disabled={loading}
              loading={loading}
              onClick={this.hanleSubmit}
              type="primary"
              className="submit-btn"
            >
              {submitText}
            </Button>
          </FormItem>
        </Form>
      </Spin>
    );
  }
}

export default withRouter(Index);
