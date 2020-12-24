//############################# Erstellen eines Dialogs #############################

/*	Erzeugt einen Dialog
Variante 1: ConfirmDialog
-createPefDialog(msg, methodYes, methodNo)
Variante 2: AlertDialog
-createPefDialog(msg)
*/
function createPefDialog(msg: string, methodYes?: () => void, methodNo?: () => void) {
    // Testet, ob ein Confirm-, oder ein AlertDialog angezeigt werden soll
    let confirmDialog = methodYes != null && methodNo != null ? true : false;

    // Damit der Hintergurnd gesperrt wird
    let dialogoverlay = document.createElement('div');
    dialogoverlay.className = 'dialogOverlay';

    // Das Dialogfeld
    let dialogbox = document.createElement('div');
    dialogbox.className = 'message dialogBox';

    // Die Angezeigte Nachricht
    let dialogmessage = document.createElement('div');
    dialogmessage.innerHTML = msg;

    // Die Antwortbutton
    let dialogbuttons = document.createElement('div');
    if (confirmDialog) {
        dialogbuttons.className = 'dialogYesNo';
    } else {
        dialogbuttons.className = 'center dialogOk';
    }

    let dialogbuttonyes = document.createElement('i');
    dialogbuttonyes.className = 'fa fa-check fa-2x pointer';
    dialogbuttons.appendChild(dialogbuttonyes);

    if (confirmDialog) {
        let dialogbuttonno = document.createElement('i');
        dialogbuttonno.className = 'dialogButtonNo fa fa-times fa-2x pointer';
        dialogbuttons.appendChild(dialogbuttonno);

        $(dialogbuttonno).click(function () {
            messages.removeChild(dialogoverlay);
            messages.removeChild(dialogbox);
            methodNo && methodNo();
        });
    }

    // Hinzufügen der Elemente
    dialogbox.appendChild(dialogmessage);
    dialogbox.appendChild(dialogbuttons);

    let messages = $('#messages')[0];
    messages.appendChild(dialogoverlay);
    messages.appendChild(dialogbox);

    // Dialog mittig setzen
    dialogbox.style.marginTop = dialogbox.clientHeight / -2 + 'px';
    dialogbox.style.marginLeft = dialogbox.clientWidth / -2 + 'px';

    // Klicken der Buttons löscht Dialog und ruft jeweilige Mothode auf
    $(dialogbuttonyes).click(function () {
        messages.removeChild(dialogoverlay);
        messages.removeChild(dialogbox);
        if (confirmDialog) {
            methodYes && methodYes();
        }
    });
}

//############################# Erstellen einer Message #############################

//	Erzeugt eine Message
function createPefMessage(msg: string) {
    // Proxer eigene Funktion
    if (window.location.hostname !== 'stream.proxer.net') {
        // @ts-ignore
        create_message('key_suggestion', 7000, msg);
    }
}

//############################# Cookies #############################

// Gibt den Wert des übergebenen Coockienamens wieder
function getCookie(name: string): string {
    // Proxer eigene Funktion
    if (window.location.hostname !== 'stream.proxer.net') {
        // @ts-ignore
        return get_cookie(name);
    }
    return '';
}

// Setzt ein Cookie
function setCookie(name: string, value: string): void {
    // Proxer eigene Funktion
    if (window.location.hostname !== 'stream.proxer.net') {
        // @ts-ignore
        set_cookie(name, value, cookie_expire);
    }
}
