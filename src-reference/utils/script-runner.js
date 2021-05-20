const { exec } = require('child_process');
const { promisify } = require('util');
const scripts = require('./osa-scripts');

const execPromise = promisify(exec);
const NEW_LINE = '\n';
const DASHED_LINE = '==============';

const logEnabled = process.env.ENABLE_SCRIPT_LOG;

function wrapLog(...args) {
  logEnabled &&
    console.log(['', DASHED_LINE, ...args, DASHED_LINE, ''].join(NEW_LINE));
}

function runScriptWithOptions(options, scriptName, ...args) {
  if (!scripts[scriptName]) {
    throw new Error(`invalid script name provided: ${scriptName}`);
  }

  const command = scripts[scriptName](...args);

  wrapLog(command);
  return execPromise(command, options);
}

function runScript(...args) {
  return runScriptWithOptions({}, ...args);
}

module.exports = {
  runScript,
};
