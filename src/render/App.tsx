import 'antd/dist/antd.less';
import { ipcRenderer } from 'electron';
import React from 'react';
import { message } from 'antd';
import AppRoute from './Route';
import reactDom from 'react-dom';

const App = () => {
  return <AppRoute />;
};

ipcRenderer.on('connection', (event, {}) => {
  message.info('新链接,是否连接?');
});

reactDom.render(<App />, document.querySelector('#app'));
