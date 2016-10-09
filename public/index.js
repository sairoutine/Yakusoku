// electron エントリポイント
'use strict';
const electron = require('electron');
const app = electron.app;
const dialog = electron.dialog;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

function createWindow () {
	// dialog 表示
	var fullscreen_answer = dialog.showMessageBox({
		type: 'question',
		buttons: ['Yes', 'No'],
		title: 'フルスクリーン起動',
		message: 'フルスクリーンで起動しますか？'
	});

	// fullscreen
	if(fullscreen_answer === 0) {
		mainWindow = new BrowserWindow({
			fullscreen: true,
		});
	}
	// not fullscreen
	else {
		mainWindow = new BrowserWindow({
			"width":          640,
			"height":         480,
			"useContentSize": true,  // フレームのサイズをサイズに含まない
			"resizable":      false, // ウィンドウのリサイズを禁止
			"alwaysOnTop":    true,  // 常に最前面
		});

	}

	mainWindow.loadURL(`file://${__dirname}/index.html`);
	// Open the DevTools.
	//mainWindow.webContents.openDevTools()

	// if fullscreen
	if(fullscreen_answer === 0) {
		mainWindow.webContents.executeJavaScript(`
			var mainCanvas = document.querySelector('#mainCanvas');
			if (mainCanvas.requestFullscreen) {
				mainCanvas.requestFullscreen();
			}
			else if (mainCanvas.msRequestuestFullscreen) {
				mainCanvas.msRequestuestFullscreen();
			}
			else if (mainCanvas.mozRequestFullScreen) {
				mainCanvas.mozRequestFullScreen();
			}
			else if (mainCanvas.webkitRequestFullscreen) {
				mainCanvas.webkitRequestFullscreen();
			}
		`, true);
	}

	mainWindow.on('closed', function () {
		mainWindow = null;
	});
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', function () {
	if (mainWindow === null) {
		createWindow();
	}
});
