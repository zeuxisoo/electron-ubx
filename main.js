'use strict';

const app = require('app');
const BrowserWindow = require('browser-window');

require('crash-reporter').start();

let mainWindow = null;

const openMainWindow = () => {
    mainWindow = new BrowserWindow({
        width : 800,
        height: 650,
        frame : false,
        // transparent: true,
        resizable: false,
        center: true
    });

    if (process.env.NODE_ENV === 'development') {
        mainWindow.loadURL('file://' + __dirname + '/app/bootstrap/development.html');
        mainWindow.webContents.openDevTools();
    }else{
        mainWindow.loadURL('file://' + __dirname + '/app/bootstrap/production.html');
    }

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('window-all-closed', () => {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

app.on('activate', (event, hasVisibleWindows) => {
    if (hasVisibleWindows === false) {
        openMainWindow()
    }
})
;
app.on('ready', () => openMainWindow());
