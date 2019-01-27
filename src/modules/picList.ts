// Zeigt Bilder in den Listenansichten an
// Grid-Anzeige als Standard, statt Listenansicht

pefModulList.push({
    id:"picList",
    name:"Picture List",
    description:"Bilder statt Listen",
    autor:"Blue.Reaper",
	callMethod:(change)=>picListCall(change)
});

function picListCall (change:ModulCallEvent) {
	switch(change) {
		case ModulCallEvent.on:
			picList();
			break;
		case ModulCallEvent.off:
			break;
		case ModulCallEvent.ajax:
            picList();
			break;
	}
}

function picList(){
    // console.log(window.location.pathname);
    // only in specific locations
    if ((window.location.pathname !== '/manga/updates' && window.location.pathname !== '/anime/updates'){
		return;
	}

	// add buttons for table- or grid-view
	if(!$('#pefViewControl').length){
		$('#main #simple-navi').after($(`<div id="pefViewControl" class="clear">
				<a id="pefGrid" data-ajax="true" class="marginLeft05 floatRight menu fa fa-th-large" onclick="set_cookie('entryView','grid',cookie_expire);location.reload();" href="javascript:;"/>
				<a id="pefList" data-ajax="true" class="floatRight menu fa fa-list" onclick="set_cookie('entryView','tablelist',cookie_expire);location.reload();" href="javascript:;"/>
			</div>`));
	}

// Picture (=Grid) List
	if (getCookie('entryView') != 'tablelist') {
		// Cookie setzt Grid-Anzeige als Standard (im Gegensatz zu der Listenansicht), wenn noch kein Cookie gesetzt ist
		setCookie('entryView', 'grid');
		// show which view is active
		$('#pefGrid').addClass("active");
		$('#pefList').removeClass("active");

		// don't show Table-Liste
		$('.inner table').css("display","none");

		// Grid-List not added
		if(!$('.infocell').length){
			let temp = $('tr');
			temp.each((idx, tr)=>{
				// skip table header
				if($(tr).find('th').length){
					console.log("skip header");
					return true;
				}
				let mainLink = $(tr).find('td:nth-child(2) a');

				let box = $('<div class="infocell"></div>');

				let boxLink = $('<a href="'+mainLink.attr("href")+'" data-ajax="true"></a>');
				// Cover
				boxLink.append($('<img class="coverimage" src="//cdn.proxer.me/cover/'+mainLink.attr("href").split('/')[2]+'.jpg">'));
				box.append(boxLink);
				// Title and Status (e.g. Airing)
				box.append($('<div>').append(mainLink).append($(tr).find('td:nth-child(1) img').addClass("marginLeft05")));
				// language
				box.append($('<div>').append($(tr).find('td:nth-child(3) img')));
				// Date
				box.append($('<div>').append($(tr).find('td:nth-child(6)').text()));
				// Uploader
				box.append($('<div>').append('Uploader:').append($(tr).find('td:nth-child(5) a').addClass("marginLeft05")));
				$('.inner').append(box);
			});
			$('.inner').append($('<div class="clear"/>'))
			updateReadingStatus();
		} else {
			updateReadingStatus();
		}
	}else {
// Table List
		// show which view is active
		$('#pefGrid').removeClass("active");
		$('#pefList').addClass("active");
	}
}

// add read-status (e.g. Reading)
function updateReadingStatus(){
	let temp = $('.infocelltriangle');
	temp.each((idx, status)=>{
		if($(status).css("border-top-color") != "rgba(0, 0, 0, 0)"){
			$('.infocell').eq(idx).css("border-top-color",$(status).css("border-top-color"));
		}
	});
}
