// Kleine Änderungen, die Wunder wirken

// Wunder:
// Keine Benachrichtigung "Diese Webseite verwendet Cookies ... "
// Manga Longstrip Reader als Standard
// "zurück nach oben" Button

window.smallWondersName = function () {
	return "kleine Wunder";
}

window.smallWondersDescription = function () {
	return "Kleine Änderungen, die Wunder wirken";
}

window.smallWondersCall = function (change) {
	switch(change) {
		case "on":
			smallWonders();
			break;
		case "ajax":
			break;
		case "off":
			// smallWonders();
			break;
		default:
	}
}

function smallWonders(){
// Cookie damit Nachricht "Diese Website verwendet Cookies..." nicht kommt
	document.cookie = 'cookieconsent_dismissed=yes';
	// Cookie um für Mangas den Longstrip-Reader als Standard zu setzen
	document.cookie = 'manga_reader=longstrip';

// ############### BackToTop ###############
// button einfügen
	var backToTopButton = $('<i class="backToTop pointer fa fa-2x fa-chevron-up"/>');
	$("body").append(backToTopButton)
// hover
	$(backToTopButton).hover(function(){
		// Setzt Bild bei hover
		$(backToTopButton).removeClass("fa-2x fa-chevron-up");
		$(backToTopButton).addClass("fa-3x fa-chevron-circle-up");
	}, function(){
		// Setzt Bild nach hover zurück auf Standard
		$(backToTopButton).removeClass("fa-3x fa-chevron-circle-up");
		$(backToTopButton).addClass("fa-2x fa-chevron-up");
	});
// scroll 100 Pixel
	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			$(backToTopButton).fadeIn();
		} else {
			$(backToTopButton).fadeOut();
		}
	});
// click
	$(backToTopButton).click(function () {
		$('body,html').animate({
			scrollTop: 0
		}, 800);
		return false;
	});

}
