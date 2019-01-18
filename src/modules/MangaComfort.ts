// Bei Longstrip-Reader wird bei klick auf Bild nur zum nächsten Bild gescrollt

// IDEA Kapitelwechsel ohne Zwischenseite (optional)(Kurzes aufflackern des Kapitelnamens in Mitte des Blidschirms) trotzdem noch Bookmark
pefModulList.push({
    id:"mangaComfort",
    name:"Manga Comfort",
    description:"Scrollen, Menüführung, etc.",
    autor:"Blue.Reaper",
	callMethod:(change)=>mangaComfortCall(change)
});

function mangaComfortCall (change:ModulCallEvent) {
	switch(change) {
		case ModulCallEvent.on:
			mangaComfort();
			break;
		case ModulCallEvent.off:
			break;
		case ModulCallEvent.ajax:
            mangaComfortAjax();
			break;
	}
}

function mangaComfortAjax(){
    // Ändere Link auf Bildern, damit nur zum nächsten Bild gesprungen wird
    $('#reader img').attr("onclick","");
    $('#reader img').off("click", scrollToNextPage);
    $('#reader img').click(scrollToNextPage);
    // Mauszeiger wird auch nur über Bild zur Hand
    $('#reader img').addClass("pointer");
    $('#reader a').addClass("cursorAuto");

    // TODO wenn auf 404 gesprungen wird (kein weiteres Kapitel) dann auf Kapitelübersich springen
    $('#reader img:last-child').attr("onclick","window.location=nextChapter.replace('chapter','read')+'#top'");
}

function mangaComfort(){

	if (window.location.pathname.split('/')[1] !== 'read'){
		return;
	}

}

function scrollToNextPage(){
    $('body,html').animate({
        // nicht page+1, da id bei 0 los zählt
        scrollTop: $('#chapterImage'+(current_page)).offset().top
    }, 800);
    current_page = current_page+1;
}
