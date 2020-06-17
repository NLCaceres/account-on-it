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
/* harmony import */ var _API_PropertyAPI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../API/PropertyAPI */ "./resources/js/API/PropertyAPI.js");
/* harmony import */ var _Store_ActionTypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Store/ActionTypes */ "./resources/js/Store/ActionTypes.js");
/* harmony import */ var _Store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Store */ "./resources/js/Store/index.js");


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
  created: function created() {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
      var dataReply;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this.$store.dispatch("".concat(_Store__WEBPACK_IMPORTED_MODULE_3__["APP_MODULE"], "/").concat(_Store_ActionTypes__WEBPACK_IMPORTED_MODULE_2__["BEGIN_LOAD"]), true); //* Start loading


              _context.prev = 1;
              _context.next = 4;
              return _API_PropertyAPI__WEBPACK_IMPORTED_MODULE_1__["default"].find(_this.$route.params.id);

            case 4:
              dataReply = _context.sent.data;
              _this.property = dataReply;
              _context.next = 11;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](1);
              _this.error = _context.t0.response.data.message || _context.t0.message;

            case 11:
              _this.$store.dispatch("".concat(_Store__WEBPACK_IMPORTED_MODULE_3__["APP_MODULE"], "/").concat(_Store_ActionTypes__WEBPACK_IMPORTED_MODULE_2__["BEGIN_LOAD"]), false); //* Stop loading


            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 8]]);
    }))();
  },
  methods: {
    EditProperty: function EditProperty(propName, propVal) {
      if (propName) {
        this.property[propName] = propVal;
      }
    },
    UpdateProperty: function UpdateProperty() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        var response;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this2.saving = true;
                _context2.next = 3;
                return _API_PropertyAPI__WEBPACK_IMPORTED_MODULE_1__["default"].update(_this2.property.id, {
                  house_num: _this2.property.house_num,
                  street: _this2.property.street,
                  state: _this2.property.state,
                  zipcode: _this2.property.zipcode,
                  additional_info: _this2.property.additional_info
                });

              case 3:
                response = _context2.sent;
                _this2.saving = false;

                if (response.status === 204) {
                  _this2.saved = true;
                  _this2.validationErrs = {
                    house_num: [],
                    street: [],
                    state: [],
                    zipcode: [],
                    additional_info: []
                  };
                  setTimeout(function () {
                    return _this2.saved = false;
                  }, 2000); //? Oddly 'this' refers to the vue instance here! Not true elsewhere
                } else if (response.status === 422) {
                  _this2.error = response.data.message;
                  _this2.validationErrs = response.data.errors;
                  setTimeout(function () {
                    return _this2.error = null;
                  }, 4000);
                }

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
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
          _c("form-property", {
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
      _c("sui-alert-loading"),
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