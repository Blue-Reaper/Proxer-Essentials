
// Liste der einzelnen Module
var pefModulList = [
	{
		id: "smallWonders",
		name : "kleine Wunder",
	},
	{
		id: "pefExample",
		name : "Beispiel Modul",
	}

];

//	Hier ruft das Framework die einzelnen Module auf
function actionControl(change, modulId){
	for(var i = 0; i < pefModulList.length; i++) {
		// Erst-Initialisierung der Speicherwerte
		if (GM_getValue(pefModulList[i].id+"Status")==null){
			GM_setValue(pefModulList[i].id+"Status","on");
		}
		// Wird eine Modul-Id übergeben, wird vom Framework nur dieses Modul aufgerufen (wird bei "User on-off" verwendet)
		if(modulId != null){
			console.log("Aufruf Modul: "+modulId);
			 $(this)["callPefExample"](change);
			// ['callPefExample'](change);
			// $(unsafeWindow)['callPefExample'](change);
		}
		// Ruft alle Module, die aktiviert sind
		else if (GM_getValue(pefModulList[i].id+"Status")=="on"){
			switch (pefModulList[i].id) {
				case "pefExample":
				callPefExample(change);
				break;
				case "smallWonders":
				callSmallWonders(change);
				break;
				// case "Id des Moduls (wurde in pefModulList eingetragen)":
				// 	Hier die Aufrufmethode des jeweiliegen Moduls eintragen
				// 	break;
				default:
			}
		}
	}
}
