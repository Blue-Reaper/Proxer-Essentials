// Muser und Testscript

// Aufruf des Scripts
function callPefExample(change) {
	switch(change) {
		case "Initialisierung":
			// Wird beim Laden der Seite Aufgerufen, immer der erste Aufruf für das Modul
            console.log("init");
            pefExample();
			break;
		case "Ajax Aufruf":
			// Wird durch einen Ajax-Aufruf auf der Seite getriggert
            console.log("ajax");
            pefExample();
			break;
		case "User change Status":
			// Wird aufgerufen, wenn der User in den Einstellungen ein PEF Modul ein- oder ausschaltet
            console.log("user");
            pefExample();
			break;
		default:
            console.error("Fehlerhafter Aufruf actionControl() mit '"+change+"'");
	}
}

// Hauptfunktion des Moduls
function pefExample() {
 // Hier ist der Code des Scipts
}




// #####################################################
// #####################################################
// alter Test Code
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
