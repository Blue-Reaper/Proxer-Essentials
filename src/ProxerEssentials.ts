// ==UserScript==
// @name        Proxer Essentials BETA
// @version     25-Beta
// @description Nützlicher Erweiterungen für Proxer die jeder braucht
// @author      Blue.Reaper
// @namespace   https://blue-reaper.github.io/Proxer-Essentials/
// @homepage    https://blue-reaper.github.io/Proxer-Essentials/
// @supportURL  https://github.com/Blue-Reaper/Proxer-Essentials/issues/new/choose
// @icon        https://raw.githubusercontent.com/Blue-Reaper/Proxer-Essentials/master/src/framework/img/logo_proxer.png
// @updateURL   https://greasyfork.org/scripts/382410-proxer-essentials-beta/code/Proxer%20Essentials%20BETA.user.js
// @downloadURL https://greasyfork.org/scripts/382410-proxer-essentials-beta/code/Proxer%20Essentials%20BETA.user.js
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
// @resource    framework_CSS      https://raw.githubusercontent.com/Blue-Reaper/Proxer-Essentials/beta/src/framework/css/framework.css
// @resource    modules_CSS        https://raw.githubusercontent.com/Blue-Reaper/Proxer-Essentials/beta/src/modules/css/modules.css
// @resource    design_CSS         https://raw.githubusercontent.com/Blue-Reaper/Proxer-Essentials/beta/src/framework/css/design.css
// smallWonders
// @resource    smallWonders_CSS   https://raw.githubusercontent.com/Blue-Reaper/Proxer-Essentials/beta/src/modules/css/smallWonders.css
// Theatermodus
// @include     https://stream.proxer.me/*
// @resource    theater_CSS        https://raw.githubusercontent.com/Blue-Reaper/Proxer-Essentials/beta/src/modules/css/theaterModus.css
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
