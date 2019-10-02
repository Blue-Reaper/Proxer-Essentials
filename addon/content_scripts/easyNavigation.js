easyNavigation();
async function easyNavigation() {
    console.log("navigation");
    console.log($('body').length);

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
