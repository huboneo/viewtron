# Viewtron
Allows for advanced [electron browser view](https://electronjs.org/docs/api/browser-view) layouts a parent application.
See [viewtron-sample-app](https://github.com/huboneo/viewtron-sample-app) for a small usage example.

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
    addMainWindowHandlers,
    addViewInstanceHandlers,
    addViewtronAreaHandlers,
} = ipcMainHandlers
/* OR
import {
    addMainWindowHandlers,
    addViewInstanceHandlers,
    addViewtronAreaHandlers,
} from 'viewtron/dist/ipc-main';
*/

const mainWindow = new BrowserWindow()

addMainWindowHandlers(mainWindow);
addViewtronAreaHandlers();
addViewInstanceHandlers();
```

### Preload process:
See [BrowserWindow options.webPreferences.preload](https://electronjs.org/docs/api/browser-window#class-browserwindow)

```typescript
import {ipcRendererHandlers, ViewOption} from 'viewtron';

const {
    addColumnHandler,
    addRowHandler,
    addViewHandler,
    viewtronAreaResizeHandler,
    columnResizeHandler,
    initHandler,
    removeColumnHandler,
    removeRowHandler,
    removeViewHandler,
    rowResizeHandler,
    viewResizeHandler,
    viewResetHandler,
    viewsUpdatedHandler,
} = ipcRendererHandlers


// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener("DOMContentLoaded", () => {
    const appArea = document.getElementById('app-area');

    // init logic
    initHandler(appArea);
    
    // viewtron area resize detection
    new ResizeSensor(appArea, () => viewtronAreaResizeHandler(appArea));

    viewsUpdatedHandler((views: ViewOption[]) => {
        // @todo: view update logic
    });

    document.getElementById('foo').addEventListener('submit', (event: any) => {
        // @todo: row add logic
        addRowHandler({});
    }, false);

    document.getElementById('foo').addEventListener('submit', (event: any) => {
        // @todo: column add logic
        addColumnHandler({rowIndex});
    }, false);

    document.getElementById('foo').addEventListener('submit', (event: any) => {
        // @todo: view add logic
        addViewHandler({url, rowIndex, columnIndex});
    }, false);

    document.getElementById('foo').addEventListener('submit', (event: any) => {
        // @todo: row resize logic
        rowResizeHandler({rowIndex, height});
    }, false);

    document.getElementById('foo').addEventListener('submit', (event: any) => {
        // @todo: column resize logic
        columnResizeHandler({rowIndex, columnIndex, width});
    }, false);

    document.getElementById('foo').addEventListener('submit', (event: any) => {
        // @todo: view resize logic
        viewResizeHandler({id, height});
    }, false);

    document.getElementById('foo').addEventListener('click', (event: any) => {
        // @todo: row remove logic
        removeRowHandler({rowIndex});
    });

    document.getElementById('foo').addEventListener('click', (event: any) => {
        // @todo: column remove logic
        removeColumnHandler({columnIndex, rowIndex});
    });

    document.getElementById('foo').addEventListener('click', (event: any) => {
        // @todo: view remove logic
        removeViewHandler(viewId);
    });

    document.getElementById('foo').addEventListener('click', () => {
        // @todo: view reset size logic
        viewResetHandler();
    });

    document.getElementById('foo').addEventListener('dragend', (event: any) => {
        // @todo: view resize logic
        viewResizeHandler({id, height});
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
import {BrowserWindow} from 'electron';
import {ViewtronConfig} from 'viewtron';

export type addMainWindowHandlers = (mainWindow: BrowserWindow, config: Partial<ViewtronConfig> = {}) => void
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
Could probably also be done in the renderer process.
- [initHandler](#inithandler)
- [viewtronAreaResizeHandler](#viewtronarearesizehandler)
- [addRowHandler](#addrowhandler)
- [removeRowHandler](#removerowhandler)
- [rowResizeHandler](#rowresizehandler)
- [addColumnHandler](#addcolumnhandler)
- [removeColumnHandler](#removecolumnhandler)
- [columnResizeHandler](#columnresizehandler)
- [addViewHandler](#addviewhandler)
- [removeViewHandler](#removeviewhandler)
- [viewResizeHandler](#viewresizehandler)
- [viewsUpdatedHandler](#viewsupdatedhandler)
- [viewResetHandler](#viewresethandler)

#### initHandler
Binds viewtron to a specific DOM element in which views will be shown and initializes any preloaded views.

```typescript
export default function initHandler(viewtronAreaElement: HTMLElement): void
```

#### viewtronAreaResizeHandler
sets new dimensions of the viewtron main area.

```typescript
import {Rectangle} from 'electron';

export default function viewtronAreaResizeHandler(appAreaRect: Rectangle): void;
```

#### addRowHandler
Adds a row to the viewtron area.

```typescript
import {AddRowData} from 'viewtron'

export default function addRowHandler(data: AddRowData): void
```

#### removeRowHandler
Removes a row from the viewtron area.

```typescript
import {RemoveRowData} from 'viewtron';

export default function removeRowHandler(data: RemoveRowData): void
```

#### rowResizeHandler
Sets height for a specific row.

```typescript
import {RowResizeData} from 'viewtron';

export default function rowResizeHandler(data: RowResizeData): void
```

#### addColumnHandler
Adds a column to the viewtron area.

```typescript
import {AddColumnData} from 'viewtron'

export default function addColumnHandler(data: AddColumnData): void
```

#### removeColumnHandler
Removes a column from the viewtron area.

```typescript
import {RemoveColumnData} from 'viewtron'

export default function removeColumnHandler(data: RemoveColumnData): void
```

#### columnResizeHandler
Sets width for a specific column.

```typescript
import {ColumnResizeData} from 'viewtron';

export default function columnResizeHandler(data: ColumnResizeData): void
```

#### addViewHandler
Adds a view instance.

```typescript
import {AddViewData} from 'viewtron';

export default function addViewHandler(data: AddViewData): void
```

#### removeViewHandler
Removes a view instance.

```typescript
import {RemoveViewData} from 'viewtron';

export default function removeViewHandler(data: RemoveViewData): void
```

#### viewResizeHandler
Sets height for a specific view instance.

```typescript
import {ViewResizeData} from 'viewtron';

export default function viewResizeHandler(data: ViewResizeData): void
```

#### viewsUpdatedHandler
Calls supplied callback whenever viewtron data is updated in main process. Passes updated viewtron state.

```typescript
import {ViewtronUpdateData} from 'viewtron';

export default function viewsUpdatedHandler(callback: (update: ViewtronUpdateData) => void): void
```

#### viewResetHandler
Resets all views, or a specified view, to default dimensions.

```typescript
import {ViewResetData} from 'viewtron';

export default function viewResetHandler(data: ViewResetData): void
```

