//############################# Erstellen eines Dialogs #############################

/*	Erzeugt einen Dialog
Variante 1: ConfirmDialog
-createPefDialog(msg, methodYes, methodNo)
Variante 2: AlertDialog
-createPefDialog(msg)
*/
function createPefDialog(msg, methodYes, methodNo){
	// Testet, ob ein Confirm-, oder ein AlertDialog angezeigt werden soll
	var confirmDialog = (methodYes != null && methodNo != null) ? true : false;

	// Damit der Hintergurnd gesperrt wird
	var dialogoverlay = document.createElement("div");
	dialogoverlay.className = "dialogOverlay";

	// Das Dialogfeld
	var dialogbox = document.createElement("div");
	dialogbox.className = "message dialogBox";

	// Die Angezeigte Nachricht
	var dialogmessage = document.createElement("div");
	dialogmessage.innerHTML = msg;

	// Die Antwortbutton
	var dialogbuttons = document.createElement("div");
	if(confirmDialog){
		dialogbuttons.className = "leanRight";
	}else{
		dialogbuttons.className = "center";
	}
	dialogbuttons.className = "marginTop10";

	var dialogbuttonyes = document.createElement("img");
	dialogbuttonyes.className = "clickImg30";
	dialogbuttonyes.src = GM_getResourceURL("yes_img");
	dialogbuttons.appendChild(dialogbuttonyes);

	if(confirmDialog){
		var dialogbuttonno = document.createElement("img");
		dialogbuttonno.className = "clickImg30 marginLeft30";
		dialogbuttonno.src = GM_getResourceURL("no_img");
		dialogbuttons.appendChild(dialogbuttonno);
	}

	// Hinzufügen der Elemente
	dialogbox.appendChild(dialogmessage);
	dialogbox.appendChild(dialogbuttons);

	var messages = $('#messages')[0];
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
	if(confirmDialog){
		$(dialogbuttonno).click(function () {
			messages.removeChild(dialogoverlay);
			messages.removeChild(dialogbox);
			methodNo();
		});
	}
};

//############################# Erstellen einer Message #############################

//	Erzeugt eine Message, identisch zu der Proxer.me eigenen
function createPefMessage(msg){
	var newMessage = document.createElement("div");
	newMessage.className = "message ankerMessage";
	newMessage.setAttribute("onclick",'delete_message("ankerMessage")');
	newMessage.innerHTML = msg;
	messages.appendChild(newMessage)
	setTimeout(function(){ newMessage.click(); },5000);
}
