// Wunder:
// "zurück nach oben" Button
// Nachricht "Diese Website verwendet Cookies..." wird ausgeblendet
// setzt "Ja ich bin Erwachsen"
// blende Abonnieren Button aus (Infoseite), da keine Funktion? https://proxer.me/forum/213-allgemein/386170-abbonieren-button-in-details-seiten-beschreibung
// blende Werbung auf Anime-Seite aus
// blende Social Media aus
// blende Artikel (=Amazon) aus
// blednde News und Freundschafts Icon aus (oben rechts)
// blendet Chat aus
// blendet Spendenaufruf auf Videoplayer aus

pefModulList.push({
    id: 'smallWonders',
    name: 'Kleine Wunder',
    description: 'Kleine Änderungen, die Wunder wirken',
    autor: 'Blue.Reaper',
    callMethod: change => smallWondersCall(change)
});

function smallWondersCall(change: ModulCallEvent) {
    switch (change) {
        case ModulCallEvent.on:
            smallWonders();
            break;
        case ModulCallEvent.off:
            // smallWonders();
            break;
        case ModulCallEvent.ajax:
            // smallWonders();
            break;
    }
}

function smallWonders() {
// ############### set cookies ###############
    // Cookie damit Nachricht "Diese Website verwendet Cookies..." nicht kommt
    setCookie('cookieconsent_dismissed', 'yes');
    // Keine Erwachenen-Meldung mehr
    setCookie('adult', '1');
    // no donate call on videoplayer
    setCookie('stream_donatecall1','1');

// ############### hide elements ###############
    GM_addStyle (GM_getResourceText ("smallWonders_CSS"));

// ############### BackToTop ###############
    // Check if Button already added
    if (!$('.backToTop').length) {
        // add button
        let backToTopButton = $(
            '<i class="backToTop pointer fa fa-2x fa-chevron-up"/>'
        );
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
            $('body,html').animate(
            {
                scrollTop: 0
            },
                800
            );
            return false;
        });
    }
}
