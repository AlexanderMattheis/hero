const electron = require('electron');

const app = electron.app;
const ipc = electron.ipcMain;  // Inter-Process Communication

const BrowserWindow = electron.BrowserWindow;

let indexWindow;
let statusWindow;

function initWindows() {
    createIndexWindow();
    createStatusWindow();
}

function createIndexWindow() {
    indexWindow = new BrowserWindow({
        frame: false,
        height: 720,
        icon:'hero.ico',
        minHeight: 720,
        minWidth: 1280,
        width: 1280,
        webPreferences: {
            nodeIntegration: true
        }
    });

    indexWindow.loadFile('pages/index.html');
    indexWindow.setMenu(null);
    indexWindow.on('closed', () => {
        indexWindow = null;
    });
}

function createStatusWindow() {
    statusWindow = new BrowserWindow({
        frame: false,
        height: 200,
        modal: true,
        parent: indexWindow,
        resizable: false,
        show: false,
        width: 400,
        webPreferences: {
            nodeIntegration: true
        }
    });

    statusWindow.loadFile('pages/status.html');
    statusWindow.setMenu(null);
    statusWindow.on('hide', () => {
        indexWindow.focus();  // or the keyboard won't work
        indexWindow.webContents.send('continue-quiz');
    });
}

app.on('ready', initWindows);

ipc.on('show-status-window', function (event, quiz) {
    statusWindow.webContents.send('set-team-data', quiz);
    statusWindow.show();
});

ipc.on('show-winner-window', function (event, winnersTeamData) {
    statusWindow.webContents.send('set-winners-data', winnersTeamData);
    statusWindow.show();
});