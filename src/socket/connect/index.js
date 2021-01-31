const net = require('net');
// const fs = require('fs');
// const path = require('path');
// const { fingerprint } = require('../../utils/fingerprint');
const connectList = [];

module.exports = (event, { ip, port }) => {
  const connect = new net.Socket();
  console.log(`[CONNECTING] ${ip} ${port}`);
  connect.connect({ port, host: ip });
  connect.on('close', (e) => {
    console.log(`[CLOSE] connect ${connect.id}`);
    console.log('close', e);
    connectList.splice(connect.id, 1);
    event.reply('connect.closed', { code: 0, value: { id: connect.id } });
  });
  connect.on('connect', (e) => {
    console.log(`[CONNECT] connect ${connect.id}`);
    console.log('connect', e);
    event.reply('connected', { code: 0, value: true });
  });
  connect.on('data', (e) => {
    console.log(`[DATA] connect ${connect.id}`);
    console.log('data', e.toString());
  });
  connect.on('drain', (e) => {
    console.log(`[DRAIN] connect ${connect.id}`);
    console.log('drain', e);
  });
  connect.on('end', (e) => {
    console.log(`[END] connect ${connect.id}`);
    console.log('end', e);
  });
  connect.on('error', (e) => {
    console.log(`[ERROR] connect ${connect.id}`);
    console.log('error', e);
  });
  connect.on('ready', (e) => {
    console.log(`[READY] connect ${connect.id}`);
    console.log('ready', e);
  });
  connect.on('timeout', (e) => {
    console.log(`[CONNECT] connect ${connect.id}`);
    console.log('timeout', e);
  });
  connect.id = connectList.length;
  connectList.push(connect);
};
