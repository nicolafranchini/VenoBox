# Changelog

### [2.0.4]
- New option: `customClass`
- New attribute: `data-customclass` (overrides global option `customClass`) 
- New attribute: `data-border` (overrides global option `border`) 
- New: option ratio: 'full' for a 100% viewport height of iFrame and video content

### [2.0.3]
- New: ECMAScript module `import VenoBox from './src/venobox.esm.js'`

### [2.0.2]
- New: Fast gallery navigation
- Update: default `maxWidth: 100%`
- Update: minor css fixes

### [2.0.1]
- Update: 'share' option boolean.
- Deprecated: facebook, twitter, linkedin, pinterest share
- New share tools: Copy link, Navigator share, Download
- New: option `navKeyboard`
- New: option `navTouch`
- Update: minor fixes

### [2.0.0]
- Dropped jQuery dependency.
- Async gallery navigation and items loading
- New: support local videos (mp4, webm, ogg) 
- Update: more preload spinners

Check [Migrating to VenoBox 2](https://github.com/nicolafranchini/VenoBox/wiki).

### [1.9.4]
- New: navSpeed option

### [1.9.3]
- New: noArrows option

### [1.9.2]
- Update: Remove focus from link to avoid multiple calls with enter key

### [1.9.1]
- Fix: Error thrown in safari #147 

### [v1.9.0]
- Update:  reset content scrollTop on change

### [v1.8.9]
- New share buttons
available options: `['facebook', 'twitter', 'linkedin', 'pinterest', 'download']`

### [v1.8.8]
- Hide infinigall navigation if has only 1 item
- Hide numeratio if has only 1 item
- Higher z-index for vbox-overlay

### [v1.8.7]
- Percentual window padding 
- Minified CSS

### [v1.8.6]
- Namespaced some css classes #133 

### [v1.8.5]
- New callback: `cb_content_loaded(obj, gallIndex, thenext, theprev)`

### [v1.8.4]
- Scrollbar dissappears behind `.vbox-overlay` background (Chrome) #109
- Overlay close does not work on iPad, and full overlay is not clickable #115
- Allow autoplay in Chrome - attribute needed for iframe #121

### [v1.8.3]
- New spinkit preloaders #106
- Hide spinner when popup has been loaded #101
- Add support of customized Gallery items directly on the JavaScript init. #120

### [v1.8.2]
- Fix: infinigall & nextok = false #98 

### [v1.8.1]
- update: `use strict` - thanks @shivarajnaidu
- Fix: fade in overlay

### [v1.8.0
- New: touch swipe support
- New methods: call close, next or previous item outside the plugin
- Update: new callbacks

### [v1.7.3]
- Update: brought back `data-gall` instead of `data-vbgall`

### [v1.7.2]
- Fix: gallery navigation with different title attributes
- Fix: position absolute for preloader to avoid scroll overlay
- Update: .json files

### [v1.7.1]
- New: options for title and navigation elements: position and colors
- New: pure css3 preloaders
- New: 5 Callbacks added - thanks @garyee
- New: video autoplay as option - thanks @codibit
- Update: `data-type` changed to `data-vbtype`
- Update: css3 next - prev arrows
- Update: iframe and inline windows with default height realtive to viewport
- Update: Removed deprecated functions for jQuery 3
- Update: new youtube parser to convert more urls
- Update: video format to 16:9
- Update: panel shadow
- Fix: wait to loading all images inside ajax modal
- Fix: `https://` for video iframes
