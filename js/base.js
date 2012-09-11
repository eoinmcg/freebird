/**
 * @preserve Freebird. Entry to the js13kgames.com
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
    H:  320, 
    scale:  1,
    // the position of the canvas
    // in relation to the screen
    entities: [],
    // for tracking player's progress
    distance: 0,
    score: 0,
    hiScore: localStorage.hiScore || 1024,
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
    state: 'intro',
    action: 'Tap',
    fadeText: 0,
    font: 'Rammetto One, Verdana',
    gradients: {},
    debug: false,
    pause: false,
    tapped: false,
    m: {x: null, y: null},
    offset: {top: 0, left: 0},
    preload: {
        img: ['b.png', 't.png'],
        loaded: 0
    },
    plays: 0,

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
    

        SF.action = (SF.android || SF.ios) ? 'Tap' : 'Click';


        // setup some gradients
        grad = SF.ctx.createLinearGradient(0,0,0,SF.H);
        grad.addColorStop(0, '#036');
        grad.addColorStop(0.5, '#69a');
        grad.addColorStop(1, 'yellow');
        SF.gradients.dawn = grad;

        grad = SF.ctx.createLinearGradient(0,0,0,SF.H);
        grad.addColorStop(0, '#69a');
        grad.addColorStop(0.5, '#9cd');
        grad.addColorStop(1, '#fff');
        SF.gradients.day = grad;

        grad = SF.ctx.createLinearGradient(0,0,0,SF.H);
        grad.addColorStop(0, '#036');
        grad.addColorStop(0.3, '#69a');
        grad.addColorStop(1, 'pink');
        SF.gradients.dusk = grad;

        grad = SF.ctx.createLinearGradient(0,0,0,SF.H);
        grad.addColorStop(0, '#036');
        grad.addColorStop(1, 'black');
        SF.gradients.night = grad;

        // listen for clicks
        window.addEventListener('click', function(e) {
            e.preventDefault();
            SF.tapped = true;
            SF.m.x = (e.pageX - SF.offset.left) / SF.scale;
            SF.m.y = (e.pageY - SF.offset.top) / SF.scale;
        }, false);

        // listen for touches
        window.addEventListener('touchstart', function(e) {
            e.preventDefault();
            // the event object has an array
            // called touches, we just want
            // the first touch
            SF.tapped = true;
            var touch = e.touches[0];
            SF.m.x = (touch.pageX - SF.offset.left) / SF.scale;
            SF.m.y = (touch.pageY - SF.offset.top) / SF.scale;
        }, false);
        window.addEventListener('touchmove', function(e) {
            // we're not interested in this
            // but prevent default behaviour
            // so the screen doesn't scroll
            // or zoom
            e.preventDefault();
        }, false);
        window.addEventListener('touchend', function(e) {
            // as above
            e.preventDefault();
        }, false);

        // space bar pauses
        window.addEventListener('keyup', function(e) {
            e.preventDefault();
            if (e.keyCode === 32) {
                SF.pause = !SF.pause;
            }
            return false;
        }, false);

        // crappy preloader. images are (hopefully) small
        // enough to get away with it & image draws are 
        // wrapped in try catch. ugly, i know
        for (i = 0; i < SF.preload.img.length; i += 1) {
            tmp = new Image();
            tmp.src = SF.preload.img[i];
            tmp.onload = SF.preload.loaded += 1;
        }



        // we're ready to resize
        SF.resize();

        SF.changeState(SF.state);
        SF.loop();

        SF.reset();

    },


    resize: function() {

        var o = document.getElementById('o'),
            c = SF.canvas;



        SF.currentHeight = (SF.action === 'Tap') ?
            window.innerHeight : 450;
        // SF.currentHeight = ( !SF.ios && window.innerHeight < 500 ) ?
        //     window.innerHeight : 500;
        // resize the width in proportion
        // to the new height
        SF.currentWidth = SF.currentHeight * SF.RATIO;

        // this will create some extra space on the
        // page, allowing us to scroll pass
        // the address bar, and thus hide it.
        if (SF.android || SF.ios) {
            document.body.style.height = (window.innerHeight + 50) + 'px';
        }

        // set the new canvas style width & height
        // note: our canvas is still 320x480 but
        // we're essentially scaling it with CSS
        SF.canvas.style.width = SF.currentWidth + 'px';
        SF.canvas.style.height = SF.currentHeight + 'px';

        // the amount by which the css resized canvas
        // is different to the actual (480x320) size.
        SF.scale = SF.currentWidth / SF.W;
        // position of canvas in relation to
        // the screen

        SF.offset.top = SF.canvas.offsetTop;
        SF.offset.left = SF.canvas.offsetLeft;

        if ((window.innerWidth) < window.innerHeight) {
            c.style.display = 'none';
            o.style.display = 'block';
        } else {
            c.style.display = 'block';
            o.style.display = 'none';
        }

        // we use a timeout here as some mobile
        // browsers won't scroll if there is not
        // a small delay
        window.setTimeout(function() {
                window.scrollTo(0,1);
        }, 1);
    },


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


    }




};


window.addEventListener('load', SF.init, false);
window.addEventListener('resize', SF.resize, false);
