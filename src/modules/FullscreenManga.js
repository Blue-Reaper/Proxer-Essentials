// @version      1.4
// @description  Endlich Mangas auf proxer.me in Fullscreen genießen und nur noch den Manga sehen.
// @history      1.4 Bei Seitenwechsel im Fullscreen bei der neuen Seite wieder oben anfangen, document.getElementById("reader").childNode[0] zu reader.childNode[0], dynamische Kapitelanzeige oben in Fullscreen
// @history      0.1.3 ... und Bilder im Fullscreen wieder mittig
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

// mögliche weitere Features:
// IDEA Maus Ausblenden auf reader
// IDEA Kapitelwechsel ohne Zwischenseite (optional)(Kurzes aufflackern des Kapitelnamens in Mitte des Blidschirms) trotzdem noch Bookmark
// IDEA Scrollbalken eigenes Design
// IDEA ein/ausschalten der SmartFullscreen Funktion im extended Anker.


var currentScroll = 0;
var scrollOffset = 0;

window.fullscreenMangaName = function () {
	return "Fullscreen Manga";
}

window.fullscreenMangaDescription = function () {
	return "Möglichkeit Mangas in Fullscreen zu schalten";
}

window.fullscreenMangaCall = function (change) {
	switch(change) {
		case "on":
			fullscreenManga();
			break;
		case "ajax":
            // myExampleMethod();
			break;
		case "off":
			break;
		default:
	}
}

function fullscreenManga(){

	if (window.location.pathname.split('/')[1] !== 'read'){
		return;
	}

	document.addEventListener("fullscreenchange", autoFullscreenEvent);
	document.addEventListener("webkitfullscreenchange", autoFullscreenEvent);
	document.addEventListener("mozfullscreenchange", autoFullscreenEvent);
	document.addEventListener("MSFullscreenChange", autoFullscreenEvent);
	$(window).scroll(getWindowScrollTop);

	// FIXME backtotop nur für test
	var fullsceenButton = $('<i class="fullscreen backToTop pointer fa fa-2x fa-arrows-alt"/>');
	$("body").append(fullsceenButton);
	$(fullsceenButton).click(toggleFullscreenManga);
	// TODO use fa-compress and fa-arrows-alt for button
	$(window).keyup(function (event) {
		// Beim Drücken von F
		if (event.keyCode === 70) {
			toggleFullscreenManga();
		}
	});

	var rect = reader.getBoundingClientRect();
	scrollOffset = rect.top + document.documentElement.scrollTop - nav.offsetHeight;

}

function autoFullscreenEvent(){
	if ((document.fullScreenElement && document.fullScreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
		fullscreenOff();
	}else {
		fullscreenOn();
	}
}

function toggleFullscreenManga(){
	if ((document.fullScreenElement && document.fullScreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
	// Fullscreen Einschalten
		fullscreenOn();
		if (reader.requestFullScreen) {
			reader.requestFullScreen();
		} else if (reader.mozRequestFullScreen) {
			reader.mozRequestFullScreen();
		} else if (reader.webkitRequestFullScreen) {
			reader.webkitRequestFullScreen();
		}
	}else {
	// Fullscreen Ausschalten
		fullscreenOff();
		if (document.cancelFullScreen) {
		  document.cancelFullScreen();
		} else if (document.mozCancelFullScreen) {
		  document.mozCancelFullScreen();
		} else if (document.webkitCancelFullScreen) {
		  document.webkitCancelFullScreen();
		}
	}
}

function fullscreenOn(){
	// TODO in css umwandeln
	reader.setAttribute("style","overflow-y:auto; height:"+(screen.height-15)+"px; position: fixed; top: 0; left: 0; width: 100%; z-index: 1000;");
	reader.scrollTo(0, currentScroll);

	$(window).off("scroll", getWindowScrollTop);
	$('#reader').scroll(getReaderScrollTop);
}

function fullscreenOff(){
	reader.setAttribute("style","");
	window.scrollTo(0, currentScroll + scrollOffset);

	$('#reader').off("scroll", getReaderScrollTop);
	$(window).scroll(getWindowScrollTop);
}

function getWindowScrollTop(){
	currentScroll = document.documentElement.scrollTop - scrollOffset;
}

function getReaderScrollTop(){
	currentScroll = reader.scrollTop;
}
