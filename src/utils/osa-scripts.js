const { OSA_SCRIPT } = require('../constants');

function wrapOsaScript(script) {
  return `osascript -e '${script}'`;
}

function wrapTell(tell, script) {
  return `
  tell ${tell}
    ${script}
  end tell
  `;
}

function wrapTellApplication(appName, script) {
  return wrapTell(`application "${appName}"`, script);
}

const osaScripts = {
  [OSA_SCRIPT.IS_RUNNING]: (appName) => `
    tell application "System Events" to (name of processes) contains "${appName}" 
  `,

  [OSA_SCRIPT.ACTIVATE]: (appName) =>
    `tell application "${appName}" to activate`,

  [OSA_SCRIPT.GET_CURRENT_WINDOW]: (appName) =>
    wrapTellApplication(appName, 'current window'),

  [OSA_SCRIPT.GET_VERSION]: (appName) => `version of application "${appName}"`,

  [OSA_SCRIPT.OPEN_WINDOW]: (appName) =>
    wrapTellApplication(appName, 'create window with profile'),

  [OSA_SCRIPT.GET_REFERENCE]: (
    appName,
    windowId,
    instance = 'current session'
  ) => wrapTellApplication(appName, wrapTell(windowId, instance)),

  [OSA_SCRIPT.OPEN_TAB]: (appName, windowId) =>
    wrapTellApplication(
      appName,
      wrapTell(windowId, 'create tab with default profile')
    ),

  [OSA_SCRIPT.SPLIT]: (
    appName,
    sessionId = 'current session',
    direction = 'vertically'
  ) =>
    wrapTellApplication(
      appName,
      wrapTell(sessionId, `split ${direction} with default profile`)
    ),

  [OSA_SCRIPT.WRITE]: (appName, sessionId, command) =>
    wrapTellApplication(
      appName,
      wrapTell(sessionId, `write text "${command}"`)
    ),

  [OSA_SCRIPT.CUSTOM_TELL]: (appName, id, tellCommand) =>
    wrapTellApplication(appName, wrapTell(id, tellCommand)),
};

const scripts = Object.entries(osaScripts).reduce((result, [name, script]) => {
  result[name] = (...args) => wrapOsaScript(script(...args));
  return result;
}, {});

module.exports = scripts;
