

# MagicMouse.js

A lightweight javascript library to create some amazing effects for the mouse (cursor) on your website - MagicMouse.js : [https://magicmousejs.web.app/](https://magicmousejs.web.app)

![One of magic-mouse effects](https://user-images.githubusercontent.com/19908411/77246772-03384880-6c5d-11ea-8074-6975bc8e3632.gif)
There's more than 4 effects and I'm keep updating now, you can try other effect on https://magicmousejs.web.app/ by changing the example and click to "Try it" button.

# Installation
MagicMouse.js is a vanilla javascript library so you DON'T need to include any other library like jQuery.
You just need to include 2 things to your HTML :

### Put the CSS file to your head tag:
````html
  <link rel="stylesheet" href="dist/magic-mouse.css" />
````

### Include the js file to the bottom of your HTML file (right before the end of body tag) :
````html
  <script type="text/javascript" src="dist/magic_mouse.js"></script>
````
### Insert your options and initialize :
````html
<script type="text/javascript">
    options = {
	"cursorOuter": "circle-basic",
	"hoverEffect": "circle-move",
	"hoverItemMove": false,
	"defaultCursor": false,
	"outerWidth": 30,
	"outerHeight": 30
      };
    magicMouse(options);
</script>
````
### Hover effect :
If you want your mouse have elegant hover effect, don't forget to add the class "magic-hover" to the element you want it have hover effect, for example :
````html
  <a class="magic-hover magic-hover__square">download</a>
````

### Disable Magicmouse on an element:
Sometime you just don't want to use Magicmouse on some specific elements? Then you just need to add `no-cursor` class to that element:
````html
<div class="no-cursor">...</div>
````

# Configuration list (updating):
| Variable name | Value |
|--|--|
| cursorOuter | Default: "circle-basic", other options : "disable" |
| hoverEffect | default: "circle-move", other options : "pointer-blur", "pointer-overlay" |

# CDN
Magicmouse.js is on the cloud now, you don't even need to download it to your server :
````html
  <link rel="stylesheet" href="https://res.cloudinary.com/veseylab/raw/upload/v1629862837/magicmouse/magic-mouse-1.2.css" />
  <script type="text/javascript" src="https://res.cloudinary.com/veseylab/raw/upload/v1629862837/magicmouse/magic_mouse-1.2.js"></script>
````

# What's next?
You should have the nice effect for your mouse now, of course you can override the CSS code to make it more elegant and suitable with your website (change color, size,..).
I'll add more effects to this libs when I have time, sure you can contribute to this repository and I'm very appreciate that ! :)
