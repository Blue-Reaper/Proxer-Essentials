// Zeigt Bilder in den Listenansichten an bei:
// - Updates
// - Manga/Animelist
// - Lesezeichen
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

// updates
function isLocationUpdates():boolean{
    if (location.pathname == '/manga/updates' || location.pathname == '/anime/updates'){
        return true;
    }
    return false;
}
// Manga/Anime list
function isLocationStatus():boolean{
    if (location.pathname == '/ucp' && (location.search.startsWith('?s=manga') || location.search.startsWith('?s=anime'))){
        return true;
    }
    return false;
}
// Readlist
function isLocationReadlist():boolean{
    if (location.pathname == '/ucp' && location.search.startsWith('?s=reminder')){
        return true;
    }
    return false;
}

function picList(){
    console.log(location.pathname);
    console.log(location.search);
    if (isLocationUpdates() || isLocationStatus() || isLocationReadlist()){

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

    		// Grid-List not added
    		if(!$('.picList').length){
                GM_addStyle (GM_getResourceText ("picList_CSS"));
                if(isLocationUpdates()){
                    showGridUpdates();
                } else if (isLocationStatus()){
                    showGridStatus();
                } else if (isLocationReadlist()){
                    showGridReadlist();
                }

    		} else {
                if(isLocationUpdates()){
                    updateReadingStatus();
                }
    		}
    	}else {
    // Table List
    		// show which view is active
    		$('#pefGrid').removeClass("active");
    		$('#pefList').addClass("active");
    	}
    }
}

function showGridUpdates(){
    $('tr').each((idx, tr)=>{
        // skip table header
        if($(tr).find('th').length){
            return true;
        }
        let mainLink = $(tr).find('td:nth-child(2) a');

        let box = $('<div class="picList picTopBorder"></div>');

        let boxLink = $('<a href="'+mainLink.attr("href")+'" data-ajax="true"></a>');
        // Cover
        boxLink.append($('<img class="coverimage" src="//cdn.proxer.me/cover/'+mainLink.attr("href").replace(new RegExp("/|info|list|#top","g"),"")+'.jpg">'));
        box.append(boxLink);
        // Title
        box.append($('<div class="picText">').append(mainLink));
        // Date
        box.append($('<div class="picText picBottom">').append($(tr).find('td:nth-child(6)').text()));
        $('.inner').append(box);
    });
    $('.inner').append($('<div class="clear"/>'));
    updateReadingStatus();
}

function showGridStatus(){
    $('.inner table').each((idx, table)=>{
        let accordion = $('<a class="menu acc">'+$(table).find('th:first').text()+'</a>');
        let accContent = $('<div class="accContent">');
        $('.inner').append(accordion);
        $('.inner').append(accContent);
        accordion.click(() => {
            accordion.toggleClass("active");
            accContent.toggle();
        });

        $(table).find('tr').each((idx,tr)=>{
            // skip table header
            if($(tr).find('th').length){
                return true;
            }
            let mainLink = $(tr).find('td:nth-child(2) a').attr( "title",'');
            let box = $('<div class="picList"></div>');
            let boxLink = $('<a href="'+mainLink.attr("href")+'" data-ajax="true"></a>');
            // Cover
            boxLink.append($('<img class="coverimage" src="//cdn.proxer.me/cover/'+mainLink.attr("href").replace(new RegExp("/|info|list|#top","g"),"")+'.jpg">'));
            box.append(boxLink);
            // Title
            box.append($('<div class="picText">').append(mainLink));
            // rating
            box.append($('<div class="picText picBottom">').append($(tr).find('td:nth-child(4)')));
            accContent.append(box);

        });
        accContent.append($('<div class="clear"/>'));
        accordion.append($('<div class="floatRight">'+$(accContent).find('.picList').length+'</div>'));
    });
}

function showGridReadlist(){
    $('.inner td[width="50%"]').each((idx, td)=>{
        let accordion = $('<a class="menu acc">'+$(td).find('h4').text()+'</a>');
        let accContent = $('<div class="accContent">');
        $('.inner').append(accordion);
        $('.inner').append(accContent);
        accordion.click(() => {
            accordion.toggleClass("active");
            accContent.toggle();
        });

        $(td).find('table tr').each((idx,tr)=>{
            // skip table header
            if($(tr).find('th').length){
                return true;
            }
            let mainLink = $(tr).find('td:nth-child(2) a').attr( "title",'');
            let box = $('<div class="picList"></div>');
            let boxLink = $('<a href="'+mainLink.attr("href")+'" data-ajax="true"></a>');
            // Cover
            boxLink.append($('<img class="coverimage" src="//cdn.proxer.me/cover/'+mainLink.attr("href").split("/")[2]+'.jpg">'));
            box.append(boxLink);
            // Title
            box.append($('<div class="picText">').append(mainLink));
            // status
            box.append($('<div class="picText picBottom">').append($(tr).find('td:nth-child(6)')));
            accContent.append(box);

        });
        accContent.append($('<div class="clear"/>'));
        accordion.append($('<div class="floatRight">'+$(accContent).find('.picList').length+'</div>'));
    });
    $('.inner').append($('.inner p:first-child'));
}

// add read-status (e.g. Reading)
function updateReadingStatus(){
	let temp = $('.infocelltriangle');
	temp.each((idx, status)=>{
		if($(status).css("border-top-color") != "rgba(0, 0, 0, 0)"){
			$('.picTopBorder').eq(idx).css("border-top-color",$(status).css("border-top-color"));
		}
	});
}
