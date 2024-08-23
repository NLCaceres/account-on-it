<template>
  <placeholder-img ref="placeholder" :src="SrcImage" :alt data-intersected="0"
                   :height :width :fluid @load="load" @intersect="UpdateIntersect" />
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import PlaceholderImg from "./PlaceholderImg.vue";
import { mapGetters } from "vuex";
import { INIT_INTERSECTION_OBSERVER } from "@/Store/ActionTypes";
import { GET_INTERSECTION_OBSERVER } from "@/Store/GetterTypes";
import { INTERSECTION_MODULE, LAZY_LOAD_OBSERVER } from "@/Store/modules/IntersectionState";
import { DidIntersect } from "@/Utility/Functions/intersection_observer";

export default defineComponent({
  components: {
    PlaceholderImg
  },
  props: {
    src: {
      type: String,
      default: ""
    },
    placeholderSrc: { // - Probably can just use the placeholder component I made
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
      type: Object as PropType<IntersectionObserverInit>,
      default() { return {}; } // - Object/Array types can use a Factory func to set a default or simple computed value
      // ?: The factory func can also take a `rawProps` param of your preferred type (commonly Record<string, any>)
    }
  },
  emits: ["load"],
  data: () => ({
    intersected: false,
    imgLoaded: false
  }),
  computed: {
    ...mapGetters(INTERSECTION_MODULE, { observer: GET_INTERSECTION_OBSERVER }),
    SrcImage(): string {
      return this.intersected && this.src ? this.src : this.placeholderSrc;
    }
  },
  mounted() {
    this.setupObserver();
  },
  beforeUnmount() {
    (this.observer(LAZY_LOAD_OBSERVER) as IntersectionObserver)?.unobserve(this.getIntersectImg());
  },
  methods: {
    getIntersectImg() { // ?: Vue3 prefers $refs over $el BUT also IntersectionObserver wants an Element ($el is a Node)
      // ?: Since $refs returns a Component instance when placed on a Vue component, I can access PlaceholderImg's $refs
      // ?: AND grab the native element it contains in $refs for IntersectionObserver to use in observe()/unobserve()
      return (this.$refs.placeholder as InstanceType<typeof PlaceholderImg>)?.$refs.container as Element;
      // ?: $refs ISN'T reactive so better to use a getter method vs a computed prop to ensure the $ref is up-to-date
    },
    load(): void {
      if (this.getIntersectImg().getAttribute("src") !== this.placeholderSrc) {
        this.imgLoaded = true;
        this.$emit("load");
      }
    },
    async setupObserver(): Promise<void> {
      const observer = await this.$store.dispatch(`${INTERSECTION_MODULE}/${INIT_INTERSECTION_OBSERVER}`, {
        intersectionCallback: this.observationCallback, intersectOptions: this.intersectOptions, id: LAZY_LOAD_OBSERVER
      });
      (observer as IntersectionObserver).observe(this.getIntersectImg());
    },
    observationCallback(entries: IntersectionObserverEntry[]): void {
      // - All lazy load components use this observer callback to ultimately update on intersection events
      // - This callback is init'd only once since vuex handler adds observer to observers.LazyLoad obj
      for (const entry of entries) {
        const target = entry.target as HTMLElement;
        // - Following checks `data-` attribute on a `<img>` for a 1 or 0 (1 == intersected, 0 == not)
        target.dataset.intersected = (DidIntersect(entry)) ? "1" : "0";
        // - Vanilla JS CustomEvents API to the rescue. Equivalent to Vue $emit and can be handled same way!
        target.dispatchEvent(new CustomEvent("intersect", { detail: target.dataset.intersected }));
      }
    },
    // - Thanks to vanilla JS CustomEvents we can call this, enabling reactive changes to intersected data prop
    UpdateIntersect(event: CustomEvent) {
      this.intersected = (parseInt(event.detail) === 1) ? true : false;
      // ?: Currently IntersectionObserver doubles fires the `intersect` event
      // ?: Since BOTH the `PlaceholderImg` AND the above callback dispatch the event
      // ?: To prevent the 2nd from accidentally calling `unobserve(undefined)`, check if ALREADY set to true
      if (this.intersected) {
        (this.observer(LAZY_LOAD_OBSERVER) as IntersectionObserver).unobserve(this.getIntersectImg());
      }
    }
  }
});
</script>

<style lang="scss" scoped>
// TODO: Probably could use Vue's transitions to manage it
.lazy-loading {
  filter: blur(5px);
  transition: filter 1.6s;
  // transition: transform 1s; // - Flip option
  will-change: filter;
}
.done-loading {
  filter: blur(0);
  // transform: rotate3d(1, 0, 0, 360deg); // - Flip option
}
</style>