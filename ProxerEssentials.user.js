"use strict";
// ==UserScript==
// @name        Proxer Essentials
// @version     2.2
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
// @resource    pef_CSS  resources/css/pef.css
// ==/UserScript==
GM_addStyle(GM_getResourceText("pef_CSS"));
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
            inhalt.append($('<div class ="clear">Noch mehr Userscripte findet ihr <a href="https://proxer.me/forum/anwendungen">im Forum</a>.</div>'));
        }
    }
}
// Zeitgt die einzelnen Module auf der Einstellungs-Seite an
function showModules(pef_module) {
    var _loop_1 = function (singleModule) {
        var moduleBox = $('<div id="' + singleModule.id + 'ModulBox" class="floatLeft modulBox"></div>');
        moduleBox.css("border", $('#main').css("border"));
        moduleBox.css("border-radius", $('#main').css("border-radius"));
        moduleBox.append($('<h3 class="center">' + singleModule.name + '</h3>'));
        moduleBox.append(document.createElement("hr"));
        moduleBox.append($('<div class="description">' + singleModule.description + '</div>'));
        moduleBox.append($('<div class="autor">von ' + singleModule.autor + '</div>'));
        // TODO: Button für Details hinzufügen
        var modulStatus = $('<i id="' + singleModule.id + '_StatusImg" class="status fa fa-2x pointer"></i>');
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
        $("#" + modulId + "_StatusImg").removeClass('fa-toggle-on').addClass('fa-toggle-off');
        $("#" + modulId + "ModulBox").addClass('off');
    }
    else {
        $("#" + modulId + "_StatusImg").removeClass('fa-toggle-off').addClass('fa-toggle-on');
        $("#" + modulId + "ModulBox").removeClass('off');
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
    create_message('key_suggestion', 7000, msg);
}
//############################# Auslesen eines Cookies #############################
// Gibt den Wert des übergebenen Coockienamens wieder
function getCookie(cname) {
    // Proxer eigene Funktion
    return get_cookie(cname);
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
// Keine Benachrichtigung "Diese Webseite verwendet Cookies ... "
// Manga Longstrip Reader als Standard
// "zurück nach oben" Button
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
    document.cookie = 'cookieconsent_dismissed=yes';
    // Cookie um für Mangas den Longstrip-Reader als Standard zu setzen
    document.cookie = 'manga_reader=longstrip';
    // ############### BackToTop ###############
    // button einfügen
    var backToTopButton = $('<i class="backToTop pointer fa fa-2x fa-chevron-up"/>');
    $("body").append(backToTopButton);
    // hover
    backToTopButton.hover(function () {
        // Setzt Bild bei hover
        backToTopButton.toggleClass("fa-2x fa-chevron-up fa-3x fa-chevron-circle-up");
    }, function () {
        // Setzt Bild nach hover zurück auf Standard
        backToTopButton.toggleClass("fa-2x fa-chevron-up fa-3x fa-chevron-circle-up");
    });
    // scroll 100 Pixel
    $(window).scroll(function () {
        if ($(window).scrollTop() > 100) {
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
// History old Script
// @history      1.4 Bei Seitenwechsel im Fullscreen bei der neuen Seite wieder oben anfangen, document.getElementById("reader").childNode[0] zu reader.childNode[0], dynamische Kapitelanzeige oben in Fullscreen
// @history      0.1.0 Maus wird jetzt im Fullscreen ausgeblendet und ansonsten ganz normal.
// mögliche weitere Features:
// IDEA Maus Ausblenden auf reader
// IDEA Kapitelwechsel ohne Zwischenseite (optional)(Kurzes aufflackern des Kapitelnamens in Mitte des Blidschirms) trotzdem noch Bookmark
// IDEA fullscreen auto-on (when 1. page hit top?)
var currentScroll = 0;
var scrollOffset = 0;
pefModulList.push({
    id: "mangaFullscreen",
    name: "Manga Fullscreen",
    description: "Mangas im Fullscreen genießen",
    autor: "Blue.Reaper",
    callMethod: function (change) { return mangaFullscreenCall(change); }
});
function mangaFullscreenCall(change) {
    switch (change) {
        case 0 /* on */:
            mangaFullscreen();
            break;
        case 1 /* off */:
            break;
        case 2 /* ajax */:
            mangaFullscreenAjax();
            break;
    }
}
function mangaFullscreenAjax() {
    // Setze Button neu, wenn #reader befüllt wurde
    $('#reader').append($('#fullscreenButton'));
    // Ändere Link auf Bildern, damit nur zum nächsten Bild gesprungen wird
    $('#reader img').attr("onclick", "");
    $('#reader img').off("click", scrollToNextPage);
    $('#reader img').click(scrollToNextPage);
    // TODO wenn auf 404 gesprungen wird (kein weiteres Kapitel) dann auf Kapitelübersich springen
    $('#reader img:last-child').attr("onclick", "window.location=nextChapter.replace('chapter','read')+'#top'");
}
function mangaFullscreen() {
    if (window.location.pathname.split('/')[1] !== 'read') {
        return;
    }
    document.addEventListener("fullscreenchange", toggleFullscreenEvent);
    $(window).scroll(getWindowScrollTop);
    var fullscreenButton = $('<i id="fullscreenButton" class="openFullscreen pointer fa fa-2x fa-arrows-alt"/>');
    $('body').append(fullscreenButton);
    fullscreenButton.click(toggleFullscreenManual);
    $(window).keyup(function (event) {
        // Beim Drücken von F
        if (event.keyCode === 70) {
            toggleFullscreenManual();
        }
    });
    var rect = reader.getBoundingClientRect();
    scrollOffset = rect.top + document.documentElement.scrollTop - nav.offsetHeight;
}
//Manuell den Fullscreen togglen, triggert indirekt toggleFullscreenEvent
function toggleFullscreenManual() {
    // Is Fullscreen on?
    if (document.fullscreenElement) {
        // Fullscreen Ausschalten
        fullscreenOff();
    }
    else {
        // Fullscreen Einschalten
        fullscreenOn();
    }
}
// Wrid aufgerufen, wenn der Browser in oder aus Fullscreen wechselt
function toggleFullscreenEvent() {
    if (document.fullscreenElement) {
        // Am Einschalten
        fullscreenOn();
    }
    else {
        // Am Ausschalten
        fullscreenOff();
    }
    $('#fullscreenButton').toggleClass('fa-arrows-alt openFullscreen fa-compress exitFullscreen');
}
function fullscreenOn() {
    reader.scrollTo(0, currentScroll);
    $(window).off("scroll", getWindowScrollTop);
    $('#reader').scroll(getReaderScrollTop);
    reader.requestFullscreen();
    // Load pages (Proxer function)
    $('#reader').on('scroll', function (e) {
        var loop = true;
        while (loop) {
            var position = $('#chapterImage' + (current_page - 1)).position().top;
            var scrolled = $(window).scrollTop();
            var curHeight = $('#chapterImage' + (current_page - 1)).height();
            var prevHeight = 10000;
            if (current_page - 2 >= 0) {
                prevHeight = $('#chapterImage' + (current_page - 2)).height();
            }
            if (scrollable && (scrolled - position) >= curHeight) {
                scroll = false;
                nextPage();
            }
            else if (scrollable && (position - scrolled) >= prevHeight) {
                scroll = false;
                prevPage();
            }
            else {
                loop = false;
            }
        }
        if (!scrollable && counter > 1) {
            scrollable = true;
        }
        counter++;
    });
}
function fullscreenOff() {
    window.scrollTo(0, currentScroll + scrollOffset);
    $('#reader').off("scroll", getReaderScrollTop);
    $(window).scroll(getWindowScrollTop);
    document.exitFullscreen();
}
function scrollToNextPage() {
    // Is Fullscreen on?
    if (document.fullscreenElement) {
        $('#reader').animate({
            // nicht page+1, da id bei 0 los zählt
            scrollTop: $('#chapterImage' + (current_page)).offset().top - $('#reader').offset().top + $('#reader').scrollTop()
        }, 800);
    }
    else {
        $('body,html').animate({
            scrollTop: $('#chapterImage' + (current_page)).offset().top
        }, 800);
    }
    current_page = current_page + 1;
}
function getWindowScrollTop() {
    currentScroll = document.documentElement.scrollTop - scrollOffset;
}
function getReaderScrollTop() {
    currentScroll = reader.scrollTop;
}
