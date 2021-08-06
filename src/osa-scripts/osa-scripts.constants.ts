const APP_NAME = 'iTerm';

export enum OSA_SCRIPT {
  IS_RUNNING = 'isRunning',
  ACTIVATE = 'activate',
  GET_CURRENT_WINDOW = 'getCurrentWindow',
  GET_VERSION = 'getVersion',
  OPEN_WINDOW = 'openWindow',
  OPEN_TAB = 'openTab',
  GET_REFERENCE = 'getReference',
  SPLIT = 'split',
  WRITE = 'write',
  CUSTOM_TELL = 'customTell',
}

export default {
  APP_NAME,
  APP_NAME_SECONDARY: `${APP_NAME}2`, // This is for cases where iTerm2 is installed
  OSA_SCRIPT,
};
