# React-Spotify v.2 🎺🎸🎻🎤

This is a fork of the Paul Fitzgerald `React-Spotify` project, upgraded to be themeable. Find the originl project here [here](http://pau1fitz.github.io/react-spotify).

![alt text](https://github.com/ianhuet/react-spotify/blob/master/songs.png "Song")
![alt text](https://github.com/ianhuet/react-spotify/blob/master/browser.png "Browse")


## Installation
If you wish to run the code locally run the following:

```
yarn
yarn start
visit http://localhost:3000
```

## Application

### Technology Stack
- Bootstrapped with Create-React-App
- State handled with Redux
- Styled with JSS
- HTMLAudioElement API for song playback


### Spotify Authentication
Spotify uses OAuth2 for authentication and authorization. On initial setup [App Authorisation](https://developer.spotify.com/documentation/general/guides/authorization-guide/) will be initiated. This requests an authorisation token, on success it returns to /app, and includes the following scopes: playlist-read-private, playlist-read-collaborative, playlist-modify-public, user-read-recently-played, playlist-modify-private, ugc-image-upload, user-follow-modify, user-follow-read, user-library-read, user-library-modify, user-read-private, user-read-email, user-top-read, user-read-playback-state.


## Development

### Deployment
The application is automatically deployed into Vercel via a webhook on the Master branch.

### Changelog
All updates are tracked in the [Changelog](https://github.com/ianhuet/react-spotify/blob/master/CHANGELOG.md) under [Semantic Versioning](https://semver.org/).


## Notes

### License
Released under the MIT License. Check [LICENSE.md](https://github.com/ianhuet/react-spotify/blob/master/LICENSE) for more info.

### Web Playback SDK
Please note that the Spotify API only provides 30 second audio snippets. It may be possible to get the full track by using the [Web Playback SDK](https://beta.developer.spotify.com/documentation/web-playback-sdk/).
