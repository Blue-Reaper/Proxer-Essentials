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

// ######################################################################
// ######################################################################
// ######################################################################
// CHANGED alte Funktionen
// ######################################################################
// ######################################################################
// ######################################################################


//############################# Versionsanzeige #############################

// Bringt nach einem Update eine Anzeige, die nur 1x erscheint, muss von Script getriggert werden
function neueVersion(version, msg){
	if(GM_getValue("version") !== version && GM_getValue("version") !== "Nicht Anzeigen"){
		var textmsg = '<h3>'+anker_Modulname+'</h3><hr></hr>'+msg;
		createAnkerDialog(textmsg);
		GM_setValue("version",version);
	}
}

function createExtAnkerCheckBox(anzeigeText, memoryName, abstand){

	// Erst-Initialisierung der Memory
	if (GM_getValue(memoryName)==null){
		GM_setValue(memoryName,"on");
	}

	var item = document.createElement("a");
	item.href = "javascript:;";
	item.style.color = getStyleProp(document.getElementById("main"), "color");
	item.innerHTML = '<h4 style="padding-left: 1em;">'+anzeigeText+'<img id="'+memoryName+'_'+anker_Modul_id+'_img" style="margin-left: '+abstand+';" src='+((GM_getValue(memoryName)===1) ? "https://proxer.me/images/misc/haken.png" : "https://proxer.me/images/misc/kreuz.png")+' width="15" height="15"></h4>';

	item.addEventListener("click", function(){
		if(GM_getValue(memoryName) === "off"){
			GM_setValue(memoryName,"on");
			document.getElementById(memoryName+'_'+anker_Modul_id+"_img").src="https://proxer.me/images/misc/haken.png";
		}else{
			GM_setValue(memoryName,"off");
			document.getElementById(memoryName+'_'+anker_Modul_id+"_img").src="https://proxer.me/images/misc/kreuz.png";
		}
	});
	return item;
}

function createExtAnkerAnleitung(linkUrl){
	var anleitung = document.createElement("a");
	anleitung.innerHTML = "Anleitung";
	anleitung.href = linkUrl;
	return anleitung;
}
