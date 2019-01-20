"use strict";
// ==UserScript==
// @name        Proxer Essentials
// @version     4.2
// @description Nützlicher Erweiterungen für Proxer die jeder haben sollte.
// @author      Blue.Reaper
// @namespace   https://blue-reaper.github.io/Proxer-Essentials/
// @include     https://proxer.me/*
// @run-at      document-start
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       unsafeWindow
// @grant       GM_addStyle
// @grant       GM_getResourceText
// @grant       GM_getResourceURL
// Konsolenausgabe für Debugging
// @grant       GM_log
// @require     https://proxer.me/templates/proxer14/js/jquery-1.9.1.min.js
// @require     https://proxer.me/templates/proxer14/js/jquery-ui-1.10.3.custom.min.js
// @require     https://proxer.me/templates/proxer14/js/jquery.plugins.js?3
// @resource    pef_CSS          https://raw.githubusercontent.com/Blue-Reaper/Proxer-Essentials/anime-theater/resources/css/pef.css
// @resource    modernDark_CSS   https://raw.githubusercontent.com/Blue-Reaper/Proxer-Essentials/anime-theater/resources/css/modernDark.css
// Theatermodus
// @include     https://stream.proxer.me/*
// ==/UserScript==
// Add Style after <head> to override css of side (and dont need !important everywhere)
// But add Before sth is shown to the user
$("html").append($('<style type="text/css">' + GM_getResourceText("pef_CSS") + '</style>'));
$("html").append($('<style type="text/css">' + GM_getResourceText("modernDark_CSS") + '</style>'));
// Liste aller Module
var pefModulList = [];
//Main Methode des Frameworks
$(document).ready(function () {
    initStatusMemory();
    addPefMenu();
    createPefSettings();
    actionControl(0 /* on */);
    monitorAjax();
});
var ajaxEvent = false;
// Setzt für jede Änderung an der Oberfläche die Prüfvariable auf true
document.addEventListener("DOMSubtreeModified", function () {
    ajaxEvent = true;
});
// Prüft alle 700ms, ob es Ajax Aufrufe gab und ruft ggf. die Module mit "Ajax Aufruf" auf
function monitorAjax() {
    setInterval(function () {
        if (ajaxEvent) {
            supportDesign();
            createPefSettings();
            actionControl(2 /* ajax */);
            ajaxEvent = false;
        }
    }, 700);
}
//Fügt den Button "Essentials" zu "leftNav" hinzu
// Erzeugt 'Einstellungen' in Essentials
function addPefMenu() {
    $('#leftNav').append($('<li class="topmenu"><a href="javascript:;">Essentials ▾</a><ul id="pef_menu"></ul></li>'));
    // Erzeugt 'Einstellungen' in Essentials
    $('#pef_menu').append($('<li><a href="/pef?s=settings#top">Einstellungen</a></li>'));
}
;
// Zeigt die Settings des PEF an
// Erzeugt die Einstellungs-Seite für PEF
// Da es proxer.me/pef nicht gibt, wird die Startseite angezeigt
function createPefSettings() {
    if (window.location.pathname.split('/')[1] === 'pef') {
        // // Lösche alle Tabs der Startseite aus Navigations-Leiste
        $('#simple-navi').empty();
        // 		Lösche den Inhalt der Seite
        $('div.inner').empty();
        var inhalt = $('div.inner');
        // Setze den Titel des Tabs im Browser
        document.title = 'Proxer Essentials';
        // 		Erzeuge Tab Einstellungen
        // 		Id: pef_Settings
        // 		URL: ?s=settings
        $('#simple-navi').append($('<li id ="pef_Settings"><a data-ajax="true" href="/pef?s=settings#top">Einstellungen</a></li>'));
        // Erzeugt den Ihalt des Tabs 'Einstellungen'
        if (location.search === "" || location.search === "?s=settings") {
            $('#pef_Settings').addClass("active");
            document.title = 'Proxer Essentials';
            // Überschrift
            inhalt.append($('<h3 class="floatLeft">Proxer Essentials</h3>'));
            inhalt.append($('<div class="floatLeft version">' + GM_info.script.version + '</div>'));
            // Inhalt für Modulanzeige
            var pef_module = $('<div class="clear"/>');
            inhalt.append(pef_module);
            showModules(pef_module);
            // Footer
            // inhalt.append($('<div class ="clear">Noch mehr Userscripte findet ihr <a href="https://proxer.me/forum/anwendungen">im Forum</a>.</div>'));
            inhalt.append($('<div class ="clear">Design by xYata</div>'));
        }
    }
}
// Zeitgt die einzelnen Module auf der Einstellungs-Seite an
function showModules(pef_module) {
    var _loop_1 = function (singleModule) {
        var moduleBox = $('<div id="' + singleModule.id + 'ModulBox" class="floatLeft modulBox"></div>');
        moduleBox.append($('<h3>' + singleModule.name + '</h3>'));
        moduleBox.append($('<div>' + singleModule.description + '</div>'));
        moduleBox.append($('<div class="autor">by ' + singleModule.autor + '</div>'));
        // IDEA: Button für Details hinzufügen
        var modulStatus = $('<i id="' + singleModule.id + '_StatusImg" class="fa fa-2x pointer"/>');
        moduleBox.append(modulStatus);
        pef_module.append(moduleBox);
        updateModulTick(singleModule.id);
        modulStatus.click(function () { return toggleModulStatus(singleModule); });
    };
    // Fügt jedes Modul hinzu
    for (var _i = 0, pefModulList_1 = pefModulList; _i < pefModulList_1.length; _i++) {
        var singleModule = pefModulList_1[_i];
        _loop_1(singleModule);
    }
}
// Troogelt den Speicherwert und ruft das Modul auf
function toggleModulStatus(modul) {
    if (GM_getValue(modul.id + "Status") === "off") {
        GM_setValue(modul.id + "Status", "on");
        actionControl(0 /* on */, modul);
    }
    else {
        GM_setValue(modul.id + "Status", "off");
        actionControl(1 /* off */, modul);
    }
    updateModulTick(modul.id);
}
;
// Setzt den Haken / Kreuz nach dem Modulnamen
function updateModulTick(modulId) {
    if (GM_getValue(modulId + "Status") === "off") {
        $("#" + modulId + "ModulBox").removeClass('active');
    }
    else {
        $("#" + modulId + "ModulBox").addClass('active');
    }
}
;
//############################# Erstellen eines Dialogs #############################
/*	Erzeugt einen Dialog
Variante 1: ConfirmDialog
-createPefDialog(msg, methodYes, methodNo)
Variante 2: AlertDialog
-createPefDialog(msg)
*/
function createPefDialog(msg, methodYes, methodNo) {
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
    if (confirmDialog) {
        dialogbuttons.className = "dialogYesNo";
    }
    else {
        dialogbuttons.className = "center dialogOk";
    }
    var dialogbuttonyes = document.createElement("i");
    dialogbuttonyes.className = "fa fa-check fa-2x pointer";
    dialogbuttons.appendChild(dialogbuttonyes);
    if (confirmDialog) {
        var dialogbuttonno = document.createElement("i");
        dialogbuttonno.className = "dialogButtonNo fa fa-times fa-2x pointer";
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
    var messages = $('#messages')[0];
    messages.appendChild(dialogoverlay);
    messages.appendChild(dialogbox);
    // Dialog mittig setzen
    dialogbox.style.marginTop = (dialogbox.clientHeight / -2) + "px";
    dialogbox.style.marginLeft = (dialogbox.clientWidth / -2) + "px";
    // Klicken der Buttons löscht Dialog und ruft jeweilige Mothode auf
    $(dialogbuttonyes).click(function () {
        messages.removeChild(dialogoverlay);
        messages.removeChild(dialogbox);
        if (confirmDialog) {
            methodYes();
        }
    });
}
;
//############################# Erstellen einer Message #############################
//	Erzeugt eine Message
function createPefMessage(msg) {
    // Proxer eigene Funktion
    if (window.location.hostname !== "stream.proxer.me") {
        create_message('key_suggestion', 7000, msg);
    }
}
//############################# Cookies #############################
// Gibt den Wert des übergebenen Coockienamens wieder
function getCookie(name) {
    // Proxer eigene Funktion
    if (window.location.hostname !== "stream.proxer.me") {
        return get_cookie(name);
    }
}
// Setzt ein Cookie
function setCookie(name, value) {
    // Proxer eigene Funktion
    if (window.location.hostname !== "stream.proxer.me") {
        set_cookie(name, value, cookie_expire);
    }
}
// Erst-Initialisierung der Speicherwerte
function initStatusMemory() {
    for (var _i = 0, pefModulList_2 = pefModulList; _i < pefModulList_2.length; _i++) {
        var singleModule = pefModulList_2[_i];
        if (GM_getValue(singleModule.id + "Status") == null) {
            GM_setValue(singleModule.id + "Status", "on");
        }
    }
}
//	Hier ruft das Framework die einzelnen Module auf
function actionControl(change, modul) {
    // Wird ein Modul übergeben, wird vom Framework nur dieses Modul aufgerufen
    if (modul != null) {
        modul.callMethod(change);
    }
    else {
        for (var _i = 0, pefModulList_3 = pefModulList; _i < pefModulList_3.length; _i++) {
            var singleModule = pefModulList_3[_i];
            // Ruft alle Module auf, die aktiviert sind
            if (GM_getValue(singleModule.id + "Status") == "on") {
                singleModule.callMethod(change);
            }
        }
    }
}
// Muster (Proxer Essentials Framework Example)
// Jedes Modul muss sich in die pefModulList eintragen
// pefModulList.push({
// 	// Eindeutiger String, der als Id verwendet wird
//     id:"pefExample",
// 	// Der angezeigte Name des Moduls
//     name:"Beispiel Modul",
// 	// Die Kurzbeschreibung
//     description:"Ein Muster zur Erstellung weiterer Scripte",
// 	// Der Ersteller dieses Moduls
// 	autor:"Blue.Reaper",
// 	// Mit dieser Methode wird das Modul aufgerufen
// 	callMethod:(change)=>pefExampleCall(change)
// });
// Aufruf des Scripts durch das Framework
function pefExampleCall(change) {
    switch (change) {
        case 0 /* on */:
            // Wird nach dem Laden der Seite Aufgerufen, sollte das Modul aktiviert sein
            // Wird auch aufgerufen, wenn der User das Modul in den Einstellungen aktiviert
            console.log("on");
            myExampleMethod();
            break;
        case 2 /* ajax */:
            // Wird durch einen Ajax-Aufruf auf der Seite getriggert
            // Nur wenn das Modul aktiv ist
            // Es wird immer erst nach "on" aufgerufen
            console.log("ajax");
            myExampleMethod();
            break;
        case 1 /* off */:
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
// Wunder:
// "zurück nach oben" Button
// Grid-Anzeige als Standard, statt Listenansicht
pefModulList.push({
    id: "smallWonders",
    name: "Kleine Wunder",
    description: "Kleine Änderungen, die Wunder wirken",
    autor: "Blue.Reaper",
    callMethod: function (change) { return smallWondersCall(change); }
});
function smallWondersCall(change) {
    switch (change) {
        case 0 /* on */:
            smallWonders();
            break;
        case 1 /* off */:
            // smallWonders();
            break;
        case 2 /* ajax */:
            // smallWonders();
            break;
    }
}
function smallWonders() {
    // Cookie damit Nachricht "Diese Website verwendet Cookies..." nicht kommt
    setCookie('cookieconsent_dismissed', 'yes');
    // Cookie setzt Grid-Anzeige als Standard (im Gegensatz zu der Listenansicht), wenn noch kein Cookie gesetzt ist
    if (getCookie("manga_reader") != "tablelist") {
        setCookie('entryView', 'grid');
    }
    // ############### BackToTop ###############
    // button einfügen
    var backToTopButton = $('<i class="backToTop pointer fa fa-2x fa-chevron-up"/>');
    $("body").append(backToTopButton);
    // scroll 1000 Pixel
    $(window).scroll(function () {
        if ($(window).scrollTop() > 1000) {
            backToTopButton.fadeIn();
        }
        else {
            backToTopButton.fadeOut();
        }
    });
    // click
    backToTopButton.click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 800);
        return false;
    });
}
// Wird benötigt, da z.B Firefox nicht alle CSS Funktionen unterstützt
function supportDesign() {
    // Bilder ersetzen
    $('[src~="/images/status/abgeschlossen.png"]').attr('src', 'https://logosart.de/proxer2-0/abgeschlossen.png').addClass('smallImg');
    $('[src~="/images/status/airing.png"]').attr('src', 'https://logosart.de/proxer2-0/airing.png').addClass('smallImg');
    $('[src~="/images/status/abgebrochen.png"]').attr('src', 'https://logosart.de/proxer2-0/abgebrochen.png').addClass('smallImg');
    $('[src~="/components/com_comprofiler/images/updateprofile.gif"]').attr('src', 'https://logosart.de/proxer2-0/edit.png');
    $('[src~="/images/misc/onlineicon.png"]').attr('src', 'https://logosart.de/proxer2-0/abgeschlossen.png');
    $('[src~="/images/misc/offlineicon.png"]').attr('src', 'https://logosart.de/proxer2-0/abgebrochen.png');
    $('[src~="/images/misc/haken.png"]').attr('src', 'https://logosart.de/proxer2-0/check.png');
    $('[src~="/images/misc/kreuz.png"]').attr('src', 'https://logosart.de/proxer2-0/cross.png');
    $('[src~="/images/misc/stern.png"]').attr('src', 'https://logosart.de/proxer2-0/star.png').addClass('smallImg');
    $('[src~="/images/misc/stern_grau.png"]').attr('src', 'https://logosart.de/proxer2-0/star_empty.png').addClass('smallImg');
    $('[src~="//cdn.proxer.me/cover/894.jpg"]').attr('src', 'https://logosart.de/proxer2-0/proxer-test.jpg');
    $('[src~="//cdn.proxer.me/cover/2275.jpg"]').attr('src', 'https://logosart.de/proxer2-0/proxer-test.jpg');
    $('[src~="//cdn.proxer.me/cover/2274.jpg"]').attr('src', 'https://logosart.de/proxer2-0/proxer-test.jpg');
    $('[src~="/images/misc/upload.png"]').attr('src', 'https://logosart.de/proxer2-0/upload.jpg').addClass('borderRadius6');
    $('[src~="/images/misc/play.png"]').attr('src', 'https://logosart.de/proxer2-0/play.jpg').addClass('borderRadius6');
    $('[src~="/images/misc/info-icon.png"]').attr('src', 'https://logosart.de/proxer2-0/info.jpg').addClass('borderRadius6');
    $('[src~="https://proxer.me/images/misc/proxerfanpage.png"]').attr('src', 'https://logosart.de/proxer2-0/proxerfanpage.png');
    $('[src~="/images/misc/proxerdonate.png"]').attr('src', 'https://logosart.de/proxer2-0/proxerdonate.png');
    $('[src~="/images/misc/proxeramazon.png"]').attr('src', 'https://logosart.de/proxer2-0/proxeramazon.png');
    $('[src~="/images/social/facebook.png"]').attr('src', 'https://logosart.de/proxer2-0/facebook.png');
    $('[src~="/images/social/twitter.png"]').attr('src', 'https://logosart.de/proxer2-0/twitter.png');
    $('[src~="/images/social/youtube2.png"]').attr('src', 'https://logosart.de/proxer2-0/youtube.png');
    $('[src~="/images/social/google-plus.png"]').attr('src', 'https://logosart.de/proxer2-0/gplus.png');
    $('[src~="/images/social/amazon.png"]').attr('src', 'https://logosart.de/proxer2-0/amazon.png');
}
// Longstrip Reader als Standard
// Longstrip: klick auf Bild scrollt zum nächsten Bild
// Longstrtip: letzte Bild springt in nächste Kapitel (ohne Zwischenseite)
pefModulList.push({
    id: "mangaComfort",
    name: "Manga Comfort",
    description: "keine Zwischenseiten, etc.",
    autor: "Blue.Reaper",
    callMethod: function (change) { return mangaComfortCall(change); }
});
function mangaComfortCall(change) {
    switch (change) {
        case 0 /* on */:
            mangaComfort();
            break;
        case 1 /* off */:
            break;
        case 2 /* ajax */:
            mangaComfort();
            break;
    }
}
function mangaComfort() {
    if (window.location.pathname.split('/')[1] !== 'read' && window.location.pathname.split('/')[1] !== 'chapter') {
        return;
    }
    // Setzt Longstrip als Standard, wenn noch kein Cookie gesetzt ist
    if (getCookie("manga_reader") != "slide") {
        setCookie('manga_reader', 'longstrip');
    }
    // Ändere Link auf Bildern, damit nur zum nächsten Bild gesprungen wird
    if (getCookie("manga_reader") == "longstrip") {
        $('#reader img').attr("onclick", "");
        $('#reader img').off("click", scrollToNextPage);
        $('#reader img').click(scrollToNextPage);
        $('#reader img:last-child').attr("onclick", "window.location=nextChapter.replace('chapter','read')+'#top'");
    }
    // Wenn 404, dann nächste Kapitel nicht verfügbar (Sprung direkt in nächste Kapitel) -> gehe zurück auf Zwichenseite
    if ($('#main img[src="/images/misc/404.png"]').length) {
        window.location.pathname = window.location.pathname.replace('read', 'chapter');
    }
    // Mauszeiger wird auch nur über Bild zur Hand
    $('#reader img').addClass("pointer");
    $('#reader a').addClass("cursorAuto");
}
function scrollToNextPage() {
    $('body,html').animate({
        // nicht page+1, da id bei 0 los zählt
        scrollTop: $('#chapterImage' + (current_page)).offset().top
    }, 800);
    current_page = current_page + 1;
}
// Theatermodus für Anime
// IDEA 10 sek zurückspulen einbauen
pefModulList.push({
    id: "theaterMode",
    name: "Theatermodus",
    description: "Theatermodus für Animes",
    autor: "Blue.Reaper",
    callMethod: function (change) { return theatreModeCall(change); }
});
function theatreModeCall(change) {
    switch (change) {
        case 0 /* on */:
            theatermodus();
            break;
        case 1 /* off */:
            // theatermodus();
            break;
        case 2 /* ajax */:
            theatermodus();
            break;
    }
}
function theatermodus() {
    // Innerhalb des Iframes
    if (window.location.hostname === "stream.proxer.me") {
        $('#player_code').addClass("inheritSize");
        $('.flowplayer').addClass("inheritSize");
        $('.plyr video').addClass("heightVideo");
    }
    // normale Proxer Seite
    if (window.location.pathname.split('/')[1] === 'watch') {
        var backToTopButton = $('<i class="toggleTheater pointer fa fa-2x fa-arrows-alt"/>');
        $("body").append(backToTopButton);
        backToTopButton.click(function () {
            $('iframe').toggleClass("theaterActive");
        });
    }
}
