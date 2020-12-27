const { ipcMain } = require('electron');
const net = require('net');

const clientList = [];
let server = null;

ipcMain.on('connect', async (event, { ip, port }) => {
  net.Socket.connect({ port, host: ip });
});

ipcMain.on('new.server', async (event, { port }) => {
  server = new net.Server();
  server.listen(port);
  server.on('connection', (client) => {
    const tmp = client;
    tmp.id = clientList.length;
    clientList.push(tmp);
    event.reply('connection', { code: 0, value: { id: tmp.id } });
    client.on('close', () => {
      clientList.splice(tmp.id, 1);
      event.reply('close', { code: 0, value: { id: tmp.id } });
    });
    client.on('data', () => {});
  });
  event.reply('server.created', { code: 0, value: true });
});

ipcMain.on('checkserverstatus', (event) => {
  event.reply('serverstatus', { code: 0, value: !!server });
});
