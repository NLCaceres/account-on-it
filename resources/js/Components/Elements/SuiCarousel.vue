<template>
  <div id="carousel" class="p-0" :style="{ height: Height }"
       @mouseover="visibleArrows = true" @mouseleave="visibleArrows = false">
    <transition name="fade" mode="in-out">
      <img id="bg-img" :key="imgSet[currentImgIndex].src" class="ui image"
           :src="imgSet[currentImgIndex].src" :alt="imgSet[currentImgIndex].alt"
           :height="Height" :width="$store.state.app.window.width">
    </transition>

    <slot /> <!-- - Text elements go here -->

    <div id="controls" class="flexed-column-spaced-between h-100 w-100">
      <div /> <!-- - Added empty div here so flexbox will layout the other 2 divs as a center and bottom thirds -->

      <div v-if="visibleArrows && !Mobile" id="arrows" class="flexed-spaced-between m-lg-t">
        <button type="button" class="ui icon huge button carousel-arrows">
          <i class="chevron left big icon carousel-arrow" @click="ClickChange('left')" />
        </button>
        <button type="button" class="ui icon huge button carousel-arrows">
          <i class="chevron right big icon carousel-arrow" @click="ClickChange('right')" />
        </button>
      </div>

      <div v-if="visibleArrows" id="icons" class="m-xl-b align-self-center">
        <button v-for="(img, index) in imgSet" :key="img.src" type="button"
                class="circular ui icon button carousel-indicator" :class="{ active: currentImgIndex === index }"
                @click="ChangeImg(0, index)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { StopPageVisibilityAPI } from "../../Utility/Functions/page_visibility";
import { MOBILE_WIDTH, PAGE_VISIBILITY_READY } from "../../Store/GetterTypes";
import { defineComponent, type PropType } from "vue";
import { APP_MODULE } from "../../Store/modules/AppState";
import { INIT_PAGE_VISIBILITY } from "../../Store/ActionTypes";
import Image from "@/Utility/Models/Image";

export default defineComponent({
  // !: Props
  props: {
    intervalLength: {
      type: Number,
      default: 5000,
    },
    imgSet: {
      type: Array as PropType<Image[]>,
      default() { return []; }
    }
  },
  // !: Data
  data() {
    return {
      currentImgIndex: 0,
      intervalID: undefined as number | undefined, // ?: `window.setTimeout/setInterval` returns a num ID
      visibleArrows: false,
    };
  },
  // !: Computed Props
  computed: {
    Height(): string {
      return this.$store.state.app.window.width > 490 ? "450px" : "400px";
    },
    Mobile(): boolean { // - Returns 0 opacity if on mobile view so arrows not needed
      return this.$store.getters[`${APP_MODULE}/${MOBILE_WIDTH}`];
    }
  },
  // !: Lifecycle Methods
  mounted(): void { // - If PageVisAPI available, THEN run the Carousel, listening for webPage changes
    this.$store.dispatch(`${APP_MODULE}/${INIT_PAGE_VISIBILITY}`, this.CarouselPaused)
      .then(() => this.CarouselPaused()); // - Use `then` to await `dispatch` void promise to start the Carousel
  },
  beforeUnmount(): void {
    if (this.$store.getters[`${APP_MODULE}/${PAGE_VISIBILITY_READY}`]) { // - If PageVisAPI supported
      StopPageVisibilityAPI(this.$store.state.app.websiteVisibility.visibilityChange, this.CarouselPaused);
      // - Also check if the Carousel auto-play interval is running, and stop it
      if (this.intervalID) { window.clearInterval(this.intervalID); }
    }
  },
  // !: Methods
  methods: {
    // !: Carousel Methods
    CarouselPaused() {
        // - Check if PageVisAPI supported (by seeing if the "hidden" key is set)
        if (this.$store.getters[`${APP_MODULE}/${PAGE_VISIBILITY_READY}`]) {
          // - THEN using the "hidden" key, see if the user is focused on this app's window/tab
          const isDocHidden = document[this.$store.state.app.websiteVisibility.hidden as "hidden"];
          if (isDocHidden && this.intervalID) {
            window.clearInterval(this.intervalID); // - Stop the Carousel auto-play interval via its ID
          }
          else { // - Restarting Carousel auto-play
            this.intervalID = window.setInterval(this.ChangeImg, this.intervalLength);
          }
        }
    },
    ChangeImg(incrementer: number = 1, directChange: number = -1): void {
      if (directChange > -1) { this.currentImgIndex = directChange; return; }

      // - Incrementation Logic
      // -  Reset to index 0 if at array end
      if (incrementer === 1 && this.currentImgIndex === this.imgSet.length - 1) {
        this.currentImgIndex = 0;
      } else if (incrementer === -1 && this.currentImgIndex === 0) { // - Go to array end if at beginning and going left
        this.currentImgIndex = this.imgSet.length - 1;
      } else { // - All other cases increment or decrement as expected
        this.currentImgIndex += incrementer;
      }
    },
    ClickChange(direction: string): void {
      if (this.intervalID) {
        // - If Carousel running, reset the interval running it after a click
        window.clearInterval(this.intervalID); // - This prevents super fast changes or awkward Carousel motion
        this.intervalID = window.setInterval(this.ChangeImg, this.intervalLength);
      }
      if (direction === "right") this.ChangeImg(1);
      else this.ChangeImg(-1);
    },
  },
});
</script>

<style lang="scss" scoped>
#carousel {
  height: 400px;
  background-color:transparent;
  position: relative;
}
#bg-img {
  position: absolute;
  z-index: -1;
}

// - Div containing arrows
.carousel-arrows {
  color: white;
  background-color: transparent;
  border: none;
  &:hover {
    background-color:transparent;
    color: #888;
  }
}
// - Individual arrow themselves
.carousel-arrow {
    &:hover {
      color: #888
    }
}
// - Indicators on the bottom marking which image is active
.carousel-indicator {
  color: white;
  &:hover {
    background-color: #888;
  }
  &.active {
    background-color:#888;
  }
}
#arrows {
  font-size: 3em;
}
</style>