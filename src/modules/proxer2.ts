pefModulList.push({
    id:"proxer2",
    name:"Proxer 2.0",
    description:"Neues Design für Proxer",
    autor:"xMarcelinoX",
	callMethod:(change)=>proxer2Call(change)
});

function proxer2Call (change:ModulCallEvent) {
	switch(change) {
		case ModulCallEvent.on:
			GM_addStyle (GM_getResourceText ("proxer2_CSS"));
			break;
		case ModulCallEvent.off:
            location.reload();
			break;
		case ModulCallEvent.ajax:
			break;
	}
}
