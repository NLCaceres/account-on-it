<template>
  <div class="flexed-center-cross m-md-b">

    <!-- //* Pass up changes in input value with emit for v-model -->
    <!-- //* Button on side of input in mobile. OTHERWISE button next to label for bigger screens -->
    <!-- //* Since sui-input emits click we can choose to react to it or continue emitting if needed in future -->
    <sui-input class="password-input" @input="$emit('input', $event)" :value="value"
      :required="required" :showPass="ProperShowPass" @click="ShowPass"
      :modelName="modelName" :fieldName="fieldName" :labelWithButton="!mobile" :actionable="mobile"
      :placeholder="placeholder" :validation-errors="validationErrors"> 
        <slot></slot> 
        <template #input-attachment>
          <button type="button" v-if="mobile" @click="ShowPass"
            class="ui animated fade compact button inverted app-blue">
              <div class="hidden content">Show</div>
              <div class="visible content">
                <i class="eye outline icon" />
              </div>
          </button>
        </template>
    </sui-input>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { mapGetters } from 'vuex';
import SuiInput from "../../Components/Forms/SuiInput.vue";
import { MOBILE_WIDTH } from '../../Store/GetterTypes';
import { APP_MODULE } from '../../Store/modules/AppState';

export default defineComponent({
  components: {
    SuiInput
  },
  props: {
    parentHandled: Boolean,
    handleShowPass: Boolean,
    modelName: String,
    fieldName: String,
    required: { type: Boolean, default: false },
    placeholder: { type: String, default: "" },
    disabled: Boolean,
    readonly: Boolean,
    autocomplete: {
      type: String, default: "On"
    },
    value: [String, Number],
    validationErrors: { type: Array }
  },
  computed: {
    ...mapGetters(APP_MODULE, { mobile: MOBILE_WIDTH }),
    ProperShowPass(): Boolean {
      return (this.parentHandled) ? this.handleShowPass : this.showPass; //* Use prop if parent handled, otherwise use the data version
    }
  },
  data() {
    return {
      showPass: false, //* If not parent handled, let component handle it
    }
  },
  methods: {
    ShowPass() { 
      if (this.parentHandled) { this.$emit("click"); } //* Idea is to let parent sync all inputs 
      else { this.showPass = !this.showPass; }
    }
  }
})
</script>

<style lang="scss" scoped>
.password-input {
  flex: 1 1 80%; //* Allow grow or shrink based on button size
}
.ui.animated.fade.button > div.visible.content {
  margin-right: 0.75em; //* Otherwise the eye is not centered
}
</style>