// Theme can't be activatet with modules, because it must be loaded before the content is shown

// Init Memory
if (GM_getValue("DesignStatus")==null){
    resetDesign();
}

// add Theme
if (GM_getValue("DesignStatus")=="on"){
    // Add colors for design
    GM_addStyle (
        `:root {
            /* accent color */
            --accent-color:`+GM_getValue("AccentColor")+`;
            /* background color */
            --main-bg-color:`+GM_getValue("MainBgColor")+`;
            --bg-color:`+GM_getValue("BgColor")+`;
            /* Button */
            --button-color:`+GM_getValue("ButtonColor")+`;
            /* Text */
            --text-color:`+GM_getValue("TextColor")+`;
            --link-color:`+GM_getValue("LinkColor")+`;
            --highlight-text-color:`+GM_getValue("TextHighlightColor")+`;
        }`
    );
    // Add Style after <head> to override css of side (and dont need !important everywhere)
    // But add Before sth is shown to the user
    $("html").append($('<style type="text/css">'+GM_getResourceText ("design_CSS")+'</style>'));

    // Set Proxer-Style to gray, needed for Design
    setCookie("style","gray");
}

function resetDesign(){
    GM_setValue("DesignStatus","on");
    GM_setValue("AccentColor","#ef394a");
    GM_setValue("MainBgColor","#232428");
    GM_setValue("BgColor","#2d2f33");
    GM_setValue("ButtonColor","#3e3e3e");
    GM_setValue("TextColor","#909090");
    GM_setValue("LinkColor","#bdbdbd");
    GM_setValue("TextHighlightColor","#fff");
}

// Wird benötigt, da z.B Firefox nicht alle CSS Funktionen unterstützt
function supportDesign(){
    if (GM_getValue("DesignStatus")=="on"){
        // Bilder ersetzen
        $('[src~="/images/status/abgeschlossen.png"]').attr('src','https://logosart.de/proxer2-0/abgeschlossen.png').addClass('smallImg');
        $('[src~="/images/status/airing.png"]').attr('src','https://logosart.de/proxer2-0/airing.png').addClass('smallImg');
        $('[src~="/images/status/abgebrochen.png"]').attr('src','https://logosart.de/proxer2-0/abgebrochen.png').addClass('smallImg');
        $('[src~="/components/com_comprofiler/images/updateprofile.gif"]').attr('src','https://logosart.de/proxer2-0/edit.png');
        $('[src~="/images/misc/onlineicon.png"]').attr('src','https://logosart.de/proxer2-0/abgeschlossen.png');
        $('[src~="/images/misc/offlineicon.png"]').attr('src','https://logosart.de/proxer2-0/abgebrochen.png');
        $('[src~="/images/misc/haken.png"]').attr('src','https://logosart.de/proxer2-0/check.png');
        $('[src~="/images/misc/kreuz.png"]').attr('src','https://logosart.de/proxer2-0/cross.png');
        $('[src~="/images/misc/stern.png"]').attr('src','https://logosart.de/proxer2-0/star.png').addClass('smallImg');
        $('[src~="/images/misc/stern_grau.png"]').attr('src','https://logosart.de/proxer2-0/star_empty.png').addClass('smallImg');
        $('[src~="//cdn.proxer.me/cover/894.jpg"]').attr('src','https://logosart.de/proxer2-0/proxer-test-anime.jpg');
        $('[src~="//cdn.proxer.me/cover/2373.jpg"]').attr('src','https://logosart.de/proxer2-0/proxer-test-manga.jpg');
        $('[src~="//cdn.proxer.me/cover/2274.jpg"]').attr('src','https://logosart.de/proxer2-0/proxer-test-anime.jpg');
        $('[src~="//cdn.proxer.me/cover/2275.jpg"]').attr('src','https://logosart.de/proxer2-0/proxer-test-anime.jpg');
        $('[src~="/images/misc/upload.png"]').attr('src','https://logosart.de/proxer2-0/upload.jpg').addClass('borderRadius6');
        $('[src~="/images/misc/play.png"]').attr('src','https://logosart.de/proxer2-0/play.jpg').addClass('borderRadius6');
        $('[src~="/images/misc/info-icon.png"]').attr('src','https://logosart.de/proxer2-0/info.jpg').addClass('borderRadius6');
        $('[src~="https://proxer.me/images/misc/proxerfanpage.png"]').attr('src','https://logosart.de/proxer2-0/proxerfanpage.png');
        $('[src~="/images/misc/proxerdonate.png"]').attr('src','https://logosart.de/proxer2-0/proxerdonate.png');
        $('[src~="/images/misc/proxeramazon.png"]').attr('src','https://logosart.de/proxer2-0/proxeramazon.png');
        $('[src~="/images/social/facebook.png"]').attr('src','https://logosart.de/proxer2-0/facebook.png');
        $('[src~="/images/social/twitter.png"]').attr('src','https://logosart.de/proxer2-0/twitter.png');
        $('[src~="/images/social/youtube2.png"]').attr('src','https://logosart.de/proxer2-0/youtube.png');
        $('[src~="/images/social/google-plus.png"]').attr('src','https://logosart.de/proxer2-0/gplus.png');
        $('[src~="/images/social/amazon.png"]').attr('src','https://logosart.de/proxer2-0/amazon.png');
    }
}
