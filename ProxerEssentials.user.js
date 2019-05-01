"use strict";
// ==UserScript==
// @name        Proxer Essentials
// @version     5.4
// @description Nützlicher Erweiterungen für Proxer die jeder braucht
// @author      Blue.Reaper
// @namespace   https://blue-reaper.github.io/Proxer-Essentials/
// @homepage    https://blue-reaper.github.io/Proxer-Essentials/
// @supportURL  https://github.com/Blue-Reaper/Proxer-Essentials/issues/new/choose
// @icon        https://raw.githubusercontent.com/Blue-Reaper/Proxer-Essentials/master/src/framework/img/logo_proxer.png
// @updateURL https://openuserjs.org/meta/Blue.Reaper/Proxer_Essentials.meta.js
// @updateURL https://openuserjs.org/install/Blue.Reaper/Proxer_Essentials.user.js
// @license MIT
// @include     https://proxer.me/*
// @require     http://code.jquery.com/jquery-3.4.0.min.js
// @run-at      document-start
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       unsafeWindow
// @grant       GM_addStyle
// @grant       GM_getResourceText
// @grant       GM_getResourceURL
// Konsolenausgabe für Debugging
// @grant       GM_log
// @resource    framework_CSS      https://raw.githubusercontent.com/Blue-Reaper/Proxer-Essentials/dev/src/framework/css/framework.css
// @resource    modules_CSS        https://raw.githubusercontent.com/Blue-Reaper/Proxer-Essentials/dev/src/modules/css/modules.css
// @resource    design_CSS         https://raw.githubusercontent.com/Blue-Reaper/Proxer-Essentials/dev/src/framework/css/design.css
// smallWonders
// @resource    smallWonders_CSS   https://raw.githubusercontent.com/Blue-Reaper/Proxer-Essentials/dev/src/modules/css/smallWonders.css
// Theatermodus
// @include     https://stream.proxer.me/*
// @resource    theater_CSS        https://raw.githubusercontent.com/Blue-Reaper/Proxer-Essentials/dev/src/modules/css/theaterModus.css
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
    GM_addStyle(":root {\n            /* accent color */\n            --accent-color:" + GM_getValue("AccentColor") + ";\n            /* background color */\n            --bg1-color:" + GM_getValue("Bg1Color") + ";\n            --bg2-color:" + GM_getValue("Bg2Color") + ";\n            /* Button */\n            --button-color:" + GM_getValue("ButtonColor") + ";\n            /* Text */\n            --text-color:" + GM_getValue("TextColor") + ";\n            --link-color:" + GM_getValue("LinkColor") + ";\n            --highlight-text-color:" + GM_getValue("TextHighlightColor") + ";\n        }");
    // Add Style after <head> to override css of side (and dont need !important everywhere)
    // But add Before sth is shown to the user
    $("html").append($('<style type="text/css">' + GM_getResourceText("design_CSS") + '</style>'));
}
function resetDesign() {
    GM_setValue("DesignStatus", "on");
    GM_setValue("AccentColor", "#ef394a");
    GM_setValue("Bg1Color", "#232428");
    GM_setValue("Bg2Color", "#2d2f33");
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
        $('[src~="//cdn.proxer.me/cover/894.jpg"]').attr('src', 'https://raw.githubusercontent.com/Blue-Reaper/Proxer-Essentials/master/src/framework/img/proxer-test-anime.jpg');
        $('[src~="//cdn.proxer.me/cover/2373.jpg"]').attr('src', 'https://raw.githubusercontent.com/Blue-Reaper/Proxer-Essentials/master/src/framework/img/proxer-test-manga.jpg');
        $('[src~="//cdn.proxer.me/cover/2274.jpg"]').attr('src', 'https://raw.githubusercontent.com/Blue-Reaper/Proxer-Essentials/master/src/framework/img/proxer-test-anime.jpg');
        $('[src~="//cdn.proxer.me/cover/2275.jpg"]').attr('src', 'https://raw.githubusercontent.com/Blue-Reaper/Proxer-Essentials/master/src/framework/img/proxer-test-anime.jpg');
        $('[src~="https://proxer.me/images/misc/proxerfanpage.png"]').attr('src', 'https://raw.githubusercontent.com/Blue-Reaper/Proxer-Essentials/master/src/framework/img/proxerfanpage.png');
        $('[src~="/images/misc/proxerdonate.png"]').attr('src', 'https://raw.githubusercontent.com/Blue-Reaper/Proxer-Essentials/master/src/framework/img/proxerdonate.png');
        $('[src~="/images/misc/proxeramazon.png"]').attr('src', 'https://raw.githubusercontent.com/Blue-Reaper/Proxer-Essentials/master/src/framework/img/proxeramazon.png');
        // Bilder durch FontAwesome ersetzen
        $('#miscNav').addClass('fa fa-bell');
        $('#requestNav').addClass('fa fa-users');
        $('#messageNav').addClass('fa fa-envelope-o');
        $('#newsNav').addClass('fa fa-newspaper-o');
        $('#searchNav').addClass('fa fa-search');
        $('[src~="/images/misc/stern.png"]').replaceWith('<i class="fa fa-star yellow smallImg"/>');
        $('[src~="/images/misc/stern_grau.png"]').replaceWith('<i class="fa fa-star-o grey smallImg"/>');
        $('[src~="/images/misc/offlineicon.png"]').replaceWith('<i class="fa fa-circle red normalImg"/>');
        $('[src~="/images/misc/onlineicon.png"]').replaceWith('<i class="fa fa-circle green normalImg"/>');
        $('[src~="/images/status/abgeschlossen.png"]').replaceWith('<i class="fa fa-circle green smallImg"/>');
        $('[src~="/images/status/airing.png"]').replaceWith('<i class="fa fa-circle orange smallImg"/>');
        $('[src~="/images/status/abgebrochen.png"]').replaceWith('<i class="fa fa-circle red smallImg"/>');
        $('[src~="/images/misc/upload.png"]').replaceWith('<i class="fa fa-arrow-circle-o-up bigImg"/>');
        $('[src~="/images/misc/play.png"]').replaceWith('<i class="fa fa-play-circle-o green bigImg"/>');
        $('[src~="/images/misc/info-icon.png"]').replaceWith('<i class="fa fa-info-circle blue bigImg"/>');
        $('[src~="/images/misc/manga.png"]').replaceWith('<i class="fa fa-book orange bigImg"/>');
        $('[src~="/images/social/facebook.png"]').replaceWith('<i class="fa fa-facebook-square"/>');
        $('[src~="/images/social/twitter.png"]').replaceWith('<i class="fa fa-twitter-square"/>');
        $('[src~="/images/social/youtube2.png"]').replaceWith('<i class="fa fa-youtube-square"/>');
        $('[src~="/images/social/google-plus.png"]').replaceWith('<i class="fa fa-google-plus-square"/>');
        $('[src~="/images/social/amazon.png"]').replaceWith('<i class="fa fa-amazon"/>');
        // user better font FontAwesome
        $('.fa-list').removeClass('fa-list').addClass('fa-bars');
        $('.fa-th-large').removeClass('fa-th-large').addClass('fa-th');
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
    inhalt.append($('<h4><a href="https://blue-reaper.github.io/Proxer-Essentials/">Info-Seite mit detaillierter Beschreibung</a></h4>'));
    inhalt.append($('<h4>Einstellungen</h4>'));
    inhalt.append($('<a data-ajax="true" href="/pef?s=modules#top" class="menu">Module</a>'));
    inhalt.append($('<a data-ajax="true" href="/pef?s=design#top" class="menu marginLeft05">Design</a>'));
    inhalt.append($('<h4>Kontakt für neue Ideen, Wünsche oder Bugs</h4>'));
    inhalt.append($('<div><a href="https://github.com/Blue-Reaper/Proxer-Essentials/issues/new/choose">auf GitHub</a></div>'));
    inhalt.append($('<div><a href="https://proxer.me/forum/anwendungen/386157-userscript-inkl-theme-proxer-essentials">oder im Forumsbeitrag</a></div>'));
    inhalt.append($('<div><a href="https://proxer.me/messages?s=new&id=422227">oder per privater Nachricht</a></div>'));
}
// Content of tab 'Module'
function tabPefModules() {
    var inhalt = $('div.inner');
    // Header
    inhalt.append($('<h3>Module</h3>'));
    inhalt.append($('<div>Für mehr Details auf den Modulnamen klicken.</div>'));
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
    inhalt.append($('<div>Den Hexwert einer Farbe kann man z.B. <a href="https://www.color-hex.com/">hier</a> herausfinden.</div>'));
    var colorpick = $('<div class="colorpick"/>');
    colorpick.append($('<div class="clear">Akzent: <input id="pefAccentColor" type="text" class="floatRight" value="' + GM_getValue("AccentColor") + '"/></div>'));
    colorpick.append($('<div class="clear">Hintergrund 1: <input id="pefBg1Color" type="text" class="floatRight" value="' + GM_getValue("Bg1Color") + '"/></div>'));
    colorpick.append($('<div class="clear">Hintergrund 2: <input id="pefBg2Color" type="text" class="floatRight" value="' + GM_getValue("Bg2Color") + '"/></div>'));
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
        GM_setValue("Bg1Color", $('#pefBg1Color').val());
        GM_setValue("Bg2Color", $('#pefBg2Color').val());
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
        moduleBox.append($('<h3><a class="pointer" target="_blank" href="' + singleModule.link + '">' + singleModule.name + '</a></h3>'));
        moduleBox.append($('<div>' + singleModule.description + '</div>'));
        moduleBox.append($('<div class="autor">by ' + singleModule.autor + '</div>'));
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
pefModulList.push({
    id: 'ignoreUser',
    name: 'User ignorieren',
    description: 'User im Forum ausblenden',
    link: 'https://blue-reaper.github.io/Proxer-Essentials/modules/ignoreUser',
    autor: 'Blue.Reaper',
    callMethod: function (change) { return ignoreUserCall(change); }
});
function ignoreUserCall(change) {
    switch (change) {
        case 0 /* on */:
            ignoreUser();
            break;
        case 1 /* off */:
            // ignoreUser();
            break;
        case 2 /* ajax */:
            // ignoreUser();
            break;
    }
}
function ignoreUser() {
    // Only in Forum
    if (window.location.pathname.split('/')[1] !== 'forum') {
        return;
    }
    // button to hide user-comments
    $('div.kpost-thankyou').each(function (idx, div) {
        var ignoreUserButton = $('<i id="pefIgnoreUser" class="btn">User ausblenden</i>');
        var userId = $(div).parents('table.kpublished').find('li.kpost-username a').attr('href').slice(6, -4);
        ignoreUserButton.click(function () {
            addIgnoredUser(userId);
            location.reload();
        });
        $(div).append(ignoreUserButton);
    });
    // init ignore-List
    if (GM_getValue("ignoreUserList") == null) {
        GM_setValue("ignoreUserList", []);
    }
    var userList = GM_getValue("ignoreUserList");
    // hide comments
    userList.forEach(function (user) {
        var blockedUser = $('li.kpost-username a[href^="/user/' + user + '"]');
        var comment = blockedUser.parents(".kbody");
        comment.parent().append($('<div class="ignoredComment">Beitrag von ' + blockedUser.text() + ' ausgeblendet</div>'));
        var showUser = $('<i class="btn">User einblenden</i>');
        showUser.click(function () {
            removeIgnoredUser(user);
            location.reload();
        });
        var buttons = $('<div class="kmessage-buttons-row center"></div>');
        buttons.append(showUser);
        comment.parent().append(buttons);
        comment.hide();
    });
}
function addIgnoredUser(userId) {
    var userIgnoreList = GM_getValue("ignoreUserList");
    if (userIgnoreList.indexOf(userId) == -1) {
        userIgnoreList.push(userId);
        GM_setValue("ignoreUserList", userIgnoreList);
    }
}
function removeIgnoredUser(userId) {
    var userIgnoreList = GM_getValue("ignoreUserList");
    var index = userIgnoreList.indexOf(userId);
    if (index > -1) {
        userIgnoreList.splice(index, 1);
        GM_setValue("ignoreUserList", userIgnoreList);
    }
}
// Longstrip Reader als Standard
// Longstrip: klick auf Bild scrollt zum nächsten Bild
// Longstrip: Navigation um zu nächstem / letztem Kapitel zu springen (ohne Zwischenseite)
// Fügt Mangaupdates im Menü Manga und auf Startseite neben Animeupdates hinzu
pefModulList.push({
    id: 'mangaComfort',
    name: 'Manga Komfort',
    description: 'Mehr Komfort beim Manga Lesen',
    link: 'https://blue-reaper.github.io/Proxer-Essentials/modules/mangaComfort',
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
    if (location.pathname === '/' && !$('#main li>a[href="/manga/updates#top').length) {
        // Add Mangaupdaets like existing Animeupdates and after that
        $('#main li>a[href="/anime/updates#top"]').parent().after($('<li id="pef_mangaupdates"><a data-ajax="true" href="/manga/updates#top">Mangaupdates</a></li>'));
    }
    if (location.pathname.split('/')[1] !== 'read' && location.pathname.split('/')[1] !== 'chapter') {
        $('.previousChapter, .nextChapter, .bookmark').remove();
        return;
    }
    // Setzt Longstrip als Standard, wenn noch kein Cookie gesetzt ist
    if (getCookie('manga_reader') != 'slide') {
        setCookie('manga_reader', 'longstrip');
    }
    if (getCookie('manga_reader') == 'longstrip') {
        // Ändere Link auf Bildern, damit nur zum nächsten Bild gesprungen wird
        $('#reader img').attr('onclick', '');
        $('#reader img').off('click', scrollToNextPage);
        $('#reader img').click(scrollToNextPage);
        // only add buttons once
        if (!$('.nextChapter').length) {
            // button previous chapter
            // don't show button on first chapter
            if (Number(location.pathname.split('/')[3]) > 1) {
                var previousChapterButton = $('<i class="previousChapter pointer fa fa-2x fa-chevron-left"/>');
                $('body').append(previousChapterButton);
                previousChapterButton.click(function () {
                    var path = location.pathname.split('/');
                    path[1] = 'read';
                    path[3] = String(Number(path[3]) - 1);
                    path[5] = String(1);
                    location.pathname = path.join('/');
                });
            }
            // button next chapter
            var nextChapterButton = $('<i class="nextChapter pointer fa fa-2x fa-chevron-right"/>');
            $('body').append(nextChapterButton);
            nextChapterButton.click(function () {
                var path = location.pathname.split('/');
                path[1] = 'read';
                path[3] = String(Number(path[3]) + 1);
                path[5] = String(1);
                location.pathname = path.join('/');
            });
            // button bookmark this chapter
            var bookmarkButton = $('<i class="bookmark pointer fa fa-2x fa-bookmark"/>');
            $('body').append(bookmarkButton);
            bookmarkButton.click(function () {
                var path = location;
                path = String(path).replace('read', 'chapter');
                var ajaxLink = (path + '?format=json&type=reminder&' + $('#proxerToken').val() + '=1&title=reminder_this');
                $.post(ajaxLink, {
                    'check': 1
                }, function (data) {
                    createPefMessage(data.msg);
                    localStorage.listentries_timer = null;
                });
            });
        }
    }
    // Wenn 404, dann nächste Kapitel nicht verfügbar (Sprung direkt in nächste Kapitel) -> gehe zurück auf Zwichenseite
    if ($('#main img[src="/images/misc/404.png"]').length) {
        location.pathname = location.pathname.replace('read', 'chapter');
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
//  // Link zur Infoseite mit den Details
//     link: 'https://blue-reaper.github.io/Proxer-Essentials/modules/...',
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
// Zeigt Bilder in den Listenansichten an bei:
// - Updates
// - Manga/Animelist
// - Lesezeichen
// - Neuigkeiten
// Grid-Anzeige als Standard, statt Listenansicht
// In Anime- / Manga-Liste (Grid Modus) Sortier und Filter Optionen
pefModulList.push({
    id: "picTile",
    name: "Bild-Kacheln",
    description: "Bild-Kacheln statt Tabellen",
    link: 'https://blue-reaper.github.io/Proxer-Essentials/modules/pictureTile',
    autor: "Blue.Reaper",
    callMethod: function (change) { return picTileCall(change); }
});
function picTileCall(change) {
    switch (change) {
        case 0 /* on */:
            picTile();
            break;
        case 1 /* off */:
            break;
        case 2 /* ajax */:
            picTile();
            break;
    }
}
// updates
function isLocationUpdates() {
    if (location.pathname == '/manga/updates' || location.pathname == '/anime/updates') {
        return true;
    }
    return false;
}
// Manga/Anime list
function isLocationStatus() {
    if (location.pathname == '/ucp' && (location.search.startsWith('?s=manga') || location.search.startsWith('?s=anime'))) {
        return true;
    }
    return false;
}
// bookmarks
function isLocationBookmarks() {
    if (location.pathname == '/ucp' && location.search.startsWith('?s=reminder')) {
        return true;
    }
    return false;
}
function picTile() {
    // notification bubble is shown but contains no tiles
    if ($('#notificationBubble.miscNav').length && (!$('#notificationBubble.miscNav .tile').length)) {
        redesignNotification();
    }
    // console.log(location.pathname);
    // console.log(location.search);
    if (isLocationUpdates() || isLocationStatus() || isLocationBookmarks()) {
        // add buttons for table- or grid-view
        if (!$('#pefViewControl').length) {
            $('#main #simple-navi').after($("<div id=\"pefViewControl\" class=\"clear\">\n    \t\t\t\t<a id=\"pefGrid\" data-ajax=\"true\" class=\"marginLeft05 floatRight menu fa fa-th\" onclick=\"set_cookie('entryView','grid',cookie_expire);location.reload();\" href=\"javascript:;\"/>\n    \t\t\t\t<a id=\"pefList\" data-ajax=\"true\" class=\"marginLeft05 floatRight menu fa fa-bars\" onclick=\"set_cookie('entryView','tablelist',cookie_expire);location.reload();\" href=\"javascript:;\"/>\n    \t\t\t</div>"));
        }
        // Picture (=Grid) List
        if (getCookie('entryView') != 'tablelist') {
            // Cookie setzt Grid-Anzeige als Standard (im Gegensatz zu der Listenansicht), wenn noch kein Cookie gesetzt ist
            setCookie('entryView', 'grid');
            // show which view is active
            $('#pefGrid').addClass("active");
            $('#pefList').removeClass("active");
            $('.inner').hide();
            // Grid-List not added
            if (!$('.tile.sizeBig').length) {
                // sort/filter options
                if (isLocationStatus()) {
                    var filterMedium = $('<select id="mediumFilter" class = "marginLeft05 floatRight"/>');
                    filterMedium.append($('<option value=""  selected >Medium Filter</option>'));
                    filterMedium.on('input', function () { return filterList(); });
                    $('#pefViewControl').append(filterMedium);
                    var filterTitle = $('<input id="titleFilter" type="text" placeholder="Titel Filter" class="marginLeft05 floatRight"/>');
                    filterTitle.on('input', function () { return filterList(); });
                    $('#pefViewControl').append(filterTitle);
                    var sortAlpha = $('<a id="pefSortAlpha" class="marginLeft05 floatRight menu fa fa-sort-alpha-asc active" href="javascript:;"/>');
                    var sortStar = $('<a id="pefSortStar" class="marginLeft05 floatRight menu fa fa-long-arrow-down" href="javascript:;"><i class="fa  fa-star"/><a/>');
                    sortAlpha.click(function () { return sortList(0 /* alphabetical */); });
                    sortStar.click(function () { return sortList(1 /* stars */); });
                    $('#pefViewControl').append(sortAlpha);
                    $('#pefViewControl').append(sortStar);
                }
                if (isLocationUpdates()) {
                    showGridUpdates();
                }
                else if (isLocationStatus()) {
                    showGridStatus();
                }
                else if (isLocationBookmarks()) {
                    showGridBookmarks();
                }
            }
        }
        else {
            // Table List
            // show which view is active
            $('#pefGrid').removeClass("active");
            $('#pefList').addClass("active");
        }
    }
    else {
        $('.inner').show();
    }
}
function showGridUpdates() {
    $('tr').each(function (idx, tr) {
        // skip table header
        if ($(tr).find('th').length) {
            return true;
        }
        var link = $(tr).find('td:nth-child(2) a').attr("href");
        var title = $(tr).find('td:nth-child(2) a').text();
        var tid = link.replace(new RegExp("/|info|list|#top", "g"), "");
        var box = $('<a class="tile sizeBig picTopBorder" href="' + link + '" data-tid="' + tid + '"></a>');
        // Cover
        box.append($('<img class="tilePic" src="//cdn.proxer.me/cover/' + tid + '.jpg">'));
        // Title
        box.append($('<div class="tileText">').append(title));
        // Date
        box.append($('<div class="tileText tileBottom">').append($(tr).find('td:nth-child(6)').text()));
        $('#main').append(box);
    });
    $('#main').append($('<div class="clear"/>'));
    updateReadingStatus();
}
function showGridStatus() {
    $('.inner table').each(function (idx, table) {
        var accordion = $('<a class="menu acc">' + $(table).find('th:first').text() + '</a>');
        var accContent = $('<div class="accContent">');
        if ($(table).find('th:first').text() == "Am Schauen" || $(table).find('th:first').text() == "Am Lesen") {
            accordion.addClass("active");
            accContent.show();
        }
        else {
            accContent.hide();
        }
        $('#main').append(accordion);
        $('#main').append(accContent);
        accordion.click(function () {
            accordion.toggleClass("active");
            accContent.toggle();
        });
        $(table).find('tr').each(function (idx, tr) {
            // skip table header
            if ($(tr).find('th').length) {
                return true;
            }
            var link = $(tr).find('td:nth-child(2) a').attr("title", '').attr("href");
            var title = $(tr).find('td:nth-child(2) a').attr("title", '').text();
            // Medium
            var box = $('<a class="tile sizeBig" href="' + link + '" data-medium="' + $(tr).find('td:nth-child(3)').text() + '" data-title="' + title + '"></a>');
            // Cover
            box.append($('<img class="tilePic" src="//cdn.proxer.me/cover/' + link.replace(new RegExp("/|info|list|#top", "g"), "") + '.jpg">'));
            // Title
            box.append($('<div class="tileText">').append(title));
            // rating
            box.append($('<div class="tileText tileBottom">').append($(tr).find('td:nth-child(4)').children()));
            accContent.append(box);
        });
        accContent.append($('<div class="clear"/>'));
        accordion.append($('<div class="counter floatRight">' + $(accContent).find('.tile').length + '</div>'));
    });
    // add options for medium filter
    var options = $('[data-medium]').map(function () { return $(this).data('medium'); }).get().filter(function (elem, index, self) { return index === self.indexOf(elem); });
    options.forEach(function (element) { return $('#mediumFilter').append($('<option value="' + element + '">' + element + '</option>')); });
}
function showGridBookmarks() {
    $('.inner td[width="50%"]').each(function (idx, td) {
        var accordion = $('<a class="menu acc">' + $(td).find('h4').text() + '</a>');
        var accContent = $('<div class="accContent">');
        $('#main').append(accordion);
        $('#main').append(accContent);
        accContent.hide();
        accordion.click(function () {
            accordion.toggleClass("active");
            accContent.toggle();
        });
        $(td).find('table tr').each(function (idx, tr) {
            // skip table header
            if ($(tr).find('th').length) {
                return true;
            }
            var link = $(tr).find('td:nth-child(2) a').attr("title", '').attr("href");
            var title = $(tr).find('td:nth-child(2) a').attr("title", '').text();
            var box = $('<a class="tile sizeBig" href="' + link.replace("chapter", "read") + '"></a>');
            // Cover
            var cover = $('<img class="tilePic" src="//cdn.proxer.me/cover/' + link.split("/")[2] + '.jpg">');
            // grayout cover if episode offline
            if ($(tr).find('td:nth-child(6) i').hasClass('red')) {
                cover.addClass('grayout');
            }
            box.append(cover);
            // Title
            box.append($('<div class="tileText">').append(title));
            // number
            box.append($('<div class="tileText tileBottom">').append("# ").append($(tr).find('td:nth-child(3)').text()));
            accContent.append(box);
        });
        accContent.append($('<div class="clear"/>'));
        accordion.append($('<div class="floatRight">' + $(accContent).find('.tile').length + '</div>'));
    });
    $('#main').append($('.inner p:first-child'));
    // open acc with more content
    if ($('a.menu.acc:first div').text() < $('a.menu.acc:eq(1) div').text()) {
        $('a.menu.acc:eq(1)').click();
    }
    else if ($('a.menu.acc:first div').text() > $('a.menu.acc:eq(1) div').text()) {
        $('a.menu.acc:first').click();
    }
}
// add read-status (e.g. Reading)
function updateReadingStatus() {
    // @ts-ignore
    getProxerListEntries(tileStatus);
}
function tileStatus(bookmarks) {
    $.each(bookmarks, function (id, bookmark) {
        var tile = $('.tile[data-tid="' + bookmark.tid + '"]');
        if (tile.length) {
            var color = void 0;
            switch (bookmark.state) {
                case "0":
                    //finished
                    color = 'var(--darkgreen)';
                    break;
                case "1":
                    //reading
                    color = 'var(--darkblue)';
                    break;
                case "2":
                    //will be read
                    color = 'var(--orange)';
                    break;
                case "3":
                    //abortet
                    color = 'var(--red)';
                    break;
                default:
                    color = 'var(--text-color)';
            }
            tile.css('border-color', color);
        }
    });
}
function sortList(sortOption) {
    $('.accContent').each(function (idx, container) {
        var items = $(container).children('.tile').sort(function (a, b) {
            if (sortOption == 1 /* stars */) {
                $('#pefSortStar').addClass("active");
                $('#pefSortAlpha').removeClass("active");
                return $(b).find(".tileText.tileBottom i.fa-star, .tileText.tileBottom img[src='/images/misc/stern.png']").length - $(a).find(".tileText.tileBottom i.fa-star, .tileText.tileBottom img[src='/images/misc/stern.png']").length;
            }
            else {
                $('#pefSortAlpha').addClass("active");
                $('#pefSortStar').removeClass("active");
                var aName = $(a).data('title').toLowerCase();
                var bName = $(b).data('title').toLowerCase();
                return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
            }
        });
        $(container).find('.clear').before(items);
    });
}
function filterList() {
    $('.tile').show();
    var titleFilter = new RegExp($('#titleFilter').val(), 'i');
    // hide alle elements that don't match the filters
    $('.tile').filter(function (index, item) {
        if ($('#mediumFilter').val() == "")
            // if meduim filter is not active only filter title
            return !titleFilter.test($(item).data('title'));
        else
            // filter title and medium
            return (!titleFilter.test($(item).data('title')) || ($(item).data('medium') != $('#mediumFilter').val()));
    }).hide();
    // update accordion counter after filtering
    $('.acc').each(function (idx, container) {
        $(container).find('.counter').text($(container).next('.accContent').find('.tile:not([style*="display: none"])').length);
    });
}
function redesignNotification() {
    $('#notificationBubble.miscNav').addClass('redesign');
    $('#notificationBubble.miscNav::after').hide();
    $('#notificationBubble.miscNav>div.scrollBar').hide();
    $('#notificationBubble.miscNav .notificationList').each(function (idx, item) {
        var link = $(item).attr("href");
        var picTile = $('<a class="tile sizeSmall" href="' + link.replace("chapter", "read") + '" data-notifyid="' + item.id.substr('12') + '" />');
        $('#notificationBubble.miscNav').append(picTile);
        // Manga or Anime
        if (/chapter/.test(link) || /watch/.test(link)) {
            var text = $(item).find('u').text().split('#');
            picTile.append($('<img class="tilePic" src="//cdn.proxer.me/cover/' + link.split("/")[2] + '.jpg">'));
            picTile.append($('<div class="tileText">' + text[0] + '</div>'));
            picTile.append($('<div class="tileText tileBottom"># ' + text[1] + '</div>'));
        }
        // board
        else if (/forum/.test(link)) {
            var text = $(item).find('i').text();
            text = text.substring(1, text.length - 1);
            picTile.append($('<div class="tileFA fa fa-comments-o"> </div>'));
            picTile.append($('<div class="tileText wrap">' + text + '</div>'));
            picTile.append($('<div class="tileText tileBottom">Forum</div>'));
        }
        // other than board, anime or manga
        else {
            var text = $(item).text();
            picTile.append($('<div class="tileText wrap">' + text + '</div>'));
            picTile.append($('<div class="tileText tileBottom">!!Fehler!!</div>'));
        }
        var close = $('<a class="tileTimes fa fa-times" href="javascript:;">');
        picTile.append(close);
        close.hover(function () { return picTile.addClass('delete'); }, function () { return picTile.removeClass('delete'); });
        close.click(function () {
            picTile.remove();
            $.post('/notifications?format=json&s=deleteNotification&' + $('#proxerToken').val() + '=1', { id: $(picTile).data('notifyid') }, function (result) { });
        });
    });
}
// Wunder:
// "zurück nach oben" Button
// Nachricht "Diese Website verwendet Cookies..." wird ausgeblendet
// setzt "Ja ich bin Erwachsen"
// blende Abonnieren Button aus (Infoseite), da keine Funktion? https://proxer.me/forum/213-allgemein/386170-abbonieren-button-in-details-seiten-beschreibung
// blende Werbung auf Anime-Seite aus
// blende Social Media aus
// blende Artikel (=Amazon) aus
// blednde News und Freundschafts Icon aus (oben rechts)
// blendet Chat aus
// blendet Spendenaufruf auf Videoplayer aus
pefModulList.push({
    id: 'smallWonders',
    name: 'Kleine Wunder',
    description: 'Kleine Änderungen, die Wunder wirken',
    link: 'https://blue-reaper.github.io/Proxer-Essentials/modules/smallWonders',
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
    if ($('#nav a[title="Blue.Reaper"]').length) {
        // Keine Erwachenen-Meldung mehr
        setCookie('adult', '1');
        // no donate call on videoplayer
        setCookie('stream_donatecall1', '1');
        // hide tab 'Artikel'
        // hide 'Artikel' on chapter Page
        GM_addStyle('a[href$="article#top"], div.article {display: none !important;}');
    }
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
pefModulList.push({
    id: "theaterMode",
    name: "Theatermodus",
    description: "Theatermodus für Animes",
    link: 'https://blue-reaper.github.io/Proxer-Essentials/modules/theatermodus',
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
