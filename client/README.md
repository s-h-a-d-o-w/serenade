A ton of vite connection messages and update messages during HRM happen because multiple hidden windows, each with its own renderer, are created.

Dependencies for main/renderer/shared are declared in the root package.json because electron-builder won't include them in the bundle otherwise.
