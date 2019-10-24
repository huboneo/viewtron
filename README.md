# Viewtron
Allows for advanced [electron BrowserView](https://electronjs.org/docs/api/browser-view) layouts in an [electron BrowserWindow](https://electronjs.org/docs/api/browser-window).
See [viewtron-sample-app](https://github.com/huboneo/viewtron-sample-app) for a small usage example.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
    - [Core Types](#core-types)
    - [ipcMain Process](#ipcmain-process)
    - [ipcRenderer Process](#ipcrenderer-process)

---

## Installation
```
$ npm i -S viewtron
```
Please note that [`electron`](https://electronjs.org) is a peer-dependency.

---

## Usage
### ipcMain:
```typescript
import {BrowserWindow} from 'electron'
import {ipcMainHandlers, ViewtronConfig} from 'viewtron';

const {
    addViewtron
} = ipcMainHandlers
/* OR
import {
    addViewtron
} from 'viewtron/dist/ipc-main';
*/

const config: Partial<ViewtronConfig> = {}
const mainWindow = new BrowserWindow()

const {
  viewtronWindow,
  state,
  removeViewtron,
} = addViewtron(mainWindow, config);
```

### ipcRenderer:
Tested in preload process, could probably also be done in the renderer process. 
See [BrowserWindow options.webPreferences.preload](https://electronjs.org/docs/api/browser-window#class-browserwindow)

```typescript
import {ResizeSensor} from "css-element-queries";
import {ViewtronUpdateData} from "viewtron";
import {
    addColumnHandler,
    addRowHandler,
    addViewHandler,
    columnResetHandler,
    columnResizeHandler,
    columnVisibilityHandler,
    viewtronInitHandler,
    removeColumnHandler,
    removeRowHandler,
    removeViewHandler,
    reorderColumnHandler,
    reorderRowHandler,
    reorderViewHandler,
    rowResetHandler,
    rowResizeHandler,
    rowVisibilityHandler,
    viewResetHandler,
    viewtronResizeHandler,
    viewtronUpdateHandler,
    viewResizeHandler,
    viewVisibilityHandler
} from "viewtron/dist/ipc-renderer";

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener("DOMContentLoaded", () => {
    const appArea = document.getElementById("viewtron-area");

    // @todo: init logic
    viewtronInitHandler(appArea.getBoundingClientRect().toJSON());

    // @ts-ignore
    new ResizeSensor(appArea, () => {
        // @todo: resize logic
        viewtronResizeHandler(appArea.getBoundingClientRect().toJSON())
    });

    viewtronUpdateHandler((update: ViewtronUpdateData) => {
        // @todo: update logic
    });

    document.getElementById("foo").addEventListener("bar", () => {
        // @todo: add logic
        addRowHandler({}); // or any other handler
    });
});
```

---

## API
### Core Types
```typescript
import {Store} from 'redux';
import {BrowserView, BrowserWindow, Rectangle} from 'electron';

import {AppAction, AppState} from '<internal>';

export type ViewtronInstance = {
    viewtronWindow: ViewtronWindow,
    state: Store<AppState, AppAction>,
    removeViewtron: () => void,
}

export type ViewtronConfig = {
    spacing: number,
    minWidth: number,
    minHeight: number,
    responsive: boolean,
    destroyOnClose: boolean,
}

export type ViewtronWindow = {
    id: string,
    instance: BrowserWindow,
    rect?: Rectangle,
    config: ViewtronConfig
}

export type Column = {
    id: string,
    windowId: string;
    rowId: string,
    name?: string,
    width?: number,
    hidden?: boolean
};

export type Row = {
    id: string,
    windowId: string;
    name?: string,
    height?: number,
    hidden?: boolean
};

export type ViewtronView = {
    id: string;
    url: string;
    name?: string;
    windowId: string;
    columnId: string;
    rect?: Rectangle;
    instance: BrowserView;
    height?: number;
    options?: any,
    hidden?: boolean
}

export type ViewtronUpdateData = {
    rows: Row[]
    columns: Column[]
    views: ViewtronView[]
}
```

### ipcMain Process
- [addViewtron](#addviewtron)

#### addViewtron
Applies handlers to the main electron window instance. Should be called on each new main window instance

```typescript
import {BrowserWindow} from 'electron';
import {ViewtronInstance, ViewtronConfig} from 'viewtron';

export type addViewtron = (mainWindow: BrowserWindow, config: Partial<ViewtronConfig> = {}) => ViewtronInstance
```

### ipcRenderer process
Tested in preload process, could probably also be done in the renderer process.
- [viewtronInitHandler](#viewtroninithandler)
- [viewtronResizeHandler](#viewtronresizehandler)
- [viewtronUpdateHandler](#viewtronupdatehandler)
- [addRowHandler](#addrowhandler)
- [removeRowHandler](#removerowhandler)
- [reorderRowHandler](#reorderrowhandler)
- [rowResizeHandler](#rowresizehandler)
- [rowResetHandler](#rowresethandler)
- [rowVisibilityHandler](#rowvisibilityhandler)
- [addColumnHandler](#addcolumnhandler)
- [removeColumnHandler](#removecolumnhandler)
- [reorderColumnHandler](#reordercolumnhandler)
- [columnResizeHandler](#columnresizehandler)
- [columnResetHandler](#columnresethandler)
- [columnVisibilityHandler](#columnvisibilityhandler)
- [addViewHandler](#addviewhandler)
- [removeViewHandler](#removeviewhandler)
- [reorderViewHandler](#reorderviewhandler)
- [viewResizeHandler](#viewresizehandler)
- [viewResetHandler](#viewresethandler)
- [viewVisibilityHandler](#viewvisibilityhandler)

#### viewtronInitHandler
Initialises a viewtron area on the specified rectangle.

```typescript
import {Rectangle} from 'electron';

export default function viewtronInitHandler(viewtronAreaRect: Rectangle): void
```

#### viewtronResizeHandler
sets new dimensions of the viewtron main area.

```typescript
import {Rectangle} from 'electron';

export default function viewtronResizeHandler(viewtronAreaRect: Rectangle): void;
```

#### viewtronUpdateHandler
Calls supplied callback whenever viewtron data is updated in main process. Passes updated viewtron state.

```typescript
import {ViewtronUpdateData} from 'viewtron';

export default function viewsUpdatedHandler(callback: (update: ViewtronUpdateData) => void): void
```

#### addRowHandler
Adds a row to the viewtron area.

```typescript
export type AddRowData = {
    name?: string,
    height?: number
}

export default function addRowHandler(data: AddRowData): void
```

#### removeRowHandler
Removes a row from the viewtron area.

```typescript
export type RemoveRowData = {
    rowId: string
}

export default function removeRowHandler(data: RemoveRowData): void
```

#### reorderRowHandler
Moves a row in the viewtron area.

```typescript
export type ReorderRowData = {
    rowId: string
    newIndex: number
}

export default function reorderRowHandler(data: ReorderRowData): void
```

#### rowResizeHandler
Sets height for a specific row.

```typescript
export type RowResizeData = {
    rowId: string,
    height: number
}

export default function rowResizeHandler(data: RowResizeData): void
```

#### rowResetHandler
Resets heights for all or specified rows.

```typescript
export type RowResetData = {
    rowIds?: string[]
}

export default function rowResetHandler(data: RowResetData): void
```

#### rowVisibilityHandler
Sets visibility of a row

```typescript
export type RowVisibilityData = {
    rowId: string,
    visible: boolean
}

export default function rowVisibilityHandler(data: RowVisibilityData): void
```

#### addColumnHandler
Adds a column to the viewtron area.

```typescript
export type AddColumnData = {
    rowId: string,
    name?: string,
    width?: number
}

export default function addColumnHandler(data: AddColumnData): void
```

#### removeColumnHandler
Removes a column from the viewtron area.

```typescript
export type RemoveColumnData = {
    columnId: string
}

export default function removeColumnHandler(data: RemoveColumnData): void
```

#### reorderColumnHandler
Moves a column inside a row.

```typescript
export type ReorderColumnData = {
    columnId: string
    newIndex: number
}

export default function reorderColumnHandler(data: ReorderColumnData): void
```

#### columnResizeHandler
Sets width for a specific column.

```typescript
export type ColumnResizeData = {
    columnId: string
    width: number
}

export default function columnResizeHandler(data: ColumnResizeData): void
```

#### columnResetHandler
Resets widths for all or specified columns.

```typescript
export type ColumnResetData = {
    columnIds?: string[]
}

export default function columnResetHandler(data: ColumnResetData): void
```

#### columnVisibilityHandler
Sets visibility of a column

```typescript
export type ColumnVisibilityData = {
    columnId: string
    visible: boolean
}

export default function columnVisibilityHandler(data: ColumnVisibilityData): void
```

#### addViewHandler
Adds a view instance.

```typescript
export type AddViewData = {
    url: string,
    columnId: string
    name?: string
}

export default function addViewHandler(data: AddViewData): void
```

#### removeViewHandler
Removes a view instance.

```typescript
export type RemoveViewData = {
    viewId: string
}

export default function removeViewHandler(data: RemoveViewData): void
```

#### reorderViewHandler
Movers a view instance inside a column.

```typescript
export type ReorderViewData = {
    viewId: string
    newIndex: number
}

export default function reorderViewHandler(data: ReorderViewData): void
```

#### viewResizeHandler
Sets height for a specific view instance.

```typescript
export type ViewResizeData = {
    viewId: string,
    height: number
}

export default function viewResizeHandler(data: ViewResizeData): void
```

#### viewResetHandler
Resets all views, or a specified view, to default dimensions.

```typescript
export type ViewResetData = {
    viewIds?: string[]
}

export default function viewResetHandler(data: ViewResetData): void
```

#### viewVisibilityHandler
Sets visibility of a view.

```typescript
export type ViewVisibilityData = {
    viewId: string,
    visible: boolean
}

export default function viewVisibilityHandler(data: ViewVisibilityData): void
```

