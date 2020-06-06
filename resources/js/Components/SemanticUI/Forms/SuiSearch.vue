<template>
  <div class="field" :class="{'required': required, [FieldWidth + ' wide'] : width > 0 }">
    <label class="form-label" :for="`${modelName}_${fieldName}`">
      <slot>{{ProperFieldName}}</slot>
    </label>

    <div class="ui fluid search" :id="`${modelName}_${fieldName}_search`">
      <div class="ui icon input">
        <input
          type="text"
          :id="`${modelName}_${fieldName}`"
          :placeholder="placeholder"
          class="prompt"
          :value="value"
          @input="$emit('input', $event.target.value)"
        />
        <i class="search icon" />
      </div>
      <div class="results"></div>
    </div>

    <transition-group
      name="slide"
      tag="div"
      class="ui divided list"
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
    placeholder: String,
    value: [String, Number],
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
    ProperFieldName() {
      return this.fieldName.toLowerCase() === "id" ||
        this.fieldName.toLowerCase() === "_id"
        ? "ID"
        : this.fieldName
            .replace("_", " ")
            .trim()
            .replace(/\b\w/g, a => a.toUpperCase());
    },
    FieldWidth() {
      return column_converter(this.width); //? Takes width integer up to 12 and displays text. 1 -> 'one', 10 -> 'ten'
    }
  }
};
</script>