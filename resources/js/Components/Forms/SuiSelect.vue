<template>
  <div class="field" :class="{ required: required, [FieldWidth + ' wide']: width > 0 }">
    <label class="form-label" :for="FieldID" @touchstart="PreventSuiDefault" @click="FocusField">
      <slot></slot>
    </label>
    <!-- //* Weird semanticUI/jquery bug/error due to Chrome's handling of passive events causes preventDefault to fail -->
    <!-- //? Reasoning seems to be, labels marked with 'for' attr that matches a form element 'id' such as select or input -->
    <!-- //? actually spawn events that can trigger select elements or mark checkboxes (probably for accessibility -->
    <select :name="FieldID" :id="FieldID" class="fluid dropdown"
      :class="{'search': searchBar}" :value="value" @change="$emit('input', $event.target.value)">
        <option disabled value>
          <slot name="default-option"></slot>
        </option>
        <option :value="(enumerated) ? index : option" v-for="(option, index) in options" :key="option">{{option}}</option>
    </select>
    <transition-group name="slide" tag="div"
      class="ui divided inverted list" :leave-active-class="ProperValidationTransition">
        <li v-for="validationErr in validationErrors" :key="validationErr" 
          class="item form-validation-err">
            - {{validationErr}}
        </li>
    </transition-group>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import column_converter from "../../Utility/Functions/column_converter";

export default defineComponent({
  props: {
    modelName: String,
    fieldName: String,
    searchBar: {
      type: Boolean,
      default: false
    },
    value: [String, Number],
    enumerated: Boolean,
    options: Array,
    validationErrors: Array,
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
  data() {
    return {
      opened: false,
      preventDoubleHide: false,
    }
  },
  computed: {
    FieldID(): string {
      return `${this.modelName}_${this.fieldName}`;
    },
    FieldWidth(): string {
      return column_converter(this.width); //* Takes width integer up to 12 and displays text. 1 -> 'one', 10 -> 'ten'
    },
    ProperValidationTransition() : string { 
      return this.validationErrors.length > 0 ? this.Transitions.INVALID_TRANSITION : this.Transitions.VALIDATION_INPUT_TRANSITION;
    }
  },
  methods: {
    //* Following creates a predictable pattern of usage for SUI/FUI select tag
    //* Pattern: Click label, open & keyboard ctrl select tag, click label again, close, open and still able to use keyboard to select
    //* Click select tag, open and ctrl tag, click again, and it closes.
    PreventSuiDefault(event: Event) { //* Ordinarily form label clicks focus their inputs, but some CSS frameworks block it (like SUI)
      event.stopPropagation(); //* Prevents Fomantic from firing off events that Chrome won't be able to properly handle (due to passive event issue)
    },
    PreventDoubleHide() { //? OnHide only accepts this if it returns false or absolutely nothing! Returning true won't let it
      //* If false, will not be hidden
      const currentFocusedElem = $(":focus"); 
      //* Original: compared prevFocusObj and dropdown to prevent double Show/Hide 
      if (this.opened && currentFocusedElem.length === 0) { this.opened = false; return; }
      else if (this.opened) { this.opened = false; return false; }
      else return; //* Now: check if label opened it, if no prevFocusObj 
    },
    PreventDoubleShow() { //* If false, will not be shown
      if (this.opened) return false;
      else return; 
      //* Use this callback since it immediately fires, interrupting Label click's FocusField
      //* It fires twice occasionally though! so checking if label opened the select tag helps kill double shows
    },
    FocusField() { //* Instead fire this off on click
      if (!this.opened) {
        $(`#${this.FieldID}`).dropdown("show");
        this.opened = true; 
        $(`#${this.FieldID}`).parent().trigger("focus"); //* Enable keyboard ctrl like normal select tag
      } 
      else return;
      //* Original: Set doubleTap bool to prevent double tap when onHide/onShow occurs AND/OR compare dropdown with prevFocusedObj
    }
  },
  mounted() {
    $(`#${this.FieldID}`).dropdown({  onHide: this.PreventDoubleHide, onShow: this.PreventDoubleShow});
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