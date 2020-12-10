// This file sets some options for easier debugging, only in development
// This file makes development easier

browser.runtime.onInstalled.addListener(async ({ reason, temporary }) => {
  //during development
  if (temporary) {
    // show popup in tab
    // browser.tabs.create({ url: 'browserAction/popup.html' });
    // show sidebar in tab
    // browser.tabs.create({ url: 'sidebar/sidebar.html' });
    // set options
  }
});
