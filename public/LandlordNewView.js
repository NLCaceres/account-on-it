(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["LandlordNewView"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Landlords/NewLandlord.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Views/Landlords/NewLandlord.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************/
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

/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      loading: false,
      saving: false,
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
    EditLandlord: function EditLandlord(propName, propVal) {
      if (propName) {
        this.landlord[propName] = propVal;
      }
    },
    StoreLandlord: function StoreLandlord() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var response;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.saving = true;
                _context.next = 3;
                return _API_landlords__WEBPACK_IMPORTED_MODULE_1__["default"].create(_this.landlord);

              case 3:
                response = _context.sent;
                _this.saving = false;

                if (response.status === 201) {
                  _this.saved = true;
                  _this.validationErrs = {
                    first_name: [],
                    surname: [],
                    email: []
                  };
                  setTimeout(function () {
                    return _this.saved = false;
                  }, 2000); //? Oddly 'this' refers to the vue instance here! Not true elsewhere
                } else if (response.status === 422) {
                  _this.error = response.data.message;
                  _this.validationErrs = response.data.errors;
                  setTimeout(function () {
                    return _this.error = null;
                  }, 4000);
                }

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    }
  }
});

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
    { staticClass: "ui segment container no-padding-b app-dark-accent-mid" },
    [
      _c("header-back-button", [_vm._v("New Landlord")]),
      _vm._v(" "),
      _c("landlord-form", {
        attrs: {
          "new-landlord": "",
          saving: _vm.saving,
          "validation-errs": _vm.validationErrs
        },
        on: { edit: _vm.EditLandlord, submit: _vm.StoreLandlord }
      }),
      _vm._v(" "),
      _c("sui-alert-saving", {
        attrs: { saving: _vm.saving, saved: _vm.saved, error: _vm.error },
        on: {
          saved: function($event) {
            _vm.saved = false
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

/***/ "./resources/js/Views/Landlords/NewLandlord.vue":
/*!******************************************************!*\
  !*** ./resources/js/Views/Landlords/NewLandlord.vue ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NewLandlord_vue_vue_type_template_id_7b2d8455___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NewLandlord.vue?vue&type=template&id=7b2d8455& */ "./resources/js/Views/Landlords/NewLandlord.vue?vue&type=template&id=7b2d8455&");
/* harmony import */ var _NewLandlord_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NewLandlord.vue?vue&type=script&lang=js& */ "./resources/js/Views/Landlords/NewLandlord.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _NewLandlord_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
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

/***/ "./resources/js/Views/Landlords/NewLandlord.vue?vue&type=script&lang=js&":
/*!*******************************************************************************!*\
  !*** ./resources/js/Views/Landlords/NewLandlord.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NewLandlord_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./NewLandlord.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Landlords/NewLandlord.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NewLandlord_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

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