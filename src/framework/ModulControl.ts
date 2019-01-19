// Interface für Grunddaten der Module
interface IPefModul {
    id: string;
    name: string;
    description: string;
    autor: string;
    callMethod: (change:ModulCallEvent) => void;
}

// Mögliche Events mit denen die callMethod() aufgerufen wird
const enum ModulCallEvent {
    on,
    off,
    ajax
}

// Erst-Initialisierung der Speicherwerte
function initStatusMemory(){
    // Cookie damit Nachricht "Diese Website verwendet Cookies..." nicht kommt
    setCookie('cookieconsent_dismissed','yes');
	for(let singleModule of pefModulList){
		if (GM_getValue(singleModule.id+"Status")==null){
			GM_setValue(singleModule.id+"Status","on");
		}
	}
}

//	Hier ruft das Framework die einzelnen Module auf
function actionControl(change :ModulCallEvent, modul?:IPefModul){
	// Wird ein Modul übergeben, wird vom Framework nur dieses Modul aufgerufen
	if(modul != null){
		modul.callMethod(change);
	} else{
		for(let singleModule of pefModulList){
			// Ruft alle Module auf, die aktiviert sind
			if (GM_getValue(singleModule.id+"Status")=="on"){
				singleModule.callMethod(change);
			}
		}
	}
}
