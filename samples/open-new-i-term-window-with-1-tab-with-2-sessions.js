const { iTermWindow } = require('../index');

async function test() {
  const window = await iTermWindow.create();
  const tab = window.tabs[0];
  const session = tab.sessions[0];
  await session.setName('session 1');
  const session2 = await session.splitV();
  await session2.setName('session 2');
  return window.tabs[0];
}

test().then(console.log).catch(console.error);
