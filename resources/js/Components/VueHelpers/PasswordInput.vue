<template>
  <div class="flexed-center-cross m-md-b">
    <!-- - Works w/ v-model & Button placed next to label UNLESS on mobile + its "click" CAN be propagated -->
    <sui-input class="password-input" :model-value :required :disabled :show-pass="ProperShowPass"
               :field-name :model-name :readonly :label-with-button="!mobile"
               :actionable="mobile" :placeholder :autocomplete :validation-errors
               @click="ShowPass" @update:model-value="(value) => $emit('update:modelValue', value)">
      <slot />

      <template #input-attachment>
        <button v-if="mobile" type="button"
                class="ui animated fade compact button inverted app-blue" @click="ShowPass">
          <div class="hidden content">
            Show
          </div>
          <div class="visible content">
            <i class="eye outline icon" />
          </div>
        </button>
      </template>
    </sui-input>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue";
import { mapGetters } from "vuex";
import SuiInput from "../../Components/Forms/SuiInput.vue";
import { MOBILE_WIDTH } from "../../Store/GetterTypes";
import { APP_MODULE } from "../../Store/modules/AppState";

export default defineComponent({
  components: {
    SuiInput
  },
  props: {
    parentShowsPass: {
      type: Boolean,
      default: undefined
    },
    modelName: {
      type: String,
      required: true
    },
    fieldName: {
      type: String,
      required: true
    },
    modelValue: {
      type: String,
      required: true
    },
    validationErrors: {
      type: Array as PropType<string[]>,
      required: true
    },
    autocomplete: {
      type: String,
      default: "On"
    },
    disabled: Boolean,
    placeholder: {
      type: String,
      default: ""
    },
    readonly: Boolean,
    required: {
      type: Boolean,
      default: false
    },
  },
  emits: ["click", "update:modelValue"],
  data() {
    return {
      showPass: false, // - If not parent handled, let component handle it
    };
  },
  computed: {
    ...mapGetters(APP_MODULE, { mobile: MOBILE_WIDTH }),
    ProperShowPass(): boolean { // - Default to parent's control, OR just let the component manage itself
      return this.parentShowsPass ?? this.showPass;
    }
  },
  methods: {
    ShowPass() { // - Let the parent sync all "password" inputs, else control it locally
      if (this.parentShowsPass !== undefined) { this.$emit("click"); }
      else { this.showPass = !this.showPass; }
    }
  }
});
</script>

<style lang="scss" scoped>
.password-input {
  flex: 1 1 80%; // - Let grow or shrink based on button size
}
.ui.animated.fade.button > div.visible.content {
  margin-right: 0.75em; // - Helps to center the "eye" icon
}
</style>