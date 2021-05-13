const { APP_NAME, OSA_SCRIPT } = require('../constants');
const { runScript } = require('../utils/script-runner');
const ITermSession = require('./session');
const { createTab } = require('./utils');
const parsers = require('../utils/parsers');

class iTermTab {
  static async create(windowId, tabId) {
    if (!tabId) {
      // create a tab
      tabId = await createTab(windowId);
    }

    const tab = new iTermTab(windowId, tabId);
    await tab.loadSessions();
    return tab;
  }

  constructor(windowId, tabId) {
    this.windowId = windowId;
    this.id = tabId;
    this.sessions = [];
  }

  async loadSessions() {
    const sessionResponse = await runScript(
      OSA_SCRIPT.GET_REFERENCE,
      APP_NAME,
      this.windowId,
      'current session'
    );

    const sessionId = parsers.formatSessionId(sessionResponse.stdout);
    const defaultSession = await ITermSession.create(this, sessionId);
    this.sessions.push(defaultSession);
  }
}

module.exports = iTermTab;
