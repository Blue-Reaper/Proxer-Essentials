// ==UserScript==
// @name        Proxer Bookmark-Assistant
// @namespace   de.34749.proxer
// @description Unterstützt durch das selbstständige Setzen von Lesezeichen auf proxer.me.
// @author      Blue.Reaper
// @include     http://proxer.me/*
// @include     https://proxer.me/*
// @include     http://www.proxer.me/*
// @include     https://www.proxer.me/*
// @version     2.0
// lädt Anker
// @require		https://greasyfork.org/scripts/12981-proxer-userscript-anker/code/Proxer-Userscript-Anker.js?version=108562
// @run-at      document-start
// von Anker benötigt
// @grant       GM_setValue
// von Anker benötigt
// @grant       GM_getValue
// von Anker benötigt
// @grant        unsafeWindow
// @grant       GM_log
// @history     2.0 Lesezeichen werden jetzt auch für Animes gesetzt
// @history     0.1.2 Anker Extended einbinden
// @history     0.1.1 Lesezeichen Button ausblenden, Info bei gleichem Bookmark
// @history     0.1.0 eigene Dialog Boxen
// @history     0.0.2 ajax Abfrage für bessere Performance
// @history     0.0.1 Iitialisiert
// ==/UserScript==

// Für Version 2.0
//TODO: Lesezeichen auch für Anime var= nav_nxt und video_controlls Zeit prüfen

// Für Versoin 2.1
// TODO: Für mehrere Tabs auslegen
// TODO: Lesezeichenspeicher Manga nicht nur in GM_Value sondern auch lokal in var des Tabs und dann bei event aktivate wieder GM_value überschreiben, dadurch für mehrere Tabs möglich

// Features:
// TODO: Automatisch Abschließen

var nextEpisode;

//	Ruft die generischen Methoden des Ankers auf, um ein Member im Menü 'Tools' erzeugen zu lassen
document.addEventListener('DOMContentLoaded', function(event) {
	var extra = document.createElement("div");

	addAnkerMember('bookmarkAssistant', 'Bookmark-Assistant', 4, bookmarkAssistant_actionControl, 'bookmarkAssistant', 1, extra);

	var anime = createExtAnkerCheckBox("Lesezeichen für Animes setzen", "anime", "2em");
	var manga = createExtAnkerCheckBox("Lesezeichen für Mangas setzen", "manga", "2em");
	var anleitung = createExtAnkerAnleitung("https://proxer.me/forum/anwendungen/374852-userscript-alle-browser-bookmark-assistant#696618");

	extra.appendChild(anime);
	extra.appendChild(manga);
	extra.appendChild(anleitung);

	neueVersion("0.2.0","<div>Mit dieser Version neu :</div>"+
								"<div>- Lesezeichen werden jetzt auch für Animes gesetzt</div>"+
								"<a href='https://proxer.me/forum/anwendungen/374852-userscript-alle-browser-bookmark-assistant#696618'>Aktuelle Anleitung im Forum.</a>"+
								"<div>Gruß</div>"+
								"<div>Blue.Reaper</div>");
});

//	Wird vom Anker aufgerufen
function bookmarkAssistant_actionControl(change){
	if(change === true){
		// Ausgeschaltet
		if(GM_getValue("bookmarkAssistant",0) === 0){
			deleteChapterMemory();
		//Eingeschaltet
		} else {
		bookmarkAssistant();
		}
	// Initialisierung
	} else {
		bookmarkAssistant();
	}
	// Ajax von Proxer
	if(change === "Ajax Aufruf"){
		bookmarkAssistant();
	}
}

function bookmarkAssistant() {
console.log("bookmark start");
	// Wenn ausgeschaltet oder nicht in Manga oder Anime
	if (GM_getValue("bookmarkAssistant",0) === 0 || (window.location.pathname.split('/')[1] !== 'read' && window.location.pathname.split('/')[1] !== 'chapter' && window.location.pathname.split('/')[1] !== 'watch')){
		deleteChapterMemory();
		return;
	}

	if(window.location.pathname.split('/')[1] == 'read' || window.location.pathname.split('/')[1] === 'watch'){
		getBookmarks();
	}

	// Wenn Manga
	if((window.location.pathname.split('/')[1] === 'read' || window.location.pathname.split('/')[1] === 'chapter') && GM_getValue("manga",0) === 1){

		// Im Kapitel nextChapter setzen
		if (unsafeWindow.nextChapter != null){
			GM_setValue("nextChapter",unsafeWindow.nextChapter);
		}

		// Wenn nextChapter == aktuelle Adresse (Wenn weitetgeklickt)
		if(GM_getValue("nextChapter",null) == window.location.pathname || GM_getValue("nextChapter",null)+'/' == window.location.pathname){
			var temp = GM_getValue("nextChapter",null).split('/');
			// Lesezeichen für nächste Kapitel
			if(GM_getValue("bookmark_list",null).indexOf(temp[0]+'/'+temp[1]+'/'+temp[2]+'/'+(Number(temp[3])-1)+'/'+temp[4]) > -1){
				setBookmark();
			}else{
				var re = new RegExp(temp[0]+'\/'+temp[1]+'\/'+temp[2]+'\/.*?\/', 'm');
				var oldBookmark =  GM_getValue("bookmark_list",null).match(re);
				// Lesezeichen in nicht fortgesetzter Reichenfolge
				if(oldBookmark !== null){
					// Aktuelle Lesezeichen != neue Leszeichen
					if(oldBookmark[0].split('/')[3] != temp[3]){
						createAnkerDialog ('Lesezeichen von Kapitel '+oldBookmark[0].split('/')[3]+' überschreiben mit Kapitel '+temp[3]+'?', setBookmark, deleteChapterMemory);
					// Aktuelle Lesezeichen == neue Lesezeichen
					} else {
							document.querySelector('a.menu.reminder[title="reminder_this"]').style.display = "none";
							createAnkerMessage('Lesezeichen bereits vorhanden.');
							deleteChapterMemory();
					}
				// Lesezeichen für neue Serie
				} else {
					createAnkerDialog ('Lesezeichen für neue Serie anlegen?', setBookmark, deleteChapterMemory);
				}
			}
		}
	}

	// Wenn Anime
	if(window.location.pathname.split('/')[1] === 'watch'&& GM_getValue("anime",0) === 1){
		// Wenn nextEpisode == aktuelle Adresse (Wenn weitetgeklickt)
		console.log(GM_getValue("nextEpisode",null));
		if(GM_getValue("nextEpisode",null) == window.location || GM_getValue("nextEpisode",null)+'/' == window.location){
			var temp = GM_getValue("nextEpisode",null).split('/');
			// Lesezeichen für nächste Episodes
			if(GM_getValue("bookmark_list",null).indexOf('/'+temp[3]+'/'+temp[4]+'/'+(Number(temp[5])-1)+'/'+temp[6]) > -1){
				setBookmark();
			}else{
				var re = new RegExp('\/'+temp[2]+'\/'+temp[3]+'\/.*?\/', 'm');
				var oldBookmark =  GM_getValue("bookmark_list",null).match(re);
				// Lesezeichen in nicht fortgesetzter Reichenfolge
				if(oldBookmark !== null){
					// Aktuelle Lesezeichen != neue Leszeichen
					if(oldBookmark[0].split('/')[3] != temp[5]){
						createAnkerDialog ('Lesezeichen von Episode '+oldBookmark[0].split('/')[3]+' überschreiben mit Episode '+temp[5]+'?', setBookmark, deleteChapterMemory);
					// Aktuelle Lesezeichen == neue Lesezeichen
					} else {
							document.querySelector('a.menu.reminder[title="reminder_this"]').style.display = "none";
							createAnkerMessage('Lesezeichen bereits vorhanden.');
							deleteChapterMemory();
					}
				// Lesezeichen für neue Serie
				} else {
					createAnkerDialog ('Lesezeichen für neue Serie anlegen?', setBookmark, deleteChapterMemory);
				}
			}
		}

		nextEpisode = unsafeWindow.nav_nxt;
		GM_setValue("nextEpisode",unsafeWindow.nav_nxt);
	}
}

function setBookmark(){
	document.querySelector('a.menu.reminder[title="reminder_this"]').click();
	document.querySelector('a.menu.reminder[title="reminder_this"]').style.display = "none";
	deleteChapterMemory();
}

function deleteChapterMemory(){
	GM_setValue("nextChapter",null);
	GM_setValue("nextEpisode",null);
}

async
function getBookmarks(){
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", "/ucp?s=reminder&format=raw", true); // true for asynchronous
	xmlHttp.send(null);
	xmlHttp.onreadystatechange = function() {
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
			GM_setValue("bookmark_list",xmlHttp.responseText);
		}
	}
}
