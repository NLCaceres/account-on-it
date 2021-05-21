(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["LandlordNewView"],{

/***/ "./node_modules/ts-loader/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Landlords/FormLandlord.vue?vue&type=script&lang=ts&":
/*!*******************************************************************************************************************************************************************!*\
  !*** ./node_modules/ts-loader??ref--5!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Views/Landlords/FormLandlord.vue?vue&type=script&lang=ts& ***!
  \*******************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");

//import LandlordAPI from "../../API/LandlordAPI";
/* harmony default export */ __webpack_exports__["default"] = (vue__WEBPACK_IMPORTED_MODULE_0__["default"].extend({
    props: {
        newLandlord: Boolean,
        saving: Boolean
    },
    data: function () {
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
        Edited: function (propName, propVal) {
            if (propName === void 0) { propName = null; }
            if (propVal === void 0) { propVal = null; }
            this.$emit("edit", propName, propVal);
        },
        SubmitForm: function () {
            //* Validate
            //* Ready data
            //* Send data
        }
    }
}));


/***/ }),

/***/ "./node_modules/ts-loader/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Landlords/NewLandlord.vue?vue&type=script&lang=ts&":
/*!******************************************************************************************************************************************************************!*\
  !*** ./node_modules/ts-loader??ref--5!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Views/Landlords/NewLandlord.vue?vue&type=script&lang=ts& ***!
  \******************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var _FormLandlord_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FormLandlord.vue */ "./resources/js/Views/Landlords/FormLandlord.vue");

// import LandlordsAPI from "../../API/LandlordAPI";

/* harmony default export */ __webpack_exports__["default"] = (vue__WEBPACK_IMPORTED_MODULE_0__["default"].extend({
    //! Local Components: 
    components: {
        'landlord-form': _FormLandlord_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
    },
    data: function () {
        return {
            loading: false,
            error: null,
            saved: false,
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
    // EditLandlord(propName: string, propVal: any) {
    //   if (propName) {
    //     this.landlord[propName] = propVal;
    //   }
    // },
    // async StoreLandlord() {
    //   this.saving = true;
    //   const response = await LandlordsAPI.create(this.landlord);
    //   this.saving = false;
    //   if (response.status === 201) {
    //     this.saved = true;
    //     this.validationErrs = { first_name: [], surname: [], email: [] };
    //     setTimeout(() => (this.saved = false), 2000); //? Oddly 'this' refers to the vue instance here! Not true elsewhere
    //   } else if (response.status === 422) {
    //     this.error = response.data.message;
    //     this.validationErrs = response.data.errors;
    //     setTimeout(() => (this.error = null), 4000);
    //   }
    // }
    }
}));


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Landlords/FormLandlord.vue?vue&type=template&id=9bf35842&":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Views/Landlords/FormLandlord.vue?vue&type=template&id=9bf35842& ***!
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
  return _c("div", { staticClass: "ui basic segment" }, [
    _c(
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
          "sui-input",
          {
            attrs: {
              required: "",
              "model-name": "landlord",
              "field-name": "first_name",
              placeholder: "Landlord's First or Preferred Name",
              "validation-errors": _vm.validationErrs.first_name
            },
            model: {
              value: _vm.landlord.first_name,
              callback: function($$v) {
                _vm.$set(_vm.landlord, "first_name", $$v)
              },
              expression: "landlord.first_name"
            }
          },
          [_vm._v("Landlord's First Name")]
        ),
        _vm._v(" "),
        _c(
          "sui-input",
          {
            attrs: {
              required: "",
              "model-name": "landlord",
              "field-name": "surname",
              placeholder: "Landlord's Surname / Last Name / Family Name",
              "validation-errors": _vm.validationErrs.surname
            },
            model: {
              value: _vm.landlord.surname,
              callback: function($$v) {
                _vm.$set(_vm.landlord, "surname", $$v)
              },
              expression: "landlord.surname"
            }
          },
          [_vm._v("Landlord's Surname")]
        ),
        _vm._v(" "),
        _c(
          "sui-input",
          {
            attrs: {
              required: "",
              "model-name": "landlord",
              "field-name": "email",
              placeholder: "Landlord's Email Address",
              "validation-errors": _vm.validationErrs.email
            },
            model: {
              value: _vm.landlord.email,
              callback: function($$v) {
                _vm.$set(_vm.landlord, "email", $$v)
              },
              expression: "landlord.email"
            }
          },
          [_vm._v("Landlord's Email Address")]
        ),
        _vm._v(" "),
        _c("sui-submit", {
          attrs: { "new-entity": _vm.newLandlord, saving: _vm.saving }
        })
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Landlords/NewLandlord.vue?vue&type=template&id=7b2d8455&":
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Views/Landlords/NewLandlord.vue?vue&type=template&id=7b2d8455& ***!
  \*******************************************************************************************************************************************************************************************************************/
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
      _c("header-back-button", [_vm._v("New Landlord")]),
      _vm._v(" "),
      _c("landlord-form", {
        attrs: {
          "new-landlord": "",
          saving: _vm.saving,
          "validation-errs": _vm.validationErrs
        }
      }),
      _vm._v(" "),
      _c("sui-alert-saving")
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/Views/Landlords/FormLandlord.vue":
/*!*******************************************************!*\
  !*** ./resources/js/Views/Landlords/FormLandlord.vue ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FormLandlord_vue_vue_type_template_id_9bf35842___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FormLandlord.vue?vue&type=template&id=9bf35842& */ "./resources/js/Views/Landlords/FormLandlord.vue?vue&type=template&id=9bf35842&");
/* harmony import */ var _FormLandlord_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FormLandlord.vue?vue&type=script&lang=ts& */ "./resources/js/Views/Landlords/FormLandlord.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _FormLandlord_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _FormLandlord_vue_vue_type_template_id_9bf35842___WEBPACK_IMPORTED_MODULE_0__["render"],
  _FormLandlord_vue_vue_type_template_id_9bf35842___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Views/Landlords/FormLandlord.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/Views/Landlords/FormLandlord.vue?vue&type=script&lang=ts&":
/*!********************************************************************************!*\
  !*** ./resources/js/Views/Landlords/FormLandlord.vue?vue&type=script&lang=ts& ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_5_node_modules_vue_loader_lib_index_js_vue_loader_options_FormLandlord_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/ts-loader??ref--5!../../../../node_modules/vue-loader/lib??vue-loader-options!./FormLandlord.vue?vue&type=script&lang=ts& */ "./node_modules/ts-loader/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Landlords/FormLandlord.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_5_node_modules_vue_loader_lib_index_js_vue_loader_options_FormLandlord_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Views/Landlords/FormLandlord.vue?vue&type=template&id=9bf35842&":
/*!**************************************************************************************!*\
  !*** ./resources/js/Views/Landlords/FormLandlord.vue?vue&type=template&id=9bf35842& ***!
  \**************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FormLandlord_vue_vue_type_template_id_9bf35842___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./FormLandlord.vue?vue&type=template&id=9bf35842& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Landlords/FormLandlord.vue?vue&type=template&id=9bf35842&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FormLandlord_vue_vue_type_template_id_9bf35842___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FormLandlord_vue_vue_type_template_id_9bf35842___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/Views/Landlords/NewLandlord.vue":
/*!******************************************************!*\
  !*** ./resources/js/Views/Landlords/NewLandlord.vue ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NewLandlord_vue_vue_type_template_id_7b2d8455___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NewLandlord.vue?vue&type=template&id=7b2d8455& */ "./resources/js/Views/Landlords/NewLandlord.vue?vue&type=template&id=7b2d8455&");
/* harmony import */ var _NewLandlord_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NewLandlord.vue?vue&type=script&lang=ts& */ "./resources/js/Views/Landlords/NewLandlord.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _NewLandlord_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _NewLandlord_vue_vue_type_template_id_7b2d8455___WEBPACK_IMPORTED_MODULE_0__["render"],
  _NewLandlord_vue_vue_type_template_id_7b2d8455___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Views/Landlords/NewLandlord.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/Views/Landlords/NewLandlord.vue?vue&type=script&lang=ts&":
/*!*******************************************************************************!*\
  !*** ./resources/js/Views/Landlords/NewLandlord.vue?vue&type=script&lang=ts& ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_5_node_modules_vue_loader_lib_index_js_vue_loader_options_NewLandlord_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/ts-loader??ref--5!../../../../node_modules/vue-loader/lib??vue-loader-options!./NewLandlord.vue?vue&type=script&lang=ts& */ "./node_modules/ts-loader/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Landlords/NewLandlord.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_5_node_modules_vue_loader_lib_index_js_vue_loader_options_NewLandlord_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Views/Landlords/NewLandlord.vue?vue&type=template&id=7b2d8455&":
/*!*************************************************************************************!*\
  !*** ./resources/js/Views/Landlords/NewLandlord.vue?vue&type=template&id=7b2d8455& ***!
  \*************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewLandlord_vue_vue_type_template_id_7b2d8455___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./NewLandlord.vue?vue&type=template&id=7b2d8455& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Landlords/NewLandlord.vue?vue&type=template&id=7b2d8455&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewLandlord_vue_vue_type_template_id_7b2d8455___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewLandlord_vue_vue_type_template_id_7b2d8455___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=LandlordNewView.js.map