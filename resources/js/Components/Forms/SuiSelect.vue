<template>
  <div class="field" :class="{ required, [FieldWidth + ' wide']: (width < 13 && width > 0) }">
    <label class="form-label" :for="FieldID">
      <slot />
    </label>

    <select :id="FieldID" :name="FieldID" class="dropdown" :class="{ fluid, 'search': searchBar }"
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
    searchBar: {
      type: Boolean,
      default: false
    },
  },
  emits: ["update:modelValue"],
  computed: {
    FieldID(): string {
      return (this.modelName.length === 0 && this.fieldName.length === 0) ? "" : `${this.modelName}_${this.fieldName}`;
    },
    FieldWidth(): string {
      return column_converter(this.width); // - Takes width integer up to 12 and displays text. 1 -> 'one', 10 -> 'ten'
    },
    ProperValidationTransition() : string {
      return this.validationErrors.length > 0
        ? this.Transitions.INVALID_TRANSITION : this.Transitions.VALIDATION_INPUT_TRANSITION;
    }
  },
  mounted() {
    if (this.FieldID !== "") { // - Prevents running `$("#")` which is an invalid jQuery query
      $(`#${this.FieldID}`).dropdown();
    }
  }
});
</script>
