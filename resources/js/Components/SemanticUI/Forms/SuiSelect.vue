<template>
  <div class="field" :class="{'required': required, [FieldWidth + ' wide'] : width > 0 }">
    <label class="form-label" :for="`${modelName}_${fieldName}`">
      <slot></slot>
    </label>
    <select
      :name="`${modelName}_${fieldName}`"
      :id="`${modelName}_${fieldName}`"
      class="ui fluid search dropdown"
      :value="value"
      @change="$emit('input', $event.target.value)"
    >
      <!--//! Custom components MUST emit 'input' or v-model will not recognize the changes. Vue only expects 'change' event for checkbox/radio/select el's.-->
      <option disabled value>
        <slot name="default-option"></slot>
      </option>
      <option :value="option" v-for="option in options" :key="option">{{option}}</option>
    </select>
    <transition-group
      name="slide"
      tag="div"
      class="ui divided inverted list"
      :leave-active-class="validationTransition"
    >
      <li
        v-for="validationErr in validationErrors"
        :key="validationErr"
        class="item form-validation-err"
      >- {{validationErr}}</li>
    </transition-group>
  </div>
</template>
<script>
import column_converter from "../../../Utility/Functions/column_converter";
export default {
  props: {
    modelName: String,
    fieldName: String,
    value: [String, Number],
    options: Array,
    validationTransition: String,
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
    FieldWidth() {
      return column_converter(this.width); //? Takes width integer up to 12 and displays text. 1 -> 'one', 10 -> 'ten'
    }
  }
};
</script>