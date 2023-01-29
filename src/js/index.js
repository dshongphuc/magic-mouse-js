import {magicMouse} from "./magicmouse";
import '../scss/website.scss'
import { createApp } from 'vue/dist/vue.esm-bundler'

const app = createApp({
    data() {
        return {
            selectedEffect: 'example #1',
            effectList: [
              "example #1",
              "example #2",
              "example #3",
              "example #4",
              "example #5",
            ],
            options: {
              outerStyle: "circle",
              hoverEffect: "circle-move",
              hoverItemMove: false,
              defaultCursor: false,
              outerWidth: 30,
              outerHeight: 30,              
            }
        }
    },
    mounted() {
        magicMouse(this.options);        
        // prettier();

    },
    methods: {
        changeEffect() {
          document.body.style.cursor = "unset";
          var cursorDOM = document.getElementById("magicMouseCursor");
          var pointerDOM = document.getElementById("magicPointer");
          if (cursorDOM) {
            cursorDOM.parentNode.removeChild(cursorDOM)
          }
          if (pointerDOM) {
            pointerDOM.parentNode.removeChild(pointerDOM)
          }
          switch (this.selectedEffect) {
            case "example #1":
              this.options.hoverEffect = "circle-move"
              this.options.outerStyle = "circle-basic"
              break;
            case "example #2":
              this.options.hoverEffect = "pointer-overlay"
              this.options.outerStyle = "disable"
              break;
            case "example #3":
              this.options.hoverEffect = "pointer-blur"
              this.options.outerStyle = "disable"
              break;
            case "example #4":
              this.options.outerWidth = 41;
              this.options.outerHeight = 41;
              this.options.hoverEffect = "pointer-blur"
              this.options.outerStyle = "circle-basic"
              break;
            case "example #5":
              this.options.outerWidth = 41;
              this.options.outerHeight = 41;
              this.options.hoverEffect = "circle-move"
              this.options.outerStyle = "circle-basic"
              this.options.defaultCursor = true
              break;
          }
          magicMouse(this.options);

          let codeBlock = document.getElementById("codeSection")
          codeBlock.classList.remove("prettyprinted")
          codeBlock.innerHTML = "options = " + JSON.stringify(this.options, null, 2) + "; \n magicMouse(options);";          
        }
      },
})

app.mount('#app')