<template>
  <div class="ui basic segment">
    <form class="ui form" @submit.prevent="SubmitForm">
      <sui-input
        required
        model-name="landlord"
        field-name="first_name"
        v-model="landlord.first_name"
        placeholder="Landlord's First or Preferred Name"
        :validation-errors="validationErrs.first_name"
      >Landlord's First Name</sui-input>

      <sui-input
        required
        model-name="landlord"
        field-name="surname"
        v-model="landlord.surname"
        placeholder="Landlord's Surname / Last Name / Family Name"
        :validation-errors="validationErrs.surname"
      >Landlord's Surname</sui-input>

      <sui-input
        required
        model-name="landlord"
        field-name="email"
        v-model="landlord.email"
        placeholder="Landlord's Email Address"
        :validation-errors="validationErrs.email"
      >Landlord's Email Address</sui-input>

      <sui-submit :new-entity="newLandlord" :saving="saving" />
    </form>
  </div>
</template>
<script lang='ts'>
import Vue from 'vue';
//import LandlordAPI from "../../API/LandlordAPI";

export default Vue.extend({
  props: {
    newLandlord: Boolean,
    saving: Boolean
  },
  data() {
    return {
      visible: true,
      isError: true,
      landlord: {
        first_name: "",
        surname: "",
        email: ""
      },
      validationErrs: {
        first_name: [],
        surname: [],
        email: []
      }
    };
  },
  methods: {
    Edited(propName = null, propVal = null) {
      this.$emit("edit", propName, propVal);
    },
    SubmitForm() {
      //* Validate
      //* Ready data
      //* Send data
    }
  }
});
</script>