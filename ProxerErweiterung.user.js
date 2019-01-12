// ==UserScript==
// @name         Scripts4Proxer
// @version      0.3
// @description  Nützlicher Erweiterungen für Proxer die jeder haben sollte.
// @author       Blue.Reaper
// @namespace    https://blue-reaper.github.io/Scripts4Proxer/
// @include      https://proxer.me/*
// @run-at       document-start
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        unsafeWindow
// @grant    	 GM_addStyle
// @grant    	 GM_getResourceText
// @grant 		 GM_getResourceURL
// Konsolenausgabe für Debugging
// @grant        GM_log
// @require     https://proxer.me/templates/proxer14/js/jquery-1.9.1.min.js
// @require     https://proxer.me/templates/proxer14/js/jquery-ui-1.10.3.custom.min.js
// @require     https://proxer.me/templates/proxer14/js/jquery.plugins.js?3
// Framework
// @resource pef_CSS  https://raw.githubusercontent.com/Blue-Reaper/Proxer-Erweiterung/moduls-management/resources/css/pef.css
// @resource yes_img  https://proxer.me/images/misc/haken.png
// @resource no_img  https://proxer.me/images/misc/kreuz.png
// @require     https://raw.githubusercontent.com/Blue-Reaper/Proxer-Erweiterung/moduls-management/framework/menuAndSettings.js
// @require     https://raw.githubusercontent.com/Blue-Reaper/Proxer-Erweiterung/moduls-management/framework/monitorAjax.js
// @require     https://raw.githubusercontent.com/Blue-Reaper/Proxer-Erweiterung/moduls-management/framework/methodLibary.js
// Module
// @require     https://raw.githubusercontent.com/Blue-Reaper/Proxer-Erweiterung/moduls-management/modules/PefExample.js
// @require     https://raw.githubusercontent.com/Blue-Reaper/Proxer-Erweiterung/moduls-management/modules/SmallWonders.js
// ==/UserScript==

GM_addStyle (GM_getResourceText ("pef_CSS"));

//Main Methode des Frameworks
document.addEventListener('DOMContentLoaded', function(event) {
	addPefMenu();
	createPefSettings();
	actionControl("Initialisierung");
	monitorAjax();

});

// ######################################################################################################
// ######################################################################################################
// Modul Steuerung
// ######################################################################################################
// ######################################################################################################

// Liste der einzelnen Module
var pefModulList = [
	{
		id: "smallWonders",
		name : "kleine Wunder",
	},
	{
		id: "pefExample",
	  	name : "Beispielscript",
	}

];

//	Wird vom Framework aufgerufen, um die einzelnen Module aufzurufen
function actionControl(change){
	for(var i = 0; i < pefModulList.length; i++) {
		// Erst-Initialisierung der Speicherwerte
		if (GM_getValue(pefModulList[i].id+"Status")==null){
			GM_setValue(pefModulList[i].id+"Status","on");
		}
		if (GM_getValue(pefModulList[i].id+"Status")=="on"){
			switch (pefModulList[i].id) {
				case "pefExample":
				callPefExample(change);
				break;
				case "smallWonders":
				callSmallWonders(change);
				break;
				// case "Id des Moduls (wurde in pefModulList eingetragen)":
				// 	Hier die Aufrufmethode des jeweiliegen Moduls eintragen
				// 	break;
				default:
			}
		}
	}
}
