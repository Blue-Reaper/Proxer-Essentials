// ==UserScript==
// @name        Proxer Essentials
// @version     4.1
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
// @resource    pef_CSS          https://raw.githubusercontent.com/Blue-Reaper/Proxer-Essentials/master/resources/css/pef.css
// @resource    modernDark_CSS   https://raw.githubusercontent.com/Blue-Reaper/Proxer-Essentials/master/resources/css/modernDark.css
// Theatermodus
// @include     https://stream.proxer.me/*
// ==/UserScript==

GM_addStyle (GM_getResourceText ("pef_CSS"));
// Add Style after <head> to override css of side (and dont need !important everywhere)
// But add Before sth is shown to the user
$("html").append($('<style type="text/css">'+GM_getResourceText ("modernDark_CSS")+'</style>'));

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
