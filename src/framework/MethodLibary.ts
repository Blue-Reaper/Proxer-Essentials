//############################# Erstellen eines Dialogs #############################

/*	Erzeugt einen Dialog
Variante 1: ConfirmDialog
-createPefDialog(msg, methodYes, methodNo)
Variante 2: AlertDialog
-createPefDialog(msg)
*/
function createPefDialog(msg :string, methodYes? :()=>void, methodNo? :()=>void){
	// Testet, ob ein Confirm-, oder ein AlertDialog angezeigt werden soll
	let confirmDialog = (methodYes != null && methodNo != null) ? true : false;

	// Damit der Hintergurnd gesperrt wird
	let dialogoverlay = document.createElement("div");
	dialogoverlay.className = "dialogOverlay";

	// Das Dialogfeld
	let dialogbox = document.createElement("div");
	dialogbox.className = "message dialogBox";

	// Die Angezeigte Nachricht
	let dialogmessage = document.createElement("div");
	dialogmessage.innerHTML = msg;

	// Die Antwortbutton
	let dialogbuttons = document.createElement("div");
	if(confirmDialog){
		dialogbuttons.className = "leanRight";
	}else{
		dialogbuttons.className = "center";
	}
	dialogbuttons.className = "marginTop10";

	let dialogbuttonyes = document.createElement("i");
	dialogbuttonyes.className = "fa fa-check fa-2x pointer";
	dialogbuttons.appendChild(dialogbuttonyes);

	if(confirmDialog){
		let dialogbuttonno = document.createElement("i");
		dialogbuttonno.className = "marginLeft30 fa fa-times fa-2x pointer";
		dialogbuttons.appendChild(dialogbuttonno);

		$(dialogbuttonno).click(function () {
			messages.removeChild(dialogoverlay);
			messages.removeChild(dialogbox);
			methodNo();
		});
	}

	// Hinzufügen der Elemente
	dialogbox.appendChild(dialogmessage);
	dialogbox.appendChild(dialogbuttons);

	let messages = $('#messages')[0];
	messages.appendChild(dialogoverlay);
	messages.appendChild(dialogbox);

	// Dialog mittig setzen
	dialogbox.style.marginTop = (dialogbox.clientHeight/-2)+"px";
	dialogbox.style.marginLeft = (dialogbox.clientWidth/-2)+"px";

	// Klicken der Buttons löscht Dialog und ruft jeweilige Mothode auf
	$(dialogbuttonyes).click(function () {
		messages.removeChild(dialogoverlay);
		messages.removeChild(dialogbox);
		if(confirmDialog){
			methodYes();
		}
	});
};

//############################# Erstellen einer Message #############################

//	Erzeugt eine Message, identisch zu der Proxer.me eigenen
function createPefMessage(msg:string){
	let newMessage = document.createElement("div");
	newMessage.className = "message ankerMessage";
	newMessage.setAttribute("onclick",'delete_message("ankerMessage")');
	newMessage.innerHTML = msg;
	messages.appendChild(newMessage)
	setTimeout(function(){ newMessage.click(); },5000);
}

//############################# Auslesen eines Cookies #############################

// Gibt den Wert des übergebenen Coockienamens wieder
function getCookie(cname:string) {
  // var name = cname + "=";
  // var decodedCookie = decodeURIComponent(document.cookie);
  // var ca = decodedCookie.split(';');
  // for(var i = 0; i <ca.length; i++) {
  //   var c = ca[i];
  //   while (c.charAt(0) == ' ') {
  //     c = c.substring(1);
  //   }
  //   if (c.indexOf(name) == 0) {
  //     return c.substring(name.length, c.length);
  //   }
  // }
  let value = "; " + document.cookie;
  let parts = value.split("; " + cname + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
  return "";
}
