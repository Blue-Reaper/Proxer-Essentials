// Theatermodus für Anime

// IDEA 10 sek zurückspulen einbauen

pefModulList.push({
    id:"theaterMode",
    name:"Theatermodus",
    description:"Theatermodus für Animes",
    autor:"Blue.Reaper",
	callMethod:(change)=>theatreModeCall(change)
});

function theatreModeCall (change:ModulCallEvent) {
	switch(change) {
		case ModulCallEvent.on:
			theatermodus();
			break;
		case ModulCallEvent.off:
			theatermodusOff();
			break;
		case ModulCallEvent.ajax:
			theatermodus();
			break;
	}
}

function theatermodus(){
    if (window.location.hostname !== "stream.proxer.me" && window.location.pathname.split('/')[1] !== 'watch'){
        theatermodusOff();
    }

	// Innerhalb des Iframes
	if(window.location.hostname === "stream.proxer.me"){
        GM_addStyle (GM_getResourceText ("theater_CSS"));
        // $('#player_code').addClass("inheritSize");
        // $('.flowplayer').addClass("inheritSize");
        // $('.plyr video').addClass("heightVideo");
	}
	// normale Proxer Seite
	if (window.location.pathname.split('/')[1] === 'watch'){
        // Check if button is already added
        if(!$('.toggleTheater').length){
            let backToTopButton = $('<i class="toggleTheater pointer fa fa-2x fa-arrows-alt"/>');
            $("body").append(backToTopButton);
            backToTopButton.click(()=> {
                $('iframe').toggleClass("theaterActive");
            });
        }
	}
}

function theatermodusOff(){
    // Entferne Button wieder
    $('.toggleTheater').remove();
}
