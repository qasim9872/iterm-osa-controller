export function wrapOsaScript(script: string) {
  return `osascript -e '${script}'`;
}

export function wrapTell(tell: string, script: string) {
  return `
  tell ${tell}
    ${script}
  end tell
  `;
}

export function wrapTellApplication(appName: string, script: string) {
  return wrapTell(`application "${appName}"`, script);
}
