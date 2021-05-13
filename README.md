# ITerm Controller

A high level API for controlling ITerm terminals in JavaScript. This internally makes use of OSA Scripts.

> Note: Windows is not supported

## Prerequisites

Please make sure you have the following installed.

- [Node JS](https://nodejs.org/en/)
- [ITerm Terminal](https://iterm2.com/)

## Examples

You can find more samples in the samples folder. You can run them by running the following:

```bash
node ./samples/open-new-i-term-window.js
```

### Create an ITerm Window

```JavaScript
// this will open a new iTerm window
const window = await iTermWindow.create();

// access the default window tab
const tab = window.tabs[0];

// access the default session in the tab
const session = tab.sessions[0];

// run command in the session
await session.runCommand(`echo hello`);
```

### Create multiple tabs

```JavaScript
const window = await iTermWindow.create();

// access the default tab
const defaultTab = window.tabs[0];

// create and reference another tab
const secondaryTab = await window.createTab();
```

### Tab with multiple sessions

```JavaScript
const window = await iTermWindow.create();
const tab = window.tabs[0];
const tab1Session1 = tab.sessions[0];
await tab1Session1.runCommand(`echo I am tab 1 session 1`);

// split the session vertically
const tab1Session2 = await tab1Session1.splitV();

// run command in session
await tab1Session2.runCommand(`echo I am tab 1 session 2`);
```
