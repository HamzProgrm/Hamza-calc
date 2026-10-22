
const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 650,
    minWidth: 400,
    minHeight: 500,
    title: 'Hamza Calculator',
    autoHideMenuBar: true
  });

  win.loadFile(path.join(__dirname, 'calc_web', 'index.html'));
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
