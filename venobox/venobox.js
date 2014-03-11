/* 
 * VenoBox - jQuery Plugin
 * version: 1.2.4
 * @requires jQuery
 *
 * Examples at http://lab.veno.it/venobox/
 * License: Creative Commons Attribution 3.0 License
 * License URI: http://creativecommons.org/licenses/by/3.0/
 * Copyright 2013 Nicola Franchini - @nicolafranchini
 *
 */
(function($){

    var overlay, vwrap, container, content, core, dest, top, sonH, finH, margine, prima, framewidth, frameheight, border, bgcolor, type, thisgall, items, thenext, theprev, title, nextok, prevok, keyNavigationDisabled, blocktitle, blocknum, numeratio, evitanext, evitaprev, evitacontent, figliall;

    $.fn.extend({
        //plugin name - venobox
        venobox: function(options) {

          // default options
          var defaults = {
              framewidth: '',
              frameheight: '',
              border: '0',
              bgcolor: '#fff',
              numeratio: false
          }; 
          var options = $.extend(defaults, options);

            return this.each(function() {
                  var obj = $(this);

                  obj.addClass('vbox-item');
                  obj.data('framewidth', options.framewidth);
                  obj.data('frameheight', options.frameheight);
                  obj.data('border', options.border);
                  obj.data('bgcolor', options.bgcolor);
                  obj.data('numeratio', options.numeratio);

                  obj.click(function(e){
                    e.stopPropagation();
                    e.preventDefault();
                    obj = $(this);

                    framewidth = obj.data('framewidth');
                    frameheight = obj.data('frameheight');
                    border = obj.data('border');
                    bgcolor = obj.data('bgcolor');
                    nextok = false;
                    prevok = false;
                    keyNavigationDisabled = false;

                    dest = obj.attr('href');
                    top = $(window).scrollTop();
                    top = -top;

                    $('body').wrapInner('<div class="vwrap"></div>')

                    vwrap =  $('.vwrap');

                    core = '<div class="vbox-overlay"><div class="vbox-preloader">Loading...</div><div class="vbox-container"><div class="vbox-content"></div></div><div class="vbox-title"></div><div class="vbox-num">0/0</div><div class="vbox-close">X</div><div class="vbox-next">next</div><div class="vbox-prev">prev</div></div>';

                    $('body').append(core);

                    overlay = $('.vbox-overlay');
                    container = $('.vbox-container');
                    content = $('.vbox-content');
                    blocknum = $('.vbox-num');
                    blocktitle = $('.vbox-title');

                    content.html('');
                    content.css('opacity', '0');

                    checknav();

                    overlay.css({
                      'opacity': '1',
                      'min-height' : $(window).outerHeight() + 130
                    });

                    if (navigator.userAgent.match(/(iPod|iPhone|iPad|Android)/)) { 
                      vwrap.css({
                        'position': 'fixed',
                        'top': top,
                        'opacity': '0'
                      }).data('top', top);
                    }else{
                      vwrap.css({
                        'position': 'fixed',
                        'top': top,
                      }).data('top', top);
                      $(window).scrollTop(0);
                    }

                    overlay.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){ 
                      overlay.css({
                        'min-height': $(window).outerHeight(),
                        height : 'auto'
                      });

                      if(obj.data('type') == 'iframe'){
                        loadIframe();
                      }else if (obj.data('type') == 'inline'){
                        loadInline();
                      }else if (obj.data('type') == 'ajax'){
                        loadAjax(); 
                      }else if (obj.data('type') == 'vimeo'){
                        loadVimeo();
                      }else if (obj.data('type') == 'youtube'){
                        loadYoutube();
                      } else {
                        content.html('<img src="'+dest+'">');
                        preloadFirst();
                      }
                    });                 

                    /* -------- CHECK NEXT / PREV -------- */
                    function checknav(){

                      thisgall = obj.data('gall');
                      numeratio = obj.data('numeratio');

                      items = $('.vbox-item[data-gall="' + thisgall + '"]');

                      if(items.length > 0 && numeratio === true){
                        blocknum.html(items.index(obj)+1 + ' / ' + items.length);
                        blocknum.fadeIn();
                      }else{
                        blocknum.fadeOut();
                      }

                      thenext = items.eq( items.index(obj) + 1 );
                      theprev = items.eq( items.index(obj) - 1 );

                      if(obj.attr('title')){
                        title = obj.attr('title');
                        blocktitle.fadeIn();
                      }else{
                        title = '';
                        blocktitle.fadeOut();
                      }

                      if(thenext.length > 0 ){
                        $('.vbox-next').css('display', 'block');
                        nextok = true;
                      }else{
                        $('.vbox-next').css('display', 'none');
                        nextok = false;
                      }
                      if(items.index(obj) > 0 ){
                        $('.vbox-prev').css('display', 'block');
                        prevok = true;
                      }else{
                        $('.vbox-prev').css('display', 'none');
                        prevok = false;
                      }
                    }

                    /* -------- NAVIGATE WITH ARROW KEYS -------- */
                    $('body').keydown(function(e) {
                      if (keyNavigationDisabled) return;
                      
                      if(e.keyCode == 37 && prevok == true) { // left
                        keyNavigationDisabled = true;

                        framewidth = theprev.data('framewidth');
                        frameheight = theprev.data('frameheight');
                        border = theprev.data('border');
                        bgcolor = theprev.data('bgcolor');

                        dest = theprev.attr('href');
                        
                        if(theprev.attr('title')){
                          title = theprev.attr('title');
                        }else{
                          title = '';
                        }

                        overlay.css('min-height', $(window).outerHeight() + 130);

                        content.animate({ opacity:0}, 500, function(){
                        overlay.css('min-height', $(window).outerHeight());

                          if (theprev.data('type') == 'iframe') {
                            loadIframe();
                          } else if (theprev.data('type') == 'inline'){
                            loadInline();
                          } else if (theprev.data('type') == 'ajax'){
                            loadAjax();
                          } else if (theprev.data('type') == 'youtube'){
                            loadYoutube();
                          } else if (theprev.data('type') == 'vimeo'){
                            loadVimeo();
                          }else{
                            content.html('<img src="'+dest+'">');
                            preloadFirst();
                          }
                          obj = theprev;
                          checknav();
                          keyNavigationDisabled = false;
                        });

                      }
                      if(e.keyCode == 39 && nextok == true) { // right
                        keyNavigationDisabled = true;

                        framewidth = thenext.data('framewidth');
                        frameheight = thenext.data('frameheight');
                        border = thenext.data('border');
                        bgcolor = thenext.data('bgcolor');


                        dest = thenext.attr('href');

                        if(thenext.attr('title')){
                          title = thenext.attr('title');
                        }else{
                          title = '';
                        }

                        overlay.css('min-height', $(window).outerHeight() + 130);

                        content.animate({ opacity:0}, 500, function(){
                        overlay.css('min-height', $(window).outerHeight());

                          if (thenext.data('type') == 'iframe') {
                            loadIframe();
                          } else if (thenext.data('type') == 'inline'){
                            loadInline();
                          } else if (thenext.data('type') == 'ajax'){
                            loadAjax();
                          } else if (thenext.data('type') == 'youtube'){
                            loadYoutube();
                          } else if (thenext.data('type') == 'vimeo'){
                            loadVimeo();
                          }else{
                            content.html('<img src="'+dest+'">');
                            preloadFirst();
                          }
                          obj = thenext;
                          checknav();
                          keyNavigationDisabled = false;
                        });

                      }
                    });
                    /* -------- NEXTGALL -------- */
                    $('.vbox-next').click(function(){

                      framewidth = thenext.data('framewidth');
                      frameheight = thenext.data('frameheight');
                      border = thenext.data('border');
                      bgcolor = thenext.data('bgcolor');

                      dest = thenext.attr('href');

                      if(thenext.attr('title')){
                        title = thenext.attr('title');
                      }else{
                        title = '';
                      }

                      overlay.css('min-height', $(window).outerHeight() + 130);

                      content.animate({ opacity:0}, 500, function(){
                      overlay.css('min-height', $(window).outerHeight());

                        if (thenext.data('type') == 'iframe') {
                          loadIframe();
                        } else if (thenext.data('type') == 'inline'){
                          loadInline();
                        } else if (thenext.data('type') == 'ajax'){
                          loadAjax();     
                        } else if (thenext.data('type') == 'youtube'){
                          loadYoutube();
                        } else if (thenext.data('type') == 'vimeo'){
                          loadVimeo();
                        }else{
                            content.html('<img src="'+dest+'">');
                            preloadFirst();
                        }
                        obj = thenext;
                        checknav();
                      });    
                    });

                    /* -------- PREVGALL -------- */
                    $('.vbox-prev').click(function(){

                      framewidth = theprev.data('framewidth');
                      frameheight = theprev.data('frameheight');
                      border = theprev.data('border');
                      bgcolor = theprev.data('bgcolor');

                      dest = theprev.attr('href');
                      
                      if(theprev.attr('title')){
                        title = theprev.attr('title');
                      }else{
                        title = '';
                      }

                      overlay.css('min-height', $(window).outerHeight() + 130);

                      content.animate({ opacity:0}, 500, function(){
                      overlay.css('min-height', $(window).outerHeight());

                        if (theprev.data('type') == 'iframe') {
                          loadIframe();
                        } else if (theprev.data('type') == 'inline'){
                          loadInline();
                        } else if (theprev.data('type') == 'ajax'){
                          loadAjax();
                        } else if (theprev.data('type') == 'youtube'){
                          loadYoutube();
                        } else if (theprev.data('type') == 'vimeo'){
                          loadVimeo();
                        }else{
                          content.html('<img src="'+dest+'">');
                          preloadFirst();
                        }
                          obj = theprev;
                          checknav();
                      });
                    });

                    /* -------- CHIUDI -------- */
                    $('.vbox-close, .vbox-overlay').click(function(e){
                      evitacontent = '.figlio';
                      evitaprev = '.vbox-prev';
                      evitanext = '.vbox-next';
                      figliall = '.figlio *';

                      if( !$(e.target).is(evitacontent) && !$(e.target).is(evitanext) && !$(e.target).is(evitaprev)&& !$(e.target).is(figliall) ){

                        overlay.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"); 
                        overlay.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){ 

                          overlay.remove();

                          if (navigator.userAgent.match(/(iPod|iPhone|iPad|Android)/)) { 
                            $('.vwrap').css('opacity', '1');
                            $('.vwrap').bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){ 
                              $('.vwrap').children().unwrap();
                              $(window).scrollTop(-top);
                            });
                          }else{
                              $('.vwrap').children().unwrap();
                            $(window).scrollTop(-top);
                          }
                          keyNavigationDisabled = false;
                        });
                        overlay.css('opacity', '0');
                      }
                    });
                    return false;
                  });
            });
        }
    });

    /* -------- LOAD AJAX -------- */
    function loadAjax(){
      $.ajax({
      url: dest,
      cache: false
      })
      .done(function( msg ) {
          content.html('<div class="vbox-inline">'+ msg +'</div>');
          updateoverlay(true);

      }) .fail(function() {
          content.html('<div class="vbox-inline"><p>Error retrieving contents, please retry</div>');
          updateoverlay(true);
      })
    }

    /* -------- LOAD IFRAME -------- */
    function loadIframe(){
      content.html('<iframe class="venoframe" src="'+dest+'"></iframe>');
    //  $('.venoframe').load(function(){ // valid only for iFrames in same domain
      updateoverlay();
    //  });
    }

    /* -------- LOAD VIMEO -------- */
    function loadVimeo(){
      var pezzi = dest.split('/');
      var videoid = pezzi[pezzi.length-1];
      content.html('<iframe class="venoframe" src="http://player.vimeo.com/video/'+videoid+'"></iframe>')
      updateoverlay();
    }

    /* -------- LOAD YOUTUBE -------- */
    function loadYoutube(){
      var pezzi = dest.split('/');
      var videoid = pezzi[pezzi.length-1];
      content.html('<iframe class="venoframe" src="http://www.youtube.com/embed/'+videoid+'"></iframe>')
      updateoverlay();
    }
    
    /* -------- LOAD INLINE -------- */
    function loadInline(){
      content.html('<div class="vbox-inline">'+$(dest).html()+'</div>');
      updateoverlay();
    }

    /* -------- PRELOAD IMAGE -------- */
    function preloadFirst(){

        prima = $('.vbox-content').find('img');
        prima.one('load', function() {
          updateoverlay();

        }).each(function() {
          if(this.complete) $(this).load();
        }); 
    }

    /* -------- CENTER ON LOAD -------- */
    function updateoverlay(notopzero){

      notopzero = notopzero || false;
      
      if (notopzero != true) {
        $(window).scrollTop(0);
      }
      
      blocktitle.html(title);
      content.find(">:first-child").addClass('figlio');
      $('.figlio').css('width', framewidth).css('height', frameheight).css('padding', border).css('background', bgcolor);

      sonH = content.outerHeight();
      finH = $(window).height();

      if(sonH+80 < finH){
        margine = (finH - sonH)/2;
        content.css('margin-top', margine);
        content.css('margin-bottom', margine);

      }else{
        content.css('margin-top', '40px');
        content.css('margin-bottom', '40px');
      }
      content.animate({
        'opacity': '1'
      },'slow');

    }

      /* -------- CENTER ON RESIZE -------- */
      function updateoverlayresize(){
        if($('.vbox-content').length){
          sonH = content.height();
          finH = $(window).height();

          if(sonH+80 < finH){
            margine = (finH - sonH)/2;
            content.css('margin-top', margine);
            content.css('margin-bottom', margine);
          }else{
            content.css('margin-top', '40px');
            content.css('margin-bottom', '40px');
          }
        }
      }

      $(window).resize(function(){
        updateoverlayresize();
      });

})(jQuery);