// ==UserScript==
// @name        Proxer Essentials
// @version     1.1
// @description Nützlicher Erweiterungen für Proxer die jeder haben sollte.
// @author      Blue.Reaper
// @namespace   https://blue-reaper.github.io/Proxer-Essentials/
// @include     https://proxer.me/*
// @run-at      document-start
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       unsafeWindow
// @grant    	GM_addStyle
// @grant    	GM_getResourceText
// @grant 	GM_getResourceURL
// Konsolenausgabe für Debugging
// @grant       GM_log
// @require	https://proxer.me/templates/proxer14/js/jquery-1.9.1.min.js
// @require     https://proxer.me/templates/proxer14/js/jquery-ui-1.10.3.custom.min.js
// @require     https://proxer.me/templates/proxer14/js/jquery.plugins.js?3
// Framework
// @resource 	yes_img			https://proxer.me/images/misc/haken.png
// @resource 	no_img  		https://proxer.me/images/misc/kreuz.png
// @resource	pef_CSS			resources/css/pef.css
// @resource 	btt_gray  		resources/img/BackToTopButton_gray.png
// @resource 	btt_hover_gray  	resources/img/BackToTopButtonHover_gray.png
// @resource	btt_white  		resources/img/BackToTopButton_white.png
// @resource 	btt_hover_white  	resources/img/BackToTopButtonHover_white.png
// @resource 	btt_oldBlue  		resources/img/BackToTopButton_oldBlue.png
// @resource 	btt_hover_oldBlue	resources/img/BackToTopButtonHover_oldBlue.png
// @resource 	btt_pantsu  		resources/img/BackToTopButton_pantsu.png
// @resource 	btt_hover_pantsu	resources/img/BackToTopButtonHover_pantsu.png
// @require	framework/AjaxMonitoring.js
// @require     framework/MenuAndSettings.js
// @require     framework/MethodLibary.js
// @require     framework/ModulControl.js
// Module
// @require     modules/PefExample.js
// @require     modules/SmallWonders.js
// ==/UserScript==

GM_addStyle (GM_getResourceText ("pef_CSS"));

// Liste aller Module
// Hier wird die jeweilige Modul-Id festgelegt
window.pefModulList = ["smallWonders", "pefExample"];

//Main Methode des Frameworks
document.addEventListener('DOMContentLoaded', function(event) {
	initStatusMemory();
	addPefMenu();
	createPefSettings();
	actionControl("on");
	monitorAjax();

});
