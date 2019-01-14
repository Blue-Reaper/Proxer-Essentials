// ==UserScript==
// @name        Proxer Essentials
// @version     1.2
// @description Nützlicher Erweiterungen für Proxer die jeder haben sollte.
// @author      Blue.Reaper
// @namespace   https://blue-reaper.github.io/Proxer-Essentials/
// @include     https://proxer.me/*
// @run-at      document-start
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       unsafeWindow
// @grant       GM_addStyle
// @grant       GM_getResourceText
// @grant       GM_getResourceURL
// Konsolenausgabe für Debugging
// @grant       GM_log
// @require     https://proxer.me/templates/proxer14/js/jquery-1.9.1.min.js
// @require     https://proxer.me/templates/proxer14/js/jquery-ui-1.10.3.custom.min.js
// @require     https://proxer.me/templates/proxer14/js/jquery.plugins.js?3
// Framework
// @resource    pef_CSS   https://raw.githubusercontent.com/Blue-Reaper/Proxer-Essentials/master/resources/css/pef.css
// @require     https://raw.githubusercontent.com/Blue-Reaper/Proxer-Essentials/master/framework/AjaxMonitoring.js
// @require     https://raw.githubusercontent.com/Blue-Reaper/Proxer-Essentials/master/framework/MenuAndSettings.js
// @require     https://raw.githubusercontent.com/Blue-Reaper/Proxer-Essentials/master/framework/MethodLibary.js
// @require     https://raw.githubusercontent.com/Blue-Reaper/Proxer-Essentials/master/framework/ModulControl.js
// Module
// @require     https://raw.githubusercontent.com/Blue-Reaper/Proxer-Essentials/master/modules/PefExample.js
// @require     https://raw.githubusercontent.com/Blue-Reaper/Proxer-Essentials/master/modules/SmallWonders.js
// @require     https://raw.githubusercontent.com/Blue-Reaper/Proxer-Essentials/fullscreen-manga/modules/FullscreenManga.js
// ==/UserScript==

GM_addStyle (GM_getResourceText ("pef_CSS"));

// Liste aller Module
// Hier wird die jeweilige Modul-Id festgelegt
window.pefModulList = ["smallWonders", "fullscreenManga", "pefExample"];

//Main Methode des Frameworks
document.addEventListener('DOMContentLoaded', function(event) {
	initStatusMemory();
	addPefMenu();
	createPefSettings();
	actionControl("on");
	monitorAjax();

});
