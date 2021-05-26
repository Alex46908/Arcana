const { app, BrowserWindow } = require('electron')
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync( 'db.json');
const db = low(adapter)
db.defaults({ active_session: [], local: [], message: [] })
    .write()
reg = db.get('local').value().length;
function createWindow () {
    const win = new BrowserWindow({
        width: 800,
        height: 600,

        webPreferences: {
            nodeIntegration: true
        }
    })
    win.webContents.openDevTools()

    if (reg == 0) {
        win.loadFile('reg.html')
    }
    else {
        win.loadFile('index.html')
    }
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    // const { Notification } = require('electron')
    //
    // function showNotification () {
    //     const notification = {
    //         title: 'Basic Notification',
    //         body: 'Notification from the Main process'
    //     }
    //     new Notification(notification).show()
    // }
    //
    // app.whenReady().then(showNotification)
    if (process.platform !== 'darwin') {

        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()

    }
})





const { Menu, MenuItem } = require('electron')

const menu = new Menu()
menu.append(new MenuItem({
    label: 'Electron',
    submenu: [{
        role: 'help',
        accelerator: process.platform === 'darwin' ? 'Enter' : 'Enter',
        click: () => { console.log('Electron rocks!') }
    }]
}))

Menu.setApplicationMenu(menu)