browser.runtime.onMessage.addListener(mangaReader);
easyNavigation();
let updating = false;

async function easyNavigation() {
    // BackToTop
    if (!$('.backToTop').length) {
        // add button
        let backToTopButton = $('<i class="backToTop pointer fa fa-2x fa-chevron-up"/>');
        $('body').append(backToTopButton);
        // scroll 1000 Pixel
        $(window).scroll(() => {
            const scrollTop = $(window).scrollTop();
            if (scrollTop && scrollTop > 1000) {
                backToTopButton.fadeIn();
            } else {
                backToTopButton.fadeOut();
            }
        });
        // click
        backToTopButton.click(() => {
            $('body,html').animate({scrollTop: 0}, 800);
            return false;
        });
    }

    // add Updates in menu Manga
    if(!$('#leftNav li:nth-child(3) ul li>a[href="/manga/updates#top').length){
        $('#leftNav li:nth-child(3) ul').append($('<li><a data-ajax="true" href="/manga/updates#top">Updates</a></li>'));
    }
}

function mangaReader(request, sender, sendResponse) {
    if (request.mangaReader == "On") {
        easyNavigationManga();
    } else if (request.mangaReader == "Off") {
        removeeasyNavigationManga();
    }
}

async function easyNavigationManga() {
    // IDEA: able to "scroll" by grabbing with courser, or zoom with click
    // remove jumping to next chapter with click on image
    $('#reader img').attr('onclick', '');
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

    // Wenn 404, dann nächste Kapitel nicht verfügbar (Sprung direkt in nächste Kapitel) -> gehe zurück auf Zwichenseite
    if ($('#main img[src="/images/misc/404.png"]').length) {
        if(!updating){
            updating = true;
            browser.runtime.sendMessage("ProxerEssentials@blue-reaper.github.io",{MangaBack:1});
        }
    }

    // Mauszeiger wird auch nur über Bild zur Hand
    $('#reader img').addClass('pointer');
    $('#reader a').addClass('cursorAuto');

}

// remove Manga Navigation outside of Reader
async function removeeasyNavigationManga(){
    $('.previousChapter, .nextChapter, .bookmark').remove();
}
