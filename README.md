# Viewtron
Allows for multiple [electron browser view](https://electronjs.org/docs/api/browser-view) inside a parent application.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [Types](#types)

## Installation
```
$ npm i -S viewtron
```
Please note that [`electron`](https://electronjs.org) is a peer-dependency.

## Usage

### Main Process:
```typescript
import {BrowserWindow} from 'electron'
import {ipcMainHandlers} from 'viewtron';

const {
  addCreateDestroyViewHandlers,
  addMainWindowHandlers,
  addViewAreaHandlers,
} = ipcMainHandlers
/* OR
import {
    addCreateDestroyViewHandlers,
    addMainWindowHandlers,
    addViewAreaHandlers,
} from 'viewtron/dist/ipc-main';
*/

const mainWindow = new BrowserWindow()

addMainWindowHandlers(mainWindow);
addViewAreaHandlers();
addCreateDestroyViewHandlers();
```

### Preload process:
See [BrowserWindow options.webPreferences.preload](https://electronjs.org/docs/api/browser-window#class-browserwindow)

```typescript
import {ipcRendererHandlers, ViewOption} from 'viewtron';

const {
    initHandler,
    appAreaResizeHandler,
    addViewHandler,
    removeViewHandler,
    viewsUpdatedHandler,
    viewResetHandler,
    viewResizeHandler
} = ipcRendererHandlers
/* OR
import {
    initHandler,
    appAreaResizeHandler,
    addViewHandler,
    removeViewHandler,
    viewsUpdatedHandler,
    viewResetHandler,
    viewResizeHandler
} from 'viewtron/dist/ipc-renderer';
*/


// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener("DOMContentLoaded", () => {
    const appArea = document.getElementById('app-area');

    // init logic
    initHandler(appArea);
    
    // viewtron area resize detection
    new ResizeSensor(appArea, () => appAreaResizeHandler(appArea));

    viewsUpdatedHandler((views: ViewOption[]) => {
        // @todo: view update logic
    });

    document.getElementById('foo').addEventListener('click', (event: any) => {
        // @todo: view remove logic
        removeViewHandler(viewId);
    });

    document.getElementById('bar').addEventListener('submit', (event: any) => {
        // @todo: view add logic
        addViewHandler(url);
    }, false);

    document.getElementById('baz').addEventListener('click', () => {
        // @todo: view resize logic
        viewResetHandler();
    });

    document.getElementById('bom').addEventListener('dragend', (event: any) => {
        // @todo: view resize logic
        viewResizeHandler(viewId, newRect);
    });
});
```
