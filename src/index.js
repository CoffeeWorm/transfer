const { app, BrowserWindow } = require('electron');
require('./main');

const isDev = process.env.NODE_ENV === 'development';

try {
  isDev && require('electron-reloader')(module);
} catch (_) {
  // placeholder
}

function createWindow() {
  const win = new BrowserWindow({
    width: isDev ? 1200 : 400,
    height: 600,
    title: 'FileTransfer',
    webPreferences: { nodeIntegration: true },
  });
  win.setMenu(null);
  isDev
    ? win.loadURL('http://localhost:8080/#/index')
    : win.loadFile('index.html');
  isDev && win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
