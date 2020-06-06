<template>
  <button class="ui inverted button app-blue" @click="$router.go(stepsBack)">Back</button>
</template>
<script>
export default {
  props: {
    stepsBack: Number
  },
  methods: {
    GoBack(stepsBack) {
      this.$router.go(stepsBack);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../sass/inverted_buttons.scss";
</style>