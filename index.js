const { app, BrowserWindow, session, BrowserView } = require('electron')
const { download } = require('electron-dl');

let activeDownload; // only one at a time...

function createWindow () {
  console.log('starting up browser window');
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });
  const view = new BrowserView();

  console.log('setting browserview')
  win.setBrowserView(view);
  view.setBounds({ x: 0, y: 0, width: 600, height: 400 });
  view.webContents.loadURL('https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_a_target');
  //view.webContents.openDevTools({mode: 'detach'});

  win.loadFile('index.html');
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
})

app.on('web-contents-created', (_event, contents) => {
  contents.on('new-window', (_event, url) => {
    console.log(`new window to ${url}`);
  })
})

const majorElectronVersion = () => {
  const version = process.versions.electron.split('.')
  return parseInt(version[0]);
}