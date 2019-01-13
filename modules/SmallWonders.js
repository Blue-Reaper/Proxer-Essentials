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
			setImgBackToTop();
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
	var backToTopButton = ['<a href="#top" class="backToTop">Nach oben</a>'].join("");
	$("body").append(backToTopButton)
	setImgBackToTop();
// Funktion für das Scroll-Verhalten
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

// Setzt die Bilder für den BackToTop Button, je nach eingestelltem Proxer-Style
function setImgBackToTop(){
	switch (getCookie('style')) {
		case "gray":
		// Setzt Bild
			$('.backToTop').css("background-image", 'url('+GM_getResourceURL("btt_gray")+')');
			$('.backToTop').hover(function(){
				// Setzt Bild bei hover
				$('.backToTop').css("background-image", 'url('+GM_getResourceURL("btt_hover_gray")+')');
			}, function(){
				// Setzt Bild nach hover
				$('.backToTop').css("background-image", 'url('+GM_getResourceURL("btt_gray")+')');
			});
			break;
		case "black":
			$('.backToTop').css("background-image", 'url('+GM_getResourceURL("btt_white")+')');
			$('.backToTop').hover(function(){
				$('.backToTop').css("background-image", 'url('+GM_getResourceURL("btt_hover_white")+')');
			}, function(){
				$('.backToTop').css("background-image", 'url('+GM_getResourceURL("btt_white")+')');
			});
			break;
		case "old_blue":
			$('.backToTop').css("background-image", 'url('+GM_getResourceURL("btt_oldBlue")+')');
			$('.backToTop').hover(function(){
				$('.backToTop').css("background-image", 'url('+GM_getResourceURL("btt_hover_oldBlue")+')');
			}, function(){
				$('.backToTop').css("background-image", 'url('+GM_getResourceURL("btt_oldBlue")+')');
			});
		break;
		case "pantsu":
			$('.backToTop').css("background-image", 'url('+GM_getResourceURL("btt_pantsu")+')');
			$('.backToTop').hover(function(){
				$('.backToTop').css("background-image", 'url('+GM_getResourceURL("btt_hover_pantsu")+')');
			}, function(){
				$('.backToTop').css("background-image", 'url('+GM_getResourceURL("btt_pantsu")+')');
			});
			break;eak;
		default:
			$('.backToTop').css("background-image", 'url('+GM_getResourceURL("btt_gray")+')');
			$('.backToTop').hover(function(){
				// Setzt Bild bei hover
				$('.backToTop').css("background-image", 'url('+GM_getResourceURL("btt_hover_gray")+')');
			}, function(){
				// Setzt Bild nach hover
				$('.backToTop').css("background-image", 'url('+GM_getResourceURL("btt_gray")+')');
			});
			break;
	}
}
