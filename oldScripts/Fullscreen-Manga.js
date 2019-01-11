// ==UserScript==
// @name         Proxer Fullscreen-Manga
// @namespace    Blue.Reaper.proxer.me
// @version      1.4
// @description  Endlich Mangas auf proxer.me in Fullscreen genießen und nur noch den Manga sehen.
// @author       Blue.Reaper
// @include      http://proxer.me/*
// @include      https://proxer.me/*
// @include      http://www.proxer.me/*
// @include      https://www.proxer.me/*
// @run-at       document-start
// lädt Anker
// @require     https://greasyfork.org/scripts/12981-proxer-userscript-anker/code/Proxer-Userscript-Anker.js?version=108562
// von Anker benötigt
// @grant        GM_setValue
// von Anker benötigt
// @grant        GM_getValue
// von Anker benötigt
// @grant        unsafeWindow
// @grant        GM_log
// @history      1.4 Bei Seitenwechsel im Fullscreen bei der neuen Seite wieder oben anfangen, document.getElementById("reader").childNode[0] zu reader.childNode[0], dynamische Kapitelanzeige oben in Fullscreen
// @history      0.1.3 Chat ausblenden (optional) und Bilder im Fullscreen wieder mittig
// @history      0.1.2 benutzt Seiten-lade Logik von internem Longstrip Reader
// @history      0.1.1 Anpassung an Proxer internem Longstrip Reader
// @history      0.1.0 Maus wird jetzt im Fullscreen ausgeblendet und ansonsten ganz normal.
// @history      0.0.8 Beenden und Öffnen des Fullscreens verändert nicht mehr die (Scroll) Position, TopButton hinzugefügt
// @history      0.0.7 Anker Extended einbinden
// @history      0.0.6 Focus setzen, um mit den Pfeiltasten gleich scorllen zu können.
// @history      0.0.5 Fullscreen Button hinzugefügt.
// @history      0.0.4 Bug behoben: Nach dem Fullscreen konnte man nicht mehr auf das Bild klicken.
// @history      0.0.3 ohne externe Bibliothek
// @history      0.0.2 Scrollen hinzufügen
// @history      0.0.1 Reader in Fullscreen
// ==/UserScript==

// Fehler:

// Features:
// Kapitelwechsel ohne Zwischenseite (optional)(Kurzes aufflackern des Kapitelnamens in Mitte des Blidschirms) trotzdem noch Bookmark
// Funktion getCookie in Anker auslagern
// TODO: Scrollbalken eigenes Design
// TODO: ein/ausschalten der SmartFullscreen Funktion im extended Anker.
// TODO: Mausausblendezeit über Extended Anker einstellen (z.B. 5 Stufen wählbar faktor)


var ausblendezeitMaus = 2100;
var ausblendezeitButton = 3100;
var currentScroll = 0;
var scrollOffset = 0;

var cusertTimeout;

//	Ruft die generischen Methoden des Ankers auf, um ein Member im Menü 'Tools' erzeugen zu lassen
document.addEventListener('DOMContentLoaded', function(event) {
	var extra = document.createElement("div");

	addAnkerMember('fullscreenManga', 'Fullscreen-Manga', 3, fullscreenManga_actionControl, 'fullscreenManga', 1, extra);

	var chatOff = createExtAnkerCheckBox("Chat ausblenden", "chatOff", "8em");
	var anleitung = createExtAnkerAnleitung("https://proxer.me/forum/anwendungen/374792-userscript-alle-browser-fullscreen-manga#695731");

	extra.appendChild(chatOff);
	extra.appendChild(anleitung);


	neueVersion("1.4","<div>Mit dieser Version neu :</div>"+
							"<div>- Bei Seitenwechsel im Fullscreen bei der neuen Seite wieder oben anfangen</div>"+
							"<div>- kleine Änderungen</div>"+
							"<a href='https://proxer.me/forum/anwendungen/374792-userscript-alle-browser-fullscreen-manga#695731'>Aktuelle Anleitung im Forum.</a>"+
							"<div>Gruß</div>"+
							"<div>Blue.Reaper</div>");
});

//	Wird vom Anker aufgerufen
function fullscreenManga_actionControl(change){
	if(change === true){
		// Ausgeschaltet
		if(GM_getValue("fullscreenManga",0) === 0){
			// if (window.location.pathname.split('/')[1] === 'read'){
				main.removeChild(fullsceenButton);
			// }
		//Eingeschaltet
		} else {
			if (window.location.pathname.split('/')[1] === 'read'){
				fullscreenManga();
			}
		}
	// Initialisierung
	} else {
		fullscreenManga();
	}
}

function fullscreenManga(){
	// Chat ausblenden
	if (GM_getValue("chatOff",0) === 1 ){
		chat.style.display = "none";
	}

	if (GM_getValue("fullscreenManga",0) === 0 || window.location.pathname.split('/')[1] !== 'read'){
		return;
	}

	document.addEventListener("fullscreenchange", toggleActionFullscreenManga);
	document.addEventListener("webkitfullscreenchange", toggleActionFullscreenManga);
	document.addEventListener("mozfullscreenchange", toggleActionFullscreenManga);
	document.addEventListener("MSFullscreenChange", toggleActionFullscreenManga);

	var divButton = document.createElement("div");
	// divButton.setAttribute("id","fullsceenButton");
	divButton.id = "fullsceenButton";
	divButton.style.textAlign = "center";
	divButton.style.marginTop =  '10px';
	var fullsceenButton = document.createElement("a");
	fullsceenButton.href = "javascript:;";
	fullsceenButton.style.fontSize= "30px";
	fullsceenButton.setAttribute("class","menu");
	fullsceenButton.innerHTML = "Fullscreen";
	divButton.appendChild(fullsceenButton);

	main.insertBefore(divButton, main.childNodes[4]);

	fullsceenButton.addEventListener("click", toggleFullscreenManga);
	window.addEventListener("keyup", function (event) {
		// Beim Drücken von F
		if (event.keyCode === 70) {
			toggleFullscreenManga();
		}
	});

	window.addEventListener("scroll", getWindowScrollTop);

	var rect = reader.getBoundingClientRect();
	scrollOffset = rect.top + document.documentElement.scrollTop - nav.offsetHeight;

	// MouseFullscreen:
	reader.children[0].addEventListener("mousemove", mouseFullscreenManga);

}

function mouseFullscreenManga(event){
	var dynamicFSButtonTimer;
	// Dynamisch angezeigter Inhalt noch nicht erzeugt
	if( document.getElementById("dynamicFSButton") === null){

		var divButton = document.createElement("div");
		divButton.id = "dynamicFSButton";
		divButton.style.textAlign = "center";
		var fullsceenButton = document.createElement("a");
		fullsceenButton.href = "javascript:;";
		fullsceenButton.style.fontSize= "30px";
		fullsceenButton.setAttribute("class","menu");
		fullsceenButton.innerHTML = "Fullscreen";
		divButton.appendChild(fullsceenButton);

		var topButton = document.createElement("a");
		topButton.href = "javascript:;";
		topButton.style.fontSize= "30px";
		topButton.setAttribute("class","menu");
		topButton.innerHTML = "Top";
		divButton.appendChild(topButton);

		reader.appendChild(divButton);

		fullsceenButton.addEventListener("click", toggleFullscreenManga);

		if( document.getElementById("fullscreen_scrollbar") === null){
			topButton.addEventListener("click", function (){window.scrollTo(0, scrollOffset);});
		}else{
			topButton.addEventListener("click", function (){fullscreen_scrollbar.scrollTo(0, 0);});
		}

		divButton.style.position = "fixed";
		divButton.style.bottom = "0px";
		divButton.style.width = "100%";
		divButton.style.maxWidth = "inherit";
		divButton.style.backgroundColor = '#000000';
		divButton.style.opacity = '0.7';

		fullsceenButton.style.margin = "5px 5px";

		// Fullscreen aktiv
		if( document.getElementById("fullscreen_scrollbar") !== null){
			var divTitle = document.createElement("div");
			divTitle.id = "dynamicFSTitle";
			divTitle.innerHTML = breadcrumb.textContent;
			reader.appendChild(divTitle);

			divTitle.style.position = "fixed";
			divTitle.style.top = "0px";
			divTitle.style.width = "100%";
			divTitle.style.maxWidth = "inherit";
			divTitle.style.fontSize= "30px";
			divTitle.style.backgroundColor = '#000000';
			divTitle.style.opacity = '0.7';
		}

		dynamicFSButtonTimer = setTimeout(function(){ reader.removeChild(divButton); reader.removeChild(dynamicFSTitle); },ausblendezeitButton);
	} else {
		clearTimeout(dynamicFSButtonTimer);
		dynamicFSButtonTimer = setTimeout(function(){ reader.removeChild(divButton); reader.removeChild(dynamicFSTitle); },ausblendezeitButton);
	}
}

function toggleFullscreenManga(){
	if ((document.fullScreenElement && document.fullScreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
	// Fullscreen Anschalten

		window.removeEventListener("scroll", getWindowScrollTop);

		if (reader.requestFullScreen) {
			reader.requestFullScreen();
		} else if (reader.mozRequestFullScreen) {
			reader.mozRequestFullScreen();
		} else if (reader.webkitRequestFullScreen) {
			reader.webkitRequestFullScreen();
		}
	}else {
	// Fullscreen Ausschalten

		window.addEventListener("scroll", getWindowScrollTop);

		if (document.cancelFullScreen) {
		  document.cancelFullScreen();
		} else if (document.mozCancelFullScreen) {
		  document.mozCancelFullScreen();
		} else if (document.webkitCancelFullScreen) {
		  document.webkitCancelFullScreen();
		}
	}
}


function toggleActionFullscreenManga(){
	// are we full-screen?
	if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
		// called when entering full screen

		var wrapper = document.createElement('div');

		// `elem` is the element you want to wrap
		var elem;
		if (reader.childNodes[1] != null && reader.childNodes[1].id !== "dynamicFSButton")
			elem = reader.childNodes[1];
		else
			elem = reader.childNodes[0];

		wrapper.id = "fullscreen_scrollbar";
		// wrapper.setAttribute("class","scrollBar scrollable default-skin");
		wrapper.setAttribute("align","center");
		wrapper.setAttribute("style","overflow-y:auto; height:"+(screen.height-15)+"px; margin: 5px;");
		wrapper.setAttribute("tabindex","-1");

		// var div = document.createElement('div');
		// div.setAttribute("class","scroll-bar vertical");
		// div.setAttribute("style","height: 300px; display: block;");

		// var div2 = document.createElement('div');
		// div2.setAttribute("class","thumb");
		// div2.setAttribute("style","top: 0px; height: 62.6741px;");


		// set the wrapper as child (instead of the elem)
		reader.replaceChild(wrapper, elem);

		// wrapper.appendChild(div);
		// div.appendChild(div2);

		// set elem as child of wrapper
		wrapper.appendChild(elem);

		wrapper.focus();

		fullscreen_scrollbar.scrollTo(0, currentScroll);

		fullscreen_scrollbar.onscroll = function () {
			currentScroll = fullscreen_scrollbar.scrollTop;

			// Zum Laden der Seiten im Longstrip mit Fullscreen
			var loop=true;while(loop){
				var position=unsafeWindow.$('#chapterImage'+(unsafeWindow.current_page-1)).position().top;
				var curHeight=unsafeWindow.$('#chapterImage'+(unsafeWindow.current_page-1)).height();
				var prevHeight=10000;
				if(unsafeWindow.current_page-2>=0){
					prevHeight=unsafeWindow.$('#chapterImage'+(unsafeWindow.current_page-2)).height()
				}
				if(unsafeWindow.scrollable&&(-position)>=curHeight){
					scroll=false;
					unsafeWindow.nextPage();
				}else if(unsafeWindow.scrollable&&(position)>=prevHeight){
					scroll=false;
					unsafeWindow.prevPage();
				}else{
					loop=false;
				}
			}
			if(!unsafeWindow.scrollable&&unsafeWindow.counter>1){
				unsafeWindow.scrollable=true;
			}
			unsafeWindow.counter++;

		};

		// Bei Seitenwechsel nach oben scrollen
		if (getCookie("manga_reader") == "slide")
			fullscreen_scrollbar.childNodes[0].addEventListener("click", function (){fullscreen_scrollbar.scrollTo(0, 0);});

		// Maus Ausblenden
		document.addEventListener("mousemove", hideMouse);
	} else{
		// called when exiting full screen
		var wrapper = fullscreen_scrollbar;

		// Maus dauerhaft Anzeigen
		reader.style.cursor = "auto";
		wrapper.childNodes[0].style.cursor = "pointer";
		document.removeEventListener("mousemove", hideMouse);
		clearTimeout(cusertTimeout);

		reader.replaceChild(wrapper.childNodes[0], wrapper);

		window.scrollTo(0, currentScroll + scrollOffset);
	}
}

function hideMouse(){
	reader.style.cursor = "auto";
	fullscreen_scrollbar.childNodes[0].style.cursor = "pointer";
	clearTimeout(cusertTimeout);
	cusertTimeout = setTimeout(function(){
		reader.style.cursor = "none";
		fullscreen_scrollbar.childNodes[0].style.cursor = "none";
	},ausblendezeitMaus);
}

function getWindowScrollTop(){
	currentScroll = document.documentElement.scrollTop - scrollOffset;
}

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}
