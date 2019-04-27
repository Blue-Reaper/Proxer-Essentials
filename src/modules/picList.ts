// Zeigt Bilder in den Listenansichten an bei:
// - Updates
// - Manga/Animelist
// - Lesezeichen
// Grid-Anzeige als Standard, statt Listenansicht
// In Anime- / Manga-Liste (Grid Modus) Sortier und Filter Optionen

const enum SortOption {
    alphabetical,
    stars
}

pefModulList.push({
    id:"picList",
    name:"Bild-Kacheln",
    description:"Bild-Kacheln statt Tabellen",
    link: 'https://blue-reaper.github.io/Proxer-Essentials/modules/pictureList',
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
    // console.log(location.pathname);
    // console.log(location.search);
    if (isLocationUpdates() || isLocationStatus() || isLocationReadlist()){

    	// add buttons for table- or grid-view
    	if(!$('#pefViewControl').length){
    		$('#main #simple-navi').after($(`<div id="pefViewControl" class="clear">
    				<a id="pefGrid" data-ajax="true" class="marginLeft05 floatRight menu fa fa-th-large" onclick="set_cookie('entryView','grid',cookie_expire);location.reload();" href="javascript:;"/>
    				<a id="pefList" data-ajax="true" class="marginLeft05 floatRight menu fa fa-list" onclick="set_cookie('entryView','tablelist',cookie_expire);location.reload();" href="javascript:;"/>
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

                // sort/filter options
                if(isLocationStatus()){
                    let filterMedium = $('<select id="mediumFilter" class = "marginLeft05 floatRight"/>');
                    filterMedium.append($('<option value=""  selected >Medium Filter</option>'));
                    filterMedium.on('input', () => filterList());
                    $('#pefViewControl').append(filterMedium);

                    let filterTitle = $('<input id="titleFilter" type="text" placeholder="Titel Filter" class="marginLeft05 floatRight"/>');
                    filterTitle.on('input', () => filterList());
                    $('#pefViewControl').append(filterTitle);

                    let sortAlpha = $('<a id="pefSortAlpha" class="marginLeft05 floatRight menu fa fa-sort-alpha-asc active" href="javascript:;"/>');
                    let sortStar = $('<a id="pefSortStar" class="marginLeft05 floatRight menu fa fa-long-arrow-down" href="javascript:;"><i class="fa  fa-star"/><a/>');
                    sortAlpha.click(() => sortList(SortOption.alphabetical));
                    sortStar.click(() => sortList(SortOption.stars));
                    $('#pefViewControl').append(sortAlpha);
                    $('#pefViewControl').append(sortStar);
                }

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
        if($(table).find('th:first').text() == "Am Schauen" || $(table).find('th:first').text() == "Am Lesen"){
            accordion.addClass("active");
            accContent.show();
        } else {
            accContent.hide();
        }
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
            // Medium
            let box = $('<div class="picList" data-medium="'+$(tr).find('td:nth-child(3)').text()+'"></div>');
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
        accordion.append($('<div class="counter floatRight">'+$(accContent).find('.picList').length+'</div>'));
    });

    // add options for medium filter
    let options = $('[data-medium]').map(function(){return $(this).data('medium');}).get().filter((elem, index, self)=> index === self.indexOf(elem));
    options.forEach(element => $('#mediumFilter').append($('<option value="'+element+'">'+element+'</option>')));
}

function showGridReadlist(){
    $('.inner td[width="50%"]').each((idx, td)=>{
        let accordion = $('<a class="menu acc">'+$(td).find('h4').text()+'</a>');
        let accContent = $('<div class="accContent">');
        $('.inner').append(accordion);
        $('.inner').append(accContent);
        accContent.hide();
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
            // number and status
            box.append($('<div class="picText picBottom">').append($(tr).find('td:nth-child(3)').append($(tr).find('td:nth-child(6) i').addClass('picStatus'))));
            accContent.append(box);

        });
        accContent.append($('<div class="clear"/>'));
        accordion.append($('<div class="floatRight">'+$(accContent).find('.picList').length+'</div>'));
    });
    $('.inner').append($('.inner p:first-child'));

    // open acc with more content
    if($('a.menu.acc:first div').text() < $('a.menu.acc:eq(1) div').text()){
        $('a.menu.acc:eq(1)').click();
    }else if ($('a.menu.acc:first div').text() > $('a.menu.acc:eq(1) div').text()){
        $('a.menu.acc:first').click();
    }
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

function sortList(sortOption :SortOption){
    $('.accContent').each((idx,container)=>{
        let items = $(container).children('.picList').sort((a, b)=> {
            if(sortOption == SortOption.stars){
                $('#pefSortStar').addClass("active");
                $('#pefSortAlpha').removeClass("active");
                return $(b).find(".picText.picBottom i.fa-star, .picText.picBottom img[src='/images/misc/stern.png']").length-$(a).find(".picText.picBottom i.fa-star, .picText.picBottom img[src='/images/misc/stern.png']").length;
            }else {
                $('#pefSortAlpha').addClass("active");
                $('#pefSortStar').removeClass("active");
                let aName = $(a).find(".picText .tip").text().toLowerCase();
                let bName = $(b).find(".picText .tip").text().toLowerCase();
                return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
            }
        });
        $(container).find('.clear').before(items);
    });
}

function filterList(){
    $('.picList').show();

    let titleFilter = new RegExp($('#titleFilter').val(),'i');
    // hide alle elements that don't match the filters
    $('.picList').filter((index,item)=> {
        if($('#mediumFilter').val() == "")
        // if meduim filter is not active only filter title
            return !titleFilter.test($(item).find(".picText .tip").text());
        else
        // filter title and medium
            return (!titleFilter.test($(item).find(".picText .tip").text())) || ($(item).data('medium') != $('#mediumFilter').val());
    }).hide();

    // update accordion counter after filtering
    $('.acc').each((idx,container)=>{
        $(container).find('.counter').text($(container).next('.accContent').find('.picList:not([style*="display: none"])').length);
    });
}
