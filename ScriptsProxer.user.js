// ==UserScript==
// @name         Scripts4Proxer
// @version      0.1
// @description  Sammlung bewährter Userscripte
// @author       Blue.Reaper
// @namespace    Blue.Reaper.proxer.me
// @include      http://proxer.me/*
// @include      https://proxer.me/*
// @include      http://www.proxer.me/*
// @include      https://www.proxer.me/*
// @run-at       document-start
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        unsafeWindow
// Konsolenausgabe für Debugging
// @grant        GM_log
// lädt Anker
// @require      Anker.js

// TODO: Alle Variablen müssen für jedes Script spezifisch gespeichert werden , z.B. status für Fullscreen, status für Clear-Look, etc.

document.addEventListener('DOMContentLoaded', function(event) {
    var anker_Modul_id = 'fullscreenManga';
    var anker_Modulname = 'Fullscreen-Manga';
    var anker_Modus = 3;
    // var anker_Changefunktion; //actionControl()
    // var anker_MemoryName; // status
    // var anker_MemoryDefault; // gibts nicht mehr, ist immer an
    var anker_Zusatz = document.createElement("div");

	addAnkerMember();

	var chatOff = createExtAnkerCheckBox("Chat ausblenden", "chatOff", "8em");
	var anleitung = createExtAnkerAnleitung("https://proxer.me/forum/anwendungen/374792-userscript-alle-browser-fullscreen-manga#695731");

	anker_Zusatz.appendChild(chatOff);
	anker_Zusatz.appendChild(anleitung);


	neueVersion("1.4","<div>Mit dieser Version neu :</div>"+
							"<div>- Bei Seitenwechsel im Fullscreen bei der neuen Seite wieder oben anfangen</div>"+
							"<div>- kleine Änderungen</div>"+
							"<a href='https://proxer.me/forum/anwendungen/374792-userscript-alle-browser-fullscreen-manga#695731'>Aktuelle Anleitung im Forum.</a>"+
							"<div>Gruß</div>"+
							"<div>Blue.Reaper</div>");
});
