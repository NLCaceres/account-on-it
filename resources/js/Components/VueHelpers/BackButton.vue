<template>
  <div>
    <!-- - The above div container helps with margins/paddings -->
    <button type="button" class="ui inverted button app-blue"
            :class="[{ 'tertiary border-slim-b-white app-brand-blue rounded-x': breadcrumb }]"
            @click="GoBack">
      <i class="angle left icon" />
      Back
    </button>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    stepsBack: {
      type: Number,
      default: 0
    },
    breadcrumb: Boolean
  },
  emits: ["go-back"],
  methods: {
    GoBack() {
      if (this.stepsBack === 0) { // - Allow the parent to handle back button functionality
        this.$emit("go-back");
        return;
      };
      window.history.length > 1 ? this.$router.go(this.stepsBack) : this.$router.push("/");
    }
  }
});
</script>

<style lang="scss" scoped>
@import "../../../sass/variables/colors.scss";
@import "../../../sass/inverted_buttons.scss";

// - Should only run if breadcrumb prop is used (due to tertiary being added)
button.ui.button.inverted.tertiary {
  // ?: Ordinarily would use helper css classes we made, but SuI is more specific so the following's required
  padding: 0.4em 0.4em 0.3em 0.2em !important;

  &:hover {
    border: none;
    box-shadow: none !important;
    background-color: rgba($color: $brand-blue, $alpha: 0.9) !important;
  }
}
</style>