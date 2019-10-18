# Viewtron
Allows for multiple [electron browser view](https://electronjs.org/docs/api/browser-view) inside a parent application.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [API](#api)

---

## Installation
```
$ npm i -S viewtron
```
Please note that [`electron`](https://electronjs.org) is a peer-dependency.

---

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

---

## API
### Main Process
- [addMainWindowHandlers](#addmainwindowhandlers)
- [addViewtronAreaHandlers](#addviewtronareahandlers)
- [addViewInstanceHandlers](#addviewinstancehandlers)

#### addMainWindowHandlers
Applies handlers to the main electron window instance. Should be called on each new main window instance

```typescript
import {BrowserWindow} from 'electron'

export type addMainWindowHandlers = (mainWindow: BrowserWindow) => void
```

#### addViewtronAreaHandlers
Applies handlers for the main Viewtron area in which views are displayed. Should only be applied once per main process,

```typescript
export type addViewtronAreaHandlers = () => void
```

#### addViewInstanceHandlers
Applies handlers for the each Viewtron BrowserView instance. Should only be applied once per main process.

```typescript
export type addViewInstanceHandlers = () => void
```

### Preload process
Could also be done in the renderer process
- [initHandler](#inithandler)
- [addViewHandler](#addviewhandler)
- [removeViewHandler](#removeviewhandler)
- [viewsUpdatedHandler](#viewsupdatedhandler)
- [viewResetHandler](#viewresethandler)
- [viewResizeHandler](#viewresizehandler)

#### initHandler
Binds viewtron to a specific DOM element in which views will be shown and initializes any preloaded views.

```typescript
export default function initHandler(viewtronAreaElement: HTMLElement): void
```

#### addViewHandler
Adds a view instance.

```typescript
export default function addViewHandler(url: string): void
```

#### removeViewHandler
Removes a view instance.

```typescript
export default function removeViewHandler(id: string): void
```

#### viewsUpdatedHandler
Calls supplied callback whenever views are updated in main process. Passes updated view data.

```typescript
import {ViewOption} from 'viewtron';

export default function viewsUpdatedHandler(callback: (views: ViewOption[]) => void): void
```

#### viewResetHandler
Resets all views, or a specified to default widths.

```typescript
export default function viewResetHandler(id?: string): void
```

#### viewResizeHandler
Sends new dimensions for a specific view instance. Currently only for `width`.

```typescript
import {Rectangle} from 'electron';

export default function viewResizeHandler(id: string, rect: Rectangle): void
```

#### viewResizeHandler
Sends new dimensions for a specific view instance. Currently only for `width`.

```typescript
import {Rectangle} from 'electron';

export default function viewResizeHandler(id: string, rect: Rectangle): void
```
