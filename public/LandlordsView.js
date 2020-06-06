(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["LandlordsView"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Landlords/Landlords.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Views/Landlords/Landlords.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _API_landlords__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../API/landlords */ "./resources/js/API/landlords.js");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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

/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      loading: false,
      error: null,
      currentPage: 1,
      pages: 1,
      landlords: [],
      landlordIdToDelete: -1,
      landlordIndexToDelete: -1
    };
  },
  //? Following vue-router lifecycle methods are good alternatives working w/ pagination, etc. compared to normal lifecycle like created()
  beforeRouteEnter: function beforeRouteEnter(to, from, next) {
    //? Fires when about to load 1st time
    _API_landlords__WEBPACK_IMPORTED_MODULE_1__["default"].all(function (err, landlords) {
      next(function (vm) {
        return vm.SetData(err, landlords);
      });
    });
  },
  beforeRouteUpdate: function beforeRouteUpdate(to, from, next) {
    var _this = this;

    //todo maybe set up a different pathway for pagination updates
    if (from.query.page && !to.query.page) this.currentPage = 1; //? Fires when this route is about to change - like w/ pagination (route?page=1) or inner links (route#link)

    this.loading = true;
    _API_landlords__WEBPACK_IMPORTED_MODULE_1__["default"].all(function (err, landlords) {
      _this.SetData(err, landlords);

      next(); //? Move along router funcs
    });
  },
  methods: {
    SetData: function SetData(err, data) {
      if (err) {
        this.error = err.toString();
      } else {
        this.loading = false;
        this.landlords = data;
      }
    },
    DeleteLandlord: function DeleteLandlord() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var response;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return landlordsAPI["delete"](_this2.landlordIdToDelete);

              case 2:
                response = _context.sent;

                if (response.status === 204) {
                  _this2.landlords.splice(_this2.landlordIndexToDelete, 1);
                }

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    ChangePage: function ChangePage(newPage) {
      this.currentPage = newPage;

      if (this.currentPage === 1) {
        this.$router.replace({
          path: "landlords"
        });
      } else if (this.currentPage === this.pages) {
        this.$router.replace({
          path: "landlords",
          query: {
            page: this.pages
          }
        });
      } else {
        this.$router.replace({
          path: "landlords",
          query: {
            page: this.currentPage
          }
        });
      }
    },
    OpenModal: function OpenModal(id, index) {
      this.landlordIdToDelete = id;
      this.landlordIndexToDelete = index;
      $(".ui.modal.mini").modal("show");
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Landlords/Landlords.vue?vue&type=style&index=0&id=6a11fe08&lang=scss&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Views/Landlords/Landlords.vue?vue&type=style&index=0&id=6a11fe08&lang=scss&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".ui.inverted.button[data-v-6a11fe08]:focus, .ui.inverted.button[data-v-6a11fe08] {\n  box-shadow: none !important;\n  color: #dddddd;\n}\n.ui.inverted.button[data-v-6a11fe08]:hover {\n  color: white;\n  box-shadow: 0 0 0 2px white inset !important;\n}\n.button-pair[data-v-6a11fe08] {\n  margin-left: 0 !important;\n  margin-right: 0 !important;\n}\n.button-pair[data-v-6a11fe08] {\n  width: 100%;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Landlords/Landlords.vue?vue&type=style&index=0&id=6a11fe08&lang=scss&scoped=true&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Views/Landlords/Landlords.vue?vue&type=style&index=0&id=6a11fe08&lang=scss&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--7-2!../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../node_modules/vue-loader/lib??vue-loader-options!./Landlords.vue?vue&type=style&index=0&id=6a11fe08&lang=scss&scoped=true& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Landlords/Landlords.vue?vue&type=style&index=0&id=6a11fe08&lang=scss&scoped=true&");

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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Landlords/Landlords.vue?vue&type=template&id=6a11fe08&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Views/Landlords/Landlords.vue?vue&type=template&id=6a11fe08&scoped=true& ***!
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
    { staticClass: "container" },
    [
      _c("basic-header", [_vm._v("Landlords")]),
      _vm._v(" "),
      _c(
        "router-link",
        {
          staticClass: "ui inverted button app-blue m-md-b m-md-l",
          attrs: { id: "new-route", to: { name: "LandlordNew" } }
        },
        [_vm._v("Add New Landlord")]
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
          entities: _vm.landlords,
          "entity-name": "Landlord",
          "plural-entity": "Landlords"
        },
        on: { delete: _vm.OpenModal }
      }),
      _vm._v(" "),
      _c("sui-alert-loading", { attrs: { loading: _vm.loading } }),
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

/***/ "./resources/js/Views/Landlords/Landlords.vue":
/*!****************************************************!*\
  !*** ./resources/js/Views/Landlords/Landlords.vue ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Landlords_vue_vue_type_template_id_6a11fe08_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Landlords.vue?vue&type=template&id=6a11fe08&scoped=true& */ "./resources/js/Views/Landlords/Landlords.vue?vue&type=template&id=6a11fe08&scoped=true&");
/* harmony import */ var _Landlords_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Landlords.vue?vue&type=script&lang=js& */ "./resources/js/Views/Landlords/Landlords.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _Landlords_vue_vue_type_style_index_0_id_6a11fe08_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Landlords.vue?vue&type=style&index=0&id=6a11fe08&lang=scss&scoped=true& */ "./resources/js/Views/Landlords/Landlords.vue?vue&type=style&index=0&id=6a11fe08&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Landlords_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Landlords_vue_vue_type_template_id_6a11fe08_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Landlords_vue_vue_type_template_id_6a11fe08_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "6a11fe08",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Views/Landlords/Landlords.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/Views/Landlords/Landlords.vue?vue&type=script&lang=js&":
/*!*****************************************************************************!*\
  !*** ./resources/js/Views/Landlords/Landlords.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Landlords_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Landlords.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Landlords/Landlords.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Landlords_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Views/Landlords/Landlords.vue?vue&type=style&index=0&id=6a11fe08&lang=scss&scoped=true&":
/*!**************************************************************************************************************!*\
  !*** ./resources/js/Views/Landlords/Landlords.vue?vue&type=style&index=0&id=6a11fe08&lang=scss&scoped=true& ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Landlords_vue_vue_type_style_index_0_id_6a11fe08_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--7-2!../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../node_modules/vue-loader/lib??vue-loader-options!./Landlords.vue?vue&type=style&index=0&id=6a11fe08&lang=scss&scoped=true& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Landlords/Landlords.vue?vue&type=style&index=0&id=6a11fe08&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Landlords_vue_vue_type_style_index_0_id_6a11fe08_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Landlords_vue_vue_type_style_index_0_id_6a11fe08_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Landlords_vue_vue_type_style_index_0_id_6a11fe08_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Landlords_vue_vue_type_style_index_0_id_6a11fe08_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Landlords_vue_vue_type_style_index_0_id_6a11fe08_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/Views/Landlords/Landlords.vue?vue&type=template&id=6a11fe08&scoped=true&":
/*!***********************************************************************************************!*\
  !*** ./resources/js/Views/Landlords/Landlords.vue?vue&type=template&id=6a11fe08&scoped=true& ***!
  \***********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Landlords_vue_vue_type_template_id_6a11fe08_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Landlords.vue?vue&type=template&id=6a11fe08&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Landlords/Landlords.vue?vue&type=template&id=6a11fe08&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Landlords_vue_vue_type_template_id_6a11fe08_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Landlords_vue_vue_type_template_id_6a11fe08_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=LandlordsView.js.map