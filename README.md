# React-Spotify v.2.0.0 🎺🎸🎻🎤

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

### Spotify Authentication
Spotify uses OAuth2 for authentication and authorization. On initial setup [App Authorisation](https://developer.spotify.com/documentation/general/guides/authorization-guide/) will be initiated. This requests an authorisation token, on success it returns to /app, and includes the following scopes: playlist-read-private, playlist-read-collaborative, playlist-modify-public, user-read-recently-played, playlist-modify-private, ugc-image-upload, user-follow-modify, user-follow-read, user-library-read, user-library-modify, user-read-private, user-read-email, user-top-read, user-read-playback-state.


## Development

### Changelog
All updates are tracked in the [Changelog](https://github.com/ianhuet/react-spotify/blob/master/CHANGELOG.md) under [Semantic Versioning](https://semver.org/).


### Bundler
Webpack (v.3.8) is used to produce either development or production builds.


### Source Project Specs

*Dependancies*
- React 16.1.1
- Redux 3.7.2
- Lodash 4.17

*DevDependancies*
- Webpack 3.8.1
- Jest 20.0
- Chai 4.1.2
- Enzyme 3.3.0


### License

Released under the MIT License. 

Check [LICENSE.md](https://github.com/ianhuet/react-spotify/blob/master/LICENSE) for more info.


## Notes

### Web Playback SDK
Please note that the Spotify API only provides 30 second audio snippets. It may be possible to get the full track by using the [Web Playback SDK](https://beta.developer.spotify.com/documentation/web-playback-sdk/).
