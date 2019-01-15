// Erst-Initialisierung der Speicherwerte
function initStatusMemory(){
	for(let singleModule of pefModulList){
		if (GM_getValue(singleModule.id+"Status")==null){
			GM_setValue(singleModule.id+"Status","on");
		}
	}
}

//	Hier ruft das Framework die einzelnen Module auf
function actionControl(change :ModulCallEvent, modul?:IPefModul){
	// Wird eine Modul-Id übergeben, wird vom Framework nur dieses Modul aufgerufen
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
