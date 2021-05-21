<template>
  <div class="app-cyan card" :class="[Fluid, {ui: standalone, horizontal: Horizontal, inverted: inverted }]"
        :style="[{ height:`${height}px`, flexDirection: Reversed, boxShadow: borderless ? 'none' : '' }, Hoverable]" 
        @mouseover="hovering = true" @mouseleave="hovering = false">

        <div class="image" :class="[ImagePercentage, ExtraContentSpacing]">
            <slot name="image">
                <lazy-load-img class='max-h-100 h-100' fluid :src="(infoItem && infoItem.img) ? infoItem.img.src : null" 
                  :alt="(infoItem && infoItem.img) ? infoItem.img.alt : null" />
            </slot>
        </div>

        <div class="content app-white-text" :class="[ContentPercentage, 
          {'center aligned': fullyCentered || centeredContent, 'flexed-column-center': fullyCentered || verticalCentered}]">
            <slot name="content" :info-item="infoItem"></slot>

            <div class="header" :class="[{'center aligned': fullyCentered || centeredTitle, 'f-lg': mobile, 'f-sm': generalDesktop}]">
                <slot name="title" :info-item="infoItem">{{infoItem ? infoItem.title : ''}}</slot>
            </div>

            <div class="meta" :class="[{'center aligned': fullyCentered || centeredMeta, 'f-md': mobile, 'f-xs': generalDesktop}]">
                <slot name="meta" :info-item="infoItem">{{infoItem ? infoItem.meta : ''}}</slot>
            </div>

            <div class="description m-lg-x" :class="[{'center aligned': fullyCentered || centeredDescription,
              'f-md': mobile, 'f-xs': generalDesktop}]">
                <slot name='description' :info-item="infoItem">{{infoItem ? infoItem.description : ''}}</slot>
            </div>
        </div>

        <!--//? '!!' works here because v-if isn't a direct conditional! Vue parses it and will only display components 
        //? IF it receives 'true'. Since slot doesn't exist, it receives 'undefined' cast into 'false' -->
        <div class="ui button" v-if="!!$slots['attached-button']">
            <slot name="attached-button"></slot>
        </div>

        <div class="extra content" v-if="$slots.footer"
          :class="[{'center aligned': fullyCentered || centeredExtraContent, 'flexed-column-center': fullyCentered || verticalCentered,
            'f-md': mobile, 'f-xs': generalDesktop}]">
            <slot name="footer" :info-item="infoItem"></slot>
        </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { APP_MODULE } from '../../../Store/modules/AppState';
import { MID_DESKTOP_WIDTH, LARGE_DESKTOP_WIDTH, MOBILE_WIDTH, TABLET_WIDTH, GENERAL_DESKTOP_WIDTH } from '../../../Store/GetterTypes';
import LazyLoadImg from '../../VueHelpers/Images/LazyLoadImg.vue';
import { mapGetters } from 'vuex';

export default Vue.extend({
  components: {
    LazyLoadImg
  },
  props: {
    infoItem: {
      type: Object,
      default: null
    },
    standalone: {
      type: Boolean,
      default: true,
    },    
    //! Centering Logic  
    fullyCentered: {
      type: Boolean,
      default: false
    },
    verticalCentered: {
      type: Boolean,
      default: false
    },
    centeredContent: { 
      type: Boolean,
      default: false,
    },
    centeredTitle: {
      type: Boolean,
      default: false
    },
    centeredMeta: {
      type: Boolean,
      default: false
    },
    centeredDescription: {
      type: Boolean,
      default: false
    },
    centeredExtraContent: { 
      type: Boolean,
      default: false,
    },
    //! Orientation
    horizontal: { //* Makes Card a row with extra content below both image and content space
      type: Boolean,
      default: false
    },
    inverted: { //* Inverted Colors
      type: Boolean,
      default: false,
    },
    reversed: {
      type: Boolean,
      default: false
    },
    //! Styling
    fluid: {
      type: Boolean,
      default: false,
    },  
    borderless: {
      type: [Boolean],
      default: false
    },
    hoverable: {
      type: [Boolean, Object],
      default: false
    },
    height: { //? Height/Width attribute only works on some html tags
      //* This takes care of any that don't allow it!
      type: Number,
      default: 250
    },
    ratio: { //* Ratio of width/height of image to content area
      type: String,
      default: '50/50'
    }
  },
  data() {
    return {
      hovering: false,
    }
  },
  computed: {
    ...mapGetters(APP_MODULE, { mobile: MOBILE_WIDTH, tablet: TABLET_WIDTH, midDesktop: MID_DESKTOP_WIDTH, 
      largeDesktop: LARGE_DESKTOP_WIDTH, generalDesktop: GENERAL_DESKTOP_WIDTH }),
    Fluid(): string {
      if (this.fluid) {
        return (this.standalone) //* If standalone, fluid is fine, otherwise in a set of cards w-100
        ? 'fluid' //* Only really works when it's the only card (aka not under 'ui cards' parent)
        //: 'w-100'; //* The 'width: 100% !important' css rule guarantees it will fill the container
        : 'auto-width'; //* Flex's align-items default is stretch across cross axis so this works just as well as w-100
      }
      return '';
    },
    Horizontal(): boolean { //* Helper for standalone check
      //* If not standalone, then horizontal class not needed
      return (this.horizontal && this.standalone) 
      ? true
      : false;
    },
    ImagePercentage(): string {
      //* Format should always be 'XX/YY'
      if (this.ratio.length !== 5 && this.ratio.search('/') !== 2) {
        return (this.horizontal) ? `w-50` : `h-50`;
      } 
      return (this.horizontal) 
      ? `w-${this.ratio.split('/')[0]}`
      : `h-${this.ratio.split('/')[0]}`;
    },
    ContentPercentage(): string {
      if (this.ratio.length !== 5 && this.ratio.search('/') !== 2) {
        return (this.horizontal) ? `w-50` : `h-50`;
      } 
      return (this.horizontal) 
      ? `w-${this.ratio.split('/')[1]}`
      : `h-${this.ratio.split('/')[1]}`;
    },
    ExtraContentSpacing(): string { //* Image div'll oversize without a limiter
      if (!this.$store.getters[`${APP_MODULE}/${MOBILE_WIDTH}`]) {
        if (this.horizontal) {
          //* If there's a footer below content/img divs (instead of in content section) this saves space for it
          if (this.$slots.footer || this.$slots['attached-button']) return 'max-h-80'
          return 'max-h-100' //* No true footer, then use all available space without overflowing elems (img doesn't keep aspect ratio)
        }
      } 
      else if (this.$store.getters[`${APP_MODULE}/${MOBILE_WIDTH}`]) {
        if (this.horizontal) return '';
        return '' /* 'w-100' */;
      } 
      else {
        return '';
      }
      return '';
    },
    Reversed(): string {
      if (this.Horizontal) { //* Standalone card
        return '';
      } else if (this.horizontal) { //* Set of horizontal cards
        return (this.reversed) ? 'row-reverse'  : 'row'; 
      } else { //* Set of vertical cards
        return (this.reversed) ? 'column-reverse' : 'column'; 
      }
    },
    Hoverable(): object {
      //* 0 1px 3px 3px yellow, 0 0 0 1px #555 - Fomantic default
      if (this.hoverable && this.hovering) {
        if (typeof this.hoverable === 'boolean') {
          return { boxShadow: "0px 1px 3px 3px #bc8b3d !important" };
        } else if (typeof this.hoverable === 'object') {
          return this.hoverable;
        }
      } 
      return {};
    },
  },
  methods: {
    Hovering() {
      this.hovering = !this.hovering;
      console.log(`Hovering: ${this.hovering}`);
    }
  }
  // inject: {
  //   reversed: 'checkerPattern',

  // }
})
</script>

<style lang="scss" scoped>
div.description {
  line-height: 1.1; //* Helps when font is a bit bigger (might need not work for small sizes)
}

//* Override default values from main css classes we made
.f-sm {
  font-size: 2.5vw !important;
}
.f-xs {
  font-size: 1.5vw !important;
}
</style>