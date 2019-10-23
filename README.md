# Viewtron
Allows for advanced [electron BrowserView](https://electronjs.org/docs/api/browser-view) layouts in an [electron BrowserWindow](https://electronjs.org/docs/api/browser-window).
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

### Preload process:
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
    removeColumnHandler,
    removeRowHandler,
    removeViewHandler,
    rowResetHandler,
    rowResizeHandler,
    rowVisibilityHandler,
    viewResetHandler,
    viewResizeHandler,
    viewVisibilityHandler,
    viewtronInitHandler,
    viewtronResizeHandler,
    viewtronUpdateHandler,
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

    document.getElementById("add-row-form").addEventListener("submit", (event: any) => {
        // @todo: add row logic
        addRowHandler({});
    }, false);

    document.getElementById("add-column-form").addEventListener("submit", (event: any) => {
        // @todo: add column logic
        addColumnHandler({rowId});
    }, false);

    document.getElementById("add-view-form").addEventListener("submit", (event: any) => {
        // @todo: add view logic
        addViewHandler({url, columnId});
    }, false);

    document.getElementById("foo").addEventListener("click", (event: any) => {
        // @todo: remove row logic
        removeRowHandler({rowId});
    });

    document.getElementById("foo").addEventListener("click", (event: any) => {
        // @todo: remove column logic
        removeColumnHandler({columnId})
    });

    document.getElementById("foo").addEventListener("click", (event: any) => {
        // @todo: remove view logic
        removeViewHandler({viewId})
    });

    document.getElementById("row-height-form").addEventListener("submit", (event: any) => {
        // @todo: row resize logic
        rowResizeHandler({rowId, height});
    }, false);

    document.getElementById("column-width-form").addEventListener("submit", (event: any) => {
        // @todo: column resize logic
        columnResizeHandler({columnId, width});
    }, false);

    document.getElementById("view-height-form").addEventListener("submit", (event: any) => {
        // @todo: view resize logic
        viewResizeHandler({viewId, height});
    }, false);

    document.getElementById("row-visibility-form").addEventListener("submit", (event: any) => {
        // @todo: row visibility logic
        rowVisibilityHandler({rowId, visible});
    }, false);

    document.getElementById("column-visibility-form").addEventListener("submit", (event: any) => {
        // @todo: column visibility logic
        columnVisibilityHandler({columnId, visible});
    }, false);

    document.getElementById("view-visibility-form").addEventListener("submit", (event: any) => {
        // @todo: view visibility logic
        viewVisibilityHandler({viewId, visible});
    }, false);

    document.getElementById("reset-layout").addEventListener("click", () => {
        // layout reset logic
        rowResetHandler({});
        columnResetHandler({});
        viewResetHandler({});
    });
});
```

---

## API
### Main Process
- [addViewtron](#addviewtron)

#### addViewtron
Applies handlers to the main electron window instance. Should be called on each new main window instance

```typescript
import {BrowserWindow} from 'electron';
import {ViewtronInstance, ViewtronConfig} from 'viewtron';

export type addViewtron = (mainWindow: BrowserWindow, config: Partial<ViewtronConfig> = {}) => ViewtronInstance
```

### Preload process
Could probably also be done in the renderer process.
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
import {AddRowData} from 'viewtron'

export default function addRowHandler(data: AddRowData): void
```

#### removeRowHandler
Removes a row from the viewtron area.

```typescript
import {RemoveRowData} from 'viewtron';

export default function removeRowHandler(data: RemoveRowData): void
```

#### reorderRowHandler
Moves a row in the viewtron area.

```typescript
import {ReorderRowData} from 'viewtron';

export default function reorderRowHandler(data: ReorderRowData): void
```

#### rowResizeHandler
Sets height for a specific row.

```typescript
import {RowResizeData} from 'viewtron';

export default function rowResizeHandler(data: RowResizeData): void
```

#### rowResetHandler
Resets heights for all or specified rows.

```typescript
import {RowResetData} from 'viewtron';

export default function rowResetHandler(data: RowResetData): void
```

#### rowVisibilityHandler
Sets visibility of a row

```typescript
import {RowVisibilityData} from 'viewtron';

export default function rowVisibilityHandler(data: RowVisibilityData): void
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

#### reorderColumnHandler
Moves a column inside a row.

```typescript
import {ReorderColumnData} from 'viewtron'

export default function reorderColumnHandler(data: ReorderColumnData): void
```

#### columnResizeHandler
Sets width for a specific column.

```typescript
import {ColumnResizeData} from 'viewtron';

export default function columnResizeHandler(data: ColumnResizeData): void
```

#### columnResetHandler
Resets widths for all or specified columns.

```typescript
import {ColumnResetData} from 'viewtron';

export default function columnResetHandler(data: ColumnResetData): void
```

#### columnVisibilityHandler
Sets visibility of a column

```typescript
import {ColumnVisibilityData} from 'viewtron';

export default function columnVisibilityHandler(data: ColumnVisibilityData): void
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

#### reorderViewHandler
Movers a view instance inside a column.

```typescript
import {ReorderViewData} from 'viewtron';

export default function reorderViewHandler(data: ReorderViewData): void
```

#### viewResizeHandler
Sets height for a specific view instance.

```typescript
import {ViewResizeData} from 'viewtron';

export default function viewResizeHandler(data: ViewResizeData): void
```

#### viewResetHandler
Resets all views, or a specified view, to default dimensions.

```typescript
import {ViewResetData} from 'viewtron';

export default function viewResetHandler(data: ViewResetData): void
```

#### viewVisibilityHandler
Sets visibility of a view.

```typescript
import {ViewVisibilityData} from 'viewtron';

export default function viewVisibilityHandler(data: ViewVisibilityData): void
```

