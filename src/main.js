const { ipcMain } = require('electron');

ipcMain.on('connect', require('./socket/connect'));

ipcMain.on('server', require('./socket/server'));
