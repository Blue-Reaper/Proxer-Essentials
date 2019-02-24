// Muster (Proxer Essentials Framework Example)

// Jedes Modul muss sich in die pefModulList eintragen
// pefModulList.push({
// 	// Eindeutiger String, der als Id verwendet wird
//     id:"pefExample",
// 	// Der angezeigte Name des Moduls
//     name:"Beispiel Modul",
// 	// Die Kurzbeschreibung
//     description:"Ein Muster zur Erstellung weiterer Scripte",
//  // Link zur Infoseite mit den Details
//     link: 'https://...',
// 	// Der Ersteller dieses Moduls
// 	autor:"Blue.Reaper",
// 	// Mit dieser Methode wird das Modul aufgerufen
// 	callMethod:(change)=>pefExampleCall(change)
// });

// Aufruf des Scripts durch das Framework
function pefExampleCall (change:ModulCallEvent){
	switch(change) {
		case ModulCallEvent.on:
			// Wird nach dem Laden der Seite Aufgerufen, sollte das Modul aktiviert sein
			// Wird auch aufgerufen, wenn der User das Modul in den Einstellungen aktiviert
            console.log("on");
            myExampleMethod();
			break;
		case ModulCallEvent.ajax:
			// Wird durch einen Ajax-Aufruf auf der Seite getriggert
			// Nur wenn das Modul aktiv ist
			// Es wird immer erst nach "on" aufgerufen
            console.log("ajax");
            myExampleMethod();
			break;
		case ModulCallEvent.off:
			// Wird aufgerufen, wenn der User in den Einstellungen dieses Modul ausschaltet
            console.log("off");
            anotherExampleMethod();
			break;
	}
}


function myExampleMethod() {
// Hier ist der Code des Scipts
	// console.log("Das Muster-Modul läuft");
}

function anotherExampleMethod() {
// Wenn das Modul ausgeschaltet wird passiert evtl. etwas
	// console.log("Das Mustet-Modul wurde deaktiviert");
}
