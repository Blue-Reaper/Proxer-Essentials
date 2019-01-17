// ==UserScript==
// @name        Proxer Essentials
// @version     3.2
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
// @resource    pef_CSS   https://raw.githubusercontent.com/Blue-Reaper/Proxer-Essentials/master/resources/css/pef.css
// Theatermodus
// @include     https://stream.proxer.me/*
// Theme Modern Dark
// @resource    themeModernDark_CSS   https://raw.githubusercontent.com/Blue-Reaper/Proxer-Essentials/add-theme/resources/css/themeModernDark.css
// ==/UserScript==

GM_addStyle (GM_getResourceText ("pef_CSS"));
GM_addStyle (GM_getResourceText ("pefthemeModernDark_CSS_CSS"));


// Liste aller Module
let pefModulList :IPefModul[] = [];

//Main Methode des Frameworks
$(document).ready(function(){
	initStatusMemory();
	addPefMenu();
	createPefSettings();
	actionControl(ModulCallEvent.on);
	monitorAjax();
});
