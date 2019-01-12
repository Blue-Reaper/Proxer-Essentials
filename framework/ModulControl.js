// Liste der einzelnen Module
var pefModulList = [
	{
		id: "smallWonders",
		name : "kleine Wunder",
	},
	{
		id: "pefExample",
		name : "Beispielscript",
	}

];

//	Wird vom Framework aufgerufen, um die einzelnen Module aufzurufen
function actionControl(change){
	for(var i = 0; i < pefModulList.length; i++) {
		// Erst-Initialisierung der Speicherwerte
		if (GM_getValue(pefModulList[i].id+"Status")==null){
			GM_setValue(pefModulList[i].id+"Status","on");
		}
		if (GM_getValue(pefModulList[i].id+"Status")=="on"){
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
