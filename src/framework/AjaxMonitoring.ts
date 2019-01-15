let ajaxEvent :boolean = false;
// Setzt für jede Änderung an der Oberfläche die Prüfvariable auf true
document.addEventListener("DOMSubtreeModified", function(){
		ajaxEvent = true;
});
// Prüft alle 700ms, ob es Ajax Aufrufe gab und ruft ggf. die Module mit "Ajax Aufruf" auf
function monitorAjax(){
	setInterval(()=>{
		if (ajaxEvent){
			createPefSettings();
			actionControl(ModulCallEvent.ajax);
			ajaxEvent = false;
		}
	},700);
}
