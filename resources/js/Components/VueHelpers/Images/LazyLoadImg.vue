<template>
  <!-- <img :class="['lazy-loading', {'done-loading': this.imgLoaded}]" :src="SrcImage" alt="" @load="load" 
    data-intersected="0" @intersect="UpdateIntersect"> -->
  <placeholder-img :src="SrcImage" :alt="alt" @load="load" 
    data-intersected="0" @intersect="UpdateIntersect" :height="height" :width="width" :fluid="fluid"/>
</template>

<script lang="ts">
import Vue from 'vue'
import PlaceholderImg from './PlaceholderImg.vue';
import { mapGetters } from 'vuex';
import { INIT_INTERSECTION_OBSERVER } from '../../../Store/ActionTypes';
import { GET_INTERSECTION_OBSERVER } from '../../../Store/GetterTypes';
import { INTERSECTION_MODULE, LAZY_LOAD_OBSERVER } from '../../../Store/modules/IntersectionState';
import SrcCheck from '../../../Utility/Functions/img_helper';
import { DidIntersect } from '../../../Utility/Functions/intersection_observer';

export default Vue.extend({
  components: {
    PlaceholderImg
  },
  props: {
    src: {
      type: String,
      default: ""
    },
    placeholderSrc: { //* Probably can just use the placeholder component I made
      type: String,
      default: ""
    },
    alt: {
      type: String,
      default: ""
    },
    height: {
      type: Number,
      default: 250,
    },
    width: {
      type: Number,
      default: 250
    },
    fluid: {
      type: Boolean,
      default: false
    },
    intersectOptions: {
      type: Object,
      default: () => ({}) //* Parentheses guarantee an object is returned
    }
  },
  computed: {
    ...mapGetters(INTERSECTION_MODULE, { observer: GET_INTERSECTION_OBSERVER }),
    SrcImage(): string {
      return this.intersected && this.src ? this.src : this.placeholderSrc;
    }
  },
  data: () => ({
    intersected: false,
    imgLoaded: false
  }),
  mounted() {
    this.setupObserver();
  },
  beforeDestroy() {
    (this.observer(LAZY_LOAD_OBSERVER) as IntersectionObserver)?.unobserve(this.$el);
  },
  methods: {
    load(): void {
      if (this.$el.getAttribute("src") !== this.placeholderSrc) {
        this.imgLoaded = true;
        this.$emit("load");
      }
    },
    async setupObserver(): Promise<void> {
      const observer = await this.$store.dispatch(`${INTERSECTION_MODULE}/${INIT_INTERSECTION_OBSERVER}`, 
        { intersectionCallback: this.observationCallback, intersectOptions: this.intersectOptions, id: LAZY_LOAD_OBSERVER });
      (observer as IntersectionObserver).observe(this.$el);
    }, 
    observationCallback(entries: IntersectionObserverEntry[]): void {
      //* All lazy load components use this observer callback to ultimately update on intersection events
      //* This callback is init'd only once since vuex handler adds observer to observers.LazyLoad obj
      for (const entry of entries) {
        const target = entry.target as HTMLElement;      
        target.dataset.intersected = (DidIntersect(entry)) ? "1" : "0"; //* Check data-* attribute on img tag 1 = intersected 0 = not
        //* Vanilla JS CustomEvents API to the rescue. Equivalent to Vue $emit and can be handled same way!
        target.dispatchEvent(new CustomEvent('intersect', { detail: target.dataset.intersected }));
      }
    },
    //* Thanks to vanilla JS CustomEvents we can call this, enabling reactive changes to intersected data prop
    UpdateIntersect(event: CustomEvent) {
      this.intersected = (parseInt(event.detail) === 1) ? true : false;
      //? Currently IntersectionObserver (probably based on setup of placeholderImg - 2 elems picked based on v-if) fires 2 back-back callbacks
      //? Problem is the 2nd callback misses the elem, setting this.intersected to false, so the following prevents that issue
      //* Conveniently, this is desired anyway - load img, undo blur when loaded, & now 1 less elem for observer to track
      if (this.intersected) (this.observer(LAZY_LOAD_OBSERVER) as IntersectionObserver).unobserve(this.$el);
    },
    SrcCheck,
  }
})
</script>

<style lang="scss" scoped>
//todo Probably could use Vue's transitions to manage it
.lazy-loading {
  filter: blur(5px);
  transition: filter 1.6s;
  // transition: transform 1s; //* Flip option
  will-change: filter;
}
.done-loading {
  filter: blur(0);
  // transform: rotate3d(1, 0, 0, 360deg); //* Flip option
}
</style>