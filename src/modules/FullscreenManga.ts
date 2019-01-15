// History old Script
// @history      1.4 Bei Seitenwechsel im Fullscreen bei der neuen Seite wieder oben anfangen, document.getElementById("reader").childNode[0] zu reader.childNode[0], dynamische Kapitelanzeige oben in Fullscreen
// @history      0.1.0 Maus wird jetzt im Fullscreen ausgeblendet und ansonsten ganz normal.

// mögliche weitere Features:
// IDEA Maus Ausblenden auf reader
// IDEA Kapitelwechsel ohne Zwischenseite (optional)(Kurzes aufflackern des Kapitelnamens in Mitte des Blidschirms) trotzdem noch Bookmark
// IDEA fullscreen auto-on (when 1. page hit top?)

let currentScroll = 0;
let scrollOffset = 0;

pefModulList.push({
    id:"mangaFullscreen",
    name:"Manga Fullscreen",
    description:"Möglichkeit Mangas in Fullscreen zu schalten",
	callMethod:(change)=>mangaFullscreenCall(change)
});

function mangaFullscreenCall (change:ModulCallEvent) {
	switch(change) {
		case ModulCallEvent.on:
			mangaFullscreen();
			break;
		case ModulCallEvent.off:
			break;
		case ModulCallEvent.ajax:
			break;
	}
}

function mangaFullscreen(){

	if (window.location.pathname.split('/')[1] !== 'read'){
		return;
	}

	document.addEventListener("fullscreenchange", autoFullscreenEvent);
	$(window).scroll(getWindowScrollTop);

	let fullscreenButton = $('<i id="fullscreenButton" class="openFullscreen pointer fa fa-2x fa-arrows-alt"/>');
	$('body').append(fullscreenButton);
	fullscreenButton.click(toggleFullscreen);

	$(window).keyup(function (event) {
		// Beim Drücken von F
		if (event.keyCode === 70) {
			toggleFullscreen();
		}
	});

	let rect = reader.getBoundingClientRect();
	scrollOffset = rect.top + document.documentElement.scrollTop - nav.offsetHeight;
}

// wird aufgerufen um Fullscreen zu toogeln, triggert indirekt autoFullscreenEvent
function toggleFullscreen(){
    if (document.fullscreenElement) {
        // Fullscreen Ausschalten
        fullscreenOff();
    }else {
        // Fullscreen Einschalten
        fullscreenOn();
    }
}

// Wrid aufgerufen, wenn der Browser in oder aus Fullscreen wechselt
function autoFullscreenEvent(){
	if (document.fullscreenElement) {
        // Am Einschalten
        fullscreenOn();
	}else {
        // Am Ausschalten
        fullscreenOff();
	}
    $('#reader').append($('#fullscreenButton'));
}

function fullscreenOn(){
	reader.scrollTo(0, currentScroll);
	$(window).off("scroll", getWindowScrollTop);
	$('#reader').scroll(getReaderScrollTop);
    reader.requestFullscreen();
    $('#fullscreenButton').removeClass('fa-arrows-alt openFullscreen');
    $('#fullscreenButton').addClass('fa-compress exitFullscreen');
}

function fullscreenOff(){
	window.scrollTo(0, currentScroll + scrollOffset);
	$('#reader').off("scroll", getReaderScrollTop);
	$(window).scroll(getWindowScrollTop);
	document.exitFullscreen();
    $('#fullscreenButton').removeClass('fa-compress exitFullscreen');
    $('#fullscreenButton').addClass('fa-arrows-alt openFullscreen');
}

function getWindowScrollTop(){
	currentScroll = document.documentElement.scrollTop - scrollOffset;
}

function getReaderScrollTop(){
	currentScroll = reader.scrollTop;
}
