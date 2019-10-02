// Longstrip Reader als Standard
// Longstrip: klick auf Bild scrollt zum nächsten Bild
// Longstrip: Navigation um zu nächstem / letztem Kapitel zu springen (ohne Zwischenseite)
// Fügt Mangaupdates im Menü Manga und auf Startseite neben Animeupdates hinzu


pefModulList.push({
    id: 'mangaComfort',
    name: 'Manga Komfort',
    description: 'Mehr Komfort beim Manga Lesen',
    link: 'https://blue-reaper.github.io/Proxer-Essentials/modules/mangaComfort',
    autor: 'Blue.Reaper',
    callMethod: change => mangaComfortCall(change)
});

function mangaComfortCall(change: ModulCallEvent) {
    switch (change) {
        case ModulCallEvent.on:
            mangaComfort();
            break;
        case ModulCallEvent.off:
            break;
        case ModulCallEvent.ajax:
            mangaComfort();
            break;
    }
}

function mangaComfort(){

    // add Updates in Menu Manga
    if(!$('#leftNav li:nth-child(3) ul li>a[href="/manga/updates#top').length){
        $('#leftNav li:nth-child(3) ul').append($('<li><a data-ajax="true" href="/manga/updates#top">Updates</a></li>'));
    }
    // Setzt Longstrip als Standard, wenn noch kein Cookie gesetzt ist
    if (getCookie('manga_reader') != 'slide') {
        setCookie('manga_reader', 'longstrip');
    }
    // Now in Standard
    // // On Home Page and Links doesn't exist
    // if (location.pathname === '/' && !$('#main li>a[href="/manga/updates#top').length){
    //     // Add Mangaupdaets like existing Animeupdates and after that
    //     $('#main li>a[href="/anime/updates#top"]').parent().after($('<li id="pef_mangaupdates"><a data-ajax="true" href="/manga/updates#top">Mangaupdates</a></li>'));
    // }

	if (location.pathname.split('/')[1] !== 'read' && location.pathname.split('/')[1] !== 'chapter'){
        $('.previousChapter, .nextChapter, .bookmark').remove();
        return;
	}

    if (getCookie('manga_reader') == 'longstrip') {
        // Ändere Link auf Bildern, damit nur zum nächsten Bild gesprungen wird
        $('#reader img').attr('onclick', '');
        $('#reader img').off('click', scrollToNextPage);
        $('#reader img').click(scrollToNextPage);
        // only add buttons once
        if(!$('.nextChapter').length){
            // button previous chapter
            // don't show button on first chapter
            if(Number(location.pathname.split('/')[3]) > 1){
                let previousChapterButton = $('<i class="previousChapter pointer fa fa-2x fa-chevron-left"/>');
                $('body').append(previousChapterButton);
                previousChapterButton.click(() => {
                    let path = location.pathname.split('/');
                    path[1] = 'read';
                    path[3] = String(Number(path[3])-1);
                    path[5] = String(1);
                    location.pathname = path.join('/');
                });
            }
            // button next chapter
            let nextChapterButton = $('<i class="nextChapter pointer fa fa-2x fa-chevron-right"/>');
            $('body').append(nextChapterButton);
            nextChapterButton.click(() => {
                let path = location.pathname.split('/');
                path[1] = 'read';
                path[3] = String(Number(path[3])+1);
                path[5] = String(1);
                location.pathname = path.join('/');
            });
            // button bookmark this chapter
            let bookmarkButton = $('<i class="bookmark pointer fa fa-2x fa-bookmark"/>');
            $('body').append(bookmarkButton);
            bookmarkButton.click(() => {
                let path = location;
                path = String(path).replace('read', 'chapter');
                let ajaxLink = (path + '?format=json&type=reminder&' + $('#proxerToken').val() + '=1&title=reminder_this');
                $.post(ajaxLink, {
                    'check': 1
                }, function(data) {
                    createPefMessage(data.msg);
                    localStorage.listentries_timer = null;
                });
            });
        }
    }

    // Wenn 404, dann nächste Kapitel nicht verfügbar (Sprung direkt in nächste Kapitel) -> gehe zurück auf Zwichenseite
    if ($('#main img[src="/images/misc/404.png"]').length) {
        location.pathname = location.pathname.replace('read', 'chapter');
    }

    // Mauszeiger wird auch nur über Bild zur Hand
    $('#reader img').addClass('pointer');
    $('#reader a').addClass('cursorAuto');
}

function scrollToNextPage() {
    // @ts-ignore
    const image = $('#chapterImage' + current_page).offset();

    $('body,html').animate(
        {
            // nicht page+1, da id bei 0 los zählt
            scrollTop: image ? image.top : 0
        },
        800
    );
    // @ts-ignore
    current_page = current_page + 1;
}
