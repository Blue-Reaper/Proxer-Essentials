// Wunder:
// "zurück nach oben" Button

pefModulList.push({
    id:"smallWonders",
    name:"Kleine Wunder",
    description:"Kleine Änderungen, die Wunder wirken",
    autor:"Blue.Reaper",
	callMethod:(change)=>smallWondersCall(change)
});

function smallWondersCall (change:ModulCallEvent) {
	switch(change) {
		case ModulCallEvent.on:
			smallWonders();
			break;
		case ModulCallEvent.off:
		// smallWonders();
			break;
		case ModulCallEvent.ajax:
            // smallWonders();
			break;
	}
}

function smallWonders(){
// ############### BackToTop ###############
// button einfügen
	let backToTopButton = $('<i class="backToTop pointer fa fa-2x fa-chevron-up"/>');
	$("body").append(backToTopButton);
// scroll 100 Pixel
	$(window).scroll(()=> {
		if ($(window).scrollTop() > 1000) {
			backToTopButton.fadeIn();
		} else {
			backToTopButton.fadeOut();
		}
	});
// click
	backToTopButton.click(()=> {
		$('body,html').animate({
			scrollTop: 0
		}, 800);
		return false;
	});

}
