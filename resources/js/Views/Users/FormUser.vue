<template>
  <div class="ui basic segment">
    <form class="ui form" @submit.prevent="SubmitForm">
      <sui-input required model-name="user" field-name="first_name"
        capitalFirst v-model.trim="user.first_name"
        :placeholder="`${Personal} First or Preferred Name`"
        :validation-errors="validationErrs.first_name">
          {{Personal}} First Name
      </sui-input>

      <sui-input required model-name="user" field-name="surname"
        capitalFirst v-model.trim="user.surname"
        :placeholder="`${Personal} Surname or Family Name`"
        :validation-errors="validationErrs.surname">
          {{Personal}} Surname or Family Name
      </sui-input>

      <sui-input required model-name="user" field-name="email"
        v-model.trim="user.email" :placeholder="`${Personal} Email`"
        :validation-errors="validationErrs.email">
          {{Personal}} Email
      </sui-input>

      <password-input required modelName="user" fieldName="password" v-model.trim="user.password" 
        :placeholder="`${Personal} Password`" @click="showPass = !showPass"
        :validation-errors="validationErrs.password" :parentHandled="true" :handleShowPass="showPass">
          {{Personal}} Password
      </password-input>

      <password-input required model-name="user" field-name="password_confirmation"
        v-model.trim="user.password_confirmation" :placeholder="`${Personal} Password`" @click="showPass = !showPass"
        :validation-errors="validationErrs.password_confirmation" :parentHandled="true" :handleShowPass="showPass">
          Confirm {{Personal}} Password
      </password-input>

      <sui-select v-if="admin" required model-name="user" field-name="role"
        :options="['Admin', 'Normal']" v-model="user.role"
        :validation-errors="validationErrs.role">
          User Account Role
          <template #default-option>  Select the User's Account Role (Normal or Admin)  </template>
      </sui-select>

      <sui-select required model-name="user" field-name="account_type"
        :options="['Landlord','Tenant']" :value="user.account_type" @input="AccountTypeNum"
        :validation-errors="validationErrs.account_type">
          Account Type (Landlord or Tenant)
          <template #default-option>  Select Account Type  </template>
      </sui-select>

      <sui-submit :new-entity="newUser" :saving="saving" v-if="!parentSubmitted" class="m-lg-t"/>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { RegisteringUser, Role, AccountType } from "../../Models/UserClass";
import { userAPI } from "../../API/UserAPI";
// import AuthAPI from "../../API/AuthenticationAPI";
import { AUTH_MODULE } from "../../Store/modules/AuthenticationState";
import { IS_ADMIN } from "../../Store/GetterTypes";
import { mapGetters } from "vuex";
import FinalValidationCheck, { SelectorValidation, ValidateWithRules, ValidationErrObj } from "../../Utility/Functions/Validation";
import { APP_MODULE } from "../../Store/modules/AppState";
import { NEW_MESSAGE } from "../../Store/ActionTypes";

export default defineComponent({
  props: {
    newUser: Boolean, //* Sets up to create new user vs edit existing one
    confirmPass: Boolean,
    saving: Boolean,
    inSubview: {
      type: Boolean, default: false
    },
    parentSubmitted: {
      type: Boolean, default: false
    }
  },
  //! Data Declaration
  //* Obj/interface based constructor makes things a bit clearer when you have a # of optional params
  data() {
    return {
      user: new RegisteringUser({
        first_name: "",
        surname: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: Role.Normal,
        account_type: AccountType.Default,
        id: 0
      }),
      validationErrs: {
        first_name: [] as Array<string>,
        surname: [] as Array<string>,
        email: [] as Array<string>,
        password: [] as Array<string>,
        password_confirmation: [] as Array<string>,
        role: [] as Array<string>,
        account_type: [] as Array<string>
      } as ValidationErrObj,
      showPass: false,
    }
  },
  //! Computed Props
  computed: {
    ...mapGetters(AUTH_MODULE, { admin: IS_ADMIN }),
    Personal(): string { //* Determine if personal account or being viewed by an Admin
      return (this.admin) ? "" : "Your"; //* Expect: Regular users can only see their own info 
    }
  },
  //! Methods
  methods: {
    //* Original: Emitted an edit event to signal parent page to fire off to API
    //* Could make following an Event type but $event always returns the true value so best to type it what you expect to receive
    AccountTypeNum(accountTypeString: string): void { 
      //? TS Enums can be used similar to arrays to access underlying string or number values
      this.user.account_type = AccountType[accountTypeString as keyof typeof AccountType];
    },
    async SubmitForm() {
      //* Validate
      if (!this.ValidUser()) {
        return;
      }
      if (this.newUser) {
        this.UnavailableFeature();
        //* May need 3rd path - 1. Registering users 2. Making Admins 3. Updating
        // AuthAPI.register(this.user); //* Proper path for adding new users
      } else {
        if (this.user.id) userAPI.Update(this.user.id, this.user);
      }
    },
    async UnavailableFeature() {
      await this.$store.dispatch(`${APP_MODULE}/${NEW_MESSAGE}`, { header: "Feature Currently Unavailable", 
          description: "Sorry! This feature has been temporarily disabled. Come back later and hopefully we'll have things up and running!"});
      setTimeout(() => { this.$store.dispatch(`${APP_MODULE}/${NEW_MESSAGE}`, { header: "", description: "" }) }, 4000);
    },
    HandleRegistration() { //* Callback for after registration is accepted by server

    },
    ValidUser(): boolean {
      for (const field in this.validationErrs) {
        this.validationErrs[field] = []; //* Clear old valid errs */
      }

      //! User first name, surname, email, pass, pass_confirm, account_type
      ValidateWithRules(this.user.first_name, this.validationErrs.first_name, "req|max:40|min:1");

      ValidateWithRules(this.user.surname, this.validationErrs.surname, "req|max:40|min:1");

      ValidateWithRules(this.user.email, this.validationErrs.email, "req|max:40|min:1");

      ValidateWithRules(this.user.password, this.validationErrs.password, "req|max:40|min:8");
      ValidateWithRules(this.user.password_confirmation, this.validationErrs.password_confirmation, "req|max:40|min:8");
      if (this.user.password !== this.user.password_confirmation) { 
        this.validationErrs.password.push("Password must match");
        this.validationErrs.password_confirmation.push("Password must match");
      }

      SelectorValidation(this.user.account_type, this.validationErrs.account_type, [AccountType.Landlord, AccountType.Tenant]);
      //* Below effectively prevents people from becoming admins through SPA (if the SPA incorrectly gives them the option)
      SelectorValidation(Role[this.user.role], this.validationErrs.role, ['Normal']);

      let finalValidation = FinalValidationCheck(this.validationErrs);
      return finalValidation;
    }
  }
});
</script>