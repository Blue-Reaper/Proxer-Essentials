// Wunder:
// Keine Benachrichtigung "Diese Webseite verwendet Cookies ... "
// Manga Longstrip Reader als Standard
// "zurück nach oben" Button

pefModulList.push({
    id:"smallWonders",
    name:"Kleine Wunder",
    description:"Kleine Änderungen, die Wunder wirken",
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
	document.cookie = 'cookieconsent_dismissed=yes';
	// Cookie um für Mangas den Longstrip-Reader als Standard zu setzen
    document.cookie = 'manga_reader=longstrip';

// ############### BackToTop ###############
// button einfügen
	let backToTopButton = $('<i class="backToTop pointer fa fa-2x fa-chevron-up"/>');
	$("body").append(backToTopButton);
// hover
	backToTopButton.hover(()=>{
		// Setzt Bild bei hover
		backToTopButton.toggleClass("fa-2x fa-chevron-up fa-3x fa-chevron-circle-up");
	}, ()=>{
		// Setzt Bild nach hover zurück auf Standard
        backToTopButton.toggleClass("fa-2x fa-chevron-up fa-3x fa-chevron-circle-up");
	});
// scroll 100 Pixel
	$(window).scroll(()=> {
		if ($(window).scrollTop() > 100) {
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
