// Script um unnötiges Auszublenden
// Verwendung als Testscript

function callClearLook(change) {
	switch(change) {
		case "Initialisierung":
			// Wird beim Laden der Seite Aufgerufen, immer der erste Aufruf für das Modul
			// TODO
			console.log("init");
			break;
		case "Ajax Aufruf":
			// Wird durch einen Ajax-Aufruf auf der Seite getriggert
			// TODO
			console.log("ajax");
			break;
		case "Modul Stauts umschalten":
			// Wird aufgerufen, wenn der User in den Einstellungen des PEF Module aus- oder anschaltet
			// TODO
			console.log("user");
			break;
		default:
			console.error("Fehlerhafter Aufruf actionControl() mit '"+change+"'");
	}
}

// Hauptfunktion
function clearLook(){
	console.log("Script Clear Look aufgerufen");
	$.cookie("cookieconsent_dismissed", "yes");

	// unsafeWindow.set_cookie('manga_reader','longstrip',unsafeWindow.cookie_expire);
	// unsafeWindow.set_cookie('cookieconsent_dismissed','yes',unsafeWindow.cookie_expire);
}



// #####################################################
// #####################################################
// alter Code
// #####################################################
// #####################################################
var me = document.createElement("a");
me.innerHTML = "Test";
// me.href = "https://proxer.me/forum/anwendungen";
me.addEventListener("click",function () {
	console.log("Link geklickt.");
});
// console.log("add");
addAnkerMember('clearlook', 'Clear-Look', 4, clearlook_actionControl, 'clearlook', 1, me);
/*	Wird vom Anker aufgerufen
	change == true  --> Speicherwert wurde verändert
	change == false  --> Speicherwert unverändert (Initalisierung)
*/
function clearlook_actionControl(change){
	if(change === true){
		// Ausgeschaltet
		if(GM_getValue("clearlook",0) === 0){
		//Eingeschaltet
		} else {
			clearlook();
		}
	// Initialisierung
	} else {
		clearlook();
	}
	// Ajax von Proxer
	if(change === "Ajax Aufruf"){
		console.log("Ajax in Clear-Look");
		clearlook();
	}
}

//Hauptfunktion
function clearlook() {
	//Wenn ausgeschaltet nix machen
	if(GM_getValue("clearlook",0) === 0){
		return;
	}
	//Lösche Chat
    document.getElementById("chat").style.display = "none";
	// setzte Longstripreader in cookie
	try{


	// TODO: joyride zum laufen bringen
	// TODO: Bootstrap einbinden
		// var cssId = 'joyridecss';
		// if (!document.getElementById(cssId)){
			// var head  = document.getElementsByTagName('head')[0];
			// var link  = document.createElement('link');
			// link.id   = cssId;
			// link.rel  = 'stylesheet';
			// link.type = 'text/css';
			// link.href = 'https://cdn.css.net/files/jquery.joyride/2.0.3/joyride-2.0.3.css';
			// link.media = 'all';
			// head.appendChild(link);
		// }
		// console.log("css");

		// var jsId = 'joyridejs';
		// if (!document.getElementById(jsId)){
			// var head  = document.getElementsByTagName('head')[0];
			// var script  = document.createElement('script');
			// script.id   = jsId;
			// script.type = 'text/javascript';
			// script.src = 'https://cdn.css.net/files/jquery.joyride/2.0.3/jquery.joyride-2.0.3.js';
			// head.appendChild(script);
		// }

			// var ol = document.createElement("ol");
			// ol.id = "clearlook_joyride"
			// ol.style.display = "none";
			// document.body.appendChild(ol);

			// var li = document.createElement("li");
			// li.setAttribute("data-id","message");
			// li.innerHTML="TEST";
			// ol.appendChild(li);
			// console.log("append");

			// setTimeout(function(){
				// console.log("before");

				// unsafeWindow.$("#clearlook_joyride").foundation();
				// unsafeWindow.$("#clearlook_joyride").foundation('joyride', 'start');
				// unsafeWindow.$("#clearlook_joyride").joyride({
					// autoStart:true,
					 // postRideCallback: function () {
						// unsafeWindow.$('#clearlook_joyride').joyride('destroy');
					// }
				 // });

				// console.log("after");
			// },5000);

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
// ##############################################################################################################
};


async
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
