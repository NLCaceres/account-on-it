(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["NewUserView"],{

/***/ "./node_modules/ts-loader/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Users/NewUser.vue?vue&type=script&lang=ts&":
/*!**********************************************************************************************************************************************************!*\
  !*** ./node_modules/ts-loader??ref--5!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Views/Users/NewUser.vue?vue&type=script&lang=ts& ***!
  \**********************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _Store_GetterTypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Store/GetterTypes */ "./resources/js/Store/GetterTypes.js");
/* harmony import */ var _Store_modules_AppState__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Store/modules/AppState */ "./resources/js/Store/modules/AppState.js");
/* harmony import */ var _FormUser_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./FormUser.vue */ "./resources/js/Views/Users/FormUser.vue");






/* harmony default export */ __webpack_exports__["default"] = (vue__WEBPACK_IMPORTED_MODULE_1__["default"].extend({
    //! Local Components
    components: {
        UserForm: _FormUser_vue__WEBPACK_IMPORTED_MODULE_5__["default"]
    },
    //! Computed
    computed: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, Object(vuex__WEBPACK_IMPORTED_MODULE_2__["mapGetters"])(_Store_modules_AppState__WEBPACK_IMPORTED_MODULE_4__["APP_MODULE"], { mobile: _Store_GetterTypes__WEBPACK_IMPORTED_MODULE_3__["MOBILE_WIDTH"] })),
    //! Data
    data: function () {
        return {};
    },
    //! Hooks  
    //! Methods
    methods: {
        GoBack: function () {
            if (this.mobile) {
                this.$emit(this.CustomEvents.CLOSE_POPUP);
                return;
            }
        }
    }
}));


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Users/NewUser.vue?vue&type=template&id=f2fb5096&":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Views/Users/NewUser.vue?vue&type=template&id=f2fb5096& ***!
  \***********************************************************************************************************************************************************************************************************/
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
    {
      staticClass: "ui segment app-dark-accent-dark",
      class: { "container p-0-b": !_vm.mobile, "p-sm-b": _vm.mobile }
    },
    [
      _vm.mobile
        ? _c("basic-header", [_vm._v("Create Account")])
        : _c("header-back-button", { attrs: { breadcrumb: "" } }, [
            _vm._v("Create Account")
          ]),
      _vm._v(" "),
      _c("user-form", {
        class: { "m-xs-b": _vm.mobile },
        attrs: { "new-user": "" }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/Views/Users/NewUser.vue":
/*!**********************************************!*\
  !*** ./resources/js/Views/Users/NewUser.vue ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NewUser_vue_vue_type_template_id_f2fb5096___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NewUser.vue?vue&type=template&id=f2fb5096& */ "./resources/js/Views/Users/NewUser.vue?vue&type=template&id=f2fb5096&");
/* harmony import */ var _NewUser_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NewUser.vue?vue&type=script&lang=ts& */ "./resources/js/Views/Users/NewUser.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _NewUser_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _NewUser_vue_vue_type_template_id_f2fb5096___WEBPACK_IMPORTED_MODULE_0__["render"],
  _NewUser_vue_vue_type_template_id_f2fb5096___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Views/Users/NewUser.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/Views/Users/NewUser.vue?vue&type=script&lang=ts&":
/*!***********************************************************************!*\
  !*** ./resources/js/Views/Users/NewUser.vue?vue&type=script&lang=ts& ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_5_node_modules_vue_loader_lib_index_js_vue_loader_options_NewUser_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/ts-loader??ref--5!../../../../node_modules/vue-loader/lib??vue-loader-options!./NewUser.vue?vue&type=script&lang=ts& */ "./node_modules/ts-loader/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Users/NewUser.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_5_node_modules_vue_loader_lib_index_js_vue_loader_options_NewUser_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Views/Users/NewUser.vue?vue&type=template&id=f2fb5096&":
/*!*****************************************************************************!*\
  !*** ./resources/js/Views/Users/NewUser.vue?vue&type=template&id=f2fb5096& ***!
  \*****************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewUser_vue_vue_type_template_id_f2fb5096___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./NewUser.vue?vue&type=template&id=f2fb5096& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Users/NewUser.vue?vue&type=template&id=f2fb5096&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewUser_vue_vue_type_template_id_f2fb5096___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewUser_vue_vue_type_template_id_f2fb5096___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=NewUserView.js.map