(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["UsersView"],{

/***/ "./node_modules/ts-loader/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Users/ListUsers.vue?vue&type=script&lang=ts&":
/*!************************************************************************************************************************************************************!*\
  !*** ./node_modules/ts-loader??ref--5!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Views/Users/ListUsers.vue?vue&type=script&lang=ts& ***!
  \************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");


/* harmony default export */ __webpack_exports__["default"] = (vue__WEBPACK_IMPORTED_MODULE_1__["default"].extend({
    data() {
        return {
            loading: false,
            error: null,
            users: [],
            currentPage: 1,
            pages: 1,
            userIdToDelete: 0,
            userIndexToDelete: 0
        };
    },
    created() {
        this.fetchUsers();
    },
    methods: {
        //? All async functions must have return signature Promise (regardless what's in that promise)
        fetchUsers() {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                this.error = this.users = null;
                this.loading = true;
                try {
                    // const response = await UserAPI.GetAll();
                    // console.log(response);
                    //this.users = response.data;
                }
                catch (err) {
                    this.error = err.response.data.message || err.message;
                }
                if (this.users)
                    this.loading = false;
            });
        },
        ChangePage(newPage) {
            this.currentPage = newPage;
            if (this.currentPage === 1) {
                this.$router.replace({
                    path: "users"
                });
            }
            else if (this.currentPage === this.pages) {
                this.$router.replace({
                    path: "users",
                    query: { page: `${this.pages}` }
                });
            }
            else {
                this.$router.replace({
                    path: "users",
                    query: { page: `${this.currentPage}` } //? Forcing cast of num to str gets TS to not complain
                });
            }
        },
        OpenModal(id, index) {
            this.userIdToDelete = id;
            this.userIndexToDelete = index;
            $(".ui.modal.mini").modal("show");
        }
    }
}));


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Users/ListUsers.vue?vue&type=template&id=f6912b98&":
/*!*************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Views/Users/ListUsers.vue?vue&type=template&id=f6912b98& ***!
  \*************************************************************************************************************************************************************************************************************/
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
    { attrs: { id: "users" } },
    [
      _c("basic-header", [_vm._v("Users")]),
      _vm._v(" "),
      _c(
        "router-link",
        {
          staticClass: "ui inverted button app-blue m-md-b m-md-l",
          attrs: { id: "new-route", to: { name: "UserNew" } }
        },
        [_vm._v("Add New User")]
      ),
      _vm._v(" "),
      _vm.pages > 1
        ? _c("sui-pagination", {
            attrs: { currentPage: _vm.currentPage, "num-of-pages": _vm.pages },
            on: { "update:currentPage": _vm.ChangePage }
          })
        : _vm._e(),
      _vm._v(" "),
      _c("model-table", {
        attrs: {
          entities: _vm.users,
          "entity-name": "User",
          "plural-entity": "Users"
        },
        on: { delete: _vm.OpenModal }
      }),
      _vm._v(" "),
      _c("sui-alert-loading", { attrs: { loading: _vm.loading } }),
      _vm._v(" "),
      _c("sui-modal", { attrs: { size: -1 } }, [_vm._v("Are You Sure?")])
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/Views/Users/ListUsers.vue":
/*!************************************************!*\
  !*** ./resources/js/Views/Users/ListUsers.vue ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ListUsers_vue_vue_type_template_id_f6912b98___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ListUsers.vue?vue&type=template&id=f6912b98& */ "./resources/js/Views/Users/ListUsers.vue?vue&type=template&id=f6912b98&");
/* harmony import */ var _ListUsers_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ListUsers.vue?vue&type=script&lang=ts& */ "./resources/js/Views/Users/ListUsers.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ListUsers_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ListUsers_vue_vue_type_template_id_f6912b98___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ListUsers_vue_vue_type_template_id_f6912b98___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Views/Users/ListUsers.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/Views/Users/ListUsers.vue?vue&type=script&lang=ts&":
/*!*************************************************************************!*\
  !*** ./resources/js/Views/Users/ListUsers.vue?vue&type=script&lang=ts& ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_5_node_modules_vue_loader_lib_index_js_vue_loader_options_ListUsers_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/ts-loader??ref--5!../../../../node_modules/vue-loader/lib??vue-loader-options!./ListUsers.vue?vue&type=script&lang=ts& */ "./node_modules/ts-loader/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Users/ListUsers.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_5_node_modules_vue_loader_lib_index_js_vue_loader_options_ListUsers_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Views/Users/ListUsers.vue?vue&type=template&id=f6912b98&":
/*!*******************************************************************************!*\
  !*** ./resources/js/Views/Users/ListUsers.vue?vue&type=template&id=f6912b98& ***!
  \*******************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ListUsers_vue_vue_type_template_id_f6912b98___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./ListUsers.vue?vue&type=template&id=f6912b98& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Users/ListUsers.vue?vue&type=template&id=f6912b98&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ListUsers_vue_vue_type_template_id_f6912b98___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ListUsers_vue_vue_type_template_id_f6912b98___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=UsersView.js.map