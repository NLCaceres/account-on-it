<template>
  <div :class="{'p-md-b': !small}">
    <div class="field flexed spaced-around align-baselines">
      <div class="ui checkbox button-pair" :class="{'m-md-r': !small,'popup-checkbox': small}">
        <input
          type="checkbox"
          name="remember"
          :checked="value"
          @change="$emit('input', $event.target.checked)"
        />
        <label class="app-white-text">Remember Me</label>
      </div>
      <button
        class="ui inverted button app-green button-pair"
        :class="{'popup-button': small}"
        type="submit"
        @click="$emit('submit')"
        :disabled="loggingIn"
      >Login?</button>
    </div>
    <a @click="$emit('update:view')">Forgot your Password?</a>
  </div>
</template>
<script>
export default {
  props: {
    small: {
      type: Boolean,
      default: false
    },
    value: Boolean,
    loggingIn: Boolean
  }
};
</script>
<style lang="scss" scoped>
.popup-checkbox {
  width: 50%;
  font-size: 1.2em;
}
.popup-button {
  width: 49%; //? Works here but flexbox may be the better choice
}
</style>