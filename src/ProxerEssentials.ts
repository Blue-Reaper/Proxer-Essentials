// ==UserScript==
// @name        Proxer Essentials
// @version     5.4
// @description Nützlicher Erweiterungen für Proxer die jeder braucht
// @author      Blue.Reaper
// @namespace   https://blue-reaper.github.io/Proxer-Essentials/
// @homepage    https://blue-reaper.github.io/Proxer-Essentials/
// @supportURL  https://github.com/Blue-Reaper/Proxer-Essentials/issues/new/choose
// @icon        https://raw.githubusercontent.com/Blue-Reaper/Proxer-Essentials/master/src/framework/img/logo_proxer.png
// @updateURL   https://openuserjs.org/meta/Blue.Reaper/Proxer_Essentials.meta.js
// @downloadURL https://openuserjs.org/install/Blue.Reaper/Proxer_Essentials.user.js
// @license     MIT
// @copyright   2019, Blue.Reaper (https://blue-reaper.github.io/Proxer-Essentials/)
// @include     https://proxer.me/*
// @require     http://code.jquery.com/jquery-3.4.0.min.js
// @run-at      document-start
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       unsafeWindow
// @grant       GM_addStyle
// @grant       GM_getResourceText
// @grant       GM_getResourceURL
// Konsolenausgabe für Debugging
// @grant       GM_log
// @resource    framework_CSS      https://raw.githubusercontent.com/Blue-Reaper/Proxer-Essentials/dev/src/framework/css/framework.css
// @resource    modules_CSS        https://raw.githubusercontent.com/Blue-Reaper/Proxer-Essentials/dev/src/modules/css/modules.css
// @resource    design_CSS         https://raw.githubusercontent.com/Blue-Reaper/Proxer-Essentials/dev/src/framework/css/design.css
// smallWonders
// @resource    smallWonders_CSS   https://raw.githubusercontent.com/Blue-Reaper/Proxer-Essentials/dev/src/modules/css/smallWonders.css
// Theatermodus
// @include     https://stream.proxer.me/*
// @resource    theater_CSS        https://raw.githubusercontent.com/Blue-Reaper/Proxer-Essentials/dev/src/modules/css/theaterModus.css
// ==/UserScript==

// ==OpenUserJS==
// @author Blue.Reaper
// ==/OpenUserJS==

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
