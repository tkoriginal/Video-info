# Getting into the world of electron

## Video duration app

This app allows a use to choose a file in their local directory and the app will tell the user how many seconds long the video is.

### Key Learnings

- In its simplest form, an electron app is identical to a chrome browser

  - The electron app is created by the electron library and will hold most of the logic and communication with the local system (except for things that a browser would have access to already, like the HTML 5 file API)
  - When an electron app is create and ready, it can then open window, similar to open a tab on the chrome browser
  - This window will house the views of the application and the entry point for this application was index.html

- The window needs to talk to the electron app. In general, the electron app and the window are completely isolated and compartmentalized so they don't talk to each other
- Inter Process Communication (IPC) is how they talk to each other.
  - In order to activate IPC, in the electron app we have to use `webPreferences: { nodeIntegration: true, }`

    - This gives the windows access to the require statement, which a chrome browser normally wouldn't have access to.

  - On the window side:
    - We would require `ipcRenderer` and use the `send` method to send information to our main app
    - We would use the `on` method to receive data from the main app
  - On the main app side:
    - We would use `ipcMain.on` to receive a request
    - We would use `mainWindow.webContents.send` to send information back to the main app
