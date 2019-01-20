// Wunder:
// "zurück nach oben" Button
// Grid-Anzeige als Standard, statt Listenansicht

pefModulList.push({
    id:"smallWonders",
    name:"Kleine Wunder",
    description:"Kleine Änderungen, die Wunder wirken",
    autor:"Blue.Reaper",
	callMethod:(change)=>smallWondersCall(change)
});

function smallWondersCall (change:ModulCallEvent) {
	switch(change) {
		case ModulCallEvent.on:
			smallWonders();
			break;
		case ModulCallEvent.off:
		// smallWonders();
			break;
		case ModulCallEvent.ajax:
            // smallWonders();
			break;
	}
}

function smallWonders(){
    // Cookie damit Nachricht "Diese Website verwendet Cookies..." nicht kommt
    setCookie('cookieconsent_dismissed','yes');

    // Cookie setzt Grid-Anzeige als Standard (im Gegensatz zu der Listenansicht), wenn noch kein Cookie gesetzt ist
    if(getCookie("manga_reader") != "tablelist"){
        setCookie('entryView','grid');
    }

// ############### BackToTop ###############
// button einfügen
	let backToTopButton = $('<i class="backToTop pointer fa fa-2x fa-chevron-up"/>');
	$("body").append(backToTopButton);
// scroll 100 Pixel
	$(window).scroll(()=> {
		if ($(window).scrollTop() > 1000) {
			backToTopButton.fadeIn();
		} else {
			backToTopButton.fadeOut();
		}
	});
// click
	backToTopButton.click(()=> {
		$('body,html').animate({
			scrollTop: 0
		}, 800);
		return false;
	});

}
