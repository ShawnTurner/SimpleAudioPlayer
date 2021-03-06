/**
 *
 * HTML5 Audio player with playlist
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2012, Script Tutorials
 * http://www.script-tutorials.com/
 */
jQuery(document).ready(function() {	
    // inner variables
    var song;
    var tracker = $('.tracker');
    var volume = $('.volume');
    var songLength = "";    // formatted song length 
	song = new Audio();

    function initAudio(elem) {
        var url = elem.attr('audiourl');
        var title = elem.text();
        var cover = elem.attr('cover');
        var artist = elem.attr('artist');

        $('.player .title').text(title);
        $('.player .artist').text(artist);
        //$('.player .cover').css('background-image','url(data/' + cover+')');;
        
		if($('.autoplay').prop('checked') && $('.playlist li.active').next().length > 0){
			song.autoplay = true;
			// This event will only be triggered if setting the autoplay attribute to true works.             
			$(song).on('play', function() {
				// only update the control UI if we actually play				
				$('.play').addClass('hidden');
				$('.pause').addClass('visible');            
			});
		}
		
		song.addEventListener('loadeddata', function() {
			// set the tracker once the song is loaded
			tracker.slider("option", "max", song.duration);		
            songLength = formatSeconds(song.duration);
            $('.time').text(formatSeconds(0) + ' / ' + songLength);	
		}, false);
		song.src = url;				
		

        // timeupdate event listener
        song.addEventListener('timeupdate',function (){
            var curtime = parseInt(song.currentTime, 10);
            tracker.slider('value', curtime);	
            
            // display time progress
            $('.time').text(formatSeconds(curtime) + ' / ' + songLength);		
        });

		song.addEventListener("ended", function(){
			stopAudio();
			
			// if autoplay, keep going
			if($('.autoplay').prop('checked')){
			
				// fwd click
				var next = $('.playlist li.active').next();
				if (next.length == 0) {					
					next = $('.playlist li:first-child');														
				}
				initAudio(next);
			}
		});
		
        $('.playlist li').removeClass('active');
        elem.addClass('active');
    }
    function playAudio() {
        song.play();

		// moved to loadeddata event for great justice
		// tracker.slider("option", "max", song.duration);	      

        $('.play').addClass('hidden');
        $('.pause').addClass('visible');
    }
    function stopAudio() {
        //song.pause();

        $('.play').removeClass('hidden');
        $('.pause').removeClass('visible');
    }	
    function formatSeconds(s){
        var date = new Date(null);
        date.setSeconds(s);
        return date.toISOString().substr(11, 8);		
    }

    // play click
    $('.play').click(function (e) {
        e.preventDefault();

        playAudio();
    });

    // pause click
    $('.pause').click(function (e) {
        e.preventDefault();
		song.pause();
        stopAudio();
    });

    // forward click
    $('.fwd').click(function (e) {
        e.preventDefault();

        stopAudio();

        var next = $('.playlist li.active').next();
        if (next.length == 0) {
            next = $('.playlist li:first-child');
        }
        initAudio(next);		
    });

    // rewind click
    $('.rew').click(function (e) {
        e.preventDefault();

        stopAudio();

        var prev = $('.playlist li.active').prev();
        if (prev.length == 0) {
            prev = $('.playlist li:last-child');
        }
        initAudio(prev);
    });

    // show playlist
	/*
    $('.pl').click(function (e) {
        e.preventDefault();

        $('.playlist').fadeIn(300);
    });
*/
    // playlist elements - click
    $('.playlist li').click(function () {
        stopAudio();
        initAudio($(this));		
    });

    // initialization - first element in playlist
    initAudio($('.playlist li:first-child'));

    // set volume
    song.volume = 0.8;

    // initialize the volume slider
    volume.slider({
        range: 'min',
        min: 1,
        max: 100,
        value: 80,
        start: function(event,ui) {},
        slide: function(event, ui) {
            song.volume = ui.value / 100;
        },
        stop: function(event,ui) {},
    });

    // empty tracker slider
    tracker.slider({
        range: 'min',
        min: 0, max: 10,
        start: function(event,ui) {},
        slide: function(event, ui) {
            song.currentTime = ui.value;
        },
        stop: function(event,ui) {}
    });
});
