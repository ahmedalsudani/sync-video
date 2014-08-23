/*
 * sync-video
 *
 * Author: Ahmed Al-Sudani
 * Email: ahmed [at] al-sudani.com
 * License: GPLv3
 * Copyright 2014 Ahmed Al-Sudani
 */

/*global $, Firebase, FIREBASE_ROOT */

function syncVideo(video) {
    'use strict';
    var $video = $(video),
        fb = new Firebase(FIREBASE_ROOT)
            .child(encodeURIComponent(video.currentSrc)
                .replace(/\./g, '%2E')),
        playing = fb.child('playing'),
        seekTime = fb.child('seek-time'),
        playTime = fb.child('play-time'),
        lockRemoteState = false,
        initialized = false,
        initialTimePulled = false,
        lastRecordedTime = 0,
        consecutiveConflicts = 0,

        // Push playing/paused to Firebase/playing
        pushPlayState = function (e) {
            if (lockRemoteState === false) {
                playing.set(!e.target.paused);
            }
        },

        // Push current video time to Firebase/play-time
        pushPlayTime = function (e) {
            if (lockRemoteState === false && initialTimePulled === true) {
                playTime.set(e.target.currentTime);
            }
        },

        // Push current video time to Firebase/seek-time
        pushSeekTime = function (e) {
            if (initialTimePulled === true && lockRemoteState === false) {
                seekTime.set(e.target.currentTime);
            }
            /*
             * I probably deserve to be killed for this but here's the
             * reasoning. The browser API does not seem to distinguish between
             * the user changing the time and a script changing it so we know
             * we have pulled initial time when this script is called
             */
            initialTimePulled = true;
        },

        // If playingState contains true, play. Otherwise pause.
        updateLocalPlayState = function (playingState) {
            lockRemoteState = true;
            //noinspection JSLint
            playingState.val() === true ? video.play() : video.pause();
            lockRemoteState = false;
        },

        updateLocalTime = function (receivedTime, options) {
            // Silly JS
            options = options || {};
            lockRemoteState = true;

            /*
             * Check for initialized so we don't go to the last seek unless
             * it's actually a change
             *
             * Check for options.force so we can go to the last play position
             * as part of the initialization (while initialized === false)
             */
            if (initialized === true || options.force === true) {
                video.currentTime = receivedTime.val();
            }
            lockRemoteState = false;
        },

        stopIfBuffering = function () {
            if (!video.paused && video.currentTime === lastRecordedTime) {
                consecutiveConflicts += 1;
            } else {
                consecutiveConflicts = 0;
            }

            if (consecutiveConflicts > 3) {
                console.log('paused');
                video.pause();
            }
            lastRecordedTime = video.currentTime;
        },

        initialize = function () {
            playing.on('value', updateLocalPlayState);
            seekTime.on('value', updateLocalTime);
            playTime.once('value', function (e) {
                updateLocalTime(e, { force: true });
            });
            $video.on('play', pushPlayState);
            $video.on('pause', pushPlayState);
            $video.on('seeked', pushSeekTime);
            $video.on('timeupdate', pushPlayTime);
            $video.on('progress', stopIfBuffering);

            initialized = true;
        };

    if (video.readyState >= video.HAVE_METADATA) {
        initialize();
    } else {
        $video.on('loadedmetadata', initialize);
    }

}
