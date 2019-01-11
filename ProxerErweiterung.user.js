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
// ==/UserScript==

// ######################################################################################################
// ######################################################################################################
// Modul
// ######################################################################################################
// ######################################################################################################

// Hauptmethode des Scripts
function showMuster(change) {
	switch(change) {
		case "Initialisierung":
			// Wird beim Laden der Seite Aufgerufen, immer der erste Aufruf für das Modul
			// TODO
			console.log("init");
			break;
		case "Ajax Aufruf":
			// Wird durch einen Ajax-Aufruf auf der Seite getriggert
			// TODO
			console.log("ajax");
			break;
		case "Modul Stauts umschalten":
			// Wird aufgerufen, wenn der User in den Einstellungen des PEF Module aus- oder anschaltet
			// TODO
			console.log("user");
			break;
		default:
			console.error("Fehlerhafter Aufruf actionControl() mit '"+change+"'");
	}
}

// ######################################################################################################
// ######################################################################################################
// Modul Steuerung
// ######################################################################################################
// ######################################################################################################

var pefModulList = [
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
				showMuster(change);
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
	var ul = document.getElementById("leftNav");
	var li = document.createElement("li");
	li.setAttribute("class","topmenu");
	li.innerHTML = '<a href="javascript:;">Apps ▾</a><ul id="pef_menu"></ul>';
	ul.appendChild(li);
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
		var navBar = document.getElementById('simple-navi');
		// Lösche alle Tabs der Startseite aus Navigations-Leiste
		while (navBar.hasChildNodes()) {
		    navBar.removeChild(navBar.lastChild);
		}
// 		Lösche den Inhalt der Seite
		var inhalt = document.querySelector('div.inner');
		while (inhalt.hasChildNodes()) {
			inhalt.removeChild(inhalt.lastChild);
		}
		// Setze den Titel des Tabs im Browser
		// NOTE pageMetaAjax überhaupt nötig?
		document.getElementById('pageMetaAjax').innerHTML = 'Proxer Erweiterung'; // Das ist der Titel, muss ich händisch machen
		document.title = 'Proxer Erweiterung';

// 		Erzeuge Tab Erweiterungen
// 		Id: pef_Settings
// 		URL: ?s=settings
		var scriptTab = document.createElement("li");
		scriptTab.setAttribute("id","pef_Settings");
		navBar.appendChild(scriptTab);
		scriptTab.innerHTML = '<a data-ajax="true" href="/pef?s=settings#top">Erweiterungen</a>';

		// Erzeugt den Ihalt des Tabs 'Erweiterungen'
		if(location.search === "" || location.search === "?s=settings"){
			pef_Settings.setAttribute("class","active");
			// NOTE pageMetaAjax überhaupt nötig?
			document.getElementById('pageMetaAjax').innerHTML = 'Proxer Erweiterung'; // Das ist der Titel, muss ich händisch machen
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
		moduleBox.style.borderStyle = getStyleProp(main, "border-top-style");
		moduleBox.style.borderColor = getStyleProp(main, "border-top-color");
		moduleBox.style.borderRadius = getStyleProp(main, "border-top-left-radius");
		moduleBox.style.float = "left";
		moduleBox.style.margin = "1%";
		moduleBox.style.padding = "5px";

		var moduleName = document.createElement("h3");
		moduleName.innerHTML = pefModulList[i].name;
		moduleName.style.textAlign = "center";
		moduleName.style.color = getStyleProp(main, "color");

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

		modulStatus.addEventListener("click",function (event) {
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
		document.getElementById(modulId+'_StatusImg').src="https://proxer.me/images/misc/kreuz.png";
	} else {
		document.getElementById(modulId+'_StatusImg').src="https://proxer.me/images/misc/haken.png";
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
	var messages = document.getElementById('messages');

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
	dialogbuttonyes.addEventListener("click",function () {
		messages.removeChild(dialogoverlay);
		messages.removeChild(dialogbox);
		if(confirmDialog){
			methodYes();
		}
	});
	if(confirmDialog){
		dialogbuttonno.addEventListener("click",function () {
			messages.removeChild(dialogoverlay);
			messages.removeChild(dialogbox);
			methodNo();
		});
	}
};

//############################# Erstellen einer Message #############################

//	Erzeugt eine Message, identisch zu der Proxer.me eigenen
function createPefMessage(msg){
	var messages = document.getElementById('messages');
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

function getStyleProp(elem, prop){
    if(window.getComputedStyle)
        return window.getComputedStyle(elem, null).getPropertyValue(prop);
    else if(elem.currentStyle) return elem.currentStyle[prop]; //IE
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
