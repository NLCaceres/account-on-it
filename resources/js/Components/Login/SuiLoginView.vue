<template>
  <!--//* .center.aligned.segment centers all text and adds padding -->
  <!--//* .text.container pads text and adds extra margins -->
  <div class="ui segment text container p-0-b app-dark-accent-dark">
    <sui-login-form />
  </div>
</template>
<script lang='ts'>
import Vue from "vue"
import SuiLoginForm from './SuiLoginForm.vue';

export default Vue.extend({
  components: {
    SuiLoginForm
  },
  data() { 
    return {

    } 
  },
  mounted() {
    $('.grecaptcha-badge').show(); //* Show because must make sure user is aware, they're being verified
  },
  destroyed() {
    $('.grecaptcha-badge').hide();
  }
})
</script>

<style lang="scss" scoped>
.grecaptcha-badge {
  visibility: visible;
}
</style>