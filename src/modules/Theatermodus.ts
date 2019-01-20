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
			// theatermodus();
			break;
		case ModulCallEvent.ajax:
			theatermodus();
			break;
	}
}

function theatermodus(){
	// Innerhalb des Iframes
	if(window.location.hostname === "stream.proxer.me"){
        $('#player_code').addClass("inheritSize");
        $('.flowplayer').addClass("inheritSize");
        $('.plyr video').addClass("heigthVideo");
	}
	// normale Proxer Seite
	if (window.location.pathname.split('/')[1] === 'watch'){
        let backToTopButton = $('<i class="toggleTheater pointer fa fa-2x fa-arrows-alt"/>');
    	$("body").append(backToTopButton);
        backToTopButton.click(()=> {
		          $('iframe').toggleClass("theaterActive");
        });
	}

}
