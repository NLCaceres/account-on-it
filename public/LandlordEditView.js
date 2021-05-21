(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["LandlordEditView"],{

/***/ "./node_modules/ts-loader/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Landlords/EditLandlord.vue?vue&type=script&lang=ts&":
/*!*******************************************************************************************************************************************************************!*\
  !*** ./node_modules/ts-loader??ref--5!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Views/Landlords/EditLandlord.vue?vue&type=script&lang=ts& ***!
  \*******************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var _API_LandlordAPI__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../API/LandlordAPI */ "./resources/js/API/LandlordAPI.ts");
/* harmony import */ var _FormLandlord_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./FormLandlord.vue */ "./resources/js/Views/Landlords/FormLandlord.vue");
/* harmony import */ var _Store_ActionTypes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Store/ActionTypes */ "./resources/js/Store/ActionTypes.js");
/* harmony import */ var _Store_modules_AppState__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../Store/modules/AppState */ "./resources/js/Store/modules/AppState.js");






/* harmony default export */ __webpack_exports__["default"] = (vue__WEBPACK_IMPORTED_MODULE_1__["default"].extend({
    //! Local Components: 
    components: {
        'landlord-form': _FormLandlord_vue__WEBPACK_IMPORTED_MODULE_3__["default"]
    },
    data: function () {
        return {
            loading: false,
            saving: false,
            error: null,
            validationErrs: {
                first_name: [],
                surname: [],
                email: []
            },
            saved: false,
            landlord: {
                id: undefined,
                first_name: "",
                surname: "",
                email: ""
            }
        };
    },
    created: function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var landlordAPI, dataReply, err_1;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.$store.dispatch(_Store_modules_AppState__WEBPACK_IMPORTED_MODULE_5__["APP_MODULE"] + "/" + _Store_ActionTypes__WEBPACK_IMPORTED_MODULE_4__["BEGIN_LOAD"], true); //* Start loading
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        landlordAPI = new _API_LandlordAPI__WEBPACK_IMPORTED_MODULE_2__["default"]();
                        return [4 /*yield*/, landlordAPI.GetByID(parseInt(this.$route.params.id))];
                    case 2:
                        dataReply = _a.sent();
                        this.landlord = dataReply;
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        this.error = err_1.response.data.message || err_1.message;
                        return [3 /*break*/, 4];
                    case 4:
                        this.$store.dispatch(_Store_modules_AppState__WEBPACK_IMPORTED_MODULE_5__["APP_MODULE"] + "/" + _Store_ActionTypes__WEBPACK_IMPORTED_MODULE_4__["BEGIN_LOAD"], false); //* Stop loading
                        return [2 /*return*/];
                }
            });
        });
    },
    methods: {
        setData: function (data, err) {
            if (err) {
                //? This check is better than (err !== null) since it actually checks all falsey vals!
                this.error = err.toString();
            }
            else if (data) {
                this.$store.dispatch(_Store_modules_AppState__WEBPACK_IMPORTED_MODULE_5__["APP_MODULE"] + "/" + _Store_ActionTypes__WEBPACK_IMPORTED_MODULE_4__["BEGIN_LOAD"], false);
                this.landlord = data.data;
            }
        },
        EditLandlord: function (propName, propVal) {
            if (propName) {
                this.landlord[propName] = propVal;
            }
        },
        UpdateLandlord: function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
                var landlordAPI, response;
                var _this = this;
                return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.saving = true;
                            landlordAPI = new _API_LandlordAPI__WEBPACK_IMPORTED_MODULE_2__["default"]();
                            if (!this.landlord.id) return [3 /*break*/, 2];
                            return [4 /*yield*/, landlordAPI.Update(this.landlord.id, {
                                    first_name: this.landlord.first_name,
                                    surname: this.landlord.surname,
                                    email: this.landlord.email
                                })];
                        case 1:
                            response = _a.sent();
                            this.saving = false;
                            if (response) { //* Alternatively check if 204 status 
                                this.saved = true;
                                this.validationErrs = { first_name: [], surname: [], email: [] };
                                //* 2 second saved notification below
                                setTimeout(function () { return (_this.saved = false); }, 2000); //? Oddly 'this' refers to the vue instance here! Not true elsewhere
                            }
                            else { //* Alternatively check if 422 status
                                this.error = 'Sorry unable to update! It might be an internet problem!'; //response.data.message;
                                //this.validationErrs = response.data.errors;
                                setTimeout(function () { return (_this.error = null); }, 4000); //* 4 Second error display
                            }
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        }
    }
}));


/***/ }),

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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Landlords/EditLandlord.vue?vue&type=template&id=ee6007b6&scoped=true&":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Views/Landlords/EditLandlord.vue?vue&type=template&id=ee6007b6&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************/
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
      _c("header-back-button", [_vm._v("Edit Landlord")]),
      _vm._v(" "),
      _c("landlord-form", {
        attrs: { saving: _vm.saving, "validation-errs": _vm.validationErrs },
        on: { edit: _vm.EditLandlord, submit: _vm.UpdateLandlord }
      }),
      _vm._v(" "),
      _c("sui-alert-loading"),
      _vm._v(" "),
      _c("sui-alert-saving")
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



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

/***/ "./resources/js/Views/Landlords/EditLandlord.vue":
/*!*******************************************************!*\
  !*** ./resources/js/Views/Landlords/EditLandlord.vue ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EditLandlord_vue_vue_type_template_id_ee6007b6_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EditLandlord.vue?vue&type=template&id=ee6007b6&scoped=true& */ "./resources/js/Views/Landlords/EditLandlord.vue?vue&type=template&id=ee6007b6&scoped=true&");
/* harmony import */ var _EditLandlord_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EditLandlord.vue?vue&type=script&lang=ts& */ "./resources/js/Views/Landlords/EditLandlord.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _EditLandlord_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _EditLandlord_vue_vue_type_template_id_ee6007b6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _EditLandlord_vue_vue_type_template_id_ee6007b6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "ee6007b6",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Views/Landlords/EditLandlord.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/Views/Landlords/EditLandlord.vue?vue&type=script&lang=ts&":
/*!********************************************************************************!*\
  !*** ./resources/js/Views/Landlords/EditLandlord.vue?vue&type=script&lang=ts& ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_5_node_modules_vue_loader_lib_index_js_vue_loader_options_EditLandlord_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/ts-loader??ref--5!../../../../node_modules/vue-loader/lib??vue-loader-options!./EditLandlord.vue?vue&type=script&lang=ts& */ "./node_modules/ts-loader/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Landlords/EditLandlord.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_5_node_modules_vue_loader_lib_index_js_vue_loader_options_EditLandlord_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Views/Landlords/EditLandlord.vue?vue&type=template&id=ee6007b6&scoped=true&":
/*!**************************************************************************************************!*\
  !*** ./resources/js/Views/Landlords/EditLandlord.vue?vue&type=template&id=ee6007b6&scoped=true& ***!
  \**************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EditLandlord_vue_vue_type_template_id_ee6007b6_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./EditLandlord.vue?vue&type=template&id=ee6007b6&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Landlords/EditLandlord.vue?vue&type=template&id=ee6007b6&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EditLandlord_vue_vue_type_template_id_ee6007b6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EditLandlord_vue_vue_type_template_id_ee6007b6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



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



/***/ })

}]);
//# sourceMappingURL=LandlordEditView.js.map