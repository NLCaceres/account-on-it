(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["PropertyEditView"],{

/***/ "./node_modules/ts-loader/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Properties/EditProperty.vue?vue&type=script&lang=ts&":
/*!********************************************************************************************************************************************************************!*\
  !*** ./node_modules/ts-loader??ref--5!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Views/Properties/EditProperty.vue?vue&type=script&lang=ts& ***!
  \********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");


// import PropertiesAPI from "../../API/PropertyAPI";
// import { BEGIN_LOAD } from "../../Store/ActionTypes";
// import { APP_MODULE } from "../../Store/modules/AppState";
/* harmony default export */ __webpack_exports__["default"] = (vue__WEBPACK_IMPORTED_MODULE_1__["default"].extend({
    //! Local Components: 
    // components: {
    //   'property-form': PropertyForm
    // },
    data: function () {
        return {
            loading: false,
            saved: false,
            error: false,
            property: {
                house_num: "",
                street: "",
                state: "",
                zipcode: "",
                additional_info: ""
            },
            validationErrs: {
                house_num: [],
                street: [],
                state: [],
                zipcode: [],
                additional_info: []
            }
        };
    },
    created: function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                return [2 /*return*/];
            });
        });
    },
    methods: {
    // EditProperty(propName, propVal) {
    //   if (propName) {
    //     this.property[propName] = propVal;
    //   }
    // },
    // async UpdateProperty() {
    //   this.saving = true;
    //   const response = await PropertiesAPI.update(this.property.id, {
    //     house_num: this.property.house_num,
    //     street: this.property.street,
    //     state: this.property.state,
    //     zipcode: this.property.zipcode,
    //     additional_info: this.property.additional_info
    //   });
    //   this.saving = false;
    //   if (response.status === 204) {
    //     this.saved = true;
    //     this.validationErrs = {
    //       house_num: [],
    //       street: [],
    //       state: [],
    //       zipcode: [],
    //       additional_info: []
    //     };
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Properties/EditProperty.vue?vue&type=template&id=4e0cd60c&":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Views/Properties/EditProperty.vue?vue&type=template&id=4e0cd60c& ***!
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
    "div",
    { staticClass: "ui segment container p-0-b app-dark-accent-dark" },
    [
      _c("h1", [_vm._v("Edit Property?")]),
      _vm._v(" "),
      _c("back-button", { attrs: { "steps-back": -1 } }),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "ui basic segment" },
        [
          _c("property-form", {
            attrs: { saving: _vm.saving, "validation-errs": _vm.validationErrs }
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

/***/ "./resources/js/Views/Properties/EditProperty.vue":
/*!********************************************************!*\
  !*** ./resources/js/Views/Properties/EditProperty.vue ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EditProperty_vue_vue_type_template_id_4e0cd60c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EditProperty.vue?vue&type=template&id=4e0cd60c& */ "./resources/js/Views/Properties/EditProperty.vue?vue&type=template&id=4e0cd60c&");
/* harmony import */ var _EditProperty_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EditProperty.vue?vue&type=script&lang=ts& */ "./resources/js/Views/Properties/EditProperty.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _EditProperty_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _EditProperty_vue_vue_type_template_id_4e0cd60c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _EditProperty_vue_vue_type_template_id_4e0cd60c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Views/Properties/EditProperty.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/Views/Properties/EditProperty.vue?vue&type=script&lang=ts&":
/*!*********************************************************************************!*\
  !*** ./resources/js/Views/Properties/EditProperty.vue?vue&type=script&lang=ts& ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_5_node_modules_vue_loader_lib_index_js_vue_loader_options_EditProperty_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/ts-loader??ref--5!../../../../node_modules/vue-loader/lib??vue-loader-options!./EditProperty.vue?vue&type=script&lang=ts& */ "./node_modules/ts-loader/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Properties/EditProperty.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_5_node_modules_vue_loader_lib_index_js_vue_loader_options_EditProperty_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Views/Properties/EditProperty.vue?vue&type=template&id=4e0cd60c&":
/*!***************************************************************************************!*\
  !*** ./resources/js/Views/Properties/EditProperty.vue?vue&type=template&id=4e0cd60c& ***!
  \***************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EditProperty_vue_vue_type_template_id_4e0cd60c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./EditProperty.vue?vue&type=template&id=4e0cd60c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Properties/EditProperty.vue?vue&type=template&id=4e0cd60c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EditProperty_vue_vue_type_template_id_4e0cd60c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EditProperty_vue_vue_type_template_id_4e0cd60c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=PropertyEditView.js.map