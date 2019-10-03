let isCookieSet = false;

// TEMP for testing
browser.browserAction.onClicked.addListener(()=>{
    browser.tabs.removeCSS({file: "addon/css/essentials.css"});
    browser.tabs.removeCSS({file: "addon/css/design.css"});
});

// TODO when use which event trigger?
// update when the tab is updated
browser.tabs.onUpdated.addListener(tapUpdate);
// update when the tab is activated
browser.tabs.onActivated.addListener(tapUpdate);



// Listen for messages from content_scripts
browser.runtime.onMessage.addListener(handleMessage);

function handleMessage(request, sender, sendResponse) {

  // if (sender.url != browser.runtime.getURL("/devtools/panel/panel.html")) {
  //   return;
  // }
     if (request.MangaBack){
         var newUrl = sender.url.replace('read', 'chapter');
         browser.tabs.update(sender.tab.id,{url: newUrl});
     }
}

function getActiveTab() {
  return browser.tabs.query({active: true, currentWindow: true});
}

function tapUpdate() {
    setCSS();
    setCookie();

    getActiveTab().then((tabs) => {
        checkMangaReader(tabs[0]);

        // browser.tabs.sendMessage(tabs[0].id, {color: cookieVal.color});
    });
}

async function checkMangaReader(activeTab){
    let urlpart = activeTab.url.split('/')[3];
    if (urlpart == 'read' || urlpart == 'chapter'){
        let getCookieManga = browser.cookies.get({
            url: "https://proxer.me/",
            name: "manga_reader"
        });
        getCookieManga.then((cookie) => {
          if (cookie.value == "longstrip") {
              browser.tabs.sendMessage(activeTab.id, {mangaReader: "On"});
          } else {
              browser.tabs.sendMessage(activeTab.id, {mangaReader: "Off"});
          }
        });
    } else {
        browser.tabs.sendMessage(activeTab.id, {mangaReader: "Off"});
    }
}

async function setCSS(){
// optional css (currently not used)
    if(false){
        browser.tabs.insertCSS({runAt: "document_start", file: "src/modules/css/smallWonders.css"});
    }
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
