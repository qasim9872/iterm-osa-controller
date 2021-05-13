const { iTermWindow } = require('../index');

async function test() {
  const window = await iTermWindow.create();
  const tab = window.tabs[0];
  const session = tab.sessions[0];
  await session.runCommand(`echo hello`);
  return {
    window,
  };
}

test().then(console.log).catch(console.error);
