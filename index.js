const electron = require('electron')
const ffmpeg = require('fluent-ffmpeg')

const { app, BrowserWindow, ipcMain } = electron
// represents the overall running process of our app - made for free by the electron library
// Reset of the processes we have to make ourselves

// IPC - Inter process communication
// Its a way for the main process(app) to communicate with the surrounded process
// When receiving events from other windows via IPC, we use ipcMain.on method
// When sending message to main window from app, we use mainWindow.webContents.send

// When sending from main window, we use ipcRenderer.send
// When receiving from app to window, we use ipcRenderer.on

// mainWindow is "globally" scoped in the electron app in order to ensure other event handlers can access it
let mainWindow
// Ready event is emitted when the app is ready and its something we are listening for
app.on('ready', () => {
	mainWindow = new BrowserWindow({
		webPreferences: {
			nodeIntegration: true,
		},
	}) // This command loads up the browser window or child process to the app/main window
	mainWindow.loadURL(`file://${__dirname}/index.html`)
})

ipcMain.on('video:submit', (event, path) => {
	ffmpeg.ffprobe(path, (err, metadata) => {
		mainWindow.webContents.send('video:metadata', metadata.format.duration)
	})
})
