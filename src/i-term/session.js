const { APP_NAME, OSA_SCRIPT } = require('../constants');
const { runScript } = require('../utils/script-runner');
const parsers = require('../utils/parsers');

class ITermSession {
  static async create(tab, sessionId) {
    if (!sessionId) {
      // create new session?
    }

    return new ITermSession(tab, sessionId);
  }

  constructor(tab, sessionId) {
    this.tab = tab;
    this.id = sessionId;
  }

  async _split(direction, sessionId) {
    const splitSessionResponse = await runScript(
      OSA_SCRIPT.SPLIT,
      APP_NAME,
      sessionId,
      direction
    );
    const newSessionId = parsers.formatSessionId(splitSessionResponse.stdout);
    return new ITermSession(this.tab, newSessionId);
  }

  async splitV() {
    const session = await this._split('vertically', this.id);
    this.tab.sessions.push(session);
    return session;
  }

  async splitH() {
    const session = await this._split('horizontally', this.id);
    this.tab.sessions.push(session);
    return session;
  }

  async isProcessing() {
    const isProcessed = await runScript(
      OSA_SCRIPT.CUSTOM_TELL,
      APP_NAME,
      this.id,
      `is processing`
    );
    return parsers.boolean(isProcessed.stdout);
  }

  async setName(name) {
    return runScript(
      OSA_SCRIPT.CUSTOM_TELL,
      APP_NAME,
      this.id,
      `set name to "${name}"`
    );
  }

  async runCommand(command) {
    return runScript(OSA_SCRIPT.WRITE, APP_NAME, this.id, command);
  }
}

module.exports = ITermSession;
