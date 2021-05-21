(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["PropertyNewView"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Properties/FormProperty.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Views/Properties/FormProperty.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var _Utility_Constants_state_list__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Utility/Constants/state_list */ "./resources/js/Utility/Constants/state_list.js");
/* harmony import */ var _API_PropertyAPI__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../API/PropertyAPI */ "./resources/js/API/PropertyAPI.ts");
/* harmony import */ var _Utility_Functions_Validation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Utility/Functions/Validation */ "./resources/js/Utility/Functions/Validation/index.ts");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



 //todo BIGGEST Challenge - Convert to Typescript

/* harmony default export */ __webpack_exports__["default"] = ({
  //! Props
  props: {
    newProperty: Boolean,
    saving: Boolean
  },
  computed: {
    StateNames: function StateNames() {
      var statePlusAbbreviation = []; //? Turns out for...in is for objs, for...of is for arrays

      var _iterator = _createForOfIteratorHelper(_Utility_Constants_state_list__WEBPACK_IMPORTED_MODULE_2__["default"]),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var state = _step.value;
          statePlusAbbreviation.push("".concat(state.name, " - ").concat(state.abbreviation));
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return statePlusAbbreviation;
    }
  },
  //! Data
  data: function data() {
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
      }
    };
  },
  //! Lifecycle Hooks
  //? Created is great for constants unless needed super early
  created: function created() {
    var ADDRESS_ENDPOINT_BASE_URL = "https://geocode.search.hereapi.com/v1/geocode";
    var DEFAULT_QUERY_PARAMS = "&in=countryCode:CAN,MEX,USA&limit=5";
    this.STANDARD_ADDRESS_ENDPOINT = ADDRESS_ENDPOINT_BASE_URL + "?apiKey=" + "tP2vuXADud7aiYUc1s6BuhL7fVNk6bd5saLQjKIuJy0" + DEFAULT_QUERY_PARAMS;
    this.USER_LAT = 0;
    this.USER_LONG = 0;
    navigator.geolocation.getCurrentPosition(this.GeolocationCallback);
  },
  mounted: function mounted() {
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
  //! Methods
  methods: {
    Edited: function Edited() {
      var propName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var propVal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      this.$emit("edit", propName, propVal);
    },
    //! Address API Calls
    BeforeAddressRequest: function BeforeAddressRequest(settings) {
      //* If user allowed location services + successfully set lat/long then add them into AddressApiRequest to improve response */
      if (this.USER_LAT && this.USER_LONG) settings.url = settings.url + "&at=" + this.USER_LAT + "," + this.USER_LONG;
      return settings; //? Required otherwise new settings won't work
    },
    GeolocationCallback: function GeolocationCallback(position) {
      this.USER_LAT = position.coords.latitude;
      this.USER_LONG = position.coords.longitude;
    },
    OnAddressResponse: function OnAddressResponse(response) {
      var newResponse = {
        results: []
      };
      if (!response || !response.items) return;

      var _iterator2 = _createForOfIteratorHelper(response.items),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var searchResult = _step2.value;
          newResponse.results.push({
            title: searchResult.address.label,
            city: searchResult.address.city,
            countryName: searchResult.address.countryName,
            state: searchResult.address.state,
            postal_code: searchResult.address.postalCode
          }); //* Title sets up div with results, rest is for setting up other fields onClick */
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      return newResponse; //? Required otherwise it will attempt to parse normal response
    },
    SelectAddress: function SelectAddress(result, response) {
      this.property.street = result.title.slice(0, result.title.indexOf(","));
      this.property.city = result.city;
      var propertyState = _Utility_Constants_state_list__WEBPACK_IMPORTED_MODULE_2__["default"].find(function (state) {
        return state.name === result.state;
      });
      $("#property_state").dropdown("set selected", propertyState.name + " - " + propertyState.abbreviation); //? V-Model properly sets new value after set selected behavior

      var postal_code = result.postal_code.slice(0, result.postal_code.indexOf("-")); //* Receives 5+4 Postal Code so keep or no? Probably No, unless support the complicated validation

      this.property.postal_code = parseInt(postal_code);
    },
    //! Form Submission
    SubmitForm: function SubmitForm() {
      if (!this.ValidProperty()) {
        console.log("Not valid");
        return;
      } //* Prep Property's State to save only name to DB */


      var stateAbbreviationStart = this.property.state.indexOf("-") - 1;
      var stateWithoutAbbreviation = this.property.state.substring(0, stateAbbreviationStart).trim(); //* Send data

      if (this.newProperty) {
        this.CreateProperty();
      } else {
        this.UpdateProperty();
      }
    },
    CreateProperty: function CreateProperty() {
      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    UpdateProperty: function UpdateProperty() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        var response;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _API_PropertyAPI__WEBPACK_IMPORTED_MODULE_3__["default"].update(_this.property.id, {
                  house_num: _this.property.house_num,
                  street: _this.property.street,
                  state: _this.property.state,
                  zipcode: _this.property.zipcode,
                  additional_info: _this.property.additional_info
                });

              case 2:
                response = _context2.sent;

                //this.saving = false;
                if (response.status === 204) {
                  //this.saved = true;
                  _this.validationErrs = {
                    house_num: [],
                    street: [],
                    state: [],
                    zipcode: [],
                    additional_info: []
                  }; //setTimeout(() => (this.saved = false), 2000); //? Oddly 'this' refers to the vue instance here! Not true always
                } else if (response.status === 422) {
                  _this.validationErrs = response.data.errors; //this.error = response.data.message;
                  //setTimeout(() => (this.error = null), 4000);
                }

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    //! Validation
    ValidProperty: function ValidProperty() {
      //todo validate street properly
      var previousValidErrs = {};

      for (var field in this.validationErrs) {
        this.validationErrs[field] = []; //* Clear old valid errs */
      } // ? Check X num of digits then a space followed by a fraction (1/4, 1/2, etc.). Does NOT match if just a fraction (may reconsider)
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
      return Object(_Utility_Functions_Validation__WEBPACK_IMPORTED_MODULE_4__["default"])(this.validationErrs);
    },
    ValidStreetAddress: function ValidStreetAddress() {
      if (!this.property.street) {
        this.validationErrs.street.push("Missing Property Street");
        return;
      } // const splitStreetAddress = this.property.street.split(" ");
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
    ValidCity: function ValidCity() {
      if (!this.property.city) {
        this.validationErrs.city.push("Missing Property City");
        return;
      }
    },
    ValidStreet: function ValidStreet() {
      if (!this.property.street) {
        this.validationErrs.street.push("Missing Property Street");
        return;
      }

      var properStreetName = /(\w+(?: (?:Street$))+)/; //?

      var splitStreetName = this.property.street.split(" ");

      for (var ending in streetEndings) {
        if (ending === splitStreetName[splitStreetName.length - 1]) break; // Found one!

        if (ending === streetEndings[streetEndings.length - 1] && ending != splitStreetName[splitStreetName.length - 1]) return false;
      }

      return true;
    },
    ValidPostalCode: function ValidPostalCode() {
      if (!this.property.postal_code) {
        this.validationErrs.postal_code.push("Missing your Postal Code");
        return;
      } //* Check if a number */


      if (isNaN(this.property.postal_code)) {
        this.validationErrs.postal_code.push("Not a Postal Code. Please double check. 5 digit Postal Code format only.");
      } //* Check if normal Postal Code */
      //if (this.property.postal_code.length === 5 && !isNaN(this.property.postal_code)) { //! Without Vue .number operator, Number() can be used to cast strs


      if (this.property.postal_code < 502 || this.property.postal_code > 99950) {
        this.validationErrs.postal_code.push("Invalid Postal Code. Possibly a typo.");
      } //}
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
    ValidRoomNum: function ValidRoomNum() {
      //! Optional val
      if (this.property.additional_info && (this.property.additional_info.length > 6 || //* Expecting room numbers won't exceed 5 digits and a letter or 4 digits and 2 letters */
      !/^([1-9]+(?:[A-z]{1,3})?$){1}/.test(this.property.additional_info)) //* Matches '123', '12A', '1234AA', '123zzz' etc. */
      ) {
          this.validationErrs.additional_info.push("Invalid Room Number");
        }
    }
  }
});

/***/ }),

/***/ "./node_modules/ts-loader/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Properties/NewProperty.vue?vue&type=script&lang=ts&":
/*!*******************************************************************************************************************************************************************!*\
  !*** ./node_modules/ts-loader??ref--5!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Views/Properties/NewProperty.vue?vue&type=script&lang=ts& ***!
  \*******************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var _FormProperty_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FormProperty.vue */ "./resources/js/Views/Properties/FormProperty.vue");


/* harmony default export */ __webpack_exports__["default"] = (vue__WEBPACK_IMPORTED_MODULE_0__["default"].extend({
    //! Local Components: 
    components: {
        'property-form': _FormProperty_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
    },
    data: function () {
        return {
            loading: false,
            saving: false,
            saved: false,
            error: null,
            property: {
                house_num: "",
                street: "",
                state: "",
                zipcode: "",
                additional_info: ""
            },
            validErrs: false,
            validationErrs: {
                house_num: [],
                street: [],
                state: [],
                zipcode: [],
                additional_info: []
            }
        };
    },
    methods: {
    // EditProperty(propName, propVal) {
    //   if (propName) {
    //     this.property[propName] = propVal;
    //   }
    // },
    // async StoreProperty() {
    //   console.log("Store Prop");
    //   this.saving = true;
    //   this.ValidProperty();
    //   if (!this.validErrs) {
    //     const response = await propertiesAPI.create(this.property);
    //     this.saving = false;
    //     if (response.status === 201) {
    //       this.saved = true;
    //       this.validationErrs = {
    //         house_num: [],
    //         street: [],
    //         state: [],
    //         zipcode: [],
    //         additional_info: []
    //       };
    //       setTimeout(() => (this.saved = false), 2000);
    //     } else if (response.status === 422) {
    //       this.error = response.data.message;
    //       this.validationErrs = response.data.errors;
    //       setTimeout(() => (this.error = null), 4000);
    //     }
    //   }
    // }
    }
}));


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Properties/FormProperty.vue?vue&type=template&id=77432dc6&":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Views/Properties/FormProperty.vue?vue&type=template&id=77432dc6& ***!
  \*********************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "form",
    {
      staticClass: "ui form",
      on: {
        submit: function($event) {
          $event.preventDefault()
          return _vm.SubmitForm($event)
        }
      }
    },
    [
      _c(
        "sui-search",
        {
          attrs: {
            required: "",
            "model-name": "property",
            "field-name": "street",
            placeholder:
              "House Number and Street Address Property is Located On",
            "validation-errors": _vm.validationErrs.street
          },
          model: {
            value: _vm.property.street,
            callback: function($$v) {
              _vm.$set(_vm.property, "street", $$v)
            },
            expression: "property.street"
          }
        },
        [_vm._v("Street Address")]
      ),
      _vm._v(" "),
      _c(
        "sui-input",
        {
          attrs: {
            "model-name": "property",
            "field-name": "additional_info",
            placeholder:
              "Apartment, Suite, Unit, Building or Specific Room Number related to Property",
            "validation-errors": _vm.validationErrs.additional_info
          },
          model: {
            value: _vm.property.additional_info,
            callback: function($$v) {
              _vm.$set(_vm.property, "additional_info", $$v)
            },
            expression: "property.additional_info"
          }
        },
        [_vm._v("Address Line 2")]
      ),
      _vm._v(" "),
      _c("sui-input", {
        attrs: {
          required: "",
          "model-name": "property",
          "field-name": "city",
          placeholder: "City that Property is Located",
          "validation-errors": _vm.validationErrs.city
        },
        model: {
          value: _vm.property.city,
          callback: function($$v) {
            _vm.$set(_vm.property, "city", $$v)
          },
          expression: "property.city"
        }
      }),
      _vm._v(" "),
      _c(
        "sui-select",
        {
          attrs: {
            required: "",
            searchBar: "",
            "model-name": "property",
            "field-name": "state",
            options: _vm.StateNames,
            "validation-errors": _vm.validationErrs.state
          },
          scopedSlots: _vm._u([
            {
              key: "default-option",
              fn: function() {
                return [_vm._v("  Select the Property's State  ")]
              },
              proxy: true
            }
          ]),
          model: {
            value: _vm.property.state,
            callback: function($$v) {
              _vm.$set(_vm.property, "state", $$v)
            },
            expression: "property.state"
          }
        },
        [_vm._v("\n    State/Territory/Province\n      ")]
      ),
      _vm._v(" "),
      _c(
        "sui-input",
        {
          attrs: {
            required: "",
            "model-name": "property",
            "field-name": "postal_code",
            placeholder: "5 Digit ZIP or Postal Code",
            "validation-errors": _vm.validationErrs.postal_code
          },
          model: {
            value: _vm.property.postal_code,
            callback: function($$v) {
              _vm.$set(_vm.property, "postal_code", _vm._n($$v))
            },
            expression: "property.postal_code"
          }
        },
        [_vm._v("Postal or ZIP Code")]
      ),
      _vm._v(" "),
      _c("sui-submit", {
        attrs: { "new-entity": _vm.newProperty, saving: _vm.saving }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Properties/NewProperty.vue?vue&type=template&id=b645f7d0&":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Views/Properties/NewProperty.vue?vue&type=template&id=b645f7d0& ***!
  \********************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "ui segment container p-0-b app-dark-accent-dark" },
    [
      _c("h1", [_vm._v("New Property")]),
      _vm._v(" "),
      _c("back-button", { attrs: { "steps-back": -1 } }),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "ui basic segment" },
        [
          _c("property-form", {
            attrs: { "new-property": "", saving: _vm.saving }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c("sui-alert-saving", {
        staticClass: "m-sm-b app-yellow",
        attrs: { saving: _vm.saving, saved: _vm.saved, error: _vm.error },
        on: {
          saved: function($event) {
            this.saved = false
          }
        }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/API/PropertyAPI.ts":
/*!*****************************************!*\
  !*** ./resources/js/API/PropertyAPI.ts ***!
  \*****************************************/
/*! exports provided: default, propertyAPI */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "propertyAPI", function() { return propertyAPI; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _RepositoryBase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RepositoryBase */ "./resources/js/API/RepositoryBase.ts");


var PROPERTIES_URL = '/api/properties';
var PropertyAPI = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(PropertyAPI, _super);
    function PropertyAPI() {
        return _super.call(this, PROPERTIES_URL) || this;
    }
    return PropertyAPI;
}(_RepositoryBase__WEBPACK_IMPORTED_MODULE_1__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (PropertyAPI);
var propertyAPI = new PropertyAPI();
// export default { //! CRUD Order
//     async create(data) {
//         if (data) {
//             try {
//                 return await axios.post(`${PROPERTIES_URL}`, data);
//             } catch (err) {
//                 return err.response || err.message;
//             }
//         }
//     },
//     async all(callback = null) {
//         try {
//             //* If callback === null, return response from server
//             const response = await axios.get(PROPERTIES_URL);
//             if (!callback) return response;
//             if (response !== null) callback(null, response.data);
//         } catch (err) {
//             //* If callback === null, return err msg to view to display
//             if (!callback) return err.response || err.message;
//             console.log(`Err in Property API: ${err}`);
//             callback(err, err.response.data);
//         }
//     },
//     async find(id, callback = null) {
//         try {
//             //* If callback === null, return response from server
//             const response = await axios.get(`${PROPERTIES_URL}/${id}`);
//             if (!callback) return response;
//             if (response !== null) callback(null, response.data);
//         } catch (err) {
//             //* If callback === null, return err msg to view to display
//             if (!callback) return err.response || err.message;
//             callback(err, err.response.data);
//         }
//     },
//     async update(id, data) {
//         try {
//             return await axios.put(`${PROPERTIES_URL}/${id}`, data);
//         } catch (err) {
//             return err.response || err.message;
//         }
//     },
//     async delete(id, callback = null) {
//         try {
//             //* If callback === null, return response from server
//             const response = await axios.delete(`${PROPERTIES_URL}/${id}`);
//             if (!callback) return response;
//             if (response !== null) callback(null, response.data);
//         } catch (err) {
//             //* If callback === null, return err msg to view to display
//             if (!callback) return err.response || err.message;
//             callback(err, err.response.data);
//         }
//     }
// };


/***/ }),

/***/ "./resources/js/Utility/Constants/state_list.js":
/*!******************************************************!*\
  !*** ./resources/js/Utility/Constants/state_list.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var states = [{
  'name': 'Alabama',
  'abbreviation': 'AL'
}, {
  'name': 'Alaska',
  'abbreviation': 'AK'
}, {
  'name': 'Arizona',
  'abbreviation': 'AZ'
}, {
  'name': 'Arkansas',
  'abbreviation': 'AR'
}, {
  'name': 'California',
  'abbreviation': 'CA'
}, {
  'name': 'Colorado',
  'abbreviation': 'CO'
}, {
  'name': 'Connecticut',
  'abbreviation': 'CT'
}, {
  'name': 'Delaware',
  'abbreviation': 'DE'
}, {
  'name': 'District of Columbia',
  'abbreviation': 'DC'
}, {
  'name': 'Florida',
  'abbreviation': 'FL'
}, {
  'name': 'Georgia',
  'abbreviation': 'GA'
}, {
  'name': 'Hawaii',
  'abbreviation': 'HI'
}, {
  'name': 'Idaho',
  'abbreviation': 'ID'
}, {
  'name': 'Illinois',
  'abbreviation': 'IL'
}, {
  'name': 'Indiana',
  'abbreviation': 'IN'
}, {
  'name': 'Iowa',
  'abbreviation': 'IA'
}, {
  'name': 'Kansas',
  'abbreviation': 'KS'
}, {
  'name': 'Kentucky',
  'abbreviation': 'KY'
}, {
  'name': 'Louisiana',
  'abbreviation': 'LA'
}, {
  'name': 'Maine',
  'abbreviation': 'ME'
}, {
  'name': 'Maryland',
  'abbreviation': 'MD'
}, {
  'name': 'Massachusetts',
  'abbreviation': 'MA'
}, {
  'name': 'Michigan',
  'abbreviation': 'MI'
}, {
  'name': 'Minnesota',
  'abbreviation': 'MN'
}, {
  'name': 'Mississippi',
  'abbreviation': 'MS'
}, {
  'name': 'Missouri',
  'abbreviation': 'MO'
}, {
  'name': 'Montana',
  'abbreviation': 'MT'
}, {
  'name': 'Nebraska',
  'abbreviation': 'NE'
}, {
  'name': 'Nevada',
  'abbreviation': 'NV'
}, {
  'name': 'New Hampshire',
  'abbreviation': 'NH'
}, {
  'name': 'New Jersey',
  'abbreviation': 'NJ'
}, {
  'name': 'New Mexico',
  'abbreviation': 'NM'
}, {
  'name': 'New York',
  'abbreviation': 'NY'
}, {
  'name': 'North Carolina',
  'abbreviation': 'NC'
}, {
  'name': 'North Dakota',
  'abbreviation': 'ND'
}, {
  'name': 'Ohio',
  'abbreviation': 'OH'
}, {
  'name': 'Oklahoma',
  'abbreviation': 'OK'
}, {
  'name': 'Oregon',
  'abbreviation': 'OR'
}, {
  'name': 'Pennsylvania',
  'abbreviation': 'PA'
}, {
  'name': 'Rhode Island',
  'abbreviation': 'RI'
}, {
  'name': 'South Carolina',
  'abbreviation': 'SC'
}, {
  'name': 'South Dakota',
  'abbreviation': 'SD'
}, {
  'name': 'Tennessee',
  'abbreviation': 'TN'
}, {
  'name': 'Texas',
  'abbreviation': 'TX'
}, {
  'name': 'Utah',
  'abbreviation': 'UT'
}, {
  'name': 'Vermont',
  'abbreviation': 'VT'
}, {
  'name': 'Virginia',
  'abbreviation': 'VA'
}, {
  'name': 'Washington',
  'abbreviation': 'WA'
}, {
  'name': 'West Virginia',
  'abbreviation': 'WV'
}, {
  'name': 'Wisconsin',
  'abbreviation': 'WI'
}, {
  'name': 'Wyoming',
  'abbreviation': 'WY'
}];
/* harmony default export */ __webpack_exports__["default"] = (states);

/***/ }),

/***/ "./resources/js/Views/Properties/FormProperty.vue":
/*!********************************************************!*\
  !*** ./resources/js/Views/Properties/FormProperty.vue ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FormProperty_vue_vue_type_template_id_77432dc6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FormProperty.vue?vue&type=template&id=77432dc6& */ "./resources/js/Views/Properties/FormProperty.vue?vue&type=template&id=77432dc6&");
/* harmony import */ var _FormProperty_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FormProperty.vue?vue&type=script&lang=js& */ "./resources/js/Views/Properties/FormProperty.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _FormProperty_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _FormProperty_vue_vue_type_template_id_77432dc6___WEBPACK_IMPORTED_MODULE_0__["render"],
  _FormProperty_vue_vue_type_template_id_77432dc6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Views/Properties/FormProperty.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/Views/Properties/FormProperty.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./resources/js/Views/Properties/FormProperty.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FormProperty_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./FormProperty.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Properties/FormProperty.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FormProperty_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Views/Properties/FormProperty.vue?vue&type=template&id=77432dc6&":
/*!***************************************************************************************!*\
  !*** ./resources/js/Views/Properties/FormProperty.vue?vue&type=template&id=77432dc6& ***!
  \***************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FormProperty_vue_vue_type_template_id_77432dc6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./FormProperty.vue?vue&type=template&id=77432dc6& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Properties/FormProperty.vue?vue&type=template&id=77432dc6&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FormProperty_vue_vue_type_template_id_77432dc6___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FormProperty_vue_vue_type_template_id_77432dc6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/Views/Properties/NewProperty.vue":
/*!*******************************************************!*\
  !*** ./resources/js/Views/Properties/NewProperty.vue ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NewProperty_vue_vue_type_template_id_b645f7d0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NewProperty.vue?vue&type=template&id=b645f7d0& */ "./resources/js/Views/Properties/NewProperty.vue?vue&type=template&id=b645f7d0&");
/* harmony import */ var _NewProperty_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NewProperty.vue?vue&type=script&lang=ts& */ "./resources/js/Views/Properties/NewProperty.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _NewProperty_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _NewProperty_vue_vue_type_template_id_b645f7d0___WEBPACK_IMPORTED_MODULE_0__["render"],
  _NewProperty_vue_vue_type_template_id_b645f7d0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Views/Properties/NewProperty.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/Views/Properties/NewProperty.vue?vue&type=script&lang=ts&":
/*!********************************************************************************!*\
  !*** ./resources/js/Views/Properties/NewProperty.vue?vue&type=script&lang=ts& ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_5_node_modules_vue_loader_lib_index_js_vue_loader_options_NewProperty_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/ts-loader??ref--5!../../../../node_modules/vue-loader/lib??vue-loader-options!./NewProperty.vue?vue&type=script&lang=ts& */ "./node_modules/ts-loader/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Properties/NewProperty.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_5_node_modules_vue_loader_lib_index_js_vue_loader_options_NewProperty_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Views/Properties/NewProperty.vue?vue&type=template&id=b645f7d0&":
/*!**************************************************************************************!*\
  !*** ./resources/js/Views/Properties/NewProperty.vue?vue&type=template&id=b645f7d0& ***!
  \**************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewProperty_vue_vue_type_template_id_b645f7d0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./NewProperty.vue?vue&type=template&id=b645f7d0& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Properties/NewProperty.vue?vue&type=template&id=b645f7d0&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewProperty_vue_vue_type_template_id_b645f7d0___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewProperty_vue_vue_type_template_id_b645f7d0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=PropertyNewView.js.map