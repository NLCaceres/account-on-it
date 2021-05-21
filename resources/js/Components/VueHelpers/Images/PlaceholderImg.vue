<template>
  <div style="position: relative;" :class="[Fluid]" @intersect="$emit('intersect', $event)">
    <!--//* Goal: Blur but load up img so blurred placeholder div just pops out when img ready -->
    <transition name='blur' mode="in-out">
      <img v-if="StringCheck(this.src)" :class="['absolute-pos', Fluid]" :src="Src" :alt="AltText" @load="$emit('load')"
        :height="Height" :width="Width" key="realImg"/>

      <div v-else :class="['app-gray-light app-gray-dark-text flexed-center-all absolute-pos', Fluid]" key="placeholderImg"
        :style="{height: `${Height}`, width: `${Width}`}">
          <h4 class="">Placeholder</h4>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import StringCheck from "../../../Utility/Functions/img_helper";

export default Vue.extend({
  props: {
    src: String,
    alt: String,
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
  computed: {
    Src(): string {
        return this.StringCheck(this.src) ? this.src : "https://via.placeholder.com/200x200?text=Placeholder";
    },
    AltText(): string {
      return !this.StringCheck(this.src) && !this.StringCheck(this.alt)
        ? "Placeholder image"
        : this.alt;
    },
    Fluid(): string {
      return this.fluid ? 'w-100 h-100' : '';
    },
    Height(): string {
      return this.fluid ? '' : `${this.height}px`
    },
    Width(): string {
      return this.fluid ? '' : `${this.width}px`
    }
  },
  methods: {
    StringCheck
  },
});
</script>

<style lang="scss" scoped>
div.app-gray > h4 {
  //* May be a useful class for headers
  margin: auto;
  line-height: 51px;
  vertical-align: middle;
}
</style>
