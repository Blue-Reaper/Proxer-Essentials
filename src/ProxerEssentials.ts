// ==UserScript==
// @name        Proxer Essentials
// @version     9-Beta
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
// @require     https://raw.githubusercontent.com/Blue-Reaper/Proxer-Essentials/dev/lib/jquery-3.4.0.min.js
// #@require     https://proxer.me/templates/proxer14/js/jquery-1.9.1.min.js
// #@require     https://proxer.me/templates/proxer14/js/jquery-ui-1.10.3.custom.min.js
// #@require     https://proxer.me/templates/proxer14/js/jquery.plugins.js?3
// @resource    framework_CSS      https://raw.githubusercontent.com/Blue-Reaper/Proxer-Essentials/dev/src/framework/css/framework.css
// @resource    modules_CSS        https://raw.githubusercontent.com/Blue-Reaper/Proxer-Essentials/dev/src/modules/css/modules.css
// @resource    design_CSS         https://raw.githubusercontent.com/Blue-Reaper/Proxer-Essentials/dev/src/framework/css/design.css
// smallWonders
// @resource    smallWonders_CSS   https://raw.githubusercontent.com/Blue-Reaper/Proxer-Essentials/dev/src/modules/css/smallWonders.css
// Theatermodus
// @include     https://stream.proxer.me/*
// @resource    theater_CSS        https://raw.githubusercontent.com/Blue-Reaper/Proxer-Essentials/dev/src/modules/css/theaterModus.css
// picList
// @resource    picList_CSS        https://raw.githubusercontent.com/Blue-Reaper/Proxer-Essentials/dev/src/modules/css/picList.css
// ==/UserScript==

GM_addStyle (GM_getResourceText ("framework_CSS"));
GM_addStyle (GM_getResourceText ("modules_CSS"));

// Liste aller Module
let pefModulList :IPefModul[] = [];

//Main Methode des Frameworks
$(document).ready(function(){
	supportDesign();
	initStatusMemory();
	addPefMenu();
	createPefSettings();
	actionControl(ModulCallEvent.on);
	monitorAjax();
});
