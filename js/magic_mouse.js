/*! MagicMouse.js - v1.1
* A lightweight javascript library to create some amazing effects for the mouse (cursor) on your website
* https://github.com/dshongphuc/magic-mouse-js
* Copyright (c) 2020 Phuc H. <dshongphuc@gmail.com> under MIT license; */

"use strict";
function magicMouse(options) {
  // I believe we don't want this cursor on tablet/mobile
  if (!Modernizr.touchevents){
    options = options || {};
    options.outerWidth = options.outerWidth || 30;
    options.outerHeight = options.outerHeight || 30;
    options.cursorOuter = options.cursorOuter || "circle-basic";
    options.hoverEffect = options.hoverEffect || "circle-move";
    options.hoverItemMove = options.hoverItemMove || false;
    options.defaultCursor = options.defaultCursor || false;

    // Add cursor DOM to body :
    if ("disable" != options.cursorOuter) {
      var newCursorDOM = document.createElement("div");
      newCursorDOM.setAttribute("id", "magicMouseCursor");
      document.body.appendChild(newCursorDOM);

      // Select the cursor DOM which has been added to body before:
      var cursorDOM = document.getElementById("magicMouseCursor");
    }

    // Check if user wanna use our custom cursor or not
    // If yes, create DOM for it
    if (!options.defaultCursor) {
      document.body.style.cursor = "none";
      var newPointerDOM = document.createElement("div");
      newPointerDOM.setAttribute("id", "magicPointer");
      document.body.appendChild(newPointerDOM);
      var pointerDOM = document.getElementById("magicPointer");
    }

    if (cursorDOM) {
      cursorDOM.style.width = options.outerWidth + "px";
      cursorDOM.style.height = options.outerHeight + "px";
      var cursorOuterWidth = options.outerWidth,
        cursorOuterHeight = options.outerHeight,
        originalCursorWidth = options.outerWidth,
        originalCursorHeight = options.outerHeight;
    }

    //Update position of cursor when move:
    var outerX = 0,
      outerY = 0,
      pointerX = 0,
      pointerY = 0,
      stopFlag = false,
      itemHoverX = 0,
      itemHoverY = 0;
    document.addEventListener("mousemove", function(event) {
      pointerX = event.clientX;
      pointerY = event.clientY;
      setTimeout(() => {
        if (!stopFlag) {
          outerX = event.clientX - cursorOuterWidth / 2;
          outerY = event.clientY - cursorOuterHeight / 2;
        }
      }, 50);
    });

    //Hover effects :
    var hoverEls = document.querySelectorAll(".magic-hover");
    hoverEls.forEach((item, i) => {
      item.addEventListener("mouseenter", event => {
        switch (options.hoverEffect) {
          case "circle-move":
            circleMove_mouseEnterHover(item);
            //Move the item hover on:
            if (options.hoverItemMove) {
              hoverItemMove(event, item);
            }
            break;
          case "pointer-blur":
            pointerClass_mouseEnterHover(item, "pointer-blur");
            break;
          case "pointer-overlay":
            pointerClass_mouseEnterHover(item, "pointer-overlay");
            break;
        }
      });

      item.addEventListener("mouseleave", event => {
        item.style.transform = "translate3d(0,0,0)";
        switch (options.hoverEffect) {
          case "circle-move":
            circleMove_mouseLeaveHover();
            break;
          case "pointer-blur":
            pointerClass_mouseLeaveHover("pointer-blur");
            break;
          case "pointer-overlay":
            pointerClass_mouseLeaveHover("pointer-overlay");
            break;
        }
      });
    });

    // sometime we just don't want to use magicmouse on some specific elements:
    const noCursorEls = document.querySelectorAll(".no-cursor");
    noCursorEls.forEach((item, i) => {
      item.addEventListener("mouseenter", event => {
        cursorDOM.style.opacity = 0
        pointerDOM.style.opacity = 0
        document.body.style.cursor = "auto";
      });

      item.addEventListener("mouseleave", event => {
        cursorDOM.style.opacity = 1
        pointerDOM.style.opacity = 1
        document.body.style.cursor = "none";
      });
    });


    //Move the cursorDOM:
    var movement = () => {
      if (cursorDOM) {
        cursorDOM.style.transform =
          "matrix(1, 0, 0, 1, " + outerX + ", " + outerY + ")";
        cursorDOM.style.width = cursorOuterWidth + "px";
        cursorDOM.style.height = cursorOuterHeight + "px";
      }

      //Move the custom pointer :
      if (pointerDOM) {
        pointerDOM.style.transform =
          "matrix(1, 0, 0, 1, " +
          pointerX +
          ", " +
          pointerY +
          ") translate3d(-50%, -50%, 0)";
      }
      requestAnimationFrame(movement);
    };
    requestAnimationFrame(movement);

    const circleMove_mouseEnterHover = item => {
      stopFlag = true;
      if (cursorDOM) {
        cursorDOM.style.transition =
          "transform 0.2s, width 0.3s, height 0.3s, border-radius 0.2s";
        cursorDOM.classList.add("is-hover");
        var elementPos = event.currentTarget.getBoundingClientRect();
        if (item.classList.contains("magic-hover__square")) {
          cursorDOM.classList.add("cursor-square");
          outerX = elementPos.left;
          outerY = elementPos.top;
          cursorOuterWidth = elementPos.width;
          cursorOuterHeight = elementPos.height;
        } else {
          outerX = elementPos.left;
          outerY = elementPos.top;
          cursorOuterWidth = elementPos.width;
          cursorOuterHeight = elementPos.height;
        }
      }

      if (pointerDOM) {
        pointerDOM.classList.add("is-hover");
      }
    };

    const circleMove_mouseLeaveHover = () => {
      stopFlag = false;
      if (cursorDOM) {
        cursorOuterWidth = originalCursorWidth;
        cursorOuterHeight = originalCursorHeight;
        cursorDOM.style.transition =
          "transform 0.07s, width 0.3s, height 0.3s, border-radius 0.2s";
        cursorDOM.classList.remove("cursor-square");
        cursorDOM.classList.remove("is-hover");
      }

      if (pointerDOM) {
        pointerDOM.classList.remove("is-hover");
      }
    };

    const pointerClass_mouseEnterHover = (item, className) => {
      if (pointerDOM) {
        pointerDOM.classList.add(className);
      }
    };

    const pointerClass_mouseLeaveHover = className => {
      if (pointerDOM) {
        pointerDOM.classList.remove(className);
      }
    };

    const hoverItemMove = (event, item) => {
      itemHoverX = event.clientX;
      itemHoverY = event.clientY;
      item.addEventListener("mousemove", mouseEvent => {
        item.style.transform =
          "matrix(1,0,0,1," +
          (mouseEvent.offsetX - mouseEvent.target.offsetWidth / 2) / 2 +
          ", " +
          (mouseEvent.offsetY - mouseEvent.target.offsetHeight / 2) / 2 +
          ")";
      });
    };
  }

}


/*! modernizr 3.6.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-touchevents-setclasses !*/
!function(e,n,t){function o(e,n){return typeof e===n}function s(){var e,n,t,s,a,i,r;for(var l in c)if(c.hasOwnProperty(l)){if(e=[],n=c[l],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(s=o(n.fn,"function")?n.fn():n.fn,a=0;a<e.length;a++)i=e[a],r=i.split("."),1===r.length?Modernizr[r[0]]=s:(!Modernizr[r[0]]||Modernizr[r[0]]instanceof Boolean||(Modernizr[r[0]]=new Boolean(Modernizr[r[0]])),Modernizr[r[0]][r[1]]=s),f.push((s?"":"no-")+r.join("-"))}}function a(e){var n=p.className,t=Modernizr._config.classPrefix||"";if(h&&(n=n.baseVal),Modernizr._config.enableJSClass){var o=new RegExp("(^|\\s)"+t+"no-js(\\s|$)");n=n.replace(o,"$1"+t+"js$2")}Modernizr._config.enableClasses&&(n+=" "+t+e.join(" "+t),h?p.className.baseVal=n:p.className=n)}function i(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):h?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function r(){var e=n.body;return e||(e=i(h?"svg":"body"),e.fake=!0),e}function l(e,t,o,s){var a,l,f,c,d="modernizr",u=i("div"),h=r();if(parseInt(o,10))for(;o--;)f=i("div"),f.id=s?s[o]:d+(o+1),u.appendChild(f);return a=i("style"),a.type="text/css",a.id="s"+d,(h.fake?h:u).appendChild(a),h.appendChild(u),a.styleSheet?a.styleSheet.cssText=e:a.appendChild(n.createTextNode(e)),u.id=d,h.fake&&(h.style.background="",h.style.overflow="hidden",c=p.style.overflow,p.style.overflow="hidden",p.appendChild(h)),l=t(u,e),h.fake?(h.parentNode.removeChild(h),p.style.overflow=c,p.offsetHeight):u.parentNode.removeChild(u),!!l}var f=[],c=[],d={_version:"3.6.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){c.push({name:e,fn:n,options:t})},addAsyncTest:function(e){c.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=d,Modernizr=new Modernizr;var u=d._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];d._prefixes=u;var p=n.documentElement,h="svg"===p.nodeName.toLowerCase(),m=d.testStyles=l;Modernizr.addTest("touchevents",function(){var t;if("ontouchstart"in e||e.DocumentTouch&&n instanceof DocumentTouch)t=!0;else{var o=["@media (",u.join("touch-enabled),("),"heartz",")","{#modernizr{top:9px;position:absolute}}"].join("");m(o,function(e){t=9===e.offsetTop})}return t}),s(),a(f),delete d.addTest,delete d.addAsyncTest;for(var v=0;v<Modernizr._q.length;v++)Modernizr._q[v]();e.Modernizr=Modernizr}(window,document);
