#sync-video.js

## What is this?

A tiny minimalist JavaScript app that syncs play/pause status across different
viewers.

## Notes

- Tested to work under Chrome.
- Currently works with html5 only.
- Not suitable for anything serious. (No sessions, authentication, anything.)

## How to use

- Create a Firebase account and make an app
- Import jQuery. Easy to avoid but jQuery is so nice and works everywhere
- Import the Firebase client. (Look at [this page]
  (https://www.firebase.com/docs/web-quickstart.html) if you need to find it)
- Define a global `FIREBASE_ROOT` variable that points to one of your apps
- Add `sync-video` as a class to the video element you want synced
- Profit

### TODO

- Change behavior so that syncVideo is a function that takes a video element and
  syncs that
- Maybe sync time too
- Maybe let user jump to where other user is
