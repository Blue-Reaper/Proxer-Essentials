// Muster

// Legt die Modul-Id fest und schreibt sie in die Liste aller Module
pefModulList.push("pefExample");

// Legt fest, welcher Name in den Einstellungen angezeigt Wird
// Syntax für Methodenname: Modul-Id + "Name"
window.pefExampleName = function () {
	return "Beispiel Modul";
}

// Legt die Kurzbeschreibung fest, die in den Einstellungen angezeigt wird
// Sysntax für Methodenname: Modul-Id + "Description"
window.pefExampleDescription = function () {
	return "Dieses Modul dient als Muster, zur Erstellung weiterer Scripte.";
}

// Aufruf des Scripts durch das Framework
// Syntax für Methodenname: Modul-Id + "Call"
window.pefExampleCall = function (change) {
	switch(change) {
		case "on":
			// Wird nach dem Laden der Seite Aufgerufen, sollte das Modul aktiviert sein
			// Wird auch aufgerufen, wenn der User das Modul in den Einstellungen aktiviert
            console.log("on");
            myExampleMethod();
			break;
		case "ajax":
			// Wird durch einen Ajax-Aufruf auf der Seite getriggert
			// Nur wenn das Modul aktiv ist
			// Es wird immer erst nach "on" aufgerufen
            console.log("ajax");
            myExampleMethod();
			break;
		case "off":
			// Wird aufgerufen, wenn der User in den Einstellungen dieses Modul ausschaltet
            console.log("off");
            anotherExampleMethod();
			break;
		default:
            console.error("Fehlerhafter Aufruf actionControl() mit '"+change+"'");
	}
}


function myExampleMethod() {
// Hier ist der Code des Scipts
	console.log("Das Muster-Modul läuft");
}

function anotherExampleMethod() {
// Wenn das Modul ausgeschaltet wird passiert evtl. etwas
	console.log("Das Mustet-Modul wurde deaktiviert");
}
