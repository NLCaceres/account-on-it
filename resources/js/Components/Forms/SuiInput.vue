<template>
  <div class="field" :class="{'required': required, [FieldWidth + ' wide'] : (width > 0 && width < 13) }">
    <!-- - Emit click allows parent to control what happens on it -->
    <sui-buttoned-label v-if="labelWithButton" :model-name="modelName" :field-name="fieldName"
                        @click="$emit('click')" @label-click="FocusField">
      {{ ProperFieldName }}
    </sui-buttoned-label>

    <label v-else class="form-label" :for="FieldID" @click="FocusField">
      <slot> {{ ProperFieldName }} </slot>
    </label>

    <div class="ui input" :class="{ 'action': actionable, 'fluid': fluid }">
      <input :id="FieldID" :type="FieldType" :data-testid="FieldID" :placeholder="placeholder" :disabled="disabled"
             :readonly="readonly" :autocomplete="autocomplete" :value="modelValue"
             @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)">

      <slot name="input-attachment">
        <!-- ?: Labels, buttons, icons can go here with proper sui-classes -->
      </slot>
    </div>

    <transition-group name="slide" tag="div" class="ui divided list" :leave-active-class="ProperValidationTransition">
      <li v-for="validationErr in validationErrors" :key="validationErr" class="item form-validation-err">
        - {{ validationErr }}
      </li>
    </transition-group>
  </div>
</template>

<script lang='ts'>
import { defineComponent, type PropType } from "vue";
import { mapGetters } from "vuex";
import { MOBILE_WIDTH } from "../../Store/GetterTypes";
import { APP_MODULE } from "../../Store/modules/AppState";
import column_converter from "../../Utility/Functions/column_converter";

export default defineComponent({
  props: {
    actionable: Boolean, // - Tacks on a button to the end
    labelWithButton: Boolean,
    modelName: {
      type: String,
      required: true
    },
    fieldName: {
      type: String,
      required: true
    },
    capitalFirst: Boolean,
    showPass: {
      type: Boolean,
      default: false
    },
    required: Boolean,
    // ?: Placeholders don't always help, so it's ok not to be required, JUST provide a default
    placeholder: { // ?: Placeholders don't always help, so it's ok to not be required, JUST provide a default
      type: String, // ?: SINCE screen readers don't always read them, so they're actually more decorative
      default: "" // ?: Modern A11y UX might suggest a <span> hovered above the <input> to help screen readers
    },
    disabled: Boolean,
    readonly: Boolean,
    autocomplete: {
      type: String,
      default: "On"
    },
    modelValue: {
      type: [Number, String],
      required: true
    },
    validationErrors: {
      type: Array as PropType<string[]>,
      default() { return []; }
    },
    fluid: {
      type: Boolean,
      default: true
    },
    width: {
      type: Number,
      default: 0
    }
  },
  emits: ["click", "update:modelValue"],
  computed: {
    ...mapGetters(APP_MODULE, {mobile: MOBILE_WIDTH}),
    FieldID() {
      return `${this.modelName}_${this.fieldName}`;
    },
    FieldType() {
      // - Only case where password must be returned is if starts with pass && user doesnt want to show it
      return (this.fieldName.toLowerCase().includes("password") && !this.showPass) ? "password" : "text";
    },
    InputVal() { // ?: Used to convert a string "foo" to "Foo" BUT currently not actually used
      return (this.capitalFirst && typeof this.modelValue === "string")
        ? this.modelValue.charAt(0).toUpperCase() + this.modelValue.slice(1)
        : this.modelValue;
    },
    ProperFieldName() {
      return this.fieldName.toLowerCase() === "id" || this.fieldName.toLowerCase() === "_id"
        ? "ID"
        : (this.fieldName.replace("_", " ").trim().replace(/\b\w/g, a => a.toUpperCase()) ?? "");
    },
    FieldWidth() {
      return column_converter(this.width); // ?: Takes width integer up to 12 and displays text. 1 -> 'one', 10 -> 'ten'
    },
    ProperValidationTransition() {
      return this.validationErrors.length > 0
        ? this.Transitions.INVALID_TRANSITION : this.Transitions.VALIDATION_INPUT_TRANSITION;
    }
  },
  methods: {
    FocusField() { // - Ordinarily label clicks focus their inputs, but some CSS frameworks block it
      $(`input#${this.FieldID}`).trigger("focus");
    },
  }
});
</script>