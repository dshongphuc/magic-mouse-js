

[![](https://badgen.net/github/stars/dshongphuc/magic-mouse-js?icon=github)](https://github.com/dshongphuc/magic-mouse-js)
[![](https://badgen.net/npm/v/magicmouse.js?color=orange)](https://www.npmjs.com/package/magicmouse.js)
# MagicMouse.js

A lightweight javascript library to create some amazing effects for the mouse (cursor) on your website - MagicMouse.js : [https://magicmousejs.web.app/](https://magicmousejs.web.app)

![One of magic-mouse effects](https://user-images.githubusercontent.com/19908411/77246772-03384880-6c5d-11ea-8074-6975bc8e3632.gif)
There's more than 4 effects and I'm keep updating now, you can try other effect on https://magicmousejs.web.app/ by changing the example and click to "Try it" button.

# Installation
MagicMouse.js is a vanilla javascript library so you DON'T need to include any other library like jQuery. There are two options to install it:

## NPM
If you want to install it to your project via npm: `npm i magicmouse.js`

After that, import to your project by: `import { magicMouse } from 'magicmouse.js'`

## CDN
If you want to include Magicmouse.js directly to your HTML, you can use this CDN. Include the js file to the bottom of your HTML file (right before the end of body tag):
````html  
  <script type="text/javascript" src="https://res.cloudinary.com/veseylab/raw/upload/v1636192990/magicmouse/magic_mouse-1.2.1.cdn.min.js"></script>
````
## Initialize
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

# License ❤️
This package is totally free to use. However, if you want to use Magicmouse.js in your commercial projects, I required you to do a good thing for the poor people in your place. You can do whatever you think it's "a good thing", like buy them some food, give them some money,..etc... 
I'm not requiring you to take a photo or do anything to prove it, just do it and you will feel great about yourself :)
Let's make the world better place. 

# What's next?
You should have the nice effect for your mouse now, of course you can override the CSS code to make it more elegant and suitable with your website (change color, size,..).
I'll add more effects to this libs when I have time, sure you can contribute to this repository and I'm very appreciate that ! :)
