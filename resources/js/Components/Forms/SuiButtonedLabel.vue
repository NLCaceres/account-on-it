<template>
  <div class="flexed-align-baselines">
    <label class="form-label" :for="ForLabel">
      <slot />
    </label>
    <!-- ?: Without a type, buttons default to "submit" which can accidentally submit the form -->
    <button type="button" class="ui animated fade button inverted app-blue p-0-x" @click="ButtonClick">
      <div class="hidden content">Show</div>
      <div class="visible content">
        <i class="eye outline icon" />
      </div>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    modelName: {
      type: String,
      required: true
    },
    fieldName: {
      type: String,
      required: true
    },
  },
  // ?: Using "click" or other native events in "emits" will DROP native events
  emits: ["click"], // ?: AND ONLY listen for component-originated ones
  computed: {
    ForLabel() {
      return (this.modelName.length === 0 && this.fieldName.length === 0) ? "" : `${this.modelName}_${this.fieldName}`;
    }
  },
  methods: {
    ButtonClick() {
      this.$emit("click");
    }
  }
});
</script>

<style lang="scss" scoped>
  .ui.form .required.field > div.flexed-align-baselines > label:after {
    margin: -.2em 0.5em 0 .2em;
    content: '*';
    color: #db2828;
  }
  .ui.animated.fade.button.inverted.app-blue {
    padding: 5px 12px; // ?: 2 values means 1st sets y values and 2nd sets x values

    > div.visible.content {
      margin-left: 0.85em;
      margin-right: 0.85em;

      > i.eye.outline.icon {
        margin-right: 0.1em;
      }
    }
  }
</style>