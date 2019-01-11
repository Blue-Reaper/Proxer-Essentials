// ==UserScript==
// @name         Scripts4Proxer
// @version      0.1
// @description  Sammlung bewährter Userscripte
// @author       Blue.Reaper
// @namespace    https://blue-reaper.github.io/Scripts4Proxer/
// @include      https://proxer.me/*
// @run-at       document-start
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        unsafeWindow
// Konsolenausgabe für Debugging
// @grant        GM_log
// @require     https://proxer.me/templates/proxer14/js/jquery-1.9.1.min.js
// @require     https://proxer.me/templates/proxer14/js/jquery-ui-1.10.3.custom.min.js
// @require     https://proxer.me/templates/proxer14/js/jquery.plugins.js?3
// @require     https://raw.githubusercontent.com/Blue-Reaper/Proxer-Erweiterung/moduls-management/modules/Clear-Look.js
// ==/UserScript==

// ######################################################################################################
// ######################################################################################################
// Modul
// ######################################################################################################
// ######################################################################################################

// Aufruf des Scripts
function callShowMuster(change) {
	switch(change) {
		case "Initialisierung":
			// Wird beim Laden der Seite Aufgerufen, immer der erste Aufruf für das Modul
			// TODO
			break;
		case "Ajax Aufruf":
			// Wird durch einen Ajax-Aufruf auf der Seite getriggert
			// TODO
			break;
		case "Modul Stauts umschalten":
			// Wird aufgerufen, wenn der User in den Einstellungen des PEF Module aus- oder anschaltet
			// TODO
			break;
		default:
	}
}

// ######################################################################################################
// ######################################################################################################
// Modul Steuerung
// ######################################################################################################
// ######################################################################################################

// Liste der einzelnen Module
var pefModulList = [
	{
		id: "clearLook",
		name : "Clear Look",
	},
	{
		id: "showMuster",
	  	name : "Musteranwendung für PEF",
	},
	{
		id: "showMuster2",
	  	name : "Musteranwendung für PEF2",
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
				case "showMuster":
				callShowMuster(change);
				break;
				case "clearLook":
				callClearLook(change);
				break;
				// case "Id des Moduls (wurde in pefModulList eingetragen)":
				// 	Hier die Hauptmethode des jeweiliegen Moduls eintragen.
				// 	break;
				default:
			}
		}
	}
}

// ######################################################################################################
// ######################################################################################################
// Erstelle Menu
// ######################################################################################################
// ######################################################################################################

var ajaxEvent = false;

//Main Methode des Frameworks
document.addEventListener('DOMContentLoaded', function(event) {
	addPefMenu();
	createPefSettings();
	actionControl("Initialisierung");
	monitorAjax();

});

// Setzt für jede Änderung an der Oberfläche die Prüfvariable auf true
document.addEventListener("DOMSubtreeModified", function(event){
		ajaxEvent = true;
});

//Fügt den Button "Apps" zu "leftNav" hinzu
// Erzeugt 'Erweiterungen' in Apps
function addPefMenu() {
	var li = document.createElement("li");
	li.setAttribute("class","topmenu");
	li.innerHTML = '<a href="javascript:;">Apps ▾</a><ul id="pef_menu"></ul>';
	leftNav.appendChild(li);
	// Erzeugt 'Erweiterungen' in Apps
	var settings = document.createElement("li");
	settings.innerHTML = '<a href="/pef?s=settings#top">Erweiterungen</a>';
	pef_menu.appendChild(settings);
};

// Zeigt die Settings des PEF an
// Erzeugt die Einstellungs-Seite für PEF
// Da es proxer.me/pef nicht gibt, wird die Startseite angezeigt
function createPefSettings(){
	if(window.location.pathname.split('/')[1] === 'pef'){
		// // Lösche alle Tabs der Startseite aus Navigations-Leiste
		$('#simple-navi').empty();
		var navBar = $('#simple-navi')[0];
// 		Lösche den Inhalt der Seite
		$('div.inner').empty();
		var inhalt = $('div.inner')[0];

		// Setze den Titel des Tabs im Browser
		// QUESTION pageMetaAjax überhaupt nötig?
		pageMetaAjax.innerHTML = 'Proxer Erweiterung'; // Das ist der Titel, muss ich händisch machen
		document.title = 'Proxer Erweiterung';

// 		Erzeuge Tab Erweiterungen
// 		Id: pef_Settings
// 		URL: ?s=settings
		var scriptTab = document.createElement("li");
		scriptTab.id="pef_Settings";
		scriptTab.innerHTML = '<a data-ajax="true" href="/pef?s=settings#top">Erweiterungen</a>';
		navBar.appendChild(scriptTab);

		// Erzeugt den Ihalt des Tabs 'Erweiterungen'
		if(location.search === "" || location.search === "?s=settings"){
			pef_Settings.setAttribute("class","active");
			// QUESTION pageMetaAjax überhaupt nötig?
			pageMetaAjax.innerHTML = 'Proxer Erweiterung'; // Das ist der Titel, muss ich händisch machen
			document.title = 'Proxer Erweiterung';

			// Überschrift
			var h3 = document.createElement("h3");
			h3.innerHTML = "Proxer Erweiterung";
			inhalt.appendChild(h3);

			// Inhalt für Modulanzeige
			var pef_module = document.createElement("div");
			pef_module.setAttribute("id","pef_module");
			inhalt.appendChild(pef_module);
			showModules(pef_module);


			// Footer
			var divEnd = document.createElement("div");
			// TODO: in css auslagern
			divEnd.style.margin = "1%";
			divEnd.style.clear = "both";
			divEnd.innerHTML = "Noch mehr Userscripte findet ihr <a href='https://proxer.me/forum/anwendungen'>im Forum</a>.";
			inhalt.appendChild(divEnd);
		}
	}
}

// Prüft alle 700ms, ob es Ajax Aufrufe gab und ruft ggf. die Module mit "Ajax Aufruf" auf
function monitorAjax(){
	setInterval(function(){
		if (ajaxEvent){
			createPefSettings();
			actionControl("Ajax Aufruf");
			ajaxEvent = false;
		}
	},700);
}

//###################################################################################
//###################################################################################
//## Hinzufügen der Module in den Einstellungen ##
//###################################################################################
//###################################################################################

// Zeitgt die einzelnen Module auf der Einstellungs-Seite an
function showModules(pef_module){

// Fügt jedes Modul hinzu
	for(var i = 0; i < pefModulList.length; i++) {
		var moduleBox = document.createElement("div");
		// TODO: in CSS auslagern
		moduleBox.style.width = "30%";
		moduleBox.style.borderWidth = "1px";
		moduleBox.style.float = "left";
		moduleBox.style.margin = "1%";
		moduleBox.style.padding = "5px";
		moduleBox.style.borderStyle = $('#main').css("border-top-style");
		moduleBox.style.borderColor = $('#main').css("border-top-color");
		moduleBox.style.borderRadius = $('#main').css("border-top-left-radius");

		var moduleName = document.createElement("h3");
		moduleName.innerHTML = pefModulList[i].name;
		moduleName.style.textAlign = "center";

		var modulStatus = document.createElement("img");
		modulStatus.id = pefModulList[i].id+'_StatusImg';
		modulStatus.style.marginLeft = "1em";
		modulStatus.width = 20;
		modulStatus.heigth = 20;
		modulStatus.style.cursor = "pointer"

		moduleName.appendChild(modulStatus);
		moduleBox.appendChild(moduleName);
		moduleBox.appendChild(document.createElement("hr"));

// TODO: Beschreibung, Version? und Button für Details hinzufügen

		pef_module.appendChild(moduleBox);
		updateModulTick(pefModulList[i].id);

		$(modulStatus).click(function (event) {
			// Bei klicken auf das Bild wird die Id ausgelesen und der "_StatusImg" Teil eintfernt, damit nur die Modul-Id über bleibt
			toggleModulStatus(event.target.id.split("_")[0]);
		});
	}
}

// Troogelt den Speicherwert und ruft das Modul auf
function toggleModulStatus(modulId) {
	if (GM_getValue(modulId+"Status") === "off") {
		GM_setValue(modulId+"Status","on");
	} else {
		GM_setValue(modulId+"Status","off");
	}
    actionControl("Modul Stauts umschalten");
    updateModulTick(modulId);
};

// Setzt den Haken / Kreuz nach das Member
function updateModulTick(modulId) {
    if (GM_getValue(modulId+"Status") === "off") {
		$("#"+modulId+"_StatusImg").attr("src", "https://proxer.me/images/misc/kreuz.png");
	} else {
		$("#"+modulId+"_StatusImg").attr("src", "https://proxer.me/images/misc/haken.png");
	}
};
//###############################################################################
//###############################################################################
//############################# Methoden-Bibliothek #############################
//###############################################################################
//###############################################################################


//############################# Erstellen eines Dialogs #############################

/*	Erzeugt einen Dialog
Variante 1: ConfirmDialog
-createPefDialog(msg, methodYes, methodNo)
Variante 2: AlertDialog
-createPefDialog(msg)
*/
function createPefDialog(msg, methodYes, methodNo){
	// Testet, ob ein Confirm-, oder ein AlertDialog angezeigt werden soll
	var confirmDialog = (methodYes != null && methodNo != null) ? true : false;

	var winH = window.innerHeight;

	// Damit der Hintergurnd gesperrt wird
	var dialogoverlay = document.createElement("div");
	dialogoverlay.style.display = "block";
	dialogoverlay.style.height = winH+"px";
	dialogoverlay.style.backgroundColor = '#A2A4A8';
	dialogoverlay.style.opacity = '0.6';

	// Das Dialogfeld
	var dialogbox = document.createElement("div");
	dialogbox.style.display = "block";
	dialogbox.style.position = "absolute";
	dialogbox.style.top = "50%";
	dialogbox.style.left = "50%";
	dialogbox.setAttribute("class","message");

	// Die Angezeigte Nachricht
	var dialogmessage = document.createElement("div");
	dialogmessage.innerHTML = msg;

	// Die Antwortbutton
	var dialogbuttons = document.createElement("div");
	if(confirmDialog){
		dialogbuttons.style.textAlign = "right";
		dialogbuttons.style.paddingRight = "30px";
	}else{
		dialogbuttons.style.textAlign = "center";
	}
	dialogbuttons.style.marginTop = "10px";

	var dialogbuttonyes = document.createElement("img");
	dialogbuttonyes.src = "https://proxer.me/images/misc/haken.png";
	dialogbuttonyes.width = 30;
	dialogbuttonyes.heigth = 30;
	dialogbuttonyes.style.cursor = "pointer"
	dialogbuttons.appendChild(dialogbuttonyes);

	if(confirmDialog){
		var dialogbuttonno = document.createElement("img");
		dialogbuttonno.src = "https://proxer.me/images/misc/kreuz.png";
		dialogbuttonno.width = 30;
		dialogbuttonno.heigth = 30;
		dialogbuttonno.style.marginLeft = "30px";
		dialogbuttonno.style.cursor = "pointer"
		dialogbuttons.appendChild(dialogbuttonno);
	}

	// Hinzufügen der Elemente
	dialogbox.appendChild(dialogmessage);
	dialogbox.appendChild(dialogbuttons);

	messages.appendChild(dialogoverlay);
	messages.appendChild(dialogbox);

	// Dialog mittig setzen
	dialogbox.style.marginTop = (dialogbox.clientHeight/-2)+"px";
	dialogbox.style.marginLeft = (dialogbox.clientWidth/-2)+"px";

	// Klicken der Buttons löscht Dialog und ruft jeweilige Mothode auf
	$(dialogbuttonyes).click(function () {
		messages.removeChild(dialogoverlay);
		messages.removeChild(dialogbox);
		if(confirmDialog){
			methodYes();
		}
	});
	if(confirmDialog){
		$(dialogbuttonno).click(function () {
			messages.removeChild(dialogoverlay);
			messages.removeChild(dialogbox);
			methodNo();
		});
	}
};

//############################# Erstellen einer Message #############################

//	Erzeugt eine Message, identisch zu der Proxer.me eigenen
function createPefMessage(msg){
	var newMessage = document.createElement("div");
	newMessage.setAttribute("class","message ankerMessage");
	newMessage.setAttribute("onclick",'delete_message("ankerMessage")');
	newMessage.innerHTML = msg;
	messages.appendChild(newMessage)
	setTimeout(function(){ newMessage.click(); },5000);
}

// CHANGED alte Funktionen
//############################# Versionsanzeige #############################

// Bringt nach einem Update eine Anzeige, die nur 1x erscheint, muss von Script getriggert werden
function neueVersion(version, msg){
	if(GM_getValue("version") !== version && GM_getValue("version") !== "Nicht Anzeigen"){
		var textmsg = '<h3>'+anker_Modulname+'</h3><hr></hr>'+msg;
		createAnkerDialog(textmsg);
		GM_setValue("version",version);
	}
}

function createExtAnkerCheckBox(anzeigeText, memoryName, abstand){

	// Erst-Initialisierung der Memory
	if (GM_getValue(memoryName)==null){
		GM_setValue(memoryName,"on");
	}

	var item = document.createElement("a");
	item.href = "javascript:;";
	item.style.color = getStyleProp(document.getElementById("main"), "color");
	item.innerHTML = '<h4 style="padding-left: 1em;">'+anzeigeText+'<img id="'+memoryName+'_'+anker_Modul_id+'_img" style="margin-left: '+abstand+';" src='+((GM_getValue(memoryName)===1) ? "https://proxer.me/images/misc/haken.png" : "https://proxer.me/images/misc/kreuz.png")+' width="15" height="15"></h4>';

	item.addEventListener("click", function(){
		if(GM_getValue(memoryName) === "off"){
			GM_setValue(memoryName,"on");
			document.getElementById(memoryName+'_'+anker_Modul_id+"_img").src="https://proxer.me/images/misc/haken.png";
		}else{
			GM_setValue(memoryName,"off");
			document.getElementById(memoryName+'_'+anker_Modul_id+"_img").src="https://proxer.me/images/misc/kreuz.png";
		}
	});
	return item;
}

function createExtAnkerAnleitung(linkUrl){
	var anleitung = document.createElement("a");
	anleitung.innerHTML = "Anleitung";
	anleitung.href = linkUrl;
	return anleitung;
}
