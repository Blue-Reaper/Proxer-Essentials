// document.addEventListener("DOMSubtreeModified", function(){
//     supportDesign();
//     console.log("DOM Modified");
// });
// $('#main').on("DOMSubtreeModified", function(){
//     console.log("main changed");
// });
// document.addEventListener("DOMContentLoaded", function(){
//     console.log("DOM Loaded");
// });
//
// browser.runtime.onMessage.addListener(notify);
// function notify(message) {
//     console.log("message");
// }
// browser.history.onVisited.addListener(handleChange)
// function handleChange(e) {
//   console.log("location: " + document.location);
// }
// window.addEventListener('load', (event) => {
//   console.log("location load: " + document.location);
// });

// console.log("hier");
//
// var targetNodes         = $(document);
// var MutationObserver    = window.MutationObserver || window.WebKitMutationObserver;
// var myObserver          = new MutationObserver (mutationHandler);
// var obsConfig           = { childList: true, characterData: true, attributes: false, subtree: true };
//
// //--- Add a target node to the observer. Can only add one node at a time.
// targetNodes.each ( function () {
//     myObserver.observe (this, obsConfig);
// } );
//
// function mutationHandler (mutationRecords) {
//     console.info ("mutationHandler:");
//
//     mutationRecords.forEach ( function (mutation) {
//         console.log (mutation.type);
//         // $('[src~="/images/status/airing.png"]').replaceWith('<i class="fa fa-circle orange smallImg"/>');
//     } );
// }

let ajaxEvent = false;
monitorAjax();
// if page contet changed set variable
document.addEventListener("DOMSubtreeModified", function(){
	ajaxEvent = true;
});
// test every 500ms if page content changed
async function monitorAjax(){
	setInterval(()=>{
		if (ajaxEvent){
			replaceImage();
			ajaxEvent = false;
		}
	},500);
}
async function replaceImage(){
    // replace image with Font Awesome
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
}
