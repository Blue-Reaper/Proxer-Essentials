let isCookieSet = false;

// TEMP for testing
browser.browserAction.onClicked.addListener(()=>{
    browser.tabs.removeCSS({file: "addon/css/root.css"});
    browser.tabs.removeCSS({file: "src/framework/css/design.css"});
});

// TODO when use which event trigger?
// update when the tab is updated
browser.tabs.onUpdated.addListener(tapUpdate);
// update when the tab is activated
browser.tabs.onActivated.addListener(tapUpdate);

function getActiveTab() {
  return browser.tabs.query({active: true, currentWindow: true});
}

function tapUpdate() {
    getActiveTab().then((tabs) => {
        setCSS();
        setCookie();
        // browser.tabs.sendMessage(tabs[0].id, {image: cookieVal.image});
        // browser.tabs.sendMessage(tabs[0].id, {color: cookieVal.color});
    });
}

async function setCSS(){
        browser.tabs.insertCSS({runAt: "document_start", file: "src/modules/css/smallWonders.css"});
}

async function setCookie(){
    if(!isCookieSet){
        // cookie to accept cookie warning on this site
        browser.cookies.set({
            url: "https://proxer.me/",
            name: "cookieconsent_dismissed",
            value: "yes"
        });
        // longstrip reader as standard (only if cookie isn't set)
        let getCookieManga = browser.cookies.get({
            url: "https://proxer.me/",
            name: "manga_reader"
        });
        getCookieManga.then((cookie) => {
          if (!cookie) {
              browser.cookies.set({
                  url: "https://proxer.me/",
                  name: "manga_reader",
                  value: "longstrip"
              });
          }
        });

        isCookieSet = true;
    }
}
