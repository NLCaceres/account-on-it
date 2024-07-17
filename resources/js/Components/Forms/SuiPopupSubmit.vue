<template>
  <div class="field m-sm-x flexed-spaced-around">
    <button type="button" class="ui inverted button app-blue button-pair m-md-r" @click="ChangeView">
      Back
    </button>
    <button type="button" :disabled="IsDisabled"
            class="ui inverted button app-green button-pair" :class="{ loading: IsLoading, disabled: IsDisabled }">
      Submit
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { recaptchaVerify } from "@/API/AuthenticationAPI";

export default defineComponent({
  props: {
    inSubview: Boolean, // ?: Booleans default to false, not `undefined`
    setLoading: {
      type: Boolean,
      default: undefined // ?: To allow `undefined`, it MUST be specified
    },
    setDisabled: {
      type: Boolean,
      default: undefined
    },
    recaptchaActionName: {
      type: String,
      required: true,
    },
  },
  emits: ["update:view"],
  data() {
    return {
      loading: false,
      disabled: true
    };
  },
  computed: {
    IsLoading(): boolean { // - Lets the parent set if the form is loading Recaptcha result
      return this.setLoading ?? this.loading;
    },
    IsDisabled(): boolean { // - Lets the parent set if the form submit should be disabled
      return this.setDisabled ?? this.disabled;
    }
  },
  mounted() {
    this.HandleRecaptcha();
  },
  methods: {
    async HandleRecaptcha() {
      this.loading = true;
      const recaptchaScore = await recaptchaVerify(this.recaptchaActionName);

      if (recaptchaScore > 0.7) {
        this.disabled = false;
      };
      this.loading = false;
    },
    ChangeView(): void {
      if (this.inSubview) {
        this.$emit("update:view");
      } else {
        this.$router.back();
      }
    }
  }
});
</script>