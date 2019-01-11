
// version     5.1
// history		5.1 einheitliche "stauts" Speichervariable an = "on", aus = "off"
// history		5.0 globale Variablen
// history		0.4.2 Funktionen hinzugefügt: createExtAnkerCheckBox(anzeigeText, memoryName, abstand) und createExtAnkerAnleitung(linkUrl)
// history		0.4.1 Erst-Initialisierung Memory und Aufgeräumt
// history		0.4.0 Bei Ajax wird changefunktion("Ajax Aufruf") aufgerufen (benötigt jetzt auch // @grant unsafeWindow) und Methode für Versionsanzeige
// history		0.3.1 Einführen der Modi
// history		0.3.0 Anker Extended (nur eingeloggt)
// history		0.2.3 Member Separator und Einstellungen hinzugefügt
// history		0.2.2 Methoden zum Erzeugen von Dialogen und Message hinzugefügt
// history		0.2.1 alphabetische Sortierung, 'ankerTop' wird nur 1x erzeugt

//Starte die Funktion "addAnker" beim Laden der Seite
document.addEventListener('DOMContentLoaded', function(event) {
    addAnker();
});

//Fügt den Button "Apps" zu "leftNav" hinzu
var addAnker = function() {
	if (document.getElementById('ankerTop') === null) {
		var ul = document.getElementById("leftNav");
		var li = document.createElement("li");
		li.setAttribute("id","ankerTop");
		li.setAttribute("class","topmenu");
		ul.appendChild(li);
		document.getElementById('ankerTop').innerHTML = '<a href="javascript:;">Apps ▾</a><ul id="anker"></ul>';
	}
};

// Erzeugt 'Erweitert' in Apps
function createAnkerExtended(){
	if(document.getElementById("separatorAnker") === null){
		var anker = document.getElementById("anker");
		// Erzeugt Separator
		var separator = document.createElement("li");
		separator.setAttribute("id","separatorAnker");
		separator.innerHTML = '<hr></hr>';
		anker.appendChild(separator);
		// Erzeugt 'Erweitert' in Apps
		var settings = document.createElement("li");
		settings.innerHTML = '<a href="/ucp?s=scripts#top">Erweitert</a>';
		anker.appendChild(settings);
	}

	ankerExtendedTab();
};

// Fügt Reiter 'UserScripte' zu User-Control-Panel hinzu
function ankerExtendedTab(){
// Erzeugt den Tab 'Userscripte'
	if(window.location.pathname.split('/')[1] === 'ucp' && document.getElementById('ankerUserScript') === null){
		var navBar = document.getElementById('simple-navi');
		var scriptTab = document.createElement("li");
		scriptTab.setAttribute("id","ankerUserScript");
		navBar.appendChild(scriptTab);
		scriptTab.innerHTML = '<a data-ajax="true" href="/ucp?s=scripts#top">UserScripte</a>';
	}

	// Erzeugt den Ihalt des Tabs 'Userscripte'
	if(location.search === "?s=scripts" && document.getElementById('anker_ex') === null){
		var scriptTab = document.getElementById('ankerUserScript');
		scriptTab.setAttribute("class","active");
		document.getElementById('pageMetaAjax').innerHTML = 'UCP: Userscripte - Proxer.Me'; // Das ist der Titel, muss ich händisch machen
		document.title = 'UCP: Userscripte - Proxer.Me';
		var inhalt = document.querySelector('div.inner');
		inhalt.innerHTML = "";

		// Überschrift
		var h3 = document.createElement("h3");
		h3.innerHTML = "Erweiterte Userscript-Einstellungen:";
		inhalt.appendChild(h3);

		// AnkerExtended
		var ankerExtended = document.createElement("div");
		ankerExtended.setAttribute("id","anker_ex");
		inhalt.appendChild(ankerExtended);

		var divEnd = document.createElement("div");
		divEnd.setAttribute("id","anker_ex_End");
		divEnd.style.width = "30%";
		divEnd.style.float = "clear";
		divEnd.style.margin = "1%";
		divEnd.innerHTML = "Noch mehr Userscripte findet ihr <a href='http://proxer.me/forum/anwendungen'>im Forum</a>.";

		ankerExtended.appendChild(divEnd);
	}
}

//############################# Erstellen eines Members #############################

//	Fügt den Button zu "Anker" hinzu und startet die changefunktion beim Seitenaufruf
function addAnkerMember() {

	// Erst-Initialisierung Memory
	if (GM_getValue("status")==null){
		GM_setValue("status","on");
	}

	// Setzt Kennzeichen für Ajax-prüfung
	var main = document.getElementById('main');
	var curStateDiv = document.createElement("div");
	curStateDiv.setAttribute("id",'ankerStateDiv'+unsafeWindow.curState);
	main.appendChild(curStateDiv);

	var tryWrite = setInterval(function () {
	// console.log('anker');
		if (document.getElementById('anker') !== null) {
			// Simple nur wenn Modus 0,1,2,oder 3
			if(anker_Modus==0 || anker_Modus==1 || anker_Modus==2 || anker_Modus ==3){
				var withTick = (anker_Modus==1 || anker_Modus==3) ? true : false;
				addAnkerMemberSimple(withTick);
			}
			// Extended nur wenn Eingeloggt und Modus 2,3,oder 4
			if (document.getElementById('uname') !== null && (anker_Modus==2 || anker_Modus==3 || anker_Modus==4)) {
				createAnkerExtended();
				addAnkerMemberExtended();
			}
			actionControl("Initialisierung");
			clearInterval(tryWrite);
		}
	},100);

	// Prüft, ob es einen Ajax-Aufruf gab
	var lastState = 0;
	setInterval(function(){
		if (unsafeWindow.curState !== lastState){
			// Wenn neue Seite schon geladen
			if(document.getElementById('ankerStateDiv'+lastState) === null || document.getElementById('ankerStateDiv'+unsafeWindow.curState) !== null){

				lastState = unsafeWindow.curState;
				ankerExtendedTab();
				actionControl("Ajax Aufruf");
				if (document.getElementById('ankerStateDiv'+unsafeWindow.curState) === null){
					var main = document.getElementById('main');
					var curStateDiv = document.createElement("div");
					curStateDiv.setAttribute("id",'ankerStateDiv'+unsafeWindow.curState);
					main.appendChild(curStateDiv);
				}
			}
		}
	},700);
};

// Anker im Menü Apps
function addAnkerMemberSimple(withTick) {
	var anker = document.getElementById("anker");
	var member = document.createElement("li");
	member.setAttribute("id",anker_Modul_id);
	// fügt das Member an der alphabetisch richtigen Stellein
	var i=0;
	// Wenn Zähler kleiner als Listenlänge  und Name des Member größer (alphabetisch danach) als aktueller Listeneintrag, dann gehe weiter
	while(anker.childNodes.length > i && anker.childNodes[i].textContent < anker_Modulname && anker.childNodes[i].id !== "separatorAnker"){
		i++;
	}
	// Setzt Member an richtige Stelle
	anker.insertBefore(member, anker.childNodes[i]);
	// Setzt den html-Inhalt des Members
	if(withTick){
		member.innerHTML = '<a href="javascript:;">'+anker_Modulname+' <img id="'+anker_Modul_id+'_img" src="" width="15" height="15"></a>';
		updateAnkerTick();
	}else{
		member.innerHTML = '<a href="javascript:;">'+anker_Modulname+'</a>';
	}
	member.addEventListener("click",function () {
		toggleAnkerMemory();
	});
};

// Anker im User-Control-Panel
function addAnkerMemberExtended(){
	if(window.location.pathname.split('/')[1] !== 'ucp' || location.search !== "?s=scripts"){
		return;
	}
	var main = document.getElementById("main");

	var memberExtended = document.createElement("div");
	memberExtended.setAttribute("id",anker_Modul_id+'_ex');
	memberExtended.style.width = "30%";
	memberExtended.style.borderWidth = "1px";
	memberExtended.style.borderStyle = getStyleProp(main, "border-top-style");
	memberExtended.style.borderColor = getStyleProp(main, "border-top-color");
	memberExtended.style.borderRadius = getStyleProp(main, "border-top-left-radius");
	memberExtended.style.float = "left";
	memberExtended.style.margin = "1%";
	memberExtended.style.padding = "5px";

	var memberExName = document.createElement("a");
	memberExName.href = "javascript:;";
	memberExName.style.textAlign = "center";
	memberExName.style.color = getStyleProp(main, "color");
	memberExName.innerHTML = '<h3>'+anker_Modulname+'<img id="'+anker_Modul_id+'_ex_img" style="margin-left: 1em;" src="" width="20" height="20"></h3>';
	memberExtended.appendChild(memberExName);
	memberExtended.appendChild(document.createElement("hr"));
	try {
		memberExtended.appendChild(anker_Zusatz);
	}catch(err) {}

	var ankerExtended = document.getElementById('anker_ex');
	var i=0;
	// Wenn Zähler kleiner als Listenlänge  und Name des Member größer (alphabetisch danach) als aktueller Listeneintrag, dann gehe weiter
	while(ankerExtended.childNodes.length > i && ankerExtended.childNodes[i].childNodes[0].textContent < anker_Modulname && ankerExtended.childNodes[i].id !== "anker_ex_End"){
		i++;
	}
	ankerExtended.insertBefore(memberExtended, ankerExtended.childNodes[i]);
	updateAnkerTick();

	memberExName.addEventListener("click",function () {
		toggleAnkerMemory();
	});
}

// Troogelt den Speicherwert (0/1) und ruft die changefunktion auf
function toggleAnkerMemory() {
	if (GM_getValue("status") === "off") {
		GM_setValue("status","on");
	} else {
		GM_setValue("status","off");
	}
    actionControl("User Eingabe");
    updateAnkerTick();
};

// Setzt den Haken / Kreuz nach das Member
function updateAnkerTick() {
    if (GM_getValue("status") === "off") {
		try {
			document.getElementById(anker_Modul_id+'_img').src="https://proxer.me/images/misc/kreuz.png";
		}catch(err) {}
		try {
			document.getElementById(anker_Modul_id+'_ex_img').src="https://proxer.me/images/misc/kreuz.png";
		}catch(err) {}
	} else {
		try {
			document.getElementById(anker_Modul_id+'_img').src="https://proxer.me/images/misc/haken.png";
		}catch(err) {}
		try {
			document.getElementById(anker_Modul_id+'_ex_img').src="https://proxer.me/images/misc/haken.png";
		}catch(err) {}
	}
};

//############################# Erstellen eines Dialogs #############################

/*	Erzeugt einen Dialog
	Variante 1: ConfirmDialog
		-createAnkerDialog(msg, methodYes, methodNo)
	Variante 2: AlertDialog
		-createAnkerDialog(msg)
*/
function createAnkerDialog(msg, methodYes, methodNo){
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

		var dialogbuttonyes = document.createElement("a");
		dialogbuttonyes.innerHTML = '<a href="javascript:;"><img src="https://proxer.me/images/misc/haken.png" width="30" height="30"></a>';
		dialogbuttons.appendChild(dialogbuttonyes);
		if(confirmDialog){
			var dialogbuttonno = document.createElement("a");
			dialogbuttonno.innerHTML = '<a href="javascript:;" style="margin-left:30px"><img src="https://proxer.me/images/misc/kreuz.png" width="30" height="30"></a>';
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
function createAnkerMessage(msg){
	var messages = document.getElementById('messages');
	var newMessage = document.createElement("div");
	newMessage.setAttribute("class","message ankerMessage");
	newMessage.setAttribute("onclick",'delete_message("ankerMessage")');
	newMessage.innerHTML = msg;
	messages.appendChild(newMessage)
	setTimeout(function(){ newMessage.click(); },5000);
}

//############################# Versionsanzeige #############################

// Bringt nach einem Update eine Anzeige, die nur 1x erscheint, muss von Script getriggert werden
function neueVersion(version, msg){
	if(GM_getValue("version") !== version && GM_getValue("version") !== "Nicht Anzeigen"){
		var textmsg = '<h3>'+anker_Modulname+'</h3><hr></hr>'+msg;
		createAnkerDialog(textmsg);
		GM_setValue("version",version);
	}
}

//############################# Methoden-Bibliothek #############################

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
