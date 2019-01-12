// Kleine Änderungen, die Wunder wirken

// Wunder:
// Setzt cookie für Benachrichtigung "Diese Website verwendet Cookies..."
// Setzt cookie um Longstrip Reader bei Mangas standardmäßig zu aktivieren
// TODO: zurück nach oben Button

function callSmallWonders(change) {
	switch(change) {
		case "Initialisierung":
			smallWonders();
			break;
		case "Ajax Aufruf":
			// smallWonders();
			break;
		case "User change Status":
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


}
