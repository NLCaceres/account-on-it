<template>
  <div class="field" :class="{ required: required, [FieldWidth + ' wide']: width > 0 }">
    <label class="form-label" :for="FieldID">
      <slot />
    </label>

    <select :id="FieldID" :name="FieldID" class="fluid dropdown" :class="{'search': searchBar}"
            :value="modelValue" @change="$emit('update:modelValue', (<HTMLSelectElement>$event.target).value)">
      <option disabled value>
        <slot name="default-option" />
      </option>
      <option v-for="(option, index) in options" :key="option" :value="(enumerated) ? index : option">
        {{ option }}
      </option>
    </select>

    <transition-group name="slide" tag="div"
                      class="ui divided inverted list" :leave-active-class="ProperValidationTransition">
      <li v-for="validationErr in validationErrors" :key="validationErr" class="item form-validation-err">
        - {{ validationErr }}
      </li>
    </transition-group>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue";
import column_converter from "../../Utility/Functions/column_converter";

export default defineComponent({
  props: {
    modelName: String,
    fieldName: String,
    searchBar: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: [Number, String],
      required: true
    },
    enumerated: Boolean,
    options: {
      type: Array as PropType<number[] | string[]>,
      required: true
    },
    validationErrors: {
      type: Array as PropType<string[]>,
      required: true
    },
    required: {
      type: Boolean,
      default: false,
    },
    fluid: {
      type: Boolean,
      default: true,
    },
    width: {
      type: Number,
      default: 0,
    },
  },
  emits: ["update:modelValue"],
  data() {
    return {
      // opened: false
    }
  },
  computed: {
    FieldID(): string {
      return `${this.modelName}_${this.fieldName}`;
    },
    FieldWidth(): string {
      return column_converter(this.width); // - Takes width integer up to 12 and displays text. 1 -> 'one', 10 -> 'ten'
    },
    ProperValidationTransition() : string {
      return this.validationErrors.length > 0
        ? this.Transitions.INVALID_TRANSITION : this.Transitions.VALIDATION_INPUT_TRANSITION;
    }
  },
  methods: {
    // - A11y-friendly usage of the SUI `<select>` is expected to be the following:
    // - Click the `<label>` and the `<select>` will open and be controllable by keyboard
    // - Clicking the `<label>` again causes `<select>` tag to close
    // PreventSuiDefault(event: Event) { // - Ordinarily form label clicks focus their inputs, but some CSS frameworks block it (like SUI)
    //   event.stopPropagation(); // - Prevents Fomantic from firing off events that Chrome won't be able to properly handle (due to passive event issue)
    // },
    // PreventDoubleHide() { // ?: OnHide expects a func that returns either `false` or void. NOTHING ELSE
    //   // - Originally kept a ref to the last element that received focus and checked if it was the dropdown
    //   // - BUT it's simpler to check if the dropdown was opened AND if anything is CURRENTLY focused
    //   // - Opened but no focus? Hide the dropdown. Opened but a focused element? PREVENT THE HIDE
    //   if (this.opened && $(":focus").length === 0) { this.opened = false; return; }
    //   else if (this.opened) { this.opened = false; return false; } // - Prevent hiding the dropdown
    //   else return; // - Already closed? Leave it closed
    // },
    // PreventDoubleShow() {
    //   // - As soon as FocusField() runs due to `<label>` click, this should prevent another run of FocusField()
    //   // - Sometimes this func runs twice though, so the `opened` ref helps prevent showing the dropdown again
    //   if (this.opened) { return false; } // - Returning false prevents showing the dropdown
    //   else { return; }
    // },
    // FocusField() { // - BEFORE this `<label>` click event func, tried using a `doubleTap` boolean to prevent the double hide/show
    //   if (!this.opened) {
    //     // - For the following, `dropdown("show")` SHOULD be fine due to default args BUT FomanticUI has a type issue
    //     $(`#${this.FieldID}`).dropdown("show", () => {}, true); // - forcing all args to have SOME value
    //     // - The issue seems to have been fixed in October 2023 BUT no release as of June 2024

    //     this.opened = true;
    //     $(`#${this.FieldID}`).parent().trigger("focus"); // - Focus on the `<select>` so keyboard control can work
    //   } 
    //   else { return; }
    // }
  },
  mounted() {
    $(`#${this.FieldID}`).dropdown();
    // $(`#${this.FieldID}`).dropdown({ onHide: this.PreventDoubleHide, onShow: this.PreventDoubleShow });
  }
});
</script>

<style lang='scss' scoped>
//label {
  //? Only fix for issue with jquery/semantic passive event error
  //? But if preventDefault was being called, then default behavior won't happen!
  //? This can cause an accessibility issue specifically that label clicks don't focus their form fields
  //* Touch events in chrome default to passive events! 
  // pointer-events: none; //? So try and restore this feature using @click
//}
</style>