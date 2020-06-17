(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["LandlordEditView"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Landlords/EditLandlord.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Views/Landlords/EditLandlord.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _API_LandlordAPI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../API/LandlordAPI */ "./resources/js/API/LandlordAPI.js");
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



/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
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
        id: null,
        first_name: "",
        surname: "",
        email: ""
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
              return _API_LandlordAPI__WEBPACK_IMPORTED_MODULE_1__["default"].find(_this.$route.params.id);

            case 4:
              dataReply = _context.sent.data;
              _this.landlord = dataReply[0];
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
    setData: function setData(err, data) {
      if (err) {
        //? This check is better than (err !== null) since it actually checks all falsey vals!
        this.error = err.toString();
      } else {
        this.$store.dispatch("".concat(_Store__WEBPACK_IMPORTED_MODULE_3__["APP_MODULE"], "/").concat(_Store_ActionTypes__WEBPACK_IMPORTED_MODULE_2__["BEGIN_LOAD"]), false);
        this.landlord = data;
      }
    },
    EditLandlord: function EditLandlord(propName, propVal) {
      if (propName) {
        this.landlord[propName] = propVal;
      }
    },
    UpdateLandlord: function UpdateLandlord() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        var response;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this2.saving = true;
                _context2.next = 3;
                return landlordsAPI.update(_this2.landlord.id, {
                  first_name: _this2.landlord.first_name,
                  surname: _this2.landlord.surname,
                  email: _this2.landlord.email
                });

              case 3:
                response = _context2.sent;
                _this2.saving = false;

                if (response.status === 204) {
                  _this2.saved = true;
                  _this2.validationErrs = {
                    first_name: [],
                    surname: [],
                    email: []
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
    { staticClass: "ui segment container no-padding-b app-dark-accent-mid" },
    [
      _c("header-back-button", [_vm._v("Edit Landlord")]),
      _vm._v(" "),
      _c("form-landlord", {
        attrs: { saving: _vm.saving, "validation-errs": _vm.validationErrs },
        on: { edit: _vm.EditLandlord, submit: _vm.UpdateLandlord }
      }),
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

/***/ "./resources/js/Views/Landlords/EditLandlord.vue":
/*!*******************************************************!*\
  !*** ./resources/js/Views/Landlords/EditLandlord.vue ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EditLandlord_vue_vue_type_template_id_ee6007b6_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EditLandlord.vue?vue&type=template&id=ee6007b6&scoped=true& */ "./resources/js/Views/Landlords/EditLandlord.vue?vue&type=template&id=ee6007b6&scoped=true&");
/* harmony import */ var _EditLandlord_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EditLandlord.vue?vue&type=script&lang=js& */ "./resources/js/Views/Landlords/EditLandlord.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _EditLandlord_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
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

/***/ "./resources/js/Views/Landlords/EditLandlord.vue?vue&type=script&lang=js&":
/*!********************************************************************************!*\
  !*** ./resources/js/Views/Landlords/EditLandlord.vue?vue&type=script&lang=js& ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EditLandlord_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./EditLandlord.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Landlords/EditLandlord.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EditLandlord_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

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



/***/ })

}]);
//# sourceMappingURL=LandlordEditView.js.map