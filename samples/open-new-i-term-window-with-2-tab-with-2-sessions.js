const { iTermWindow } = require('../index');

async function test() {
  const window = await iTermWindow.create();
  const tab = window.tabs[0];
  const tab1Session1 = tab.sessions[0];
  await tab1Session1.runCommand(`echo I am tab 1 session 1`);

  const tab1Session2 = await tab1Session1.splitV();
  await tab1Session2.runCommand(`echo I am tab 1 session 2`);

  const tab2 = await window.createTab();
  const tab2Session1 = tab2.sessions[0];
  await tab2Session1.runCommand(`echo I am tab 2 session 1`);

  const tab2Session2 = await tab2Session1.splitH();
  await tab2Session2.runCommand(`echo I am tab 2 session 2`);

  return window;
}

test().then(console.log).catch(console.error);
