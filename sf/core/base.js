/**
 * @preserve Freebird. 
 * Copyright © 2012 Starfish Web Consulting - starfishwebconsulting.co.uk
 * Play more of our games at arcade.starfish.ie
 * Source code: http://github.com/eoinmcg/freebird
 * On the twitters: @eoinmcg
*/

"use strict";

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       || 
            window.webkitRequestAnimationFrame || 
            window.mozRequestAnimationFrame    || 
            window.oRequestAnimationFrame      || 
            window.msRequestAnimationFrame     || 
            function( callback ){
            window.setTimeout(callback, 1000 / 60);
            };
})();


// namespace our game
var SF = {

    // set up some inital values
    game: null,
    W: 480, 
    H:  288, 
    scale:  1,
    // the position of the canvas
    // in relation to the screen
    entities: [],
    // for tracking player's progress
    score: 0,
    hiScore: localStorage.hiScore || 1000,
    // hiScore: 500,
    newHiScore: false,
    // we'll set the rest of these
    // in the init function
    RATIO:  null,
    currentWidth:  null,
    currentHeight:  null,
    canvas: null,
    ctx:  null,
    ua:  null,
    android: null,
    ios:  null,
    lastTick: 0,
    tick: 0,
    time : 0,
    fps: 0,
    state: 'loader',
    action: 'Tap',
    fadeText: 0,
    font: 'Rammetto One, Verdana',
    debug: false,
    pause: false,
    screenshot: false,
    tapped: false,
    m: {x: null, y: null},
    offset: {top: 0, left: 0},
    hasAudio: false,
    mute: false,
    sfx: {},
    plays: 0,
    lang: 'en',
    phrases: null,

    init: function() {

        var grad, i, tmp;

        // the proportion of width to height
        SF.RATIO = SF.W / SF.H;
        // these will change when the screen is resized
        SF.currentWidth = SF.W;
        SF.currentHeight = SF.H;
        // this is our canvas element
        SF.canvas = document.getElementsByTagName('canvas')[0];
        // it's important to set this
        // otherwise the browser will
        // default to 320x200
        SF.canvas.width = SF.W;
        SF.canvas.height = SF.H;
        // the canvas context allows us to 
        // interact with the canvas api
        SF.ctx = SF.canvas.getContext('2d');
        // we need to sniff out android & ios
        // so we can hide the address bar in
        // our resize function
        SF.ua = navigator.userAgent.toLowerCase();
        SF.android = SF.ua.indexOf('android') > -1 ? true : false;
        SF.ios = ( SF.ua.indexOf('iphone') > -1 || SF.ua.indexOf('ipad') > -1  ) ? true : false;
        SF.ipad = (SF.ua.indexOf('ipad') > -1) ? true : false;
        SF.iphone = (SF.ua.indexOf('iphone') > -1) ? true : false;
    
        SF.hasAudio = (SF.ios || SF.android) ? false : true;

        SF.action = (SF.android || SF.ios) ? 'Tap' : 'Click';
        SF.Input.init();

        SF.lang = SF.getQueryString()['lang'] || 'en';
        SF.phrases = SF.data.phrases[SF.lang];
        document.getElementById('o').innerHTML = '<p>' + SF.tr('rotate_device') + '</p>';

        // we're ready to resize
        SF.resize();

        SF.changeState(SF.state);
        SF.loop();

        SF.reset();

        window.addEventListener('resize', SF.resize, false);
        window.addEventListener('orientationchange', function(e) {
            window.scrollTo(0, 1);
            SF.resize();
        }, false);

    },


    resize: function() {
    
        var o = document.getElementById('o'),
            ad = document.getElementById('ad'),
            adLarge = document.getElementById('adLarge');

        SF.currentW = window.innerWidth / SF.W;
        SF.currentH = window.innerHeight / SF.H;

        if (window.innerWidth <= 480) {
            SF.canvas.style.width = "480px";
            SF.canvas.style.height = "288px";
            SF.scale = 1;
        }
        // if (window.innerWidth > 480 && window.innerWidth < 960) {
        //     SF.canvas.style.width = "100%";
        //     SF.canvas.style.height = Math.floor(SF.H * SF.currentW) + "px";
        //     SF.scale = window.innerWidth / SF.W;
        // }
        if (window.innerWidth == 960) {
            SF.canvas.style.width = "960px";
            SF.canvas.style.height = "576px";
            SF.scale = 2;
        }
        if (window.innerWidth >= 1024) {
            SF.canvas.style.width = "1024px";
            SF.canvas.style.height = "614px";
            SF.scale = 2.233333;
        }

        if (SF.android) {
            document.body.style.height = (window.innerHeight + 50) + 'px';
            document.body.height = window.innerHeight + 50 + 'px';
        }

        SF.offset.top = SF.canvas.offsetTop;
        SF.offset.left = SF.canvas.offsetLeft;

        ad.style.left = Math.floor((window.innerWidth - 320) / 2) + "px";
        ad.style.top = parseInt(SF.canvas.style.height, 10) - 70 + "px";

        adLarge.style.left = Math.floor((window.innerWidth - 300) / 2) + "px";
        adLarge.style.top = parseInt(SF.canvas.style.height, 10) - 350 + "px";

        if (window.innerWidth < 480) {
            o.style.display = "block";
            SF.canvas.style.display = "none";
            ad.style.display = 'none';
        } else {
            o.style.display = "none";
            SF.canvas.style.display = "block";
        }

        window.setTimeout(function() {
                window.scrollTo(0,1);
        }, 1);

    },


    // resize: function() {

    //     var o = document.getElementById('o'),
    //         c = SF.canvas,
    //         ad = document.getElementById('ad');


    //     // SF.currentHeight = window.innerHeight;
    //     SF.currentHeight = (SF.action === 'Tap') ?
    //         window.innerHeight : 450;
    //     SF.currentHeight = ( !SF.ios && window.innerHeight < 500 ) ?
    //         window.innerHeight : 500;
    //     // if (SF.ipad) {
    //     //     SF.currentHeight = 680;
    //     // }
    //     // resize the width in proportion
    //     // to the new height
    //     SF.currentWidth = SF.currentHeight * SF.RATIO;

    //     // this will create some extra space on the
    //     // page, allowing us to scroll pass
    //     // the address bar, and thus hide it.
    //     if (SF.android || SF.ios) {
    //         document.body.style.height = (window.innerHeight + 50) + 'px';
    //     }

    //     // set the new canvas style width & height
    //     // note: our canvas is still 320x480 but
    //     // we're essentially scaling it with CSS
    //     SF.canvas.style.width = SF.currentWidth + 'px';
    //     SF.canvas.style.height = SF.currentHeight + 'px';


    //     // the amount by which the css resized canvas
    //     // is different to the actual (480x320) size.
    //     SF.scale = SF.currentWidth / SF.W;
    //     // position of canvas in relation to
    //     // the screen

    //     SF.offset.top = SF.canvas.offsetTop;
    //     SF.offset.left = SF.canvas.offsetLeft;

    //     if ((window.innerWidth) < window.innerHeight) {
    //         c.style.display = 'none';
    //         o.style.display = 'block';
    //     } else {
    //         c.style.display = 'block';
    //         o.style.display = 'none';
    //     }

    //     ad.style.left = Math.floor((window.innerWidth - 320) / 2) + "px";
    //     ad.style.top = (SF.currentHeight - 80 ) + "px";

    //     // we use a timeout here as some mobile
    //     // browsers won't scroll if there is not
    //     // a small delay
    //     window.setTimeout(function() {
    //             window.scrollTo(0,1);
    //     }, 1);
    // },


    // the actual loop
    // requests animation frame
    // and renders the relevant game state
    loop: function() {

        requestAnimFrame( SF.loop );


        SF.game.update();
        SF.game.render();


        SF.tapped = false;
        SF.tick += 1;
        SF.time = new Date().getTime() * 0.02;
        SF.fadeText = Math.sin(SF.time * 0.2) + 1;
        SF.fps = ~~(1000 / ( new Date().getTime() - SF.lastTick ));
        SF.lastTick = new Date().getTime();

    },

    changeState: function(state) {
    
        SF.reset();
        state = 'SF_' + state;
        SF.game = new window[state]({});
    },


    reset: function() {

        SF.entities = [];
        SF.level = 0;
        SF.pause = false;
        SF.tapped = false;
        SF._t = 0;


    },


    tr: function(phrase) {
    

        if (typeof SF.phrases[phrase] === 'undefined') {
            return phrase;
        } else {
            return SF.phrases[phrase];
        }

    
    },

    getQueryString: function() {

        var result = {}, queryString = location.search.substring(1),
            re = /([^&=]+)=([^&]*)/g, m;

        while (m = re.exec(queryString)) {
            result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
        }

        return result;
}


};


