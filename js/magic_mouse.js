"use strict";
function magicMouse(options) {
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
