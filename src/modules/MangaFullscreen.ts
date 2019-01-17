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
    description:"Mangas im Fullscreen genießen",
    autor:"Blue.Reaper",
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
            mangaFullscreenAjax();
			break;
	}
}

function mangaFullscreenAjax(){
    // Setze Button neu, wenn #reader befüllt wurde
    $('#reader').append($('#fullscreenButton'));
    // Ändere Link auf Bildern, damit nur zum nächsten Bild gesprungen wird
    $('#reader img').attr("onclick","");
    $('#reader img').off("click", scrollToNextPage);
    $('#reader img').click(scrollToNextPage);
    // TODO wenn auf 404 gesprungen wird (kein weiteres Kapitel) dann auf Kapitelübersich springen
    $('#reader img:last-child').attr("onclick","window.location=nextChapter.replace('chapter','read')+'#top'");
}

function mangaFullscreen(){

	if (window.location.pathname.split('/')[1] !== 'read'){
		return;
	}

	document.addEventListener("fullscreenchange", toggleFullscreenEvent);
	$(window).scroll(getWindowScrollTop);

	let fullscreenButton = $('<i id="fullscreenButton" class="openFullscreen pointer fa fa-2x fa-arrows-alt"/>');
	$('body').append(fullscreenButton);
	fullscreenButton.click(toggleFullscreenManual);

	$(window).keyup(function (event) {
		// Beim Drücken von F
		if (event.keyCode === 70) {
			toggleFullscreenManual();
		}
	});

	let rect = reader.getBoundingClientRect();
	scrollOffset = rect.top + document.documentElement.scrollTop - nav.offsetHeight;

}

//Manuell den Fullscreen togglen, triggert indirekt toggleFullscreenEvent
function toggleFullscreenManual(){
// Is Fullscreen on?
    if (document.fullscreenElement) {
        // Fullscreen Ausschalten
        fullscreenOff();
    }else {
        // Fullscreen Einschalten
        fullscreenOn();
    }
}

// Wrid aufgerufen, wenn der Browser in oder aus Fullscreen wechselt
function toggleFullscreenEvent(){
	if (document.fullscreenElement) {
        // Am Einschalten
        fullscreenOn();
	}else {
        // Am Ausschalten
        fullscreenOff();
	}
    $('#fullscreenButton').toggleClass('fa-arrows-alt openFullscreen fa-compress exitFullscreen');
}

function fullscreenOn(){
	reader.scrollTo(0, currentScroll);
	$(window).off("scroll", getWindowScrollTop);
	$('#reader').scroll(getReaderScrollTop);
    reader.requestFullscreen();
// Load pages (Proxer function)
    $('#reader').on('scroll', function(e) {
        let loop = true;
        while (loop) {
            let position = $('#chapterImage'+(current_page-1)).position().top;
            let scrolled = $(window).scrollTop();
            let curHeight = $('#chapterImage'+(current_page-1)).height();
            let prevHeight = 10000;
            if (current_page-2 >= 0) {
                prevHeight = $('#chapterImage'+(current_page-2)).height()
            }
            if (scrollable && (scrolled-position) >= curHeight) {
                scroll = false;
                nextPage();
            }else if (scrollable && (position-scrolled) >= prevHeight) {
                scroll = false;
                prevPage();
            }else{
                loop = false;
            }
        }
        if (!scrollable && counter > 1) {
            scrollable = true;
        }
        counter++;
    });
}

function fullscreenOff(){
	window.scrollTo(0, currentScroll + scrollOffset);
	$('#reader').off("scroll", getReaderScrollTop);
	$(window).scroll(getWindowScrollTop);
	document.exitFullscreen();
}

function scrollToNextPage(){
    // Is Fullscreen on?
    if (document.fullscreenElement) {
        $('#reader').animate({
            // nicht page+1, da id bei 0 los zählt
            scrollTop: $('#chapterImage'+(current_page)).offset().top - $('#reader').offset().top + $('#reader').scrollTop()
        }, 800);
    }else{
        $('body,html').animate({
            scrollTop: $('#chapterImage'+(current_page)).offset().top
        }, 800);
    }
    current_page = current_page+1;
}

function getWindowScrollTop(){
	currentScroll = document.documentElement.scrollTop - scrollOffset;
}

function getReaderScrollTop(){
	currentScroll = reader.scrollTop;
}
