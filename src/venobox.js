/**
 * VenoBox - Javascript Plugin
 * version: 2.0.0
 * Copyright 2021 Nicola Franchini - @nicolafranchini
 * @license: https://github.com/nicolafranchini/VenoBox/blob/master/LICENSE
 */
/**
 * License: MIT License
 * Examples at https://veno.es/venobox/
 */

(function (root, factory) {
    if ( typeof define === 'function' && define.amd ) {
        define([], factory(root));
    } else if ( typeof exports === 'object' ) {
        module.exports = factory(root);
    } else {
        root.VenoBox = factory(root);
    }
})(typeof global !== "undefined" ? global : this.window || this.global, function (root) {

    'use strict';

    var supports = !!document.querySelector && !!root.addEventListener; // Feature test

    let blocknum, blockshare, blocktitle, core, container, content,
        infinigall, items, navigationDisabled, margine, numeratio,
        overlay, backdrop, title, thisgall, thenext, theprev, nextok, prevok, elPreloader, elPreloaderInner,
        gallIndex, startouch, images, startY, startX, endY, endX, diff, diffX, diffY, threshold,
        share, sharelinks, shareArray, sharepos, newcontent, imgLoader, current_item, current_index,
        set_maxWidth, set_overlayColor, set_ratio, set_autoplay, set_href;

    const svgOpen = '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor">';
    const svgClose = '</svg>';
    const pinIcon = svgOpen + '<path d="M8,0C3.6,0,0,3.6,0,8s3.6,8,8,8s8-3.6,8-8S12.4,0,8,0z M8,0.7c4,0,7.3,3.3,7.3,7.3S12,15.3,8,15.3c-0.7,0-1.5-0.1-2.1-0.3 c0.3-0.5,0.7-1.2,0.8-1.8c0.1-0.4,0.5-1.8,0.5-1.8c0.2,0.5,1,0.9,1.7,0.9c2.3,0,3.9-2.1,3.9-4.7c0-2.5-2-4.3-4.6-4.3 c-3.2,0-4.9,2.2-4.9,4.5c0,1.1,0.6,2.5,1.5,2.9c0.1,0.1,0.2,0,0.2-0.1c0-0.1,0.2-0.6,0.2-0.8c0-0.1,0-0.1-0.1-0.2 C4.8,9.2,4.6,8.5,4.6,7.8c0-1.6,1.2-3.2,3.4-3.2c1.8,0,3.1,1.3,3.1,3c0,2-1,3.4-2.4,3.4c-0.7,0-1.3-0.6-1.1-1.4 c0.2-0.9,0.6-1.8,0.6-2.5c0-0.6-0.3-1.1-0.9-1.1C6.6,6.2,6,7,6,8c0,0.7,0.2,1.1,0.2,1.1s-0.7,3.1-0.9,3.7c-0.1,0.6-0.1,1.4,0,2 C2.6,13.7,0.7,11.1,0.7,8C0.7,4,4,0.7,8,0.7z"/>' + svgClose;
    const fbIcon = svgOpen + '<path d="M8,0C3.6,0,0,3.6,0,8c0,4,3,7.3,6.8,7.9L7.2,16V9.7H5.3V8.4h1.9V6.7c0-1,0.3-1.7,0.7-2.2c0.4-0.4,1-0.7,1.9-0.7 c0.7,0,0.9,0,1.2,0.1v1h-0.9C9.6,5,9.2,5.3,9,5.6C8.7,6,8.7,6.5,8.7,6.9v1.5h2.2l-0.2,1.3h-2V16l0.4-0.1C13,15.4,16,12,16,8 C16,3.6,12.4,0,8,0z M8,0.7c4,0,7.3,3.3,7.3,7.3c0,3.5-2.5,6.4-5.9,7.1v-4.7h1.9l0.4-2.7H9.4V6.9c0-0.4,0.1-0.7,0.2-0.9 c0.1-0.2,0.2-0.3,0.5-0.3h1.6V3.3l-0.3,0c-0.2,0-0.7-0.1-1.6-0.1c-1,0-1.8,0.3-2.4,0.9C6.8,4.6,6.5,5.5,6.5,6.7v1H4.6v2.7h1.9v4.7 C3.2,14.4,0.7,11.5,0.7,8C0.7,4,4,0.7,8,0.7z"/>' + svgClose;
    const twitterIcon = svgOpen + '<path d="M10.9,1.8C9,1.8,7.5,3.3,7.5,5.2c0,0.1,0,0.2,0,0.3C5.2,5.3,3.1,4.2,1.6,2.5C1.6,2.4,1.5,2.3,1.4,2.3 c-0.1,0-0.2,0.1-0.3,0.2C0.8,3,0.6,3.6,0.6,4.2c0,0.8,0.3,1.5,0.7,2c-0.1,0-0.2-0.1-0.2-0.1C1,6.1,0.9,6.1,0.8,6.2 C0.7,6.2,0.6,6.3,0.6,6.5v0c0,1.2,0.6,2.2,1.5,2.8c0,0,0,0,0,0c-0.1,0-0.2,0-0.3,0.1C1.7,9.5,1.7,9.6,1.7,9.7c0.4,1.1,1.3,2,2.4,2.3 c-0.9,0.5-1.9,0.9-3.1,0.9c-0.2,0-0.5,0-0.7,0c-0.1,0-0.3,0.1-0.3,0.2c-0.1,0.1,0,0.3,0.1,0.4c1.4,0.9,3.2,1.5,5,1.5 c3,0,5.3-1.2,6.9-3s2.4-4.1,2.4-6.3c0-0.1,0-0.2,0-0.3c0.6-0.4,1.1-1,1.5-1.6c0.1-0.1,0.1-0.3,0-0.4c-0.1-0.1-0.2-0.1-0.4-0.1 c-0.2,0.1-0.4,0.1-0.5,0.1c0.2-0.3,0.4-0.6,0.5-1c0-0.1,0-0.3-0.1-0.3C15.3,2,15.2,2,15.1,2c-0.5,0.3-1.2,0.6-1.8,0.7 C12.7,2.1,11.9,1.8,10.9,1.8z M10.9,2.4c0.8,0,1.6,0.3,2.1,0.9c0.1,0.1,0.2,0.1,0.3,0.1c0.4-0.1,0.8-0.2,1.2-0.4 c-0.2,0.3-0.5,0.6-0.8,0.8c-0.1,0.1-0.2,0.2-0.2,0.4c0.1,0.2,0.2,0.2,0.4,0.2c0.3,0,0.6-0.2,0.9-0.2c-0.3,0.3-0.6,0.6-0.9,0.8 c-0.1,0.1-0.1,0.2-0.1,0.3c0,0.1,0,0.3,0,0.4c0,2-0.8,4.2-2.2,5.8S8,14.2,5.2,14.2c-1.3,0-2.5-0.3-3.6-0.8c1.3-0.1,2.6-0.6,3.6-1.4 c0.1-0.1,0.1-0.2,0.1-0.4c0-0.1-0.2-0.2-0.3-0.2c-1.1,0-1.9-0.6-2.4-1.5c0,0,0,0,0,0c0.3,0,0.6,0,0.9-0.1c0.1,0,0.2-0.2,0.2-0.3 c0-0.1-0.1-0.3-0.3-0.3C2.4,9.1,1.5,8.1,1.3,7c0.3,0.1,0.7,0.2,1,0.2c0.1,0,0.3-0.1,0.3-0.2s0-0.3-0.1-0.4C1.8,6.1,1.3,5.2,1.3,4.2 c0-0.4,0.1-0.7,0.2-1c1.6,1.8,3.8,2.9,6.4,3c0.1,0,0.2,0,0.3-0.1C8.2,6.1,8.2,6,8.2,5.9c0-0.2-0.1-0.4-0.1-0.7 C8.1,3.7,9.4,2.4,10.9,2.4z"/>' + svgClose;
    const linkedinIcon = svgOpen + '<path d="M1.9,0C0.9,0,0,0.9,0,1.9v12.2c0,1,0.9,1.9,1.9,1.9h12.2c1,0,1.9-0.9,1.9-1.9V1.9c0-1-0.9-1.9-1.9-1.9H1.9z M1.9,0.8h12.2 c0.6,0,1.1,0.5,1.1,1.1v12.2c0,0.6-0.5,1.1-1.1,1.1H1.9c-0.6,0-1.1-0.5-1.1-1.1V1.9C0.8,1.3,1.3,0.8,1.9,0.8z M3.8,2.7 C3.4,2.7,3,2.8,2.7,3C2.5,3.3,2.3,3.6,2.3,4c0,0.7,0.6,1.3,1.4,1.3c0,0,0,0,0,0c0,0,0.1,0,0.1,0c0.9,0,1.5-0.6,1.5-1.3c0,0,0,0,0,0 C5.3,3.2,4.6,2.7,3.8,2.7z M3.8,3.4c0.5,0,0.7,0.2,0.8,0.6c0,0.3-0.2,0.6-0.8,0.6C3.3,4.6,3,4.3,3,4c0-0.2,0.1-0.3,0.2-0.4 C3.3,3.5,3.5,3.4,3.8,3.4z M2.7,5.7c-0.2,0-0.4,0.2-0.4,0.4v7.2c0,0.2,0.2,0.4,0.4,0.4H5c0.2,0,0.4-0.2,0.4-0.4v-2.2v-5 c0-0.2-0.2-0.4-0.4-0.4H2.7z M6.1,5.7c-0.2,0-0.4,0.2-0.4,0.4v7.2c0,0.2,0.2,0.4,0.4,0.4h2.3c0.2,0,0.4-0.2,0.4-0.4V9.5 c0-0.3,0.1-0.6,0.2-0.8s0.3-0.3,0.7-0.3c0.4,0,0.6,0.1,0.7,0.3c0.2,0.2,0.2,0.5,0.2,0.8v3.8c0,0.2,0.2,0.4,0.4,0.4h2.3 c0.2,0,0.4-0.2,0.4-0.4V9.2c0-1.1-0.3-2-0.9-2.6c-0.6-0.6-1.4-0.9-2.2-0.9C9.8,5.7,9.2,6,8.8,6.3V6.1c0-0.2-0.2-0.4-0.4-0.4H6.1z M3,6.5h1.5v4.6V13H3V6.5z M6.5,6.5H8v0.6c0,0.2,0.2,0.4,0.4,0.4c0.1,0,0.2-0.1,0.3-0.2c0,0,0.6-0.8,1.9-0.8c0.7,0,1.2,0.2,1.7,0.7 C12.7,7.6,13,8.3,13,9.2V13h-1.5V9.5c0-0.4-0.1-0.9-0.4-1.3c-0.3-0.4-0.7-0.6-1.3-0.6c-0.6,0-1.1,0.3-1.3,0.6C8.1,8.6,8,9.1,8,9.5 V13H6.5V6.5z"/>' + svgClose;
    const downloadIcon = svgOpen + '<path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/><path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>' + svgClose;
    const emailIcon = svgOpen + '<path id="Mail" d="M14.5,2h-13C0.7,2,0,2.7,0,3.5v9C0,13.3,0.7,14,1.5,14h13c0.8,0,1.5-0.7,1.5-1.5v-9C16,2.7,15.3,2,14.5,2z M15.5,12.3l-4.7-4.7l4.7-3V12.3z M1.5,2.5h13c0.6,0,1,0.4,1,1v0.4L8.6,8.3c-0.4,0.2-0.8,0.2-1.2,0L0.5,3.6V3.5 C0.5,2.9,0.9,2.5,1.5,2.5z M0.5,4.2l4.8,3.3l-4.8,4.8V4.2z M14.5,13.5h-13c-0.4,0-0.8-0.3-0.9-0.6l5.1-5.1l1.4,1C7.4,8.9,7.7,9,8,9 c0.3,0,0.6-0.1,0.9-0.3l1.5-0.9l5.1,5.1C15.3,13.2,14.9,13.5,14.5,13.5z"/>' + svgClose;
    const shareIcon = svgOpen + '  <path fill-rule="evenodd" d="M3.5 6a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 1 0-1h2A1.5 1.5 0 0 1 14 6.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-8A1.5 1.5 0 0 1 3.5 5h2a.5.5 0 0 1 0 1h-2z"/><path fill-rule="evenodd" d="M7.646.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 1.707V10.5a.5.5 0 0 1-1 0V1.707L5.354 3.854a.5.5 0 1 1-.708-.708l3-3z"/>' + svgClose;
    const imagesHolder = document.createElement('div');

    const spinners = {
        'plane': ['sk-plane', '', 0],
        'chase': ['sk-chase', 'sk-chase-dot', 6],
        'bounce': ['sk-bounce', 'sk-bounce-dot', 2],
        'wave': ['sk-wave', 'sk-wave-rec', 5],
        'pulse': ['sk-pulse', '', 5],
        'flow': ['sk-flow', 'sk-flow-dot', 3],
        'swing': ['sk-swing', 'sk-swing-dot', 2],
        'circle': ['sk-circle', 'sk-circle-dot', 12],
        'circle-fade': ['sk-circle-fade', 'sk-circle-fade-dot', 12],
        'grid': ['sk-grid', 'sk-grid-cube', 9],
        'fold': ['sk-fold', 'sk-fold-cube', 4],
        'wander': ['sk-wander', 'sk-wander-cube', 3],
    };

    // Default settings
    var defaults = {
        selector: '.venobox',
        autoplay : false,
        bgcolor: '#fff',
        border: '0',
        infinigall: false,
        maxWidth: '1200px',
        navigation: true,
        navKeyboard: true,
        navTouch: true,
        navSpeed: 300,
        numeration: false,
        overlayClose: true,
        overlayColor: 'rgba(23,23,23,0.85)',
        popup: false,
        ratio: '16x9', // Available: '1x1' | '4x3' | '16x9' | '21x9'
        share: [], // ['facebook', 'twitter', 'linkedin', 'pinterest', 'email', 'download']
        shareStyle: 'bar', // 'block', 'pill', 'transparent', 'bar'
        spinner: 'bounce', // available: 'plane' | 'chase' | 'bounce' | 'wave' | 'pulse' | 'flow' | 'swing' | 'circle' | 'circle-fade' | 'grid' | 'fold' | 'wander'
        spinColor : '#d2d2d2',
        titleattr: 'title',
        titlePosition: 'top', // 'top' || 'bottom'
        titleStyle: 'bar', // 'block', 'pill', 'transparent', 'bar'
        toolsBackground: '#1C1C1C', // 'transparent'
        toolsColor: '#d2d2d2',
        onPreOpen: function(){ return true; }, // Return the selected object - set return false to prevent opening
        onPostOpen: function(){}, // Return: current_item, gallIndex, thenext, theprev
        onPreClose: function(){ return true; }, // Return: current_item, gallIndex, thenext, theprev - set return false to prevent closing
        onNavComplete: function(){}, // Return: current_item, gallIndex, thenext, theprev
        onContentLoaded: function(){}, // Return: newcontent
        onInit: function(){}, // Return: plugin obj
        jQuerySelectors: false,
    };

    /**
     * Generate spinner html
     * @param {Array} spinarray Selected spinner
     */
    var createspinner = function(spinarray){
        if (!spinarray) {
            return 'Loading...';
        }
        let spinner = '<div class="sk-center ' + spinarray[0] + '">';
        for (let i = 0; i < spinarray[2]; i++) {
            spinner += '<div class="' + spinarray[1] + '">';
        }
        spinner += '</div>';
        return spinner;
    };

    /**
     * A simple forEach() implementation for Arrays, Objects and NodeLists
     * @param {Array|Object|NodeList} collection Collection of items to iterate
     * @param {Function} callback Callback function for each iteration
     * @param {Array|Object|NodeList} scope Object/NodeList/Array that forEach is iterating over (aka `this`)
     */
    var forEach = function (collection, callback, scope) {
        if (Object.prototype.toString.call(collection) === '[object Object]') {
            for (let prop in collection) {
                if (Object.prototype.hasOwnProperty.call(collection, prop)) {
                    callback.call(scope, collection[prop], prop, collection);
                }
            }
        } else {
            for (let i = 0, len = collection.length; i < len; i++) {
                callback.call(scope, collection[i], i, collection);
            }
        }
    };

    /**
    * Merge defaults with user options
    * @param {Object} defaults Default settings
    * @param {Object} options User options
    * @returns {Object} Merged values of defaults and options
    */
    var extend = function( defaults, options ) {
        var extended = {};

        forEach(defaults, function (value, prop) {
            extended[prop] = defaults[prop];
        });

        forEach(options, function (value, prop) {
            extended[prop] = options[prop];
        });

        return extended;
    };

    /**
    * Add event listener to dynamic items
    * @param {Object} selector Selector to be added
    * @param {Object} event Event
    * @param {Function} handler function to execute
    */
    var addEventListenerChild = function (selector, event, handler) {
        let rootElement = document.querySelector('body');
        // since the root element is set to be body for our current dealings
        rootElement.addEventListener(event, function (evt) {
            var targetElement = evt.target;
            while (targetElement != null) {
                if (targetElement.matches(selector)) {
                    handler(evt);
                    return;
                }
                targetElement = targetElement.parentElement;
            }
        }, true );
    };

    /**
     * Linear animation timing
     */
    var timingLinear = function(timeFraction){
        return timeFraction;
    };

    /**
     * Animate with callback
     * https://javascript.info/js-animation
     */
    var animate = function({timing, draw, duration}) {
        let start = performance.now();
        requestAnimationFrame(function animate(time) {
            // timeFraction goes from 0 to 1
            let timeFraction = (time - start) / duration;
            if (timeFraction > 1) timeFraction = 1;
            // calculate the current animation state
            let progress = timing(timeFraction);
            draw(progress); // draw it
            if (timeFraction < 1) {
                requestAnimationFrame(animate);
            }
        });
    };

    /**
     * Parse Youtube or Vimeo videos and get host & ID
     */
    var parseVideo = function(url) {
        url.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/);
        var type;
        if (RegExp.$3.indexOf('youtu') > -1) {
            type = 'youtube';
        } else if (RegExp.$3.indexOf('vimeo') > -1) {
            type = 'vimeo';
        }
        return {
            type: type,
            id: RegExp.$6
        };
    };

    /**
     * Get additional url parameters
     */
    var getUrlParameter = function(url) {
        var result = '';
        var sPageURL = decodeURIComponent(url);
        var firstsplit = sPageURL.split('?');

        if (firstsplit[1] !== undefined) {
            var sURLVariables = firstsplit[1].split('&');
            var sParameterName;
            var i;
            for (i = 0; i < sURLVariables.length; i++) {
                sParameterName = sURLVariables[i].split('=');
                result = result + '&'+ sParameterName[0]+'='+ sParameterName[1];
            }
        }
        return encodeURI(result);
    };

    /**
     * Get all images from string
     */
    var getImages = function(string) {
        imagesHolder.innerHTML = string;
        return imagesHolder.querySelectorAll('img');
    };

    /**
     * Update item settings.
     */
    var updateVars = function(obj){
        if (!obj) {
            return false;
        }
        navigationDisabled = true;
        current_item = obj;
        nextok = false;
        prevok = false;
        set_maxWidth = obj.getAttribute("data-maxwidth") || obj.settings.maxWidth;
        set_overlayColor = obj.getAttribute("data-overlay") || obj.settings.overlayColor;
        set_ratio = obj.getAttribute("data-ratio") || obj.settings.ratio;
        set_autoplay = obj.getAttribute("data-autoplay") || obj.settings.autoplay;
        set_href = obj.getAttribute("data-href") || obj.getAttribute('href');
        title = obj.getAttribute(obj.settings.titleattr) || '';
    };

    /**
     * -------------------------------------------------------------------------------------------------------
     * VenoBox constructor
     * -------------------------------------------------------------------------------------------------------
     */
    var VenoBox = function (options) {

        const venobox = {}; // Object for public APIs
        let settings;
        /**
         * Destroy the current initialization.
         */
        venobox.destroy = function () {
            // If plugin isn't already initialized, stop
            if ( !settings ) return;
            // Reset variables
            settings = null;
            // options = null;
            // obj = null;
            current_item = null;
            current_index = null;
            document.body.classList.remove('vbox-open');
        };

        /**
         * Close modal.
         */
        venobox.close = function() {

            if (!current_item || !document.body.classList.contains('vbox-open')) {
                return false;
            }
            if (settings.onPreClose && typeof settings.onPreClose === 'function') {
                settings.onPreClose(current_item, gallIndex, thenext, theprev);
                if (settings.onPreClose === false) {
                    return false;
                }
            }
            
            document.body.removeEventListener('keydown', keyboardHandler);

            document.body.classList.remove('vbox-open');
            current_item.focus();
            animate({
                duration: 200,
                timing: timingLinear,
                draw: function(progress) {
                    overlay.style.opacity =  1 - progress;
                    if (progress == 1){
                        overlay.remove();
                    }
                }
            });
        };

        /**
         * Navigate gallery.
         */
        venobox.next = function() {
            navigateGall(thenext);
        };
        venobox.prev = function() {
            navigateGall(theprev);
        };

        /**
         * Keyboard navigation.
         */
        var keyboardHandler = function(e) {
            if (e.keyCode === 27) { // esc
                venobox.close();
            }
            if (e.keyCode == 37 && prevok === true) { // left
                navigateGall(theprev);
            }
            if (e.keyCode == 39 && nextok === true) { // right
                navigateGall(thenext);
            }
        };

        /**
         * Append and fade-in new content
         */
        var contentLoaded = function(){

            // blocktitle.innerHTML = title;
            content.style.opacity = 0;

            content.innerHTML = newcontent;

            var vboxChild = content.querySelector(":first-child");

            vboxChild.classList.add('vbox-child');
            vboxChild.style.padding = current_item.settings.border;
            vboxChild.style.backgroundColor = current_item.settings.bgcolor;
            vboxChild.style.maxWidth = set_maxWidth;
            vboxChild.style.transform = 'scale(0.9)';
            vboxChild.style.transition = 'transform 200ms';

            // Fix weird drag
            let childImageLock = content.querySelector('.vbox-child img');

            if (childImageLock) {
                childImageLock.addEventListener('dragstart', function(e) {
                    e.preventDefault();
                });
            }

            // reset content scroll
            container.scrollTo(0, 0);
            vboxChild.style.transform = 'scale(1)';
            
            animate({
                duration: 200,
                timing: timingLinear,
                draw: function(progress) {
                    content.style.opacity = progress;
                    if (progress == 1){
                        elPreloader.classList.add('vbox-hidden');
                        navigationDisabled = false;
                    }
                }
            });

            if (settings.onContentLoaded && typeof settings.onContentLoaded === 'function') {
                settings.onContentLoaded(newcontent);
            }
        };

        /**
         * Check animation state
         * @param {string} state 'loading' | 'animated'
         */
        var checkState = function(state) {
            if (!content.classList.contains('vbox-' + state)) {
                contentLoaded();
            }
        };

        /**
         * Load iFrame
         */
        var loadIframe = function(dest, ratio){
            content.classList.add("vbox-loading");
            newcontent = '<div class="venoratio venoratio-' + ratio + '"><iframe src="' + dest + '"></iframe></div>';
            content.classList.remove("vbox-loading");
            checkState('animated');
        };

        /**
         * Load videos
         */
        var loadVid = function(dest, ratio, autoplay){

            content.classList.add("vbox-loading");

            let stringAutoplay;                    
            // check if it's a video file - thanks to @alexxandar
            if (dest.search(/.+\.mp4|og[gv]|webm/) !== -1) {
                stringAutoplay = autoplay ? " autoplay" : "";
                newcontent = '<div class="venoratio venoratio-' + ratio + '"><video src="' + dest + '"' + stringAutoplay + ' controls>Your browser does not support the video tag.</video></div>';
            } else {
                let player;
                let videoObj = parseVideo(dest);

                // set rel=0 to hide related videos at the end of YT + optional autoplay
                stringAutoplay = autoplay ? "?rel=0&autoplay=1" : "?rel=0";
                let queryvars = stringAutoplay + getUrlParameter(dest);

                if (videoObj.type == 'vimeo') {
                  player = 'https://player.vimeo.com/video/';
                } else if (videoObj.type == 'youtube') {
                  player = 'https://www.youtube.com/embed/';
                }
                newcontent = '<div class="venoratio venoratio-' + ratio + '"><iframe webkitallowfullscreen mozallowfullscreen allowfullscreen allow="autoplay" frameborder="0" src="'+player+videoObj.id+queryvars+'"></iframe></div>';
            }

            content.classList.remove("vbox-loading");
            checkState('animated');
        };

        /**
         * Load inline content
         */
        var loadInline = function(dest){
            let inlineContent = document.querySelector(dest);
            if (inlineContent) {
                content.classList.add("vbox-loading");
                newcontent = '<div class="vbox-inline">' + inlineContent.innerHTML + '</div>';
                content.classList.remove("vbox-loading");
                checkState('animated');
            }
        };

        /**
         * Preload images from ajax call
         */
        var loadAjaxImages = function(){
            images = getImages(newcontent);
            if (images.length) {
                let imgCounter = 0;
                forEach(images, function(getimg){
                    let srcimg = getimg.src;
                    imgLoader = new Image();
                    imgLoader.onload = function(){
                        imgCounter++;
                        if ( imgCounter == images.length ) {
                            content.classList.remove("vbox-loading");
                            checkState('animated');
                        }
                    };
                    imgLoader.onerror = function(){
                        imgCounter++;
                        if ( imgCounter == images.length ) {
                            content.classList.remove("vbox-loading");
                            checkState('animated');
                        }
                    };
                    imgLoader.src = srcimg;
                });
            } else {
                content.classList.remove("vbox-loading");
                checkState('animated');
            }
        };

        /**
         * Load Ajax
         */
        var loadAjax = function(dest){
            content.classList.add("vbox-loading");
            let xhr = new XMLHttpRequest();
            xhr.open("GET", dest, true);
            xhr.onload = function() {
                newcontent = '<div class="vbox-inline">'+ xhr.response +'</div>';
                loadAjaxImages();
            };
            xhr.onerror = function() {
                newcontent = '<div class="vbox-inline"></div>';
                content.classList.remove("vbox-loading");
                checkState('animated');
            };
            xhr.send();
        };

        /**
         * Preload image
         */
        var loadImage = function(dest){
            imgLoader = new Image();
            imgLoader.onload = function(){
                // image  has been loaded
                newcontent = '<div class="vbox-child"><img src="' + dest + '"></div>';
                content.classList.remove('vbox-loading');
                checkState('animated');
            };
            imgLoader.src = dest;
        };

        startX = 0;
        endX = 0;
        diff = 0;
        threshold = 50;
        startouch = false;

        /**
         * Start Drag
         */
        var dragStart = function(e) {
            if (!navigationDisabled) {
                content.style.transition = 'margin '+ (settings.navSpeed / 1.2) + 'ms ease-out, opacity '+ (settings.navSpeed / 1.2) + 'ms ease-out';
                startY = endY = e.pageY;
                startX = endX = e.pageX;
                startouch = true;
            }
        };

        /**
         * End Drag
         */
        var dragEnd = function(e) {
            if (startouch) {
                startouch = false;
                var subject = current_item;
                var change = false;
                diff = endX - startX;

                if (diff < 0 && nextok) {
                    subject = thenext;
                    change = true;
                }
                if (diff > 0 && prevok) {
                    subject = theprev;
                    change = true;
                }

                if (Math.abs(diff) >= threshold && change) {
                    navigateGall(subject);
                } else {
                    content.style.marginLeft = 0;
                    content.style.opacity = 1;
                }
            }
        };

        /**
         * Drag items
         */
        var drag = function(e) {
            if (startouch && !navigationDisabled) {
                endX = e.pageX;
                endY = e.pageY;
                diffX = endX - startX;
                diffY = endY - startY;

                var absdiffX = Math.abs(diffX);
                var absdiffY = Math.abs(diffY);

                if ((absdiffX > absdiffY) && (absdiffX <= 180)) {
                    var diffopac = (1 - absdiffX / 180) * 1.5;
                    e.preventDefault();
                    content.style.marginLeft = diffX + 'px';
                    content.style.opacity = diffopac;
                }
            }
        };


        var setMobileShare = function(href){
            if (navigator.canShare) {
                const shareData = {
                    url: href
                };
                blockshare.insertAdjacentHTML('beforeend', '<button type="button" class="vbox-share-mobile">'+shareIcon+'</button>');
                let mobileShareBtn = blockshare.querySelector('.vbox-share-mobile');
                mobileShareBtn.addEventListener('click', function(e){
                    e.preventDefault();
                    navigator.share(shareData);

                });
            }
        };

        /**
         * Check navigation
         * @param {object} el Current item
         */
        var checknav = function(el){

            if (!el) {
                return false;
            }

            thisgall = el.dataset.gall;
            numeratio = el.settings.numeration;
            infinigall = el.settings.infinigall;

            share = el.settings.share;

            blockshare.innerHTML = '';

            let vbtype = el.dataset.vbtype;

            if ( vbtype !== 'iframe' && vbtype !== 'inline' && vbtype !== 'ajax' ) {
                sharelinks = { 
                    pinterest : '<a target="_blank" href="https://pinterest.com/pin/create/button/?url='+el.href+'&media='+el.href+'&description='+title+'">'+pinIcon+'</a>', 
                    facebook  : '<a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u='+el.href+'">'+fbIcon+'</a>', 
                    twitter   : '<a target="_blank" href="https://twitter.com/intent/tweet?text='+title+'&url='+el.href+'">'+twitterIcon+'</a>', 
                    linkedin  : '<a target="_blank" href="https://www.linkedin.com/sharing/share-offsite/?url='+el.href+'">'+linkedinIcon+'</a>',
                    download  : '<a target="_blank" href="'+el.href+'" download>'+downloadIcon+'</a>',
                    email     : '<a target="_blank" href="mailto:?body='+el.href+'">'+emailIcon+'</a>'
                };

                if (share.length) {
                    setMobileShare(el.href);
                    forEach(share, function(prop) {
                        blockshare.insertAdjacentHTML('beforeend', sharelinks[prop]);
                    });   
                }
            }

            items = document.querySelectorAll('.vbox-item[data-gall="' + thisgall + '"]');

            current_index = Array.prototype.indexOf.call(items, el);

            if (items.length < 2) {
                infinigall = false;
                numeratio = false;
            }

            thenext = items[current_index + 1];
            theprev = items[current_index - 1];

            if (!thenext && infinigall) {
                thenext = items[0];
            }

            if (!theprev && infinigall) {
                theprev = items[items.length - 1];
            }

            // Update gallery numeration
            if (items.length >= 1) {
                gallIndex = current_index + 1;
                blocknum.innerHTML = gallIndex + ' / ' + items.length;
            } else {
                gallIndex = 1;
            }
            if (numeratio) {
                blocknum.classList.remove('vbox-hidden');
            } else {
                blocknum.classList.add('vbox-hidden');
            }

            // Update title
            if (title !== '') {
                blocktitle.classList.remove('vbox-hidden');
            } else {
                blocktitle.classList.add('vbox-hidden');
            }
            blocktitle.innerHTML = title;

            // update navigation arrows
            prevok = false;
            nextok = false;

            if (thenext || infinigall) {
                nextok = true;
            }

            if (current_index > 0 || infinigall) {
                prevok = true;
            }

            // activate swipe
            if ((prevok || nextok) && el.settings.navTouch) {
                content.classList.add('vbox-grab');
                content.addEventListener("touchstart", dragStart, false);
                content.addEventListener("touchend", dragEnd, false);
                content.addEventListener("touchmove", drag, false);
                content.addEventListener("mousedown", dragStart, false);
                content.addEventListener("mouseup", dragEnd, false);
                content.addEventListener("mouseout", dragEnd, false);
                content.addEventListener("mousemove", drag, false);
            } else {
                content.classList.remove('vbox-grab');
                content.removeEventListener("touchstart", dragStart, false);
                content.removeEventListener("touchend", dragEnd, false);
                content.removeEventListener("touchmove", drag, false);
                content.removeEventListener("mousedown", dragStart, false);
                content.removeEventListener("mouseup", dragEnd, false);
                content.removeEventListener("mouseout", dragEnd, false);
                content.removeEventListener("mousemove", drag, false);
            }

            let vbox_next = overlay.querySelector('.vbox-next');
            let vbox_prev = overlay.querySelector('.vbox-prev');

            if (prevok) {
                vbox_prev.classList.remove('vbox-hidden');
            } else {
                vbox_prev.classList.add('vbox-hidden');
            }

            if (nextok) {
                vbox_next.classList.remove('vbox-hidden');
            } else {
                vbox_next.classList.add('vbox-hidden');
            }

            if (!el.settings.navigation) {
                vbox_next.classList.add('vbox-hidden');
                vbox_prev.classList.add('vbox-hidden');
            }
        }; // Checknav

        /**
         * Update overlay and tools style.
         */
        var updateOverlay = function(destination){

            // overlay.style.backgroundColor = set_overlayColor;
            backdrop.style.backgroundColor = set_overlayColor;

            // Custom preloader color.
            elPreloaderInner.innerHTML = createspinner(spinners[destination.settings.spinner]);

            overlay.style.setProperty('--sk-color', destination.settings.spinColor);

            elPreloader.classList.remove('vbox-hidden');

            blockshare.classList.remove('vbox-top', 'vbox-bottom');
            blocktitle.classList.remove('vbox-top', 'vbox-bottom');

           if (destination.settings.titlePosition == 'top') {
                blocktitle.classList.add('vbox-top');
                blockshare.classList.add('vbox-bottom');
            } else {
                blocktitle.classList.add('vbox-bottom');
                blockshare.classList.add('vbox-top');
            }

            let titleWidth = destination.settings.titleStyle === 'bar' ? '100%' : 'auto';
            let titleRadius = destination.settings.titleStyle === 'pill' ? '5em' : '0';
            let shareWidth = destination.settings.shareStyle === 'bar' ? '100%' : 'auto';
            let shareRadius = destination.settings.shareStyle === 'pill' ? '5em' : '0';
            let titlebg = destination.settings.titleStyle === 'transparent' ? 'transparent' : destination.settings.toolsBackground;
            let sharebg = destination.settings.shareStyle === 'transparent' ? 'transparent' : destination.settings.toolsBackground;

            overlay.style.setProperty('--vbox-title-width', titleWidth);
            overlay.style.setProperty('--vbox-title-radius', titleRadius);
            overlay.style.setProperty('--vbox-share-width', shareWidth);
            overlay.style.setProperty('--vbox-share-radius', shareRadius);
            overlay.style.setProperty('--vbox-tools-color', destination.settings.toolsColor);
            overlay.style.setProperty('--vbox-title-background', titlebg);
            overlay.style.setProperty('--vbox-share-background', sharebg);
        };

        var updateOverlayStyle = function(){

        };

        /**
         * Gallery navigation.
         */
        var navigateGall = function(destination) {

            if (!destination || navigationDisabled || !document.body.classList.contains('vbox-open')) {
                return false;
            }

            updateVars(destination);
            updateOverlay(destination);

            // swipe out item
            content.style.transition = 'margin '+ (settings.navSpeed / 1.2) + 'ms ease-out, opacity '+ (settings.navSpeed / 1.2) + 'ms ease-out';

            if (destination === theprev) {
              content.classList.add("swipe-right");
            }
            if (destination === thenext) {
              content.classList.add("swipe-left");
            }

            elPreloader.classList.remove('vbox-hidden');

            let startopacity = content.style.opacity;

            content.classList.add("vbox-animated", "vbox-loading");

            checknav(destination);

            animate({
                duration: settings.navSpeed,
                timing: timingLinear,
                draw: function(progress) {

                    content.style.opacity = startopacity - progress/startopacity;

                    if (progress == 1){
                        content.classList.remove("swipe-left", "swipe-right", "vbox-animated");
                        content.style.marginLeft = 0;
                        content.style.transition = '';
                        checkState('loading');

                        if (settings.onNavComplete && typeof settings.onNavComplete === 'function') {
                            settings.onNavComplete(current_item, gallIndex, thenext, theprev);
                        }
                    }
                }
            });
            loadContent();
        };

        /**
         * Open item.
         */
        venobox.open = function(obj) {

            if (document.body.classList.contains('vbox-open') || !obj) {
                return false;
            }

            if (settings.onPreOpen && typeof settings.onPreOpen === 'function') {
                settings.onPreOpen(obj);
            }
            if (!settings.onPreOpen) {
                return false;
            }

            updateVars(obj);

            document.body.insertAdjacentHTML('beforeend', core);
            document.body.classList.add('vbox-open');

            overlay = document.querySelector(".vbox-overlay");
            backdrop = overlay.querySelector(".vbox-backdrop");
            container = overlay.querySelector(".vbox-container");
            content = container.querySelector(".vbox-content");
            blocknum = overlay.querySelector(".vbox-num");
            blockshare = overlay.querySelector(".vbox-share");
            blocktitle = overlay.querySelector(".vbox-title");
            elPreloader = overlay.querySelector(".vbox-preloader");
            elPreloaderInner = elPreloader.querySelector(".vbox-preloader-inner");

            content.innerHTML = '';
            overlay.style.opacity = 0;

            updateOverlay(obj);
            checknav(obj);

            content.classList.add("vbox-animated", "vbox-loading");

            // fade in overlay
            animate({
                duration: 200,
                timing: timingLinear,
                draw: function(progress) {
                    overlay.style.opacity = progress;
                    if (progress == 1){
                        content.classList.remove('vbox-animated');
                        checkState('loading');
                        if (settings.onPostOpen && typeof settings.onPostOpen === 'function') {
                            settings.onPostOpen(current_item, gallIndex, thenext, theprev);
                        }
                    }
                }
            });

            loadContent();

            // Keyboard actions
            if (obj.settings.navKeyboard) {
                document.body.addEventListener('keydown', keyboardHandler);
            }
            // Prev gallery
            document.querySelector('.vbox-prev').addEventListener('click', function(){
                navigateGall(theprev);
            });

            // Newxt gallery
            document.querySelector('.vbox-next').addEventListener('click', function(){
                navigateGall(thenext);
            });
        };

        /**
         * Load content
         */
        var loadContent = function(){
            if (!current_item) {
                return false;
            }
            let vbtype = current_item.dataset.vbtype;

            switch (vbtype) {
            case 'iframe':
                loadIframe(set_href, set_ratio);
            break;
            case 'inline':
                loadInline(set_href);
            break;
            case 'ajax':
                loadAjax(set_href);
            break;
            case 'video':
                loadVid(set_href, set_ratio, set_autoplay);
            break;
            default:
                loadImage(set_href);
            }
        };

        /**
         * Initialize Plugin
         */
        var init = function() {

            // feature test
            if ( !supports ) return;

            // Destroy any existing initializations
            venobox.destroy();

            // Merge user options with defaults
            settings = extend( defaults, options || {} );

            if (settings.onInit && typeof settings.onInit === 'function') {
                settings.onInit(venobox);
            }

            let selectors = settings.jQuerySelectors || document.querySelectorAll(settings.selector);
            let navigation = '<a class="vbox-next"><span>Next</span></a><a class="vbox-prev"><span>Prev</span></a>';
            let vbheader = '<div class="vbox-title"></div><div class="vbox-left-corner"><div class="vbox-num">0/0</div></div><div class="vbox-close"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/><path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/></svg></div>';
            let vbfooter = '<div class="vbox-share"></div>';
            let preloader = '<div class="vbox-preloader"><div class="vbox-preloader-inner"></div></div>';
            core = '<div class="vbox-overlay"><div class="vbox-backdrop"></div>' + preloader + '<div class="vbox-container"><div class="vbox-content"></div></div>' + vbheader + navigation + vbfooter + '</div>';

            /**
             *  Close modal. 
             */
            let closeSelector = '.vbox-overlay';
            if (!settings.overlayClose){
                closeSelector = '.vbox-close'; // close only on X
            }

            addEventListenerChild(closeSelector, 'click', function(e){

                if (closeSelector == '.vbox-close' || (closeSelector == '.vbox-overlay' &&
                (e.target.classList.contains('vbox-overlay') ||
                    e.target.classList.contains('vbox-content') ||
                    e.target.classList.contains('vbox-backdrop') ||
                    e.target.classList.contains('vbox-close') ||
                    e.target.classList.contains('vbox-preloader') ||
                    e.target.classList.contains('vbox-container'))
                )){
                    venobox.close();
                }
            });

            /**
             *  Loop items. 
             */
            forEach(selectors, function(obj){
                if (obj.classList.contains("vbox-item")) {
                    return true;
                }
                obj.settings = settings;
                obj.classList.add("vbox-item");

                // Open Link
                obj.addEventListener("click", function(e){
                    e.preventDefault();
                    // Remove focus from link to avoid multiple calls with enter key
                    obj.blur();
                    venobox.open(obj);
                    return false;
                }); // Click;
            }); // forEach

            if (settings.popup) {
                let popup = document.querySelector(settings.popup);
                popup.settings = settings;
                venobox.open(popup);
            }
        }; // init

        init();

        // Public APIs
        return venobox;
    };
    return VenoBox;
});

/* jQuery bridge for $().venobox() */
if (typeof jQuery === 'function') {
    (function($){
        "use strict";
        $.fn.extend({
            //plugin name - venobox
            venobox: function(options) {
                const pluginoptions = options || {};
                pluginoptions.jQuerySelectors = this;
                // Init venobx
                new VenoBox({pluginoptions});
            } // venobox
        }); // extend
    })(jQuery);
}
