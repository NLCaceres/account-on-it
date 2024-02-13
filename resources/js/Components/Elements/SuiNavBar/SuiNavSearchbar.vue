<template>
  <div
    class="ui search item"
    id="searchbar"
    :class="{'border-b-white': expanded}"
    :style="ExpandedStyle"
    @click="Expand"
  >
    <div class="ui icon input">
      <input class="prompt" type="text" placeholder="Search"/>
      <i class="search icon"></i>
    </div>
    <div class="results"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  //? Oddly, props will NOT work or register if methods and compProps aren't properly typed
  props: {
    expanded: Boolean
  },

  computed: {
    ExpandedStyle(): Object | undefined {
      if (this.expanded) {
        const searchBarWidth = this.$store.state.app.window.width;
        const brandWidth = $('#desktop-brand').outerWidth() ?? 0;
        //* OuterWidth with true param returns width with margin included.
        const rightMargin = ($('#full-nav').outerWidth(true) ?? 0) - ($('#full-nav').innerWidth() ?? 0);
        
        return {
          position: "absolute",
          right: `-${rightMargin}px`,
          width: `${searchBarWidth}px`,
          'padding-right': `${brandWidth}px`,
          'padding-left': `${brandWidth + 50}px`,
          'background-color': 'transparent',
        };          
      }
      return;
    },
  },

  methods: {
    Expand(): any {
      if (this.expanded) {
        return;
      } else {
        this.$emit("expand"); 
      }
    },
  },
});
</script>
<style lang="scss" scoped>
#searchbar {
  &:hover {
    border-bottom: none;
  }
}
</style>