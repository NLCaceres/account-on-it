<template>
  <div class='flexed-align-baselines'>
    <label class="form-label" :for="ForLabel" @click="$emit('label-click')">
      <slot></slot>
    </label>
    <!-- //? NOTE: If button doesn't have type it defaults to submit which could accidentally submit a form! -->
    <button type='button' class="ui animated fade button inverted app-blue p-0-x" @click="$emit('click')">
      <div class="hidden content">Show</div>
      <div class="visible content">
        <i class="eye outline icon"></i>
      </div>
    </button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
  props: {
    modelName: String,
    fieldName: String
  },
  computed: {
    ForLabel() {
      return `${this.modelName}_${this.fieldName}`;
    }
  }
})
</script>

<style lang="scss" scoped>
  .ui.form .required.field > div.flexed-align-baselines > label:after {
    margin: -.2em 0.5em 0 .2em;
    content: '*';
    color: #db2828;
  }
  .ui.animated.fade.button.inverted.app-blue {
    padding: 5px 12px; //? 2 values means 1st sets y values and 2nd sets x values

    > div.visible.content {
      margin-left: 0.85em;
      margin-right: 0.85em;

      > i.eye.outline.icon {
        margin-right: 0.1em;
      }
    }
  }
</style>