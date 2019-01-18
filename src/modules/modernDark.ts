pefModulList.push({
    id:"modernDark",
    name:"Modern Dark",
    description:"Neues Design für Proxer",
    autor:"xYata",
	callMethod:(change)=>modernDarkCall(change)
});

function modernDarkCall (change:ModulCallEvent) {
	switch(change) {
		case ModulCallEvent.on:
			GM_addStyle (GM_getResourceText ("modernDark_CSS"));
			break;
		case ModulCallEvent.off:
            location.reload();
			break;
		case ModulCallEvent.ajax:
			break;
	}
}
