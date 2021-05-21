<template>
    <div id="carousel" class="p-0" @mouseover="visibleArrows = true" @mouseleave="visibleArrows = false" :style="{height: Height}">
      <transition name="fade" mode="in-out"> 
        <img id="bg-img" :src="imgSet[currentImgIndex].src" :alt="imgSet[currentImgIndex].alt" :key="imgSet[currentImgIndex].src"
        class='ui image' :height="Height" :width="$store.state.app.window.width" />
      </transition>
      <slot></slot> <!--//* Text elements go here -->
      <div id="controls" class='flexed-column-spaced-between h-100 w-100'>
        <!-- //* Extra div so flexbox will layout the 3 divs top, center and bottom -->
        <div></div>
        <div id="arrows" v-if="visibleArrows && !Mobile" class="flexed-spaced-between m-lg-t">
          <button type="button" class='ui icon huge button carousel-arrows'><i class="chevron left big icon carousel-arrow" @click="ClickChange('left')"></i></button>
          <button type="button" class='ui icon huge button carousel-arrows'><i class="chevron right big icon carousel-arrow" @click="ClickChange('right')"></i></button>
        </div>
        <div id="icons" v-if="visibleArrows" class="m-xl-b align-self-center">
          <button type="button" v-for="(img, index) in imgSet" :key="img.src" :class="{active: currentImgIndex === index}"
          class="circular ui icon button carousel-indicator" @click="ChangeImg(0, index)"/>
        </div>
      </div>
    </div>
</template>
<script lang="ts">
import Hammer from 'hammerjs';
import { StopPageVisibilityAPI } from "../../Utility/Functions/page_visibility";
import { MOBILE_WIDTH, PAGE_VISIBILITY_READY } from '../../Store/GetterTypes';

import Vue from "vue";
import { APP_MODULE } from '../../Store/modules/AppState';
import { INIT_PAGE_VISIBILITY } from '../../Store/ActionTypes';

export default Vue.extend({
  //! Props
  props: {
    intervalLength: {
      type: Number,
      default: 5000,
    },
    imgSet: Array,
  },
  //! Computed Props
  computed: {
    Height() {
      return this.$store.state.app.window.width > 490 ? '450px' : '400px';
    },
    Mobile() { //* Returns 0 opacity if on mobile view so arrows not needed. 
      return this.$store.getters[`${APP_MODULE}/${MOBILE_WIDTH}`]
    }
  },
  //! Data
  data() {
    return {
      currentImgIndex: 0,
      intervalID: null as number | null, //? Window version (vs global) of setTimeout/setInterval returns a # id
      visibleArrows: Boolean,
      //isMounted: false, //* Check if mounted to properly size imgs
      swipeManager: null as HammerManager | null,
    };
  },
  //! Lifecycle Methods
  mounted(): void {
    this.InitSwipeChange();
    this.$store.dispatch(`${APP_MODULE}/${INIT_PAGE_VISIBILITY}`
    , this.CarouselPaused) //* If PageVisAPI available then Carousel will begin running and listen for webPage changes 
    .then(() => this.CarouselPaused()); //* The dispatch returns a empty promise (all async funcs do) so we can use 'then' to guarantee sequential calls
  },
  beforeDestroy(): void {
    if (this.$store.getters[`${APP_MODULE}/${PAGE_VISIBILITY_READY}`]) { //* If PageVisAPI supported
      StopPageVisibilityAPI(this.$store.state.app.websiteVisibility.visibilityChange, this.CarouselPaused);
      if (this.intervalID) { window.clearInterval(this.intervalID); } //* Also check if interval is running and stop it too
    }
  },
  //! Methods
  methods: {
    //! HammerJS Swipes
    InitSwipeChange() {
      const carousel = $('#carousel')[0]; //* Same as doc.getElemById
      this.swipeManager = new Hammer(carousel);
      this.swipeManager.on('swipe', this.SwipeChange)
    },
    //! Carousel Methods
    CarouselPaused() {
        if (this.$store.getters[`${APP_MODULE}/${PAGE_VISIBILITY_READY}`]) { //* If PageVisAPI supported, we have a hidden option
          
          //* So check if switched off the current tab/browser 
          if (document[this.$store.state.app.websiteVisibility.hidden] && this.intervalID) {
            
            //? Specify which (window one) setInterval is being used  
            window.clearInterval(this.intervalID) //* Stop the interval 
          }
          else { 
            
            this.intervalID = window.setInterval(this.ChangeImg, this.intervalLength) //* Restart it
          }
        }
    },
    SwipeChange(event: HammerInput): void {
      //* If RtL (DIRECT_LEFT) go to next index, else previous index;
      event.direction === Hammer.DIRECTION_LEFT ? 
      this.ChangeImg(1) : 
      this.ChangeImg(-1);
    },
    ChangeImg(incrementer: number = 1, directChange: number = -1): void {
      if (directChange > -1) { this.currentImgIndex = directChange; return; }

      //* Incrementation Logic
      //* Reset to index 0 if at array end
      if (incrementer === 1 && this.currentImgIndex === this.imgSet.length - 1) {
        this.currentImgIndex = 0;
      } else if (incrementer === -1 && this.currentImgIndex === 0) { //* Go to array end if at beginning and going left
        this.currentImgIndex = this.imgSet.length - 1;
      } else { //* All other cases increment or decrement as expected
        this.currentImgIndex += incrementer;
      }
    },
    ClickChange(direction: string): void {
      if (this.intervalID) {
        //* If we started an interval, reset it after a click (preventing super fast changes or awkward timing)
        window.clearInterval(this.intervalID);
        this.intervalID = window.setInterval(this.ChangeImg, this.intervalLength);
      }
      if (direction === 'right') this.ChangeImg(1);
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

//* Div containing arrows
.carousel-arrows {
  color: white;
  background-color: transparent;
  border: none;
  &:hover {
    background-color:transparent;
    color: #888;
  }
}
//* Individual arrow themselves
.carousel-arrow {
    &:hover {
      color: #888
    }
}
//* Indicators on the bottom marking which image is active 
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