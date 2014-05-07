/* global $, Firebase, FIREBASE_ROOT */
(function() {
    'use strict';
    var updatePlay = function (playingState) {
        //noinspection JSHint
        playingState.val() ? video[0].play() : video[0].pause();
        },
        fb = new Firebase(FIREBASE_ROOT),
        playing = fb.child('playing'),
        time = fb.child('time'),
        video = $('.sync-video');

    video.on('play', function() {
        playing.set(true);
    });

    video.on('pause', function() {
        playing.set(false);
    });

    playing.on('value', updatePlay);
}());
