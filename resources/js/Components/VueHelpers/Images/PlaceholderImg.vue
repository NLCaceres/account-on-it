<template>
  <div ref="container" style="position: relative;" :class="[Fluid]" @intersect="$emit('intersect', $event)">
    <!-- - Goal: Blur but load up img so blurred placeholder div just pops out when img ready -->
    <transition name="blur" mode="in-out">
      <img v-if="src && src.length > 0" :class="['absolute-pos', Fluid]"
           :src="Src" :alt="AltText" :height="Height" :width="Width" @load="$emit('load')">

      <div v-else :class="['app-gray-light app-gray-dark-text flexed-center-all absolute-pos', Fluid]"
           :style="{ height: `${Height}`, width: `${Width}` }">
        <h4 class="">Placeholder</h4>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    src: {
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
      default: false,
    },
  },
  emits: ["intersect", "load"],
  computed: {
    Src(): string {
      return (this.src === undefined || this.src.length === 0)
        ? "https://via.placeholder.com/200x200?text=Placeholder" : this.src;
    },
    AltText(): string {
      return (this.alt === undefined || this.alt.length === 0) ? "Placeholder Image" : this.alt;
    },
    Fluid(): string {
      return this.fluid ? "w-100 h-100" : "";
    },
    Height(): string {
      return this.fluid ? "" : `${this.height}px`;
    },
    Width(): string {
      return this.fluid ? "" : `${this.width}px`;
    }
  }
});
</script>

<style lang="scss" scoped>
div.app-gray > h4 {
  // - May be a useful class for headers
  margin: auto;
  line-height: 51px;
  vertical-align: middle;
}
</style>
