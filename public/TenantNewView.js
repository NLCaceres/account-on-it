(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["TenantNewView"],{

/***/ "./node_modules/ts-loader/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Tenants/EditTenant.vue?vue&type=script&lang=ts&":
/*!***************************************************************************************************************************************************************!*\
  !*** ./node_modules/ts-loader??ref--5!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Views/Tenants/EditTenant.vue?vue&type=script&lang=ts& ***!
  \***************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");

// import { BEGIN_LOAD } from "../../Store/ActionTypes";
/* harmony default export */ __webpack_exports__["default"] = (vue__WEBPACK_IMPORTED_MODULE_0__["default"].extend({
    data: function () {
        return {
            loading: false,
            error: null,
            tenant: {
                id: null,
                first_name: null,
                surname: null
            }
        };
    },
    created: function () { },
    methods: {}
}));


/***/ }),

/***/ "./node_modules/ts-loader/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Tenants/NewTenant.vue?vue&type=script&lang=ts&":
/*!**************************************************************************************************************************************************************!*\
  !*** ./node_modules/ts-loader??ref--5!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Views/Tenants/NewTenant.vue?vue&type=script&lang=ts& ***!
  \**************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");

// import tenantsAPI from "../../API/TenantAPI";
/* harmony default export */ __webpack_exports__["default"] = (vue__WEBPACK_IMPORTED_MODULE_0__["default"].extend({
    data: function () {
        return {
            loading: false,
            saving: false,
            error: null,
            saved: false,
            tenant: {
                first_name: "",
                surname: "",
                email: "",
                landlord_id: -1,
                property_id: -1,
                lease_id: -1
            },
            validationErrs: {
                first_name: [],
                surname: [],
                email: []
            }
        };
    },
    methods: {
    // EditTenant(propName, propVal) {
    //   if (propName) {
    //     this.tenant[propName] = propVal;
    //   }
    // },
    // async StoreTenant() {
    //   this.saving = true;
    //   const response = await tenantsAPI.create(this.tenant);
    //   console.log(response);
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Tenants/EditTenant.vue?vue&type=template&id=21a89a8e&":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Views/Tenants/EditTenant.vue?vue&type=template&id=21a89a8e& ***!
  \****************************************************************************************************************************************************************************************************************/
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
      _c("h1", [_vm._v("Edit Tenant Information")]),
      _vm._v(" "),
      _c("back-button", { attrs: { "steps-back": -1 } }),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "ui basic segment" },
        [
          _c("model-form", {
            attrs: {
              "entity-name": "Tenant",
              entity: _vm.tenant,
              saving: _vm.saving,
              "validation-errs": _vm.validationErrs
            }
          })
        ],
        1
      ),
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Tenants/NewTenant.vue?vue&type=template&id=7c1620d6&":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Views/Tenants/NewTenant.vue?vue&type=template&id=7c1620d6& ***!
  \***************************************************************************************************************************************************************************************************************/
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
      _c("header-back-button", [_vm._v("New Tenant")]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "ui basic segment" },
        [
          _c("model-form", {
            attrs: {
              "new-entity": "",
              "entity-name": "Tenant",
              entity: _vm.tenant,
              saving: _vm.saving,
              "validation-errs": _vm.validationErrs
            }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c("sui-alert-saving")
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/Views/Tenants/EditTenant.vue":
/*!***************************************************!*\
  !*** ./resources/js/Views/Tenants/EditTenant.vue ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EditTenant_vue_vue_type_template_id_21a89a8e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EditTenant.vue?vue&type=template&id=21a89a8e& */ "./resources/js/Views/Tenants/EditTenant.vue?vue&type=template&id=21a89a8e&");
/* harmony import */ var _EditTenant_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EditTenant.vue?vue&type=script&lang=ts& */ "./resources/js/Views/Tenants/EditTenant.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _EditTenant_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _EditTenant_vue_vue_type_template_id_21a89a8e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _EditTenant_vue_vue_type_template_id_21a89a8e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Views/Tenants/EditTenant.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/Views/Tenants/EditTenant.vue?vue&type=script&lang=ts&":
/*!****************************************************************************!*\
  !*** ./resources/js/Views/Tenants/EditTenant.vue?vue&type=script&lang=ts& ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_5_node_modules_vue_loader_lib_index_js_vue_loader_options_EditTenant_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/ts-loader??ref--5!../../../../node_modules/vue-loader/lib??vue-loader-options!./EditTenant.vue?vue&type=script&lang=ts& */ "./node_modules/ts-loader/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Tenants/EditTenant.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_5_node_modules_vue_loader_lib_index_js_vue_loader_options_EditTenant_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Views/Tenants/EditTenant.vue?vue&type=template&id=21a89a8e&":
/*!**********************************************************************************!*\
  !*** ./resources/js/Views/Tenants/EditTenant.vue?vue&type=template&id=21a89a8e& ***!
  \**********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EditTenant_vue_vue_type_template_id_21a89a8e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./EditTenant.vue?vue&type=template&id=21a89a8e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Tenants/EditTenant.vue?vue&type=template&id=21a89a8e&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EditTenant_vue_vue_type_template_id_21a89a8e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EditTenant_vue_vue_type_template_id_21a89a8e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/Views/Tenants/NewTenant.vue":
/*!**************************************************!*\
  !*** ./resources/js/Views/Tenants/NewTenant.vue ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NewTenant_vue_vue_type_template_id_7c1620d6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NewTenant.vue?vue&type=template&id=7c1620d6& */ "./resources/js/Views/Tenants/NewTenant.vue?vue&type=template&id=7c1620d6&");
/* harmony import */ var _NewTenant_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NewTenant.vue?vue&type=script&lang=ts& */ "./resources/js/Views/Tenants/NewTenant.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _NewTenant_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _NewTenant_vue_vue_type_template_id_7c1620d6___WEBPACK_IMPORTED_MODULE_0__["render"],
  _NewTenant_vue_vue_type_template_id_7c1620d6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Views/Tenants/NewTenant.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/Views/Tenants/NewTenant.vue?vue&type=script&lang=ts&":
/*!***************************************************************************!*\
  !*** ./resources/js/Views/Tenants/NewTenant.vue?vue&type=script&lang=ts& ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_5_node_modules_vue_loader_lib_index_js_vue_loader_options_NewTenant_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/ts-loader??ref--5!../../../../node_modules/vue-loader/lib??vue-loader-options!./NewTenant.vue?vue&type=script&lang=ts& */ "./node_modules/ts-loader/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Tenants/NewTenant.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_5_node_modules_vue_loader_lib_index_js_vue_loader_options_NewTenant_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Views/Tenants/NewTenant.vue?vue&type=template&id=7c1620d6&":
/*!*********************************************************************************!*\
  !*** ./resources/js/Views/Tenants/NewTenant.vue?vue&type=template&id=7c1620d6& ***!
  \*********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewTenant_vue_vue_type_template_id_7c1620d6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./NewTenant.vue?vue&type=template&id=7c1620d6& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Tenants/NewTenant.vue?vue&type=template&id=7c1620d6&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewTenant_vue_vue_type_template_id_7c1620d6___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewTenant_vue_vue_type_template_id_7c1620d6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=TenantNewView.js.map