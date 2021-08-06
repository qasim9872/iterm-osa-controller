import { exec } from 'child_process';
import { promisify } from 'util';
import debug from 'debug';
import { iTermScripts } from '../osa-scripts';
import { OSA_SCRIPT } from '../osa-scripts/osa-scripts.constants';

const execPromise = promisify(exec);
const debugLog = debug('osa-controller:script-runner');

function runScriptWithOptions(
  options: { [key: string]: any },
  scriptName: OSA_SCRIPT,
  ...args: any[]
) {
  if (!iTermScripts[scriptName]) {
    throw new Error(`invalid script name provided: ${scriptName}`);
  }

  const command = iTermScripts[scriptName](...args);

  debugLog(command);
  return execPromise(command, options);
}

function runScript(scriptName: OSA_SCRIPT, ...args: any[]) {
  return runScriptWithOptions({}, scriptName, ...args);
}

module.exports = {
  runScript,
};
