<template>
  <div class="ui segment text container p-0-b app-dark-accent-dark">
    <!-- - .center.aligned.segment centers all text and adds padding -->
    <!-- - .text.container pads text and adds extra margins -->
    <sui-login-form />
  </div>
</template>
<script lang='ts'>
import { defineComponent } from "vue"
import SuiLoginForm from './SuiLoginForm.vue';

export default defineComponent({
  components: {
    SuiLoginForm
  },
  data() {
    return {

    }
  },
  mounted() {
    $('.grecaptcha-badge').show(); // - MUST display badge, so user knows they're being verified
  },
  unmounted() {
    $('.grecaptcha-badge').hide();
  }
})
</script>

<style lang="scss" scoped>
.grecaptcha-badge {
  visibility: visible;
}
</style>