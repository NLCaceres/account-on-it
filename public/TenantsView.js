(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["TenantsView"],{

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Tenants/ListTenants.vue?vue&type=style&index=0&id=29695e76&lang=scss&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Views/Tenants/ListTenants.vue?vue&type=style&index=0&id=29695e76&lang=scss&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".ui.inverted.button[data-v-29695e76]:focus, .ui.inverted.button[data-v-29695e76] {\n  box-shadow: none !important;\n  color: #dddddd;\n}\n.ui.inverted.button[data-v-29695e76]:hover {\n  color: white;\n  box-shadow: 0 0 0 2px white inset !important;\n}\n.button-pair[data-v-29695e76] {\n  margin-left: 0 !important;\n  margin-right: 0 !important;\n}\n.button-pair[data-v-29695e76] {\n  width: 100%;\n}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Tenants/ListTenants.vue?vue&type=style&index=0&id=29695e76&lang=scss&scoped=true&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Views/Tenants/ListTenants.vue?vue&type=style&index=0&id=29695e76&lang=scss&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--8-2!../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../node_modules/vue-loader/lib??vue-loader-options!./ListTenants.vue?vue&type=style&index=0&id=29695e76&lang=scss&scoped=true& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Tenants/ListTenants.vue?vue&type=style&index=0&id=29695e76&lang=scss&scoped=true&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/ts-loader/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Tenants/ListTenants.vue?vue&type=script&lang=ts&":
/*!****************************************************************************************************************************************************************!*\
  !*** ./node_modules/ts-loader??ref--5!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Views/Tenants/ListTenants.vue?vue&type=script&lang=ts& ***!
  \****************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var _Store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Store */ "./resources/js/Store/index.js");
/* harmony import */ var _API_TenantAPI__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../API/TenantAPI */ "./resources/js/API/TenantAPI.ts");
/* harmony import */ var _Store_ActionTypes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Store/ActionTypes */ "./resources/js/Store/ActionTypes.js");
/* harmony import */ var _Store_modules_AppState__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../Store/modules/AppState */ "./resources/js/Store/modules/AppState.js");






/* harmony default export */ __webpack_exports__["default"] = (vue__WEBPACK_IMPORTED_MODULE_1__["default"].extend({
    components: {},
    data: function () {
        return {
            tenants: [],
            error: null,
            currentPage: 1,
            totalPages: 1,
            tenantIdToDelete: -1,
            tenantIndexToDelete: -1
        };
    },
    beforeRouteEnter: function (to, from, next) {
        var _a;
        _Store__WEBPACK_IMPORTED_MODULE_2__["default"].dispatch(_Store_modules_AppState__WEBPACK_IMPORTED_MODULE_5__["APP_MODULE"] + "/" + _Store_ActionTypes__WEBPACK_IMPORTED_MODULE_4__["BEGIN_LOAD"], true); //* Start loading  
        var query = (_a = "?page=" + to.query.page) !== null && _a !== void 0 ? _a : '';
        _API_TenantAPI__WEBPACK_IMPORTED_MODULE_3__["tenantAPI"].GetAll(function (data, err) {
            var _a;
            if (((_a = data) === null || _a === void 0 ? void 0 : _a.status) === 403) {
                next(false);
            }
            else {
                next(function (vm) { return vm.SetData(data, err); });
            }
        }, query);
    },
    beforeRouteUpdate: function (to, from, next) {
        var _this = this;
        //* Checks if query even exists in URL
        if (from.query.page && !to.query.page)
            this.currentPage = 1;
        this.$store.dispatch(_Store_modules_AppState__WEBPACK_IMPORTED_MODULE_5__["APP_MODULE"] + "/" + _Store_ActionTypes__WEBPACK_IMPORTED_MODULE_4__["BEGIN_LOAD"], true); //* Start loading
        _API_TenantAPI__WEBPACK_IMPORTED_MODULE_3__["tenantAPI"].GetAll(function (tenants, err) {
            _this.SetData(tenants, err);
            next();
        }, "?page=" + this.currentPage);
    },
    methods: {
        SetData: function (data, err) {
            if (err) {
                this.error = err.toString();
            }
            else if (data) {
                this.$store.dispatch(_Store_modules_AppState__WEBPACK_IMPORTED_MODULE_5__["APP_MODULE"] + "/" + _Store_ActionTypes__WEBPACK_IMPORTED_MODULE_4__["BEGIN_LOAD"], false); //* Stop loading
                this.currentPage = data.current_page;
                this.totalPages = data.last_page; //* Last page will be total num of pages
                this.tenants = data.data;
            }
        },
        DeleteProperty: function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
                var response;
                var _this = this;
                return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, _API_TenantAPI__WEBPACK_IMPORTED_MODULE_3__["tenantAPI"].Delete(this.tenantIdToDelete)];
                        case 1:
                            response = _a.sent();
                            if (response) { //* If true, 204 - successful delete
                                this.tenants.splice(this.tenantIndexToDelete, 1);
                            }
                            else { //* If false, 424 response, then report error message
                                this.error = 'Issue while deleting. It might be an internet issue!';
                                setTimeout(function () { return _this.error = null; }, 4000);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        },
        ChangePage: function (newPage) {
            this.currentPage = newPage;
            if (this.currentPage === 1) {
                //* If page 1 then use base url
                this.$router.replace({
                    path: this.$route.path
                });
            }
            else if (this.currentPage === this.totalPages) {
                //* If currentPage = total # of pages, then use base url
                this.$router.replace({
                    path: this.$route.path,
                    query: { page: String(this.totalPages) }
                });
            }
            else {
                //* If not 1st or last page, then set query to that page #
                this.$router.replace({
                    path: this.$route.path,
                    query: { page: String(this.currentPage) }
                });
            }
        },
        OpenModal: function (id, index) {
            this.tenantIdToDelete = id;
            this.tenantIndexToDelete = index;
            $("#deleteModal").modal("toggle");
        }
    }
}));


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Tenants/ListTenants.vue?vue&type=template&id=29695e76&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Views/Tenants/ListTenants.vue?vue&type=template&id=29695e76&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************/
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
    { staticClass: "w-100" },
    [
      _c("basic-header", [_vm._v("Tenants")]),
      _vm._v(" "),
      _c(
        "router-link",
        {
          staticClass: "ui inverted button app-blue m-md-b m-md-l",
          attrs: { id: "new-route", to: { name: "TenantNew" } }
        },
        [_vm._v("Add New Tenant?")]
      ),
      _vm._v(" "),
      _vm.totalPages > 1
        ? _c("sui-pagination", {
            attrs: {
              currentPage: _vm.currentPage,
              "num-of-pages": _vm.totalPages
            },
            on: { "update:page": _vm.ChangePage }
          })
        : _vm._e(),
      _vm._v(" "),
      _c("model-table", {
        attrs: {
          entities: _vm.tenants,
          "entity-name": "Tenant",
          "plural-entity": "Tenants"
        },
        on: { delete: _vm.OpenModal }
      }),
      _vm._v(" "),
      _c("sui-alert-loading"),
      _vm._v(" "),
      _c("sui-alert-error", [_vm._v(_vm._s(_vm.error))]),
      _vm._v(" "),
      _c("sui-modal", { attrs: { size: -1 } }, [_vm._v("Are You Sure?")])
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/Views/Tenants/ListTenants.vue":
/*!****************************************************!*\
  !*** ./resources/js/Views/Tenants/ListTenants.vue ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ListTenants_vue_vue_type_template_id_29695e76_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ListTenants.vue?vue&type=template&id=29695e76&scoped=true& */ "./resources/js/Views/Tenants/ListTenants.vue?vue&type=template&id=29695e76&scoped=true&");
/* harmony import */ var _ListTenants_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ListTenants.vue?vue&type=script&lang=ts& */ "./resources/js/Views/Tenants/ListTenants.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport *//* harmony import */ var _ListTenants_vue_vue_type_style_index_0_id_29695e76_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ListTenants.vue?vue&type=style&index=0&id=29695e76&lang=scss&scoped=true& */ "./resources/js/Views/Tenants/ListTenants.vue?vue&type=style&index=0&id=29695e76&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _ListTenants_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ListTenants_vue_vue_type_template_id_29695e76_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ListTenants_vue_vue_type_template_id_29695e76_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "29695e76",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Views/Tenants/ListTenants.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/Views/Tenants/ListTenants.vue?vue&type=script&lang=ts&":
/*!*****************************************************************************!*\
  !*** ./resources/js/Views/Tenants/ListTenants.vue?vue&type=script&lang=ts& ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_5_node_modules_vue_loader_lib_index_js_vue_loader_options_ListTenants_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/ts-loader??ref--5!../../../../node_modules/vue-loader/lib??vue-loader-options!./ListTenants.vue?vue&type=script&lang=ts& */ "./node_modules/ts-loader/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Tenants/ListTenants.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_5_node_modules_vue_loader_lib_index_js_vue_loader_options_ListTenants_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Views/Tenants/ListTenants.vue?vue&type=style&index=0&id=29695e76&lang=scss&scoped=true&":
/*!**************************************************************************************************************!*\
  !*** ./resources/js/Views/Tenants/ListTenants.vue?vue&type=style&index=0&id=29695e76&lang=scss&scoped=true& ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ListTenants_vue_vue_type_style_index_0_id_29695e76_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--8-2!../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!../../../../node_modules/vue-loader/lib??vue-loader-options!./ListTenants.vue?vue&type=style&index=0&id=29695e76&lang=scss&scoped=true& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Tenants/ListTenants.vue?vue&type=style&index=0&id=29695e76&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ListTenants_vue_vue_type_style_index_0_id_29695e76_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ListTenants_vue_vue_type_style_index_0_id_29695e76_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ListTenants_vue_vue_type_style_index_0_id_29695e76_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ListTenants_vue_vue_type_style_index_0_id_29695e76_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/Views/Tenants/ListTenants.vue?vue&type=template&id=29695e76&scoped=true&":
/*!***********************************************************************************************!*\
  !*** ./resources/js/Views/Tenants/ListTenants.vue?vue&type=template&id=29695e76&scoped=true& ***!
  \***********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ListTenants_vue_vue_type_template_id_29695e76_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./ListTenants.vue?vue&type=template&id=29695e76&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Tenants/ListTenants.vue?vue&type=template&id=29695e76&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ListTenants_vue_vue_type_template_id_29695e76_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ListTenants_vue_vue_type_template_id_29695e76_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=TenantsView.js.map