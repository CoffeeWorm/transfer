const net = require('net');
const Chain = require('../../utils/chain');

const serverChain = new Chain();

serverChain.use('new.server', async (ctx) => {
  const server = new net.Server();
  const clientList = [];
  const { event, port } = ctx;

  server.on('connection', (client) => {
    const tmp = client;
    tmp.id = clientList.length;
    console.log(`[CONNECTION] Client id: ${tmp.id}`);
    clientList.push(tmp);
    event.reply('connection', { code: 0, value: { id: tmp.id } });
    client.setEncoding('utf-8');
    client.on('close', () => {
      clientList.splice(tmp.id, 1);
      client.destroy();
      event.reply('close', { code: 0, value: { id: tmp.id } });
    });
    client.on('error', () => {
      clientList.splice(tmp.id, 1);
      client.destroy();
      event.reply('error', { code: 0, value: { id: tmp.id } });
    });
    client.on('data', (data) => {
      console.log('[DATA]', data.toString());
    });
    client.on('end', () => {
      clientList.splice(tmp.id, 1);
      client.destroy();
      event.reply('error', { code: 0, value: { id: tmp.id } });
    });
    client.write(JSON.stringify({ value: 'hello' }));
  });
  server.on('close', (e) => {
    console.log(`[CLOSE] ${JSON.stringify(e)}`);
    clientList.length = 0;
  });
  server.on('error', (e) => {
    console.log(`[ERROR] ${JSON.stringify(e)}`);
    clientList.length = 0;
  });
  server.listen(port, () => {
    event.reply('server.created', { code: 0, value: true });
  });
  ctx.server = server;
  ctx.clientList = clientList;
});

serverChain.use('close', async (ctx) => {
  ctx.server.close(() => {
    ctx.event.reply('');
  });
});

serverChain.use('checkserverstatus', (ctx) => {
  ctx.event.returnValue = JSON.stringify({ code: 0, value: !!ctx.server });
});

module.exports = (event, { port, target }) => {
  serverChain.fire({ event, port, target });
};
