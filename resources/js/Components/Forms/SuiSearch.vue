<template>
  <div class="field" :class="{ 'required': required, [FieldWidth + ' wide'] : width > 0 }">
    <label class="form-label" :for="`${modelName}_${fieldName}`">
      <slot>{{ ProperFieldName }}</slot>
    </label>

    <div :id="`${modelName}_${fieldName}_search`" class="ui fluid search">
      <div class="ui icon input">
        <input :id="`${modelName}_${fieldName}`" type="text" :placeholder
               class="prompt" :value @input="$emit('input', (<HTMLInputElement>$event.target).value)">
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
import { defineComponent } from "vue";
import column_converter from "../../Utility/Functions/column_converter";

export default defineComponent({
  props: {
    modelName: String,
    fieldName: String,
    placeholder: String,
    value: [String, Number],
    validationErrors: Array,
    required: Boolean,
    fluid: {
      type: Boolean,
      default: true
    },
    width: {
      type: Number,
      default: 0
    }
  },
  computed: {
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