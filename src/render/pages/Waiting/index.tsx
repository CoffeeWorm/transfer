import React, { useState, useEffect } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import './style.less';

const WaitingPage = () => {
  const [etc, setEtc] = useState('');
  let timer: number;
  useEffect(() => {
    timer = window.setTimeout(() => {
      setEtc(new Array((etc.length) % 3 + 2).fill('').join('.'));
    }, 1000);
    return () => {
      timer && clearTimeout(timer);
    };
  }, [etc]);
  return (
    <div className="p-waiting-connect">
      <LoadingOutlined className="loading-icon" />
      wating for connect{etc}
    </div>
  );
};

export default WaitingPage;
