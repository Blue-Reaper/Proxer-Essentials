// Kleine Änderungen, die Wunder wirken

// Wunder:
// Setzt cookie für Benachrichtigung "Diese Website verwendet Cookies..."
// Setzt cookie um Longstrip Reader bei Mangas standardmäßig zu aktivieren
// TODO: zurück nach oben Button

window.pefModulList.push("smallWonders");
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
			// smallWonders();
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


}
