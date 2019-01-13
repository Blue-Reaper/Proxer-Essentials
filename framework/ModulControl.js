// Erst-Initialisierung der Speicherwerte
function initStatusMemory(){
	for(var i = 0; i < pefModulList.length; i++) {
		if (GM_getValue(pefModulList[i]+"Status")==null){
			GM_setValue(pefModulList[i]+"Status","on");
		}
	}
}

//	Hier ruft das Framework die einzelnen Module auf
function actionControl(change, modulId){
	// Wird eine Modul-Id übergeben, wird vom Framework nur dieses Modul aufgerufen
	if(modulId != null){
		window[modulId+"Call"](change);
	} else{
		for(var i = 0; i < pefModulList.length; i++) {
			// Ruft alle Module auf, die aktiviert sind
			if (GM_getValue(pefModulList[i]+"Status")=="on"){
				window[pefModulList[i]+"Call"](change);
			}
		}
	}
}
