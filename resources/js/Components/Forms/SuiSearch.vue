<template>
  <div class="field" :class="{ 'required': required, [FieldWidth + ' wide']: (width > 0 && width < 13) }">
    <label class="form-label" :for="FieldID">
      <slot>{{ ProperFieldName }}</slot>
    </label>

    <div :id="FieldContainerID" class="ui search" :class="{ 'fluid': fluid }">
      <div class="ui icon input">
        <input :id="FieldID" type="text" :placeholder class="prompt" :value="modelValue"
               @input="$emit('update:modelValue', (<HTMLInputElement>$event.target).value)">
        <i class="search icon" />
      </div>
      <div class="results" />
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
import column_converter from "@/Utility/Functions/column_converter";

export default defineComponent({
  props: {
    modelName: {
      type: String,
      required: true
    },
    fieldName: {
      type: String,
      required: true
    },
    modelValue: {
      type: [Number, String],
      required: true
    },
    placeholder: {
      type: String,
      default: ""
    },
    validationErrors: {
      type: Array as PropType<string[]>,
      required: true
    },
    fluid: {
      type: Boolean,
      default: true
    },
    required: Boolean,
    width: {
      type: Number,
      default: 0
    }
  },
  emits: ["update:modelValue"],
  computed: {
    ValidModelFieldNames(): boolean {
      return this.modelName.length > 0 && this.fieldName.length > 0;
    },
    FieldContainerID(): string {
      return (this.ValidModelFieldNames) ? `${this.modelName}_${this.fieldName}_search` : "";
    },
    FieldID(): string {
      return (this.ValidModelFieldNames) ? `${this.modelName}_${this.fieldName}` : "";
    },
    ProperFieldName(): string {
      return this.fieldName.toLowerCase() === "id" || this.fieldName.toLowerCase() === "_id"
        ? "ID"
        : this.fieldName.replace("_", " ").trim().replace(/\b\w/g, a => a.toUpperCase());
    },
    FieldWidth(): string { // ?: Take "width" int from 1 to 12, and display its text form, i.e. 1 -> "one"
      return column_converter(this.width);
    },
    ProperValidationTransition(): string {
      return this.validationErrors.length > 0
        ? this.Transitions.INVALID_TRANSITION : this.Transitions.VALIDATION_INPUT_TRANSITION;
    }
  }
});
</script>