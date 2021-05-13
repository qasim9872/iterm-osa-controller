const { iTermWindow } = require('../index');

async function test() {
  const window = await iTermWindow.create();
  await window.createTab();
  return window;
}

test().then(console.log).catch(console.error);
