/* global $, Firebase, FIREBASE_ROOT */
(function() {
    'use strict';
    var updatePlay = function (playingState) {
        //noinspection JSHint
        playingState ? video.play() : video.pause();
        },
        fb = new Firebase(FIREBASE_ROOT),
        playing = fb.child('playing'),
        time = fb.child('time'),
        video = $('.sync-video')[0];
    video.on('play', playing.set(true));
    video.on('pause', playing.set(false));
    playing.on('value', updatePlay);
}());
