<template>
  <div class="ui basic segment">
    <form class="ui form" @submit.prevent="SubmitForm">
      <sui-input
        required
        model-name="user"
        field-name="first_name"
        v-model="user.first_name"
        :placeholder="`${Personal} First or Preferred Name`"
        :validation-errors="validationErrs.first_name"
        :validation-transition="validationTransitions.first_name"
      >{{Personal}} First Name</sui-input>

      <sui-input
        required
        model-name="user"
        field-name="surname"
        v-model="user.surname"
        :placeholder="`${Personal} Surname or Family Name`"
        :validation-errors="validationErrs.surname"
        :validation-transition="validationTransitions.surname"
      >{{Personal}} Surname or Family Name</sui-input>

      <sui-input
        required
        model-name="user"
        field-name="email"
        v-model="user.email"
        :placeholder="`${Personal} Email`"
        :validation-errors="validationErrs.email"
        :validation-transition="validationTransitions.email"
      >{{Personal}} Email</sui-input>

      <sui-select
        v-if="$store.state.auth.user.role > 0"
        required
        model-name="user"
        field-name="role"
        :options="['Admin', 'Normal']"
        v-model="user.role"
        :validation-transition="validationTransitions.role"
        :validation-errors="validationErrs.role"
      >
        User Account Role
        <template
          v-slot:default-option
        >Select the User's Account Role (Normal or Admin)</template>
      </sui-select>

      <sui-select
        required
        model-name="user"
        field-name="account_type"
        :options="['Landlord','Tenant']"
        v-model="user.account_type"
        :validation-transition="validationTransitions.account_type"
        :validation-errors="validationErrs.account_type"
      >
        User Account Type (Landlord or Tenant)
        <template
          v-slot:default-option
        >Select Account Type (Landlord or Tenant)</template>
      </sui-select>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
// import { CreateUser, UpdateUser } from "../../API/users";
// import { DEFAULT_VALIDATION_ERR_TRANSITION } from "../../Utility/Constants/transitions";
import Role from "../../Models/EnumRole";
import AccountType from "../../Models/EnumAccountType";
import User from "../../Models/UserClass";

// //? Props declared this way can be used as mixins (if need more mixins then extend 'mixins(mixin1, mixin2, ...)')
const UserFormProps = Vue.extend({ props: { newUser: Boolean } });

@Component //({props: {newUser: Boolean}}) //? Props declared here not accessible by 'this' below
export default class UserForm extends UserFormProps {
  //! Data Declaration
  user = new User("", "", "", Role.Normal, AccountType.Landlord, 0);
  validationErrs = {
    first_name: [],
    surname: [],
    email: [],
    role: []
  };
  validationTransitions = {
    first_name: "DEFAULT_VALIDATION_ERR_TRANSITION",
    surname: "DEFAULT_VALIDATION_ERR_TRANSITION",
    email: "DEFAULT_VALIDATION_ERR_TRANSITION",
    role: "DEFAULT_VALIDATION_ERR_TRANSITION"
  };
  //! Computed Props
  get Personal(): string {    
    //* Determine if personal account or being viewed by an Admin
    return this.$store.state.authentication.user.role === 0 ? "Your" : "";
  }
  //! Methods
  Edited(propName: string, propVal: any) {
    //? Careful of Arrow functions, they're especially tricky in a Vue TS script,
    //? best to stick to this type of method declaration
    this.$emit("edit", propName, propVal);
  }
  SubmitForm() {
    //* Validate
    if (!this.ValidUser()) {
      console.log("Not Valid");
      return;
    }
    // if (this.newUser) {
    //   CreateUser(this.user);
    // } else {
    //   if (this.user.id) UpdateUser(this.user.id, this.user);
    // }
  }
  ValidUser(): boolean {
    return true;
  }
}
</script>