# VenoBox

[![venobox (latest)](https://img.shields.io/npm/v/venobox/latest.svg)](https://www.npmjs.com/package/venobox)
[![venobox (downloads)](https://img.shields.io/npm/dy/vanilla-lazyload.svg)](https://www.npmjs.com/package/venobox)
[![](https://data.jsdelivr.com/v1/package/npm/venobox/badge)](https://www.jsdelivr.com/package/npm/venobox)

Responsive modal window javaScript plugin, touch swipe gallery

Just another responsive lightbox plugin, suitable for images, inline contents, iFrames, videos.

The big difference compared to many others plugins is that VenoBox calculates the max width of the image displayed and preserves its height if is taller than the window (so in small devices you can scroll down the content, avoiding vertical microscopic resized images).

Demo: https://veno.es/venobox/

## Quick start

### Install

This package can be installed with:
- [npm](https://www.npmjs.com/package/venobox): `npm install venobox`
- [composer](https://packagist.org/packages/nicolafranchini/venobox): `composer require nicolafranchini/venobox`

### Static HTML

Download the [latest release](https://github.com/nicolafranchini/VenoBox/releases)
or get the sources from [jsDelivr](https://cdn.jsdelivr.net/npm/venobox@latest/dist/)

Put the required stylesheet into your `<head>` to load our CSS:

```html
<link rel="stylesheet" href="venobox/dist/venobox.min.css" />
```

Include the script near the end of your pages, right before the closing `</body>` tag:

```html
<script src="venobox/dist/venobox.min.js"></script>
```


### Usage

Insert one or more links with a custom class

```html
<a class="venobox" href="image01-big.jpg"><img src="image01-small.jpg" alt="image alt"/></a>
```

Initialize the plugin and your VenoBox is ready for all the selected links.

```javascript
new VenoBox({
  selctor: '.venobox'
});
```

## Documentation

The full documentation is available at https://veno.es/venobox/

License: released under the MIT License
