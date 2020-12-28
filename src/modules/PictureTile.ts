// Zeigt Bilder in den Listenansichten an bei:
// - Updates
// - Manga/Animelist
// - Lesezeichen
// - Neuigkeiten
// Grid-Anzeige als Standard, statt Listenansicht
// In Anime- / Manga-Liste (Grid Modus) Sortier und Filter Optionen

const enum SortOption {
    alphabetical,
    stars
}

pefModulList.push({
    id:"picTile",
    name:"Bild-Kacheln",
    description:"Bild-Kacheln statt Tabellen",
    link: 'https://blue-reaper.github.io/Proxer-Essentials/modules/pictureTile',
    autor:"Blue.Reaper",
	callMethod:(change)=>picTileCall(change)
});

function picTileCall (change:ModulCallEvent) {
	switch(change) {
		case ModulCallEvent.on:
			picTile();
			break;
		case ModulCallEvent.off:
			break;
		case ModulCallEvent.ajax:
            picTile();
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
// bookmarks
function isLocationBookmarks():boolean{
    if (location.pathname == '/ucp' && location.search.startsWith('?s=reminder')){
        return true;
    }
    return false;
}

function picTile(){
    // notification bubble is shown but contains no tiles
    if($('#notificationBubble.miscNav').length && (!$('#notificationBubble.miscNav .tile').length)){
        redesignNotification();
    }

    // console.log(location.pathname);
    // console.log(location.search);
    if (isLocationUpdates() || isLocationStatus() || isLocationBookmarks()){

    	// add buttons for table- or grid-view
    	if(!$('#pefViewControl').length){
    		$('#main #simple-navi').after($(`<div id="pefViewControl" class="clear">
    				<a id="pefGrid" data-ajax="true" class="marginLeft05 floatRight menu fa fa-th" onclick="set_cookie('entryView','grid',cookie_expire);location.reload();" href="javascript:;"/>
    				<a id="pefList" data-ajax="true" class="marginLeft05 floatRight menu fa fa-bars" onclick="set_cookie('entryView','tablelist',cookie_expire);location.reload();" href="javascript:;"/>
    			</div>`));
    	}

    // Picture (=Grid) List
    	if (getCookie('entryView') != 'tablelist') {
    		// Cookie setzt Grid-Anzeige als Standard (im Gegensatz zu der Listenansicht), wenn noch kein Cookie gesetzt ist
    		setCookie('entryView', 'grid');
    		// show which view is active
    		$('#pefGrid').addClass("active");
    		$('#pefList').removeClass("active");

            $('.inner').hide();

    		// Grid-List not added
    		if(!$('.tile.sizeBig').length){

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

                if(isLocationUpdates()){
                    showGridUpdates();
                } else if (isLocationStatus()){
                    showGridStatus();
                } else if (isLocationBookmarks()){
                    // show "Nur verfügbare anzeigen" at top of page
                    $('#pefViewControl').append($('.inner p:first-child a.filter_available'));
                    $('#pefViewControl a.filter_available').addClass("floatRight");

                    showGridBookmarks();
                }
    		}
    	}else {
    // Table List
    		// show which view is active
    		$('#pefGrid').removeClass("active");
    		$('#pefList').addClass("active");
    	}
    } else {
        $('.inner').show();
    }
}

function showGridUpdates(){
    $('tr').each((idx, tr)=>{
        // skip table header
        if($(tr).find('th').length){
            return true;
        }
        let link = $(tr).find('td:nth-child(2) a').attr("href");
        let title = $(tr).find('td:nth-child(2) a').text();
        let tid = link.replace(new RegExp("/|info|list|#top","g"),"");

        let box = $('<a class="tile sizeBig picTopBorder" href="'+link+'" data-tid="'+tid+'"></a>');

        // Cover
        box.append($('<img class="tilePic" src="//cdn.proxer.me/cover/'+tid+'.jpg">'));
        // Title
        box.append($('<div class="tileText">').append(title));
        // Date
        box.append($('<div class="tileText tileBottom">').append($(tr).find('td:nth-child(6)').text()));
        $('#main').append(box);
    });
    $('#main').append($('<div class="clear"/>'));
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
        $('#main').append(accordion);
        $('#main').append(accContent);
        accordion.click(() => {
            accordion.toggleClass("active");
            accContent.toggle();
        });

        $(table).find('tr').each((idx,tr)=>{
            // skip table header
            if($(tr).find('th').length){
                return true;
            }
            let link = $(tr).find('td:nth-child(2) a').attr( "title",'').attr("href");
            let title = $(tr).find('td:nth-child(2) a').attr( "title",'').text();
            // Medium
            let box = $('<a class="tile sizeBig" href="'+link+'" data-medium="'+$(tr).find('td:nth-child(3)').text()+'" data-title="'+title+'"></a>');
            // Cover
            box.append($('<img class="tilePic" src="//cdn.proxer.me/cover/'+link.replace(new RegExp("/|info|list|#top","g"),"")+'.jpg">'));
            // Title
            box.append($('<div class="tileText">').append(title));
            // rating
            box.append($('<div class="tileText tileBottom">').append($(tr).find('td:nth-child(4)').children()));
            accContent.append(box);

        });
        accContent.append($('<div class="clear"/>'));
        accordion.append($('<div class="counter floatRight">'+$(accContent).find('.tile').length+'</div>'));
    });

    // add options for medium filter
    let options = $('[data-medium]').map(function(){return $(this).data('medium');}).get().filter((elem, index, self)=> index === self.indexOf(elem));
    options.forEach(element => $('#mediumFilter').append($('<option value="'+element+'">'+element+'</option>')));
}

function showGridBookmarks(){
    $('.inner td[width="50%"]').each((idx, td)=>{
        let accordion = $('<a class="menu acc">'+$(td).find('h4').text()+'</a>');
        let accContent = $('<div class="accContent">');
        $('#main').append(accordion);
        $('#main').append(accContent);
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
            let link = $(tr).find('td:nth-child(2) a').attr( "title",'').attr("href");
            let title = $(tr).find('td:nth-child(2) a').attr( "title",'').text();

            let box = $('<a class="tile sizeBig" href="'+link.replace("chapter","read")+'"></a>');
            // Cover
            let cover = $('<img class="tilePic" src="//cdn.proxer.me/cover/'+link.split("/")[2]+'.jpg">');
            // grayout cover if episode offline
            if($(tr).find('td:nth-child(6) i').hasClass('red')){
                cover.addClass('grayout');
            }
            box.append(cover);
            // Title
            box.append($('<div class="tileText">').append(title));
            // number
            box.append($('<div class="tileText tileBottom">').append("# ").append($(tr).find('td:nth-child(3)').text()));
            accContent.append(box);

        });
        accContent.append($('<div class="clear"/>'));
        accordion.append($('<div class="floatRight">'+$(accContent).find('.tile').length+'</div>'));
    });
    $('#main').append($('.inner p:last-child'));

    // open acc with more content
    if($('a.menu.acc:first div').text() < $('a.menu.acc:eq(1) div').text()){
        $('a.menu.acc:eq(1)').click();
    }else if ($('a.menu.acc:first div').text() > $('a.menu.acc:eq(1) div').text()){
        $('a.menu.acc:first').click();
    }
}

// add read-status (e.g. Reading)
function updateReadingStatus(){
    // @ts-ignore
    getProxerListEntries(tileStatus);
}

function tileStatus(bookmarks :JSON) {
    $.each(bookmarks, function(id,bookmark) {
        let tile = $('.tile[data-tid="'+bookmark.tid+'"]');
        if (tile.length) {
            let color;
            switch(bookmark.state) {
                case "0":
                    //finished
                    color = 'var(--darkgreen)';
                    break;
                case "1":
                    //reading
                    color = 'var(--darkblue)';
                    break;
                case "2":
                    //will be read
                    color = 'var(--orange)';
                    break;
                case "3":
                    //abortet
                    color = 'var(--red)';
                    break;
                default:
                    color = 'var(--text-color)';
            }
            tile.css('border-color', color);
        }
    });
}

function sortList(sortOption :SortOption){
    $('.accContent').each((idx,container)=>{
        let items = $(container).children('.tile').sort((a, b)=> {
            if(sortOption == SortOption.stars){
                $('#pefSortStar').addClass("active");
                $('#pefSortAlpha').removeClass("active");
                return $(b).find(".tileText.tileBottom i.fa-star, .tileText.tileBottom img[src='/images/misc/stern.png']").length-$(a).find(".tileText.tileBottom i.fa-star, .tileText.tileBottom img[src='/images/misc/stern.png']").length;
            }else {
                $('#pefSortAlpha').addClass("active");
                $('#pefSortStar').removeClass("active");
                let aName = $(a).data('title').toLowerCase();
                let bName = $(b).data('title').toLowerCase();
                return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
            }
        });
        $(container).find('.clear').before(items);
    });
}

function filterList(){
    $('.tile').show();

    let titleFilter = new RegExp($('#titleFilter').val(),'i');
    // hide alle elements that don't match the filters
    $('.tile').filter((index,item)=> {
        if($('#mediumFilter').val() == "")
        // if meduim filter is not active only filter title
            return !titleFilter.test($(item).data('title'));
        else
        // filter title and medium
            return (!titleFilter.test($(item).data('title')) || ($(item).data('medium') != $('#mediumFilter').val());
    }).hide();

    // update accordion counter after filtering
    $('.acc').each((idx,container)=>{
        $(container).find('.counter').text($(container).next('.accContent').find('.tile:not([style*="display: none"])').length);
    });
}

function redesignNotification(){

    $('#notificationBubble.miscNav').addClass('redesign');
    $('#notificationBubble.miscNav::after').hide();
    $('#notificationBubble.miscNav>div.scrollBar').hide();

    $('#notificationBubble.miscNav .notificationList').each((idx, item)=>{
        let link = $(item).attr("href");
        let picTile = $('<a class="tile sizeSmall" href="'+link.replace("chapter","read")+'" data-notifyid="'+item.id.substr('12')+'" />');
        $('#notificationBubble.miscNav').append(picTile);

        // Manga or Anime
        if (/chapter/.test(link) || /watch/.test(link)){
            let text = $(item).find('u').text().split('#');

            picTile.append($('<img class="tilePic" src="//cdn.proxer.me/cover/'+link.split("/")[2]+'.jpg">'));
            picTile.append($('<div class="tileText">'+text[0]+'</div>'));
            picTile.append($('<div class="tileText tileBottom"># '+text[1]+'</div>'));
        }
        // board
        else if (/forum/.test(link)){
            let text =$(item).find('i').text();
            text = text.substring(1, text.length-1);

            picTile.append($('<div class="tileFA fa fa-comments-o"> </div>'));
            picTile.append($('<div class="tileText wrap">'+text+'</div>'));
            picTile.append($('<div class="tileText tileBottom">Forum</div>'));
        }
        // other than board, anime or manga
        else {
            let text =$(item).text()
            picTile.append($('<div class="tileText wrap">'+text+'</div>'));
            picTile.append($('<div class="tileText tileBottom">!!Fehler!!</div>'));
        }

        let close = $('<a class="tileTimes fa fa-times" href="javascript:;">');
        picTile.append(close);
        close.hover(
            ()=>picTile.addClass('delete'),
            ()=>picTile.removeClass('delete')
        );
        close.click(() => {
            picTile.remove();
            $.post('/notifications?format=json&s=deleteNotification&'+$('#proxerToken').val()+'=1', {id:$(picTile).data('notifyid')},function(result){});
        });
    });
}
