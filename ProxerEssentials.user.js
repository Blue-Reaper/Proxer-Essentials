"use strict";
// ==UserScript==
// @name        Proxer Essentials
// @version     4.5-beta.3
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
// @resource    framework_CSS      src/framework/css/framework.css
// @resource    modules_CSS        src/modules/css/modules.css
// @resource    design_CSS         src/framework/css/design.css
// smallWonders
// @resource    smallWonders_CSS   src/modules/css/smallWonders.css
// Theatermodus
// @include     https://stream.proxer.me/*
// @resource    theater_CSS        src/modules/css/theaterModus.css
// ==/UserScript==
GM_addStyle(GM_getResourceText("framework_CSS"));
GM_addStyle(GM_getResourceText("modules_CSS"));
// Liste aller Module
var pefModulList = [];
//Main Methode des Frameworks
$(document).ready(function () {
    supportDesign();
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
// Theme can't be activatet with modules, because it must be loaded before the content is shown
// Init Memory
if (GM_getValue("DesignStatus") == null) {
    resetDesign();
}
// add Theme
if (GM_getValue("DesignStatus") == "on") {
    // Add colors for design
    GM_addStyle(":root {\n            /* accent color */\n            --accent-color:" + GM_getValue("AccentColor") + ";\n            /* background color */\n            --main-bg-color:" + GM_getValue("MainBgColor") + ";\n            --bg-color:" + GM_getValue("BgColor") + ";\n            /* Button */\n            --button-color:" + GM_getValue("ButtonColor") + ";\n            /* Text */\n            --text-color:" + GM_getValue("TextColor") + ";\n            --link-color:" + GM_getValue("LinkColor") + ";\n            --highlight-text-color:" + GM_getValue("TextHighlightColor") + ";\n        }");
    // Add Style after <head> to override css of side (and dont need !important everywhere)
    // But add Before sth is shown to the user
    $("html").append($('<style type="text/css">' + GM_getResourceText("design_CSS") + '</style>'));
}
function resetDesign() {
    GM_setValue("DesignStatus", "on");
    GM_setValue("AccentColor", "#ef394a");
    GM_setValue("MainBgColor", "#232428");
    GM_setValue("BgColor", "#2d2f33");
    GM_setValue("ButtonColor", "#3e3e3e");
    GM_setValue("TextColor", "#909090");
    GM_setValue("LinkColor", "#bdbdbd");
    GM_setValue("TextHighlightColor", "#fff");
}
// Wird benötigt, da z.B Firefox nicht alle CSS Funktionen unterstützt
function supportDesign() {
    if (GM_getValue("DesignStatus") == "on") {
        // Set Proxer-Style to gray, needed for Design
        setCookie("style", "gray");
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
        $('[src~="//cdn.proxer.me/cover/894.jpg"]').attr('src', 'https://logosart.de/proxer2-0/proxer-test-anime.jpg');
        $('[src~="//cdn.proxer.me/cover/2373.jpg"]').attr('src', 'https://logosart.de/proxer2-0/proxer-test-manga.jpg');
        $('[src~="//cdn.proxer.me/cover/2274.jpg"]').attr('src', 'https://logosart.de/proxer2-0/proxer-test-anime.jpg');
        $('[src~="//cdn.proxer.me/cover/2275.jpg"]').attr('src', 'https://logosart.de/proxer2-0/proxer-test-anime.jpg');
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
}
// Adds Essentials Menu
function addPefMenu() {
    // add Essentials to Navigation
    $('#leftNav').append($('<li class="topmenu"><a data-ajax="true" href="/pef">Essentials ▾</a><ul id="pef_menu"></ul></li>'));
    // add Menu Entries
    // Einstellungen
    $('#pef_menu').append($('<li><a href="/pef?s=settings#top">Einstellungen</a></li>'));
    // Module
    $('#pef_menu').append($('<li><a href="/pef?s=modules#top">Module</a></li>'));
    // Design
    $('#pef_menu').append($('<li><a href="/pef?s=design#top">Design</a></li>'));
}
// Zeigt die Settings des PEF an
// Erzeugt die Einstellungs-Seite für PEF
// Da es proxer.me/pef nicht gibt, wird die Startseite angezeigt
function createPefSettings() {
    if (window.location.pathname.split('/')[1] === 'pef' && !$('#pef_Settings').length) {
        // // Lösche alle Tabs der Startseite aus Navigations-Leiste
        $('#simple-navi').empty();
        // 		Lösche den Inhalt der Seite
        $('div.inner').empty();
        // Setze den Titel des Tabs im Browser
        document.title = 'Proxer Essentials';
        // Erzeuge Tabs
        // Einstellungen
        $('#simple-navi').append($('<li id ="pef_Settings"><a data-ajax="true" href="/pef?s=settings#top">Einstellungen</a></li>'));
        // 	Module
        $('#simple-navi').append($('<li id ="pef_Modules"><a data-ajax="true" href="/pef?s=modules#top">Module</a></li>'));
        // 	Design
        $('#simple-navi').append($('<li id ="pef_Design"><a data-ajax="true" href="/pef?s=design#top">Design</a></li>'));
        setActivePefTab();
    }
}
function setActivePefTab() {
    if (location.search === '' || location.search === '?s=settings') {
        $('#pef_Settings').addClass('active');
        tabPefSettings();
    }
    else if (location.search === '?s=modules') {
        $('#pef_Modules').addClass('active');
        tabPefModules();
    }
    else if (location.search === '?s=design') {
        $('#pef_Design').addClass('active');
        tabPefDesign();
    }
}
// Content of tab 'Einstellungen'
function tabPefSettings() {
    var inhalt = $('div.inner');
    // Header
    inhalt.append($('<h3 class="floatLeft">Proxer Essentials</h3>'));
    inhalt.append($('<div class="floatLeft creator">by Blue.Reaper</div>'));
    inhalt.append($('<div class="clear">Version: ' + GM_info.script.version + '</div>'));
    inhalt.append($('<h4>Einstellungen</h4>'));
    inhalt.append($('<a data-ajax="true" href="/pef?s=modules#top" class="menu">Module</a>'));
    inhalt.append($('<a data-ajax="true" href="/pef?s=design#top" class="menu marginLeft05">Design</a>'));
    inhalt.append($('<h4>Nützliche Links</h4>'));
    inhalt.append($('<div>Alle Infos über Proxer Essentials gibt es <a href="https://blue-reaper.github.io/Proxer-Essentials/">hier</a>.</div>'));
    inhalt.append($('<div><a href="https://github.com/Blue-Reaper/Proxer-Essentials/raw/beta/ProxerEssentials.user.js">Beta Version</a></div>'));
    inhalt.append($('<div><a href="https://github.com/Blue-Reaper/Proxer-Essentials/releases">Release Notes</a></div>'));
    inhalt.append($('<div><a href="https://proxer.me/forum/anwendungen/386157-userscript-inkl-theme-proxer-essentials">Forumsbeitrag</a></div>'));
}
// Content of tab 'Module'
function tabPefModules() {
    var inhalt = $('div.inner');
    // Header
    inhalt.append($('<h3>Module</h3>'));
    // Inhalt für Modulanzeige
    var pef_module = $('<div class="clear"/>');
    inhalt.append(pef_module);
    showModules(pef_module);
    // Footer
    inhalt.append($('<div class ="clear"></div>'));
}
// Content of tab 'Design'
function tabPefDesign() {
    var inhalt = $('div.inner');
    // Header
    inhalt.append($('<h3 class="floatLeft">Design</h3>'));
    inhalt.append($('<div class="floatLeft creator">by xYata</div>'));
    inhalt.append($('<div class="clear">Essentials Design verwenden <i class="fa fa-2x pointer designStatus"/></div>'));
    if (GM_getValue('DesignStatus') === 'on') {
        $('.designStatus').addClass('active');
    }
    $('.designStatus').click(function () {
        if (GM_getValue('DesignStatus') === 'off') {
            GM_setValue('DesignStatus', 'on');
            $('.designStatus').addClass('active');
        }
        else {
            GM_setValue('DesignStatus', 'off');
            $('.designStatus').removeClass('active');
        }
        location.reload();
    });
    inhalt.append($('<h4>Farbwahl</h4>'));
    inhalt.append($('<div>Hier können die Farben des Designs eingestellt werden, dazu einfach den gewünschten Hexwert eingeben.</div>'));
    inhalt.append($('<div>Den Hexwert einer Farbe kann man z.B. <a href="https://html-color-codes.info/webfarben_hexcodes/">hier</a> herausfinden.</div>'));
    var colorpick = $('<div class="colorpick"/>');
    colorpick.append($('<div class="clear">Akzent: <input id="pefAccentColor" type="text" class="floatRight" value="' + GM_getValue("AccentColor") + '"/></div>'));
    colorpick.append($('<div class="clear">Haupt-Hintergrund: <input id="pefMainBgColor" type="text" class="floatRight" value="' + GM_getValue("MainBgColor") + '"/></div>'));
    colorpick.append($('<div class="clear">Hintergrund: <input id="pefBgColor" type="text" class="floatRight" value="' + GM_getValue("BgColor") + '"/></div>'));
    colorpick.append($('<div class="clear">Schaltflächen: <input id="pefButtonColor" type="text" class="floatRight" value="' + GM_getValue("ButtonColor") + '"/></div>'));
    colorpick.append($('<div class="clear">Text: <input id="pefTextColor" type="text" class="floatRight" value="' + GM_getValue("TextColor") + '"/></div>'));
    colorpick.append($('<div class="clear">Links: <input id="pefLinkColor" type="text" class="floatRight" value="' + GM_getValue("LinkColor") + '"/></div>'));
    colorpick.append($('<div class="clear">hervorgehobener Text: <input id="pefTextHighlightColor" type="text" class="floatRight" value="' + GM_getValue("TextHighlightColor") + '"/></div>'));
    var buttons = $('<div class ="clear"/>');
    var reset = $('<a href="javascript:;" class="menu active">Zurücksetzen</a>');
    var save = $('<a href="javascript:;" class="menu floatRight">Farben speichern</a>');
    buttons.append(reset);
    buttons.append(save);
    colorpick.append(buttons);
    inhalt.append(colorpick);
    reset.click(function () {
        resetDesign();
        location.reload();
    });
    save.click(function () {
        GM_setValue("AccentColor", $('#pefAccentColor').val());
        GM_setValue("MainBgColor", $('#pefMainBgColor').val());
        GM_setValue("BgColor", $('#pefBgColor').val());
        GM_setValue("ButtonColor", $('#pefButtonColor').val());
        GM_setValue("TextColor", $('#pefTextColor').val());
        GM_setValue("LinkColor", $('#pefLinkColor').val());
        GM_setValue("TextHighlightColor", $('#pefTextHighlightColor').val());
        location.reload();
    });
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
    if (GM_getValue(modul.id + 'Status') === 'off') {
        GM_setValue(modul.id + 'Status', 'on');
        actionControl(0 /* on */, modul);
    }
    else {
        GM_setValue(modul.id + 'Status', 'off');
        actionControl(1 /* off */, modul);
    }
    updateModulTick(modul.id);
}
// Setzt ModulBox active or not
function updateModulTick(modulId) {
    if (GM_getValue(modulId + 'Status') === 'off') {
        $('#' + modulId + 'ModulBox').removeClass('active');
    }
    else {
        $('#' + modulId + 'ModulBox').addClass('active');
    }
}
//############################# Erstellen eines Dialogs #############################
/*	Erzeugt einen Dialog
Variante 1: ConfirmDialog
-createPefDialog(msg, methodYes, methodNo)
Variante 2: AlertDialog
-createPefDialog(msg)
*/
function createPefDialog(msg, methodYes, methodNo) {
    // Testet, ob ein Confirm-, oder ein AlertDialog angezeigt werden soll
    var confirmDialog = methodYes != null && methodNo != null ? true : false;
    // Damit der Hintergurnd gesperrt wird
    var dialogoverlay = document.createElement('div');
    dialogoverlay.className = 'dialogOverlay';
    // Das Dialogfeld
    var dialogbox = document.createElement('div');
    dialogbox.className = 'message dialogBox';
    // Die Angezeigte Nachricht
    var dialogmessage = document.createElement('div');
    dialogmessage.innerHTML = msg;
    // Die Antwortbutton
    var dialogbuttons = document.createElement('div');
    if (confirmDialog) {
        dialogbuttons.className = 'dialogYesNo';
    }
    else {
        dialogbuttons.className = 'center dialogOk';
    }
    var dialogbuttonyes = document.createElement('i');
    dialogbuttonyes.className = 'fa fa-check fa-2x pointer';
    dialogbuttons.appendChild(dialogbuttonyes);
    if (confirmDialog) {
        var dialogbuttonno = document.createElement('i');
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
    var messages = $('#messages')[0];
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
function createPefMessage(msg) {
    // Proxer eigene Funktion
    if (window.location.hostname !== 'stream.proxer.me') {
        // @ts-ignore
        create_message('key_suggestion', 7000, msg);
    }
}
//############################# Cookies #############################
// Gibt den Wert des übergebenen Coockienamens wieder
function getCookie(name) {
    // Proxer eigene Funktion
    if (window.location.hostname !== 'stream.proxer.me') {
        // @ts-ignore
        return get_cookie(name);
    }
    return '';
}
// Setzt ein Cookie
function setCookie(name, value) {
    // Proxer eigene Funktion
    if (window.location.hostname !== 'stream.proxer.me') {
        // @ts-ignore
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
// Longstrip Reader als Standard
// Longstrip: klick auf Bild scrollt zum nächsten Bild
// Longstrtip: letzte Bild springt in nächste Kapitel (ohne Zwischenseite)
// Fügt Mangaupdates im Menü Manga und auf Startseite neben Animeupdates hinzu
pefModulList.push({
    id: 'mangaComfort',
    name: 'Manga Comfort',
    description: 'mehr Komfort beim Manga Lesen',
    autor: 'Blue.Reaper',
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
    // add Updates in Menu Manga
    if (!$('#leftNav li:nth-child(3) ul li>a[href="/manga/updates#top').length) {
        $('#leftNav li:nth-child(3) ul').append($('<li><a data-ajax="true" href="/manga/updates#top">Updates</a></li>'));
    }
    // On Home Page and Links doesn't exist
    if (window.location.pathname === '/' && !$('#main li>a[href="/manga/updates#top').length) {
        // Add Mangaupdaets like existing Animeupdates and after that
        $('#main li>a[href="/anime/updates#top"]').parent().after($('<li id="pef_mangaupdates"><a data-ajax="true" href="/manga/updates#top">Mangaupdates</a></li>'));
    }
    if (window.location.pathname.split('/')[1] !== 'read' && window.location.pathname.split('/')[1] !== 'chapter') {
        return;
    }
    // Setzt Longstrip als Standard, wenn noch kein Cookie gesetzt ist
    if (getCookie('manga_reader') != 'slide') {
        setCookie('manga_reader', 'longstrip');
    }
    // Ändere Link auf Bildern, damit nur zum nächsten Bild gesprungen wird
    if (getCookie('manga_reader') == 'longstrip') {
        $('#reader img').attr('onclick', '');
        $('#reader img').off('click', scrollToNextPage);
        $('#reader img').click(scrollToNextPage);
        $('#reader img:last-child').attr('onclick', "window.location=nextChapter.replace('chapter','read')+'#top'");
    }
    // Wenn 404, dann nächste Kapitel nicht verfügbar (Sprung direkt in nächste Kapitel) -> gehe zurück auf Zwichenseite
    if ($('#main img[src="/images/misc/404.png"]').length) {
        window.location.pathname = window.location.pathname.replace('read', 'chapter');
    }
    // Mauszeiger wird auch nur über Bild zur Hand
    $('#reader img').addClass('pointer');
    $('#reader a').addClass('cursorAuto');
}
function scrollToNextPage() {
    // @ts-ignore
    var image = $('#chapterImage' + current_page).offset();
    $('body,html').animate({
        // nicht page+1, da id bei 0 los zählt
        scrollTop: image ? image.top : 0
    }, 800);
    // @ts-ignore
    current_page = current_page + 1;
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
// Nachricht "Diese Website verwendet Cookies..." wird ausgeblendet
// setzt "Ja ich bin Erwachsen"
// blende Abonnieren Button aus (Infoseite), da keine Funktion? https://proxer.me/forum/213-allgemein/386170-abbonieren-button-in-details-seiten-beschreibung
// blende Werbung auf Anime-Seite aus
// blende Social Media aus
// blende Tab Artikel (=Amazon) aus
pefModulList.push({
    id: 'smallWonders',
    name: 'Kleine Wunder',
    description: 'Kleine Änderungen, die Wunder wirken',
    autor: 'Blue.Reaper',
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
    // ############### set cookies ###############
    // Cookie damit Nachricht "Diese Website verwendet Cookies..." nicht kommt
    setCookie('cookieconsent_dismissed', 'yes');
    // Keine Erwachenen-Meldung mehr
    setCookie('adult', '1');
    // ############### hide elements ###############
    GM_addStyle(GM_getResourceText("smallWonders_CSS"));
    // ############### BackToTop ###############
    // Check if Button already added
    if (!$('.backToTop').length) {
        // add button
        var backToTopButton_1 = $('<i class="backToTop pointer fa fa-2x fa-chevron-up"/>');
        $('body').append(backToTopButton_1);
        // scroll 1000 Pixel
        $(window).scroll(function () {
            var scrollTop = $(window).scrollTop();
            if (scrollTop && scrollTop > 1000) {
                backToTopButton_1.fadeIn();
            }
            else {
                backToTopButton_1.fadeOut();
            }
        });
        // click
        backToTopButton_1.click(function () {
            $('body,html').animate({
                scrollTop: 0
            }, 800);
            return false;
        });
    }
}
// Theatermodus für Anime
// blende "Flash-Player | Ladezeit melden! | Hilfe" im Player aus
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
            theatermodusOff();
            break;
        case 2 /* ajax */:
            // theatermodus();
            break;
    }
}
function theatermodus() {
    if (window.location.hostname !== "stream.proxer.me" && window.location.pathname.split('/')[1] !== 'watch') {
        theatermodusOff();
    }
    // Innerhalb des Iframes
    if (window.location.hostname === "stream.proxer.me") {
        GM_addStyle(GM_getResourceText("theater_CSS"));
    }
    // normale Proxer Seite
    if (window.location.pathname.split('/')[1] === 'watch') {
        // Check if button is already added
        if (!$('.toggleTheater').length) {
            var backToTopButton = $('<i class="toggleTheater pointer fa fa-2x fa-arrows-alt"/>');
            $("body").append(backToTopButton);
            backToTopButton.click(function () {
                $('iframe').toggleClass("theaterActive");
            });
        }
    }
}
function theatermodusOff() {
    // Entferne Button wieder
    $('.toggleTheater').remove();
}
// Zeigt Bilder in den Listenansichten an
// Grid-Anzeige als Standard, statt Listenansicht
pefModulList.push({
    id: "picList",
    name: "Picture List",
    description: "Bilder statt Listen",
    autor: "Blue.Reaper",
    callMethod: function (change) { return picListCall(change); }
});
function picListCall(change) {
    switch (change) {
        case 0 /* on */:
            picList();
            break;
        case 1 /* off */:
            break;
        case 2 /* ajax */:
            picList();
            break;
    }
}
function picList() {
    // console.log(window.location.pathname);
    // only in specific locations
    if ((window.location.pathname !== '/manga/updates' && window.location.pathname !== '/anime/updates')) {
        return;
    }
    // add buttons for table- or grid-view
    if (!$('#pefViewControl').length) {
        $('#main #simple-navi').after($("<div id=\"pefViewControl\" class=\"clear\">\n\t\t\t\t<a id=\"pefGrid\" data-ajax=\"true\" class=\"marginLeft05 floatRight menu fa fa-th-large\" onclick=\"set_cookie('entryView','grid',cookie_expire);location.reload();\" href=\"javascript:;\"/>\n\t\t\t\t<a id=\"pefList\" data-ajax=\"true\" class=\"floatRight menu fa fa-list\" onclick=\"set_cookie('entryView','tablelist',cookie_expire);location.reload();\" href=\"javascript:;\"/>\n\t\t\t</div>"));
    }
    // Picture (=Grid) List
    if (getCookie('entryView') != 'tablelist') {
        // Cookie setzt Grid-Anzeige als Standard (im Gegensatz zu der Listenansicht), wenn noch kein Cookie gesetzt ist
        setCookie('entryView', 'grid');
        // show which view is active
        $('#pefGrid').addClass("active");
        $('#pefList').removeClass("active");
        // don't show Table-Liste
        $('.inner table').css("display", "none");
        // Grid-List not added
        if (!$('.infocell').length) {
            var temp = $('tr');
            temp.each(function (idx, tr) {
                // skip table header
                if ($(tr).find('th').length) {
                    console.log("skip header");
                    return true;
                }
                var mainLink = $(tr).find('td:nth-child(2) a');
                var box = $('<div class="infocell"></div>');
                var boxLink = $('<a href="' + mainLink.attr("href") + '" data-ajax="true"></a>');
                // Cover
                boxLink.append($('<img class="coverimage" src="//cdn.proxer.me/cover/' + mainLink.attr("href").split('/')[2] + '.jpg">'));
                box.append(boxLink);
                // Title and Status (e.g. Airing)
                box.append($('<div>').append(mainLink).append($(tr).find('td:nth-child(1) img').addClass("marginLeft05")));
                // language
                box.append($('<div>').append($(tr).find('td:nth-child(3) img')));
                // Date
                box.append($('<div>').append($(tr).find('td:nth-child(6)').text()));
                // Uploader
                box.append($('<div>').append('Uploader:').append($(tr).find('td:nth-child(5) a').addClass("marginLeft05")));
                $('.inner').append(box);
            });
            $('.inner').append($('<div class="clear"/>'));
            updateReadingStatus();
        }
        else {
            updateReadingStatus();
        }
    }
    else {
        // Table List
        // show which view is active
        $('#pefGrid').removeClass("active");
        $('#pefList').addClass("active");
    }
}
// add read-status (e.g. Reading)
function updateReadingStatus() {
    var temp = $('.infocelltriangle');
    temp.each(function (idx, status) {
        if ($(status).css("border-top-color") != "rgba(0, 0, 0, 0)") {
            $('.infocell').eq(idx).css("border-top-color", $(status).css("border-top-color"));
        }
    });
}
