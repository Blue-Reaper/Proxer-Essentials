//Fügt den Button "Essentials" zu "leftNav" hinzu
// Erzeugt 'Einstellungen' in Essentials
function addPefMenu() {
	$('#leftNav').append($('<li class="topmenu"><a href="javascript:;">Essentials ▾</a><ul id="pef_menu"></ul></li>'));
	// Erzeugt 'Einstellungen' in Essentials
	$('#pef_menu').append($('<li><a href="/pef?s=settings#top">Einstellungen</a></li>'));
};

// Zeigt die Settings des PEF an
// Erzeugt die Einstellungs-Seite für PEF
// Da es proxer.me/pef nicht gibt, wird die Startseite angezeigt
function createPefSettings(){
	if(window.location.pathname.split('/')[1] === 'pef'){
		// // Lösche alle Tabs der Startseite aus Navigations-Leiste
		$('#simple-navi').empty();
// 		Lösche den Inhalt der Seite
		$('div.inner').empty();
		let inhalt = $('div.inner');

		// Setze den Titel des Tabs im Browser
		document.title = 'Proxer Essentials';

// 		Erzeuge Tab Einstellungen
// 		Id: pef_Settings
// 		URL: ?s=settings
		$('#simple-navi').append($('<li id ="pef_Settings"><a data-ajax="true" href="/pef?s=settings#top">Einstellungen</a></li>'));

		// Erzeugt den Ihalt des Tabs 'Einstellungen'
		if(location.search === "" || location.search === "?s=settings"){
			$('#pef_Settings').addClass("active");
			document.title = 'Proxer Essentials';

			// Überschrift
			inhalt.append($('<h3 class="floatLeft">Proxer Essentials</h3>'));
			inhalt.append($('<div class="floatLeft version">'+GM_info.script.version+'</div>'));

			// Inhalt für Modulanzeige
			let pef_module = $('<div class="clear"/>');
			inhalt.append(pef_module);
			showModules(pef_module);

			// Footer
			// inhalt.append($('<div class ="clear">Noch mehr Userscripte findet ihr <a href="https://proxer.me/forum/anwendungen">im Forum</a>.</div>'));
			inhalt.append($('<div class ="clear">Design by xYata</div>'));
		}
	}
}

// Zeitgt die einzelnen Module auf der Einstellungs-Seite an
function showModules(pef_module){

// Fügt jedes Modul hinzu
	for(let singleModule of pefModulList){
		let moduleBox = $('<div id="'+singleModule.id+'ModulBox" class="floatLeft modulBox"></div>');

		moduleBox.append($('<h3>'+singleModule.name+'</h3>'));

		moduleBox.append($('<div>'+singleModule.description+'</div>'));
		moduleBox.append($('<div class="autor">by '+singleModule.autor+'</div>'));
		// TODO: Button für Details hinzufügen
		let modulStatus = $('<i id="'+singleModule.id+'_StatusImg" class="fa fa-2x pointer"/>');
		moduleBox.append(modulStatus);

		pef_module.append(moduleBox);
		updateModulTick(singleModule.id);

		modulStatus.click(()=>toggleModulStatus(singleModule));
	}
}

// Troogelt den Speicherwert und ruft das Modul auf
function toggleModulStatus(modul :IPefModul) {
	if (GM_getValue(modul.id+"Status") === "off") {
		GM_setValue(modul.id+"Status","on");
		actionControl(ModulCallEvent.on, modul);
	} else {
		GM_setValue(modul.id+"Status","off");
		actionControl(ModulCallEvent.off, modul);
	}
    updateModulTick(modul.id);
};

// Setzt den Haken / Kreuz nach dem Modulnamen
function updateModulTick(modulId :string) {
    if (GM_getValue(modulId+"Status") === "off") {
		$("#"+modulId+"ModulBox").removeClass('active');
	} else {
		$("#"+modulId+"ModulBox").addClass('active');
	}
};
