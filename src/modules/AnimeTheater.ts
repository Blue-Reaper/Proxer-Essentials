// @version      1.4
// @description  Das Skript fügt die Option Theatermodus bei Animes hinzu.
// @history      1.4 Bugfix
// @history      1.3 document.addEventListener('DOMContentLoaded') entfernt für Chrome
// @history      0.1.2 Chat ausblenden (optional)
// @history      0.1.1 automatisch Beenden, beim Wechseln zu 'nicht Anime' Seiten (optional)
// @history      0.1.0 Theatermodus-Zusatz nicht mehr benötigt
// @history      0.0.5 kompatibel mit HTML5 Player von Dragowynd
// @history      0.0.4 Maus ausblenden (optional)
// @history      0.0.3 Bugfix wenn mit aktiviertem Theatermodus auf 1. Folge (Zurück Pfeil)
// @history      0.0.2 Theater-Navigation hinzugefügt, Player hat 16:9 Format
// @history      0.0.1 Theatermodus hinzugefügt


// Fehler:
// Geht im Firefox nicht mehr? (Größe des Iframes)
// TODO: Bei watch, wenn noch keine Episode hochgeladen, dann schmiert Theatermodus ab

// Features:
// TODO: 10 sek zurückspulen einbauen

let iFrameHeight = "410";
let ausblendezeitMaus = 2100;
let theaterIsOn = false;

pefModulList.push({
    id:"theaterMode",
    name:"Anime Theater",
    description:"Animes im Theatermodus schauen",
	callMethod:(change)=>theatreModeCall(change)
});

function theatreModeCall (change:ModulCallEvent) {
	switch(change) {
		case ModulCallEvent.on:
			theatermodus2();
			break;
		case ModulCallEvent.off:
			// theatermodus();
			break;
		case ModulCallEvent.ajax:
			theatermodus2();
			break;
	}
}

function theatermodus2(){
	// Innerhalb des Iframes
	if(window.location.hostname === "stream.proxer.me"){
		console.log("im Iframe");
		// $('.flowplayer').css({'width':'100%', 'height':'100%'});
		// $('#player_code').css({'width':'100%', 'height':'100%'});
		// $('.plyr video').css({'height':'-webkit-fill-available'});
		// $('.plyr__controls').css({'bottom':'41px'});
		if($('.exitFullscreen') == null){
			$("body").append($('<i class="exitFullscreen pointer fa fa-2x fa-chevron-up"/>'));

		}
	}
	// normale Proxer Seite
	if (window.location.pathname.split('/')[1] === 'watch'){
		// $('iframe').css({'position':'fixed', 'top':'41px', 'left':'0px', 'height':'100%', 'width':'100%', 'z-index':'1'});
	}

}

//Hauptfunktion
function theatermodus() {

	// Innerhalb des Iframes
	if(window.location.hostname === "stream.proxer.me"){
		callScriptforIframe();
	};

	if (window.location.pathname.split('/')[1] === 'watch'){
		let wStreams = document.getElementsByClassName('wStream');
		let wStream = wStreams[0];
		let myIFrame = wStream.children[0];

		let nav = document.getElementById("nav");

		myIFrame.height = window.innerHeight - nav.offsetHeight;
		myIFrame.width = window.innerWidth;
		myIFrame.setAttribute("style","position: fixed; top: "+nav.offsetHeight+"px; left: 0px");

		// Facebook, Twitter und Co ausblenden
		let shariffs = document.getElementsByClassName('shariff');
		let shariff = shariffs[0];
		let liElem = shariff.children[0].children;

		for (let i = 0; i < liElem.length; i++) {
			liElem[i].setAttribute("hidden", "hidden");
		}


		// Theater Nav
		let innerNav = document.getElementById("innerNav");
		let rightNav = document.getElementById("rightNav");
		let theaterNav = document.createElement("ul");

		theaterNav.setAttribute("id","theaterNav");
		theaterNav.style.cssFloat = "left";

		let zurueck = '';
		let vor = '';
		//1.Folge
		if(document.querySelectorAll('tr.no_details > td > a.menu')[3] == null){
			vor = document.querySelectorAll('tr.no_details > td > a.menu')[2].href;
		}else{
			zurueck = document.querySelector('tr.no_details > td > a.menu').href;
			vor = document.querySelectorAll('tr.no_details > td > a.menu')[3].href;
		}

		let back = document.createElement("li");
		back.setAttribute("id","back");
		back.setAttribute("class","topmenu");
		back.style.cssFloat = "left";
		if(zurueck !== '')
			back.innerHTML = '<a href="'+zurueck+'" style="padding-left: 20px; padding-right: 20px; font-size: 30px;"> ⇐ </a>';
		theaterNav.appendChild(back);

		// aktuelleFolge
		let wEp = document.getElementsByClassName('wEp');
		let folgeAktuell = wEp[1];

		let folge = document.createElement("li");
		folge.setAttribute("id","folge");
		folge.setAttribute("class","topmenu");
		folge.style.cssFloat = "left";
		folge.innerHTML = '<a href="javascript:;" >'+folgeAktuell.innerHTML+folgeAktuell.nextSibling.textContent+'</a>';
		if(zurueck === '')
			folge.style.paddingLeft = "70px";

		theaterNav.appendChild(folge);

		let forward = document.createElement("li");
		forward.setAttribute("id","forward");
		forward.setAttribute("class","topmenu");
		forward.style.cssFloat = "left";
		forward.innerHTML = '<a href="'+vor+'" style="padding-left: 20px; padding-right: 20px; font-size: 30px;"> ⇒ </a>';

		theaterNav.appendChild(forward);

		theaterNav.setAttribute("id","theaterNav");

		innerNav.insertBefore(theaterNav, rightNav);
	}

}
function theaterAus(){
	if (window.location.pathname.split('/')[1] === 'watch'){

		let wStreams = document.getElementsByClassName('wStream');
		let wStream = wStreams[0];

		let myIFrame = wStream.children[0];
		let nav = document.getElementById("nav");

		// myIFrame.height = "504";
		myIFrame.height = iFrameHeight;
		myIFrame.width = "728";
		myIFrame.setAttribute("style","");

		// Facebook, Twitter und Co einblenden
		let shariffs = document.getElementsByClassName('shariff');
		let shariff = shariffs[0];
		let liElem = shariff.children[0].children;

		for (let i = 0; i < liElem.length; i++) {
			liElem[i].setAttribute("hidden", "");
		}
	}
	try{
		// Theater Nav
		let innerNav = document.getElementById("innerNav");
		let theaterNav = document.getElementById("theaterNav");
		innerNav.removeChild(theaterNav);
	}catch(err){}

}

function callScriptforIframe(){
	try{
		let cusertTimeout;
		let playerchooser = document.getElementById("playerchooser");
		console.log(playerchooser);
		playerchooser.setAttribute("hidden", "hidden");

		let player = document.getElementById("player_code");
		let style = player.children[0];
		style.innerHTML = "	.flowplayer {  width: 100%; height: 100%; }  #player_code { width: 100%; height: 100%; }  .flowplayer > video {	width: 100%;	height: 100%;	background-color: #000;  }";

		let body = document.getElementsByTagName("BODY")[0];
		body.style.marginRight = '0px';
		body.style.marginBottom = '0px';

		// Maus ausblenden
		if(GM_getValue("theaterMausAus",0) === 1){
			document.addEventListener("mousemove", function(event){
				player.style.cursor = "auto";
				clearTimeout(cusertTimeout);
				cusertTimeout = setTimeout(function(){
					player.style.cursor = "none";
				},ausblendezeitMaus);
			});
		}
	}catch(err){
	// HTML5 Player von Dragowynd
	// https://proxer.me/forum/anwendungen/375523-userscript-besserer-html5-player
		let int= setInterval(function(){
		console.log("noch an");
			if(document.getElementById("htmlstream_html5_api")!==null){
				let player = document.getElementById("htmlstream_html5_api");
				console.log(player);
				if(GM_getValue("theaterMausAus",0) === 1){
					document.addEventListener("mousemove", function(event){
						player.style.cursor = "auto";
						clearTimeout(cusertTimeout);
						cusertTimeout = setTimeout(function(){
							player.style.cursor = "none";
						},ausblendezeitMaus);
					});
				}
				clearInterval(int);
			}
		},200);
	};
};
