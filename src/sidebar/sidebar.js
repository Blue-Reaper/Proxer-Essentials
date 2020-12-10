setInitialStyle();

// Set the element style when the extension page loads
async function setInitialStyle() {
  const theme = await browser.theme.getCurrent();
  setSidebarStyle(theme);
}

function setSidebarStyle(theme) {
  if (theme.colors && theme.colors.sidebar) {
    document.body.style.backgroundColor = theme.colors.sidebar;
  }

  if (theme.colors && theme.colors.toolbar_field) {
    let style = document.createElement('style');
    style.setAttribute('type', 'text/css');
    let css = ':root { --sidebar-highlight: ' + theme.colors.toolbar_field + ';}';
    style.appendChild(document.createTextNode(css));
    document.head.append(style);
  }

  if (theme.colors && theme.colors.toolbar_field_text) {
    let style = document.createElement('style');
    style.setAttribute('type', 'text/css');
    let css = ':root { --sidebar-text: ' + theme.colors.toolbar_field_text + ';}';
    style.appendChild(document.createTextNode(css));
    document.head.append(style);
  }
}

// Watch for theme updates
browser.theme.onUpdated.addListener(async ({ theme, windowId }) => {
  const sidebarWindow = await browser.windows.getCurrent();
  /*
      Only update theme if it applies to the window the sidebar is in.
      If a windowId is passed during an update, it means that the theme is applied to that specific window.
      Otherwise, the theme is applied globally to all windows.
    */
  if (!windowId || windowId == sidebarWindow.id) {
    setSidebarStyle(theme);
  }
});
