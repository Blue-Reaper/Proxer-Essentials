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

// Fügt einen "BackToTop" Button ein
	var backToTopButton = ['<i class="backToTop pointer fa fa-2x fa-chevron-up"/>'].join("");
	$("body").append(backToTopButton)
	$('.backToTop').hover(function(){
		// Setzt Bild bei hover
		$('.backToTop').removeClass("fa-2x fa-chevron-up");
		$('.backToTop').addClass("fa-3x fa-chevron-circle-up");
	}, function(){
		// Setzt Bild nach hover zurück auf Standard
		$('.backToTop').removeClass("fa-3x fa-chevron-circle-up");
		$('.backToTop').addClass("fa-2x fa-chevron-up");
	});
// Funktion für das Scroll-Verhalten des BackToTop
	$(function () {
		$(window).scroll(function () {
			if ($(this).scrollTop() > 100) { // Wenn 100 Pixel gescrolled wurde
				$('.backToTop').fadeIn();
			} else {
				$('.backToTop').fadeOut();
			}
		});
		$('.backToTop').click(function () { // Klick auf den Button
			$('body,html').animate({
				scrollTop: 0
			}, 800);
			return false;
		});
	});

}
