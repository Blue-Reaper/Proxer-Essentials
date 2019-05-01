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

function setActivePefTab(){
    if (location.search === '' || location.search === '?s=settings') {
        $('#pef_Settings').addClass('active');
        tabPefSettings();
    }else if (location.search === '?s=modules'){
        $('#pef_Modules').addClass('active');
        tabPefModules();
    }else if (location.search === '?s=design'){
        $('#pef_Design').addClass('active');
        tabPefDesign();
    }

}

// Content of tab 'Einstellungen'
function tabPefSettings(){
    let inhalt = $('div.inner');

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
function tabPefModules(){
    let inhalt = $('div.inner');

    // Header
    inhalt.append($('<h3>Module</h3>'));
    inhalt.append($('<div>Für mehr Details auf den Modulnamen klicken.</div>'));
    // Inhalt für Modulanzeige
    let pef_module = $('<div class="clear"/>');
    inhalt.append(pef_module);
    showModules(pef_module);

    // Footer
    inhalt.append($('<div class ="clear"></div>'));

}

// Content of tab 'Design'
function tabPefDesign(){
    let inhalt = $('div.inner');

    // Header
    inhalt.append($('<h3 class="floatLeft">Design</h3>'));
    inhalt.append($('<div class="floatLeft creator">by xYata</div>'));

    inhalt.append($('<div class="clear">Essentials Design verwenden <i class="fa fa-2x pointer designStatus"/></div>'));

    if (GM_getValue('DesignStatus') === 'on') {
        $('.designStatus').addClass('active');
    }

    $('.designStatus').click(() => {
        if (GM_getValue('DesignStatus') === 'off') {
            GM_setValue('DesignStatus', 'on');
            $('.designStatus').addClass('active');
        } else {
            GM_setValue('DesignStatus', 'off');
            $('.designStatus').removeClass('active');
        }
        location.reload();
    });

    inhalt.append($('<h4>Farbwahl</h4>'));
    inhalt.append($('<div>Hier können die Farben des Designs eingestellt werden, dazu einfach den gewünschten Hexwert eingeben.</div>'));
    inhalt.append($('<div>Den Hexwert einer Farbe kann man z.B. <a href="https://www.color-hex.com/">hier</a> herausfinden.</div>'));

    let colorpick =$('<div class="colorpick"/>');
    colorpick.append($('<div class="clear">Akzent: <input id="pefAccentColor" type="text" class="floatRight" value="'+GM_getValue("AccentColor")+'"/></div>'));
    colorpick.append($('<div class="clear">Hintergrund 1: <input id="pefBg1Color" type="text" class="floatRight" value="'+GM_getValue("Bg1Color")+'"/></div>'));
    colorpick.append($('<div class="clear">Hintergrund 2: <input id="pefBg2Color" type="text" class="floatRight" value="'+GM_getValue("Bg2Color")+'"/></div>'));
    colorpick.append($('<div class="clear">Schaltflächen: <input id="pefButtonColor" type="text" class="floatRight" value="'+GM_getValue("ButtonColor")+'"/></div>'));
    colorpick.append($('<div class="clear">Text: <input id="pefTextColor" type="text" class="floatRight" value="'+GM_getValue("TextColor")+'"/></div>'));
    colorpick.append($('<div class="clear">Links: <input id="pefLinkColor" type="text" class="floatRight" value="'+GM_getValue("LinkColor")+'"/></div>'));
    colorpick.append($('<div class="clear">hervorgehobener Text: <input id="pefTextHighlightColor" type="text" class="floatRight" value="'+GM_getValue("TextHighlightColor")+'"/></div>'));
    let buttons = $('<div class ="clear"/>');
    let reset = $('<a href="javascript:;" class="menu active">Zurücksetzen</a>');
    let save = $('<a href="javascript:;" class="menu floatRight">Farben speichern</a>');

    buttons.append(reset);
    buttons.append(save);
    colorpick.append(buttons);
    inhalt.append(colorpick);

    reset.click(() => {
        resetDesign();
        location.reload();
    });
    save.click(() => {
        GM_setValue("AccentColor",$('#pefAccentColor').val());
        GM_setValue("Bg1Color",$('#pefBg1Color').val());
        GM_setValue("Bg2Color",$('#pefBg2Color').val());
        GM_setValue("ButtonColor",$('#pefButtonColor').val());
        GM_setValue("TextColor",$('#pefTextColor').val());
        GM_setValue("LinkColor",$('#pefLinkColor').val());
        GM_setValue("TextHighlightColor",$('#pefTextHighlightColor').val());
        location.reload();
    });

}

// Zeitgt die einzelnen Module auf der Einstellungs-Seite an
function showModules(pef_module: any) {
    // Fügt jedes Modul hinzu
    for (let singleModule of pefModulList) {
        let moduleBox = $('<div id="' + singleModule.id + 'ModulBox" class="floatLeft modulBox"></div>');

        moduleBox.append($('<h3><a class="pointer" target="_blank" href="'+singleModule.link+'">' + singleModule.name + '</a></h3>'));

        moduleBox.append($('<div>' + singleModule.description + '</div>'));
        moduleBox.append($('<div class="autor">by ' + singleModule.autor + '</div>'));

        let modulStatus = $('<i id="' + singleModule.id + '_StatusImg" class="fa fa-2x pointer"/>');
        moduleBox.append(modulStatus);

        pef_module.append(moduleBox);
        updateModulTick(singleModule.id);

        modulStatus.click(() => toggleModulStatus(singleModule));
    }
}

// Troogelt den Speicherwert und ruft das Modul auf
function toggleModulStatus(modul: IPefModul) {
    if (GM_getValue(modul.id + 'Status') === 'off') {
        GM_setValue(modul.id + 'Status', 'on');
        actionControl(ModulCallEvent.on, modul);
    } else {
        GM_setValue(modul.id + 'Status', 'off');
        actionControl(ModulCallEvent.off, modul);
    }
    updateModulTick(modul.id);
}

// Setzt ModulBox active or not
function updateModulTick(modulId: string) {
    if (GM_getValue(modulId + 'Status') === 'off') {
        $('#' + modulId + 'ModulBox').removeClass('active');
    } else {
        $('#' + modulId + 'ModulBox').addClass('active');
    }
}
