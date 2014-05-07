/*
 * Author: Ahmed Al-Sudani
 * Email: ahmed [at] al-sudani.com
 * License: GPLv3
 * (C) 2014 Ahmed Al-Sudani
 */

/* global $, Firebase, FIREBASE_ROOT */
(function() {
    'use strict';
    var updatePlay = function (playingState) {
        //noinspection JSHint
        playingState.val() ? video[0].play() : video[0].pause();
        },
        pushTime = function(newTime) {
            time.set(newTime);
        },
        pullTime = function(receivedTime) {
            video[0].currentTime = receivedTime.val();
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

    video.on('seeked', function(e) {
        var newTime = e.target.currentTime;
        pushTime(newTime);
    });

    playing.on('value', updatePlay);
    time.on('value', pullTime);
}());
