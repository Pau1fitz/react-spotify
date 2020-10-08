# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).


## [Unreleased]
## [2.1.0] - 2020.10.08
## Changed
- Migrate all CSS to CSS-in-JSS
- Reorganise `components` into Atomic Design heirarchy
- Add `containers` directory
- Migrate smaller class components to functional components
- Add Icon, PlayInfo components
- @ts-nocheck on all files throwing Typescript errors


## [2.0.2] - 2020.09.29
### Changed
- Replace ejected CRA (Config & Scripts) with latest, unejected Create-React-App
- Remove Electron
- Begin migration to Typescript
- Upgrade React v.16.13.1
- Upgrade Redux v.4.0.5

## [2.0.1] - 2020.09.25
### Changed
- Extract REDIRECT_URI to ENV variable

## [2.0.0] - 2020.09.25
### Changed
- Reset version number to v.2
- Updated README
- Add CHANGELOG
- Refactor `App` Spotify Authorisation 
- Resolve error thrown by [React.Fragment](https://reactjs.org/blog/2017/11/28/react-v16.2.0-fragment-support.html) in MainView
- Remove GitHub badge
