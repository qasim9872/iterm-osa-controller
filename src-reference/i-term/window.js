const { APP_NAME, OSA_SCRIPT } = require('../constants');
const { runScript } = require('../utils/script-runner');
const parsers = require('../utils/parsers');
const { createWindow } = require('./utils');
const iTermTab = require('./tab');

class iTermWindow {
  static async create(windowId) {
    if (!windowId) {
      windowId = await createWindow();
    }

    const window = new iTermWindow(windowId);

    // when an iTerm window is created, it automatically creates a tab and a session,
    // these have to be loaded so we have references to them
    await window.loadTabs();

    return window;
  }

  constructor(windowId) {
    this.windowId = windowId;
    this.tabs = [];
  }

  async createTab() {
    // create a tab
    const tab = await iTermTab.create(this.windowId);
    this.tabs.push(tab);
    return tab;
  }

  async loadTabs() {
    const tabResponse = await runScript(
      OSA_SCRIPT.GET_REFERENCE,
      APP_NAME,
      this.windowId,
      'current tab'
    );

    const tabId = parsers.removeNewLine(tabResponse.stdout);
    const defaultTab = await iTermTab.create(this.windowId, tabId);
    this.tabs.push(defaultTab);
  }
}

module.exports = iTermWindow;
