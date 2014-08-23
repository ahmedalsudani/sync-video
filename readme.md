# sync-video

## What is this?

A tiny minimalist JavaScript app that syncs play/pause status across different
viewers.

## License

sync-video is licensed under GPLv3.

The text of GPLv3 is included in [LICENSE](LICENSE) and can be found at
http://www.gnu.org/licenses/licenses.html

## Notes

- Tested to work under Chrome.
- Currently works with html5 only.
- Not suitable for anything serious. (No sessions, authentication, anything.)

## How to use

- Create a Firebase account and make an app
- Import jQuery 
- Import the Firebase client. (Look at [this page]
  (https://www.firebase.com/docs/web-quickstart.html) if you need to find it)
- Define a global `FIREBASE_ROOT` variable that points to one of your apps
- Call `syncVideo` with the video element as an argument
- Profit

### TODO

- **This madness needs to end**: Rewrite whole program in a way that makes more sense.
- Change behavior so that syncVideo is a function that takes a video element and
  syncs that
- If seeking to the same spot: seek
- Change behavior so they're all unique events (fixes above)

Copyright 2014 Ahmed Al-Sudani
