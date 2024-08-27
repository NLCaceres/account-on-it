<template>
  <div :class="{ 'flexed-column': inSubview, 'flexed-spaced-around': !inSubview }">
    <span class="m-xs-b">
      <!-- -  Forgot Password -->
      <a v-if="inSubview" @click="$emit(CustomEvents.UPDATE_VIEW, 0)">
        Forgot your Password?
        <i class="angle right icon" />
      </a>
      <router-link v-else :to="{ name: 'ForgotPass' }">
        Forgot your Password?
        <i class="angle right icon" />
      </router-link>
    </span>
    <span>
      <!-- - New User Signup -->
      <a v-if="inSubview" @click="$emit(CustomEvents.UPDATE_VIEW, 1)">
        No Account? Sign Up!
        <i class="angle right icon" />
      </a>
      <router-link v-else :to="{ name: 'SignUp' }">
        No Account? Sign Up!
        <i class="angle right icon" />
      </router-link>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    inSubview: {
      type: Boolean,
      default: false
    }
  }
});
</script>