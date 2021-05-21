import { OSA_SCRIPT } from './osa-scripts.constants';
import {
  wrapTellApplication,
  wrapTell,
  wrapOsaScript,
} from './osa-scripts.wrappers';

const osaScripts = {
  [OSA_SCRIPT.IS_RUNNING]: (appName: string) => `
    tell application "System Events" to (name of processes) contains "${appName}" 
  `,

  [OSA_SCRIPT.ACTIVATE]: (appName: string) =>
    `tell application "${appName}" to activate`,

  [OSA_SCRIPT.GET_CURRENT_WINDOW]: (appName: string) =>
    wrapTellApplication(appName, 'current window'),

  [OSA_SCRIPT.GET_VERSION]: (appName: string) =>
    `version of application "${appName}"`,

  [OSA_SCRIPT.OPEN_WINDOW]: (appName: string) =>
    wrapTellApplication(appName, 'create window with profile'),

  [OSA_SCRIPT.GET_REFERENCE]: (
    appName: string,
    windowId: string,
    instance = 'current session'
  ) => wrapTellApplication(appName, wrapTell(windowId, instance)),

  [OSA_SCRIPT.OPEN_TAB]: (appName: string, windowId: string) =>
    wrapTellApplication(
      appName,
      wrapTell(windowId, 'create tab with default profile')
    ),

  [OSA_SCRIPT.SPLIT]: (
    appName: string,
    sessionId = 'current session',
    direction = 'vertically'
  ) =>
    wrapTellApplication(
      appName,
      wrapTell(sessionId, `split ${direction} with default profile`)
    ),

  [OSA_SCRIPT.WRITE]: (appName: string, sessionId: string, command: string) =>
    wrapTellApplication(
      appName,
      wrapTell(sessionId, `write text "${command}"`)
    ),

  [OSA_SCRIPT.CUSTOM_TELL]: (
    appName: string,
    id: string,
    tellCommand: string
  ) => wrapTellApplication(appName, wrapTell(id, tellCommand)),
};

export default Object.entries(osaScripts).reduce((result, [name, script]) => {
  result[name] = (...args: string[]) => wrapOsaScript((script as any)(...args));
  return result;
}, {});
