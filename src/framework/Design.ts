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
            --bg1-color:`+GM_getValue("Bg1Color")+`;
            --bg2-color:`+GM_getValue("Bg2Color")+`;
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
}

function resetDesign(){
    GM_setValue("DesignStatus","on");
    GM_setValue("AccentColor","#ef394a");
    GM_setValue("Bg1Color","#232428");
    GM_setValue("Bg2Color","#2d2f33");
    GM_setValue("ButtonColor","#3e3e3e");
    GM_setValue("TextColor","#909090");
    GM_setValue("LinkColor","#bdbdbd");
    GM_setValue("TextHighlightColor","#fff");
}

// Wird benötigt, da z.B Firefox nicht alle CSS Funktionen unterstützt
function supportDesign(){
    if (GM_getValue("DesignStatus")=="on"){
        // Set Proxer-Style to gray, needed for Design
        setCookie("style","gray");
        // Bilder ersetzen
        $('[src~="//cdn.proxer.me/cover/894.jpg"]').attr('src','https://raw.githubusercontent.com/Blue-Reaper/Proxer-Essentials/master/src/framework/img/proxer-test-anime.jpg');
        $('[src~="//cdn.proxer.me/cover/2373.jpg"]').attr('src','https://raw.githubusercontent.com/Blue-Reaper/Proxer-Essentials/master/src/framework/img/proxer-test-manga.jpg');
        $('[src~="//cdn.proxer.me/cover/2274.jpg"]').attr('src','https://raw.githubusercontent.com/Blue-Reaper/Proxer-Essentials/master/src/framework/img/proxer-test-anime.jpg');
        $('[src~="//cdn.proxer.me/cover/2275.jpg"]').attr('src','https://raw.githubusercontent.com/Blue-Reaper/Proxer-Essentials/master/src/framework/img/proxer-test-anime.jpg');

        $('[src~="https://proxer.me/images/misc/proxerfanpage.png"]').attr('src','https://raw.githubusercontent.com/Blue-Reaper/Proxer-Essentials/master/src/framework/img/proxerfanpage.png');

        $('[src~="/images/misc/proxerdonate.png"]').attr('src','https://raw.githubusercontent.com/Blue-Reaper/Proxer-Essentials/master/src/framework/img/proxerdonate.png');
        $('[src~="/images/misc/proxeramazon.png"]').attr('src','https://raw.githubusercontent.com/Blue-Reaper/Proxer-Essentials/master/src/framework/img/proxeramazon.png');

        // Bilder durch FontAwesome ersetzen
        $('#miscNav').addClass('fa fa-bell');
        $('#requestNav').addClass('fa fa-users');
        $('#messageNav').addClass('fa fa-envelope-o');
        $('#newsNav').addClass('fa fa-newspaper-o');
        $('#searchNav').addClass('fa fa-search');

        $('[src~="/images/misc/stern.png"]').replaceWith('<i class="fa fa-star yellow smallImg"/>');
        $('[src~="/images/misc/stern_grau.png"]').replaceWith('<i class="fa fa-star-o grey smallImg"/>');

        $('[src~="/images/misc/offlineicon.png"]').replaceWith('<i class="fa fa-circle red normalImg"/>');
        $('[src~="/images/misc/onlineicon.png"]').replaceWith('<i class="fa fa-circle green normalImg"/>');

        $('[src~="/images/status/abgeschlossen.png"]').replaceWith('<i class="fa fa-circle green smallImg"/>');
        $('[src~="/images/status/airing.png"]').replaceWith('<i class="fa fa-circle orange smallImg"/>');
        $('[src~="/images/status/abgebrochen.png"]').replaceWith('<i class="fa fa-circle red smallImg"/>');

        $('[src~="/images/misc/upload.png"]').replaceWith('<i class="fa fa-arrow-circle-o-up bigImg"/>');
        $('[src~="/images/misc/play.png"]').replaceWith('<i class="fa fa-play-circle-o green bigImg"/>');
        $('[src~="/images/misc/info-icon.png"]').replaceWith('<i class="fa fa-info-circle blue bigImg"/>');
        $('[src~="/images/misc/manga.png"]').replaceWith('<i class="fa fa-book orange bigImg"/>');

        $('[src~="/images/social/facebook.png"]').replaceWith('<i class="fa fa-facebook-square"/>');
        $('[src~="/images/social/twitter.png"]').replaceWith('<i class="fa fa-twitter-square"/>');
        $('[src~="/images/social/youtube2.png"]').replaceWith('<i class="fa fa-youtube-square"/>');
        $('[src~="/images/social/google-plus.png"]').replaceWith('<i class="fa fa-google-plus-square"/>');
        $('[src~="/images/social/amazon.png"]').replaceWith('<i class="fa fa-amazon"/>');

        // user better font FontAwesome
        $('.fa-list').removeClass('fa-list').addClass('fa-bars');
        $('.fa-th-large').removeClass('fa-th-large').addClass('fa-th');
    }
}
