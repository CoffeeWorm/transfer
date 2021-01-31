import 'antd/dist/antd.less';
import { ipcRenderer } from 'electron';
import React from 'react';
import { Modal } from 'antd';
import AppRoute from './Route';
import { serverIpc } from './utils/ipc';
import reactDom from 'react-dom';

const App = () => {
  return <AppRoute />;
};

ipcRenderer.on('connection', (event, { id }) => {
  Modal.info({
    content: '有新链接, 是否连接?',
    onOk() {
      Modal.info(id);
    },
    onCancel() {
      Modal.info(id);
    },
  });
});

reactDom.render(<App />, document.querySelector('#app'));
