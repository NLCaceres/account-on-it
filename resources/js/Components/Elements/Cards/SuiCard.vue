<template>
  <div class="app-cyan card" :class="[Fluid, {ui: standalone, horizontal: Horizontal, inverted: inverted }]"
    :style="(ContainerStyle as StyleValue)" @mouseover="hovering = true" @mouseleave="hovering = false">

        <div class="image" data-testid="card-image" :class="[ImagePercentage, ExtraContentSpacing]">
          <slot name="image">
            <lazy-load-img class='max-h-100 h-100' fluid :src="infoItem.img?.src" :alt="infoItem.img?.alt" />
          </slot>
        </div>

        <div class="content app-white-text" data-testid="card-content" :class="[ContentPercentage, 
          {'center aligned': fullyCentered || centeredContent, 'flexed-column-center': fullyCentered || verticalCentered}]">
            <slot name="content" v-bind="infoItem"></slot>

            <div class="header" :class="[{'center aligned': fullyCentered || centeredTitle, 'f-lg': mobile, 'f-sm': generalDesktop}]">
              <slot name="title" v-bind="infoItem">{{infoItem.title ?? ""}}</slot>
            </div>

            <div class="meta" :class="[{'center aligned': fullyCentered || centeredMeta, 'f-md': mobile, 'f-xs': generalDesktop}]">
              <slot name="meta" v-bind="infoItem">{{infoItem.meta ?? ""}}</slot>
            </div>

            <div class="description m-lg-x" :class="[{'center aligned': fullyCentered || centeredDescription, 'f-md': mobile, 'f-xs': generalDesktop}]">
              <slot name='description' v-bind="infoItem">{{infoItem.description ?? ""}}</slot>
            </div>
        </div>

        <!-- //? In Vue2, or maybe due to earlier Typescript, a v-if checking $slots for a specific named-slot needed "!!" for a proper boolean expression -->
        <div class="ui button" data-testid="card-attached-button" v-if="$slots['attached-button']">
            <slot name="attached-button"></slot>
        </div>

        <div class="extra content" data-testid="card-footer" v-if="$slots.footer"
          :class="[{'center aligned': fullyCentered || centeredExtraContent, 'flexed-column-center': fullyCentered || verticalCentered,
            'f-md': mobile, 'f-xs': generalDesktop}]">
            <slot name="footer" v-bind="infoItem"></slot>
        </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, type PropType, type StyleValue } from "vue"
import { APP_MODULE } from '../../../Store/modules/AppState';
import { MID_DESKTOP_WIDTH, LARGE_DESKTOP_WIDTH, MOBILE_WIDTH, TABLET_WIDTH, GENERAL_DESKTOP_WIDTH } from '../../../Store/GetterTypes';
import LazyLoadImg from '../../VueHelpers/Images/LazyLoadImg.vue';
import { mapGetters } from 'vuex';
import CardItem from "@/Utility/Models/CardItem";

export default defineComponent({
  components: {
    LazyLoadImg
  },
  props: {
    infoItem: {
      type: Object as PropType<CardItem>,
      default: { title: "" }
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
      type: Boolean,
      default: false
    },
    hoverable: {
      type: Boolean,
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
      if (this.ratio.length !== 5 || this.ratio.search('/') !== 2) {
        return (this.horizontal) ? `w-50` : `h-50`;
      } 
      return (this.horizontal) 
      ? `w-${this.ratio.split('/')[0]}`
      : `h-${this.ratio.split('/')[0]}`;
    },
    ContentPercentage(): string {
      if (this.ratio.length !== 5 || this.ratio.search('/') !== 2) {
        return (this.horizontal) ? `w-50` : `h-50`;
      } 
      return (this.horizontal) 
      ? `w-${this.ratio.split('/')[1]}`
      : `h-${this.ratio.split('/')[1]}`;
    },
    //TODO: Unclear this ExtraContentSpacing is really needed or if "max-h-100" is the preferred option
    ExtraContentSpacing(): string { //* Image div'll oversize without a limiter
      if (!this.$store.getters[`${APP_MODULE}/${MOBILE_WIDTH}`]) {
        if (this.horizontal) {
          //* If there's a footer below content/img divs (instead of in content section) this saves space for it
          // if ((this.$slots.footer && this.$slots.footer()) || (this.$slots['attached-button'] && this.$slots["attached-button"]())) return 'max-h-80'
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
    ContainerStyle(): StyleValue {
      let flexDirectionCSS = (this.standalone || this.horizontal) ? "row" : "column";
      if (this.reversed) { flexDirectionCSS += "-reverse"; }
      const containerStyle: StyleValue = {
        height: `${this.height}px`, flexDirection: flexDirectionCSS as "row" | "column" | "row-reverse" | "column-reverse",
        boxShadow: this.borderless ? "none" : ""
      }
      return { //* Fomantic boxShadow default = 0 1px 3px 3px yellow, 0 0 0 1px #555
        ...containerStyle, boxShadow: (this.hoverable && this.hovering) ? "0px 1px 3px 3px #bc8b3d !important" : ""
      }
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