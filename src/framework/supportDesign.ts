// Wird benötigt, da z.B Firefox nicht alle CSS Funktionen unterstützt
function supportDesign(){
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
    $('[src~="//cdn.proxer.me/cover/894.jpg"]').attr('src','https://logosart.de/proxer2-0/proxer-test.jpg');
    $('[src~="//cdn.proxer.me/cover/2275.jpg"]').attr('src','https://logosart.de/proxer2-0/proxer-test.jpg');
    $('[src~="//cdn.proxer.me/cover/2274.jpg"]').attr('src','https://logosart.de/proxer2-0/proxer-test.jpg');
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
