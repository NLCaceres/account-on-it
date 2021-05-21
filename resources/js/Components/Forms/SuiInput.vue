<template>
  <div class="field" :class="{'required': required, [FieldWidth + ' wide'] : width > 0 }">

    <!-- //* Emit click allows parent to control what happens on it -->
    <sui-buttoned-label v-if="labelWithButton" @click="$emit('click')" @label-click="FocusField" :modelName="modelName" :fieldName="fieldName">
      <template>{{ProperFieldName}}</template>
    </sui-buttoned-label>

    <label v-else class="form-label" :for="FieldID" @click="FocusField">
      <slot> {{ ProperFieldName }} </slot>
    </label>    

    <div class='ui input' :class="{'action': actionable}">
      <!-- //todo Maybe add other class props for the input like labeled, etc to match slot below -->
      <input
        :type="FieldType"
        :id="FieldID"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :value="InputVal"
        @input="$emit('input', $event.target.value)"
      />
      <slot name="input-attachment">
        <!-- //? Labels, buttons, icons can go here with proper sui-classes -->
      </slot>
    </div>

    <transition-group
      name="slide"
      tag="div"
      class="ui divided list"
      :leave-active-class="ProperValidationTransition"
    >
      <li
        v-for="validationErr in validationErrors"
        :key="validationErr"
        class="item form-validation-err"
      >- {{validationErr}}</li>
    </transition-group>
  </div>
</template>
<script lang='ts'>
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { MOBILE_WIDTH } from '../../Store/GetterTypes';
import { APP_MODULE } from '../../Store/modules/AppState';
import column_converter from "../../Utility/Functions/column_converter";

//todo Replace label on click effect. Which focuses the input
export default Vue.extend({
  props: {
    actionable: Boolean, //* Tacks on a button to the end
    labelWithButton: Boolean,
    modelName: String,
    fieldName: String,
    capitalFirst: Boolean,
    showPass: {
      type: Boolean,
      default: false
    },
    required: Boolean,
    placeholder: String,
    disabled: Boolean,
    readonly: Boolean,
    autocomplete: {
      type: String,
      default: "On"
    },
    value: [String, Number],
    validationErrors: Array,
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
    ...mapGetters(APP_MODULE, {mobile: MOBILE_WIDTH}),
    FieldID(): string {
      return `${this.modelName}_${this.fieldName}`;
    },
    FieldType(): string {
      //* Only case where password must be returned is if starts with pass && user doesnt want to show it
      return (this.fieldName.startsWith("password") && !this.showPass) ? 'password' : 'text';
    },
    InputVal() {
      return (this.capitalFirst) ? (this.value as string).charAt(0).toUpperCase() + (this.value as string).slice(1)
        : this.value;
    },
    ProperFieldName(): string {
      return this.fieldName.toLowerCase() === "id" ||
        this.fieldName.toLowerCase() === "_id"
        ? "ID"
        : this.fieldName
            .replace("_", " ")
            .trim()
            .replace(/\b\w/g, a => a.toUpperCase());            
    },
    FieldWidth(): string {
      return column_converter(this.width); //? Takes width integer up to 12 and displays text. 1 -> 'one', 10 -> 'ten'
    },
    ProperValidationTransition(): string {
      return this.validationErrors?.length > 0 ? this.Transitions.INVALID_ERR_TRANSITION : this.Transitions.VALIDATION_INPUT_TRANSITION;
    }
  },
  methods: {
    FocusField() { //* Ordinarily label clicks focus their inputs, but some CSS frameworks block it
      $(`input#${this.FieldID}`).trigger("focus");
    },
  }
});
</script>