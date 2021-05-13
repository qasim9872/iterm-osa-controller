const { APP_NAME, APP_NAME_SECONDARY, OSA_SCRIPT } = require('../constants');
const { runScript } = require('../utils/script-runner');
const parsers = require('../utils/parsers');

async function isRunning() {
  const responses = await Promise.all(
    [APP_NAME, APP_NAME_SECONDARY].map((name) =>
      runScript(OSA_SCRIPT.IS_RUNNING, name)
    )
  );
  for (const response of responses) {
    if (parsers.boolean(response.stdout)) {
      return true;
    }
  }

  return false;
}

async function createWindow() {
  let windowResponse;
  if (await isRunning()) {
    windowResponse = await runScript(OSA_SCRIPT.OPEN_WINDOW, APP_NAME);
  } else {
    await runScript(OSA_SCRIPT.ACTIVATE, APP_NAME);
    windowResponse = await runScript(OSA_SCRIPT.GET_CURRENT_WINDOW, APP_NAME);
  }
  return parsers.removeNewLine(windowResponse.stdout);
}

async function createTab(windowId) {
  const tabResponse = await runScript(OSA_SCRIPT.OPEN_TAB, APP_NAME, windowId);
  return parsers.removeNewLine(tabResponse.stdout);
}

module.exports = {
  isRunning,
  createTab,
  createWindow,
};
