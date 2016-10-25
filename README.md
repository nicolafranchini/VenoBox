VenoBox
=======

Responsive jQuery modal window plugin

Just another responsive jQuery lightbox plugin, suitable for images, inline contents, iFrames, Google Maps, Vimeo and YouTube videos.

The big difference compared to many others plugins like this is that VenoBox calculates the max width of the image displayed and preserves its height if is taller than the window (so in small devices you can scroll down the content, avoiding vertical microscopic resized images).

view demo at: http://lab.veno.it/venobox/

Use Callbacks:
```javascript
// just use the line you need, and fill the body of the function
var venoOptions={

//is call before the venobox pops up, return false to prevent opening;
pre_open_callback   : function(obj){return true;}

//is call when opening is finished
post_open_callback  : function(trigger,overlay,container,content,blocknum,blocktitle){}

// is called before closing, return false to prevent closing
pre_close_callback  : function(trigger,overlay,container,content,blocknum,blocktitle){return true;}

// is called after finished closing. 
post_close_callback : function(trigger,overlay,container,content,blocknum,blocktitle){}

// is called after a window resize.
post_resize_callback: function(trigger,overlay,container,content,blocknum,blocktitle){return true;}
}
$('.venobox').venobox(venoOptions)
```

Autostart venobox (with URL parameter for example) with (after initalisation):
```
$('.venobox').trigger('click');
```


License: released under the MIT License
