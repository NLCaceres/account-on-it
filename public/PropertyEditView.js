(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["PropertyEditView"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Properties/EditProperty.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Views/Properties/EditProperty.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _API_properties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../API/properties */ "./resources/js/API/properties.js");


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

/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      loading: false,
      saving: false,
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
  methods: {
    EditProperty: function EditProperty(propName, propVal) {
      if (propName) {
        this.property[propName] = propVal;
      }
    },
    UpdateProperty: function UpdateProperty() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var response;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.saving = true;
                _context.next = 3;
                return _API_properties__WEBPACK_IMPORTED_MODULE_1__["default"].update(_this.property.id, {
                  house_num: _this.property.house_num,
                  street: _this.property.street,
                  state: _this.property.state,
                  zipcode: _this.property.zipcode,
                  additional_info: _this.property.additional_info
                });

              case 3:
                response = _context.sent;
                _this.saving = false;

                if (response.status === 204) {
                  _this.saved = true;
                  _this.validationErrs = {
                    house_num: [],
                    street: [],
                    state: [],
                    zipcode: [],
                    additional_info: []
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
    { staticClass: "ui segment container no-padding-b app-dark-accent-mid" },
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
            attrs: {
              saving: _vm.saving,
              "validation-errs": _vm.validationErrs
            },
            on: { edit: _vm.EditProperty, submit: _vm.UpdateProperty }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c("sui-alert-loading", { attrs: { loading: _vm.loading } }),
      _vm._v(" "),
      _c("sui-alert-saving", {
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

/***/ "./resources/js/Views/Properties/EditProperty.vue":
/*!********************************************************!*\
  !*** ./resources/js/Views/Properties/EditProperty.vue ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EditProperty_vue_vue_type_template_id_4e0cd60c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EditProperty.vue?vue&type=template&id=4e0cd60c& */ "./resources/js/Views/Properties/EditProperty.vue?vue&type=template&id=4e0cd60c&");
/* harmony import */ var _EditProperty_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EditProperty.vue?vue&type=script&lang=js& */ "./resources/js/Views/Properties/EditProperty.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _EditProperty_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
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

/***/ "./resources/js/Views/Properties/EditProperty.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./resources/js/Views/Properties/EditProperty.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EditProperty_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./EditProperty.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Properties/EditProperty.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EditProperty_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

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