// Script um unnötiges Auszublenden
// Verwendung als Testscript

function callClearLook(change) {
	switch(change) {
		case "Initialisierung":
			// Wird beim Laden der Seite Aufgerufen, immer der erste Aufruf für das Modul
			console.log("init");
			clearLook();
			break;
		case "Ajax Aufruf":
			// Wird durch einen Ajax-Aufruf auf der Seite getriggert
			console.log("ajax");
			clearLook();
			break;
		case "Modul Stauts umschalten":
			// Wird aufgerufen, wenn der User in den Einstellungen des PEF Module aus- oder anschaltet
			console.log("user");
			clearLook();
			break;
		default:
			console.error("Fehlerhafter Aufruf actionControl() mit '"+change+"'");
	}
}

// Hauptfunktion
function clearLook(){
	 document.cookie = 'cookieconsent_dismissed=yes';
	 document.cookie = 'manga_reader=longstrip';


}



// #####################################################
// #####################################################
// alter Code
// #####################################################
// #####################################################

//Hauptfunktion
function clearlookold() {
	//Lösche Chat
    document.getElementById("chat").style.display = "none";
	// setzte Longstripreader in cookie
	try{


		neueVersion("0.0.2","<div>Mit dieser Version neu :</div>"+
							"<div>- die Versionsanzeige (dieser Dialog)</div>"+
							"<div>Sie erscheint nur 1x und informiert über Änderungen mit der neuen Version.</div>"+
							"<a href=''>Aktuelle Anleitung im Forum.</a>"+
							"<div>Gruß</div>"+
							"<div>Blue.Reaper</div>");

		 makeLogin();
	}catch(err){
		console.log("ERROR clear");
	}
};


// async
function makeLogin(){
	//Wenn nicht eingeloggt
	if (document.getElementById('messageNav') == null){
		var username = "Blue.Reaper";
		var userpass = "";
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open("POST", "https://proxer.me/login?format=json&action=login", true); // true for asynchronous
		xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xmlHttp.send("username="+username+"&password="+userpass);
		xmlHttp.onreadystatechange = function() {
			if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
				var answer = JSON.parse(xmlHttp.responseText);
				if (answer.error == 1){
					createAnkerMessage("Anmeldung fehlgeschlagen: "+answer.message);
				}else if(answer.error == 0){
					location.reload();
				}
			}
		}
	}

}
