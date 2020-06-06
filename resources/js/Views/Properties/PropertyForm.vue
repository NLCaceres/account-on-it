<template>
  <form class="ui form" @submit.prevent="SubmitForm">
    <sui-search
      required
      model-name="property"
      field-name="street"
      v-model="property.street"
      placeholder="House Number and Street Address Property is Located On"
      :validation-transition="validationTransitions.street"
      :validation-errors="validationErrs.street"
    >Street Address</sui-search>

    <sui-input
      model-name="property"
      field-name="additional_info"
      v-model="property.additional_info"
      placeholder="Apartment, Suite, Unit, Building or Specific Room Number related to Property"
      :validation-transition="validationTransitions.additional_info"
      :validation-errors="validationErrs.additional_info"
    >Address Line 2</sui-input>

    <sui-input
      required
      model-name="property"
      field-name="city"
      v-model="property.city"
      placeholder="City that Property is Located"
      :validation-transition="validationTransitions.city"
      :validation-errors="validationErrs.city"
    />

    <sui-select
      required
      model-name="property"
      field-name="state"
      :options="StateNames"
      v-model="property.state"
      :validation-transition="validationTransitions.state"
      :validation-errors="validationErrs.state"
    >
      State/Territory/Province
      <template v-slot:default-option>Select the Property's State</template>
    </sui-select>

    <sui-input
      required
      model-name="property"
      field-name="postal_code"
      v-model.number="property.postal_code"
      placeholder="5 Digit ZIP or Postal Code"
      :validation-transition="validationTransitions.postal_code"
      :validation-errors="validationErrs.postal_code"
    >Postal or ZIP Code</sui-input>

    <sui-submit :new-entity="newProperty" :saving="saving" />
  </form>
</template>
<script>
import states from "../../Utility/Constants/state_list";
import PropertiesAPI from "../../API/properties";
import { DEFAULT_VALIDATION_ERR_TRANSITION } from "../../Utility/Constants/transitions";
import FinalValidationCheck from "../../Utility/Functions/final_validation_check";
export default {
  props: {
    newProperty: Boolean,
    saving: Boolean
  },
  computed: {
    StateNames() {
      const statePlusAbbreviation = [];
      //? Turns out for...in is for objs, for...of is for arrays
      for (const state of states) {
        statePlusAbbreviation.push(`${state.name} - ${state.abbreviation}`);
      }
      return statePlusAbbreviation;
    }
  },
  //? Created is great for constants unless needed super early
  created() {
    const ADDRESS_ENDPOINT_BASE_URL =
      "https://geocode.search.hereapi.com/v1/geocode";
    const DEFAULT_QUERY_PARAMS = "&in=countryCode:CAN,MEX,USA&limit=5";
    this.STANDARD_ADDRESS_ENDPOINT =
      ADDRESS_ENDPOINT_BASE_URL +
      "?apiKey=" +
      process.env.MIX_HERE_JS_API_KEY +
      DEFAULT_QUERY_PARAMS;

    this.USER_LAT = 0;
    this.USER_LONG = 0;
    navigator.geolocation.getCurrentPosition(this.GeolocationCallback);
  },
  mounted() {
    $(".ui.dropdown").dropdown();
    $("#property_street_search").search({
      searchDelay: 700,
      searchOnFocus: false,
      apiSettings: {
        url: this.STANDARD_ADDRESS_ENDPOINT + "&q={query}",
        beforeSend: this.BeforeAddressRequest,
        onResponse: this.OnAddressResponse
      },
      onSelect: this.SelectAddress
    });
  },
  data() {
    return {
      property: {
        street: "",
        city: "",
        state: "",
        postal_code: "",
        additional_info: ""
      },
      validationErrs: {
        house_num: [],
        street: [],
        city: [],
        state: [],
        postal_code: [],
        additional_info: []
      },
      validationTransitions: {
        house_num: DEFAULT_VALIDATION_ERR_TRANSITION,
        street: DEFAULT_VALIDATION_ERR_TRANSITION,
        city: DEFAULT_VALIDATION_ERR_TRANSITION,
        state: DEFAULT_VALIDATION_ERR_TRANSITION,
        postal_code: DEFAULT_VALIDATION_ERR_TRANSITION,
        additional_info: DEFAULT_VALIDATION_ERR_TRANSITION
      }
    };
  },
  methods: {
    Edited(propName = null, propVal = null) {
      this.$emit("edit", propName, propVal);
    },
    //! Address API Calls
    GeolocationCallback(position) {
      this.USER_LAT = position.coords.latitude;
      this.USER_LONG = position.coords.longitude;
    },
    BeforeAddressRequest(settings) {
      //* If user allowed location services + successfully set lat/long then add them into AddressApiRequest to improve response */
      if (this.USER_LAT && this.USER_LONG)
        settings.url =
          settings.url + "&at=" + this.USER_LAT + "," + this.USER_LONG;

      return settings; //! Required otherwise new settings won't work
    },
    OnAddressResponse(response) {
      var newResponse = { results: [] };

      if (!response || !response.items) return;

      for (const searchResult of response.items) {
        newResponse.results.push({
          title: searchResult.address.label,
          city: searchResult.address.city,
          countryName: searchResult.address.countryName,
          state: searchResult.address.state,
          postal_code: searchResult.address.postalCode
        }); //* Title sets up div with results, rest is for setting up other fields onClick */
      }

      return newResponse; //! Required otherwise it will attempt to parse normal response
    },
    SelectAddress(result, response) {
      this.property.street = result.title.slice(0, result.title.indexOf(","));
      this.property.city = result.city;

      const propertyState = states.find(state => state.name === result.state);
      $("#property_state").dropdown(
        "set selected",
        propertyState.name + " - " + propertyState.abbreviation
      ); //? V-Model properly sets new value after set selected behavior

      const postal_code = result.postal_code.slice(
        0,
        result.postal_code.indexOf("-")
      ); //? Receives 5+4 Postal Code so keep or no? Probably No, unless support the complicated validation
      this.property.postal_code = parseInt(postal_code);
    },
    //! Form Submission
    SubmitForm() {
      if (!this.ValidProperty()) {
        console.log("Not valid");
        return;
      }

      //* Prep Property's State to save only name to DB */
      const stateAbbreviationStart = this.property.state.indexOf("-") - 1;
      const stateWithoutAbbreviation = this.property.state
        .substring(0, stateAbbreviationStart)
        .trim();

      //* Send data
      //this.UpdateProperty();
    },
    async UpdateProperty() {
      //this.saving = true;
      const response = await PropertiesAPI.update(this.property.id, {
        house_num: this.property.house_num,
        street: this.property.street,
        state: this.property.state,
        zipcode: this.property.zipcode,
        additional_info: this.property.additional_info
      });
      //this.saving = false;
      if (response.status === 204) {
        //this.saved = true;
        this.validationErrs = {
          house_num: [],
          street: [],
          state: [],
          zipcode: [],
          additional_info: []
        };
        //setTimeout(() => (this.saved = false), 2000); //? Oddly 'this' refers to the vue instance here! Not true always
      } else if (response.status === 422) {
        this.validationErrs = response.data.errors;
        //this.error = response.data.message;
        //setTimeout(() => (this.error = null), 4000);
      }
    },
    //! Validation
    ValidProperty() {
      //todo validate street properly
      const previousValidErrs = {};
      for (const field in this.validationErrs) {
        this.validationErrs[field] = []; //* Clear old valid errs */
      }

      // ? Check X num of digits then a space followed by a fraction (1/4, 1/2, etc.). Does NOT match if just a fraction (may reconsider)
      // const properHouseNum = /(?:\d+(?:(?: \d)\/\d))/;
      // if (!properHouseNum.test(this.property.house_num)) {
      //   this.validationErrs.house_num.push(
      //     "Please enter just the house or building number. If number includes a fraction (1/2, 1/4, etc.), please include. 'E.g. 100 1/2'"
      //   );
      // }

      this.ValidStreetAddress();

      this.ValidCity();

      if (!this.property.state) {
        this.validationErrs.state.push("Please select your state"); //! State Validation
      }

      this.ValidPostalCode();

      this.ValidRoomNum();

      return FinalValidationCheck(
        this.validationErrs,
        this.validationTransitions
      );
    },
    ValidStreetAddress() {
      if (!this.property.street) {
        this.validationErrs.street.push("Missing Property Street");
        return;
      }
      // const splitStreetAddress = this.property.street.split(" ");
      // console.log(`Split Address: ${splitStreetAddress}`);
      // if (splitStreetAddress.length === 3) {
      //   //? Ex: 123 Main St(reet)
      // } else if (splitStreetAddress.length === 4) {
      // } else if (splitStreetAddress.length === 5) {
      // } else {
      //   this.validationErrs.street.push(
      //     "Incorrect Street Address format! Possibly a typo"
      //   );
      // }
    },
    ValidCity() {
      if (!this.property.city) {
        this.validationErrs.city.push("Missing Property City");
        return;
      }
    },
    ValidStreet() {
      if (!this.property.street) {
        this.validationErrs.street.push("Missing Property Street");
        return;
      }
      const properStreetName = /(\w+(?: (?:Street$))+)/; //?
      const splitStreetName = this.property.street.split(" ");
      for (const ending in streetEndings) {
        if (ending === splitStreetName[splitStreetName.length - 1]) break; // Found one!
        if (
          ending === streetEndings[streetEndings.length - 1] &&
          ending != splitStreetName[splitStreetName.length - 1]
        )
          return false;
      }
      return true;
    },
    ValidPostalCode() {
      if (!this.property.postal_code) {
        this.validationErrs.postal_code.push("Missing your Postal Code");
        return;
      }
      //* Check if a number */
      if (isNaN(this.property.postal_code)) {
        this.validationErrs.postal_code.push(
          "Not a Postal Code. Please double check. 5 digit Postal Code format only."
        );
      }

      //* Check if normal Postal Code */
      //if (this.property.postal_code.length === 5 && !isNaN(this.property.postal_code)) { //! Without Vue .number operator, Number() can be used to cast strs
      if (
        this.property.postal_code < 502 ||
        this.property.postal_code > 99950
      ) {
        this.validationErrs.postal_code.push(
          "Invalid Postal Code. Possibly a typo."
        );
      }
      //}

      //* Check if long format zip */
      // else if (
      //   this.property.postal_code.length === 10 &&
      //   this.property.postal_code.indexOf("-") === 5
      // ) {
      //   const splitPostalCode = this.property.postal_code.split("+");
      //   //* Test against valid zip codes (Lowest ZIP Code is 00502 (00501 == IRS) and highest is 99950). +4 section can be 0 - 9999 */
      //   if (splitPostalCode.length === 2) {
      //     this.validErrs =
      //       Number(splitPostalCode[0]) < 502 ||
      //       Number(splitPostalCode[0]) > 99950 ||
      //       !isNaN(splitPostalCode[1]);
      //     if (this.validErrs)
      //       this.validationErrs.postal_code.push(
      //         "Invalid Zip code. Possibly a typo."
      //       );
      //   }
      //   //* May have multiple '-'s and therefore invalid format */
      //   else {
      //     this.validErrs = true;
      //     this.validationErrs.postal_code.push(
      //       "Zip code incorrect format. Should use simple 5 digit format or '5 + 4' long format"
      //     );
      //   }
      // }
    },
    ValidRoomNum() {
      //! Optional val
      if (
        this.property.additional_info &&
        (this.property.additional_info.length > 6 || //* Expecting room numbers won't exceed 5 digits and a letter or 4 digits and 2 letters */
          !/^([1-9]+(?:[A-z]{1,3})?$){1}/.test(this.property.additional_info)) //* Matches '123', '12A', '1234AA', '123zzz' etc. */
      ) {
        this.validationErrs.additional_info.push("Invalid Room Number");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>