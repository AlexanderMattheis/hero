const {app, BrowserWindow} = require('electron');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        height: 720,
        minHeight: 720,
        minWidth: 1280,
        width: 1280,
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadFile('pages/index.html');
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', createWindow);