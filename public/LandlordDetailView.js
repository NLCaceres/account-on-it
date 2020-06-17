(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["LandlordDetailView"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Landlords/DetailLandlord.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Views/Landlords/DetailLandlord.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _API_LandlordAPI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../API/LandlordAPI */ "./resources/js/API/LandlordAPI.js");


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
      loggedIn: false,
      loading: false,
      saving: false,
      error: null,
      saved: false,
      landlord: {
        id: null,
        first_name: "",
        surname: "",
        email: ""
      },
      tenants: [],
      addingTenant: false,
      newTenant: {
        first_name: "",
        surname: "",
        email: ""
      },
      tenantValidationErrs: {
        first_name: [],
        surname: [],
        email: []
      },
      addingProperty: false,
      properties: [],
      newProperty: {
        house_number: 0,
        street: "",
        state: "",
        zipcode: 0,
        additional_info: 0
      },
      propertyValidationErrs: {
        house_number: [],
        street: [],
        state: [],
        zipcode: [],
        additional_info: []
      }
    };
  },
  computed: {
    IsYours: function IsYours() {
      return this.loggedIn ? "Your" : "".concat(this.landlord.first_name, " ").concat(this.landlord.surname, "'s");
    },
    AddOrCancelTenant: function AddOrCancelTenant() {
      return this.addingTenant ? "Cancel New Tenant" : "Add New Tenant";
    },
    AddOrCancelProperty: function AddOrCancelProperty() {
      return this.addingProperty ? "Cancel New Property" : "Add New Property";
    }
  },
  created: function created() {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
      var dataResponse;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _API_LandlordAPI__WEBPACK_IMPORTED_MODULE_1__["default"].find(_this.$route.params.id);

            case 3:
              dataResponse = _context.sent.data;
              _this.tenants = dataResponse.tenants;
              delete dataResponse.tenants;
              _this.properties = dataResponse.properties;
              delete dataResponse.properties;
              _this.landlord = dataResponse;
              _context.next = 14;
              break;

            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](0);
              _this.error = _context.t0.response.data.message || _context.t0.message;

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 11]]);
    }))();
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Landlords/DetailLandlord.vue?vue&type=template&id=0b7bbf2c&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Views/Landlords/DetailLandlord.vue?vue&type=template&id=0b7bbf2c&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************/
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
    [
      _c("header-back-button", [_vm._v("Landlord Details")]),
      _vm._v(" "),
      _c("model-display", {
        staticClass: "m-lg-b",
        attrs: { entity: _vm.landlord, "entity-name": "Landlord" }
      }),
      _vm._v(" "),
      _c(
        "button",
        {
          staticClass: "ui inverted button app-blue m-md-l",
          on: {
            click: function($event) {
              _vm.addingTenant = !_vm.addingTenant
            }
          }
        },
        [_vm._v(_vm._s(_vm.AddOrCancelTenant))]
      ),
      _vm._v(" "),
      _c("transition", { attrs: { name: "fade", mode: "out-in" } }, [
        !_vm.addingTenant
          ? _c(
              "div",
              {
                key: "landlord-tenant-table",
                staticClass: "m-md-t",
                attrs: { id: "landlord-tenant-table" }
              },
              [
                _c("h1", [_vm._v(_vm._s(_vm.IsYours) + " Tenants")]),
                _vm._v(" "),
                _c("model-table", {
                  attrs: {
                    entities: _vm.tenants,
                    "entity-name": "Tenant",
                    "plural-entity": "Tenants"
                  }
                })
              ],
              1
            )
          : _c(
              "div",
              {
                key: "landlord-tenant-form",
                staticClass: "m-sm-y",
                attrs: { id: "landlord-tenant-form" }
              },
              [
                _c("h1", [_vm._v("New Tenant")]),
                _vm._v(" "),
                _c("model-form", {
                  attrs: {
                    "new-entity": "",
                    entity: _vm.newTenant,
                    "entity-name": "Tenant",
                    "validation-errors": _vm.tenantValidationErrs
                  },
                  on: { edit: _vm.CallTenantAPI }
                })
              ],
              1
            )
      ]),
      _vm._v(" "),
      _c(
        "button",
        {
          staticClass: "ui inverted button app-blue m-md-t m-md-l",
          on: {
            click: function($event) {
              _vm.addingProperty = !_vm.addingProperty
            }
          }
        },
        [_vm._v(_vm._s(_vm.AddOrCancelProperty))]
      ),
      _vm._v(" "),
      _c("transition", { attrs: { name: "fade", mode: "out-in" } }, [
        !_vm.addingProperty
          ? _c(
              "div",
              { key: "landlord-property-table", staticClass: "m-md-y" },
              [
                _c("h1", [_vm._v(_vm._s(_vm.IsYours) + " Properties")]),
                _vm._v(" "),
                _c("model-table", {
                  attrs: {
                    entities: _vm.properties,
                    "entity-name": "Property",
                    "plural-entity": "Properties"
                  }
                })
              ],
              1
            )
          : _c(
              "div",
              { key: "landlord-property-form", staticClass: "m-md-y" },
              [
                _c("h1", [_vm._v("New Property")]),
                _vm._v(" "),
                _c("model-form", {
                  attrs: {
                    "new-entity": "",
                    entity: _vm.newProperty,
                    "entity-name": "Tenant",
                    "validation-errors": _vm.propertyValidationErrs
                  },
                  on: { edit: _vm.CallPropertyAPI }
                })
              ],
              1
            )
      ])
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/Views/Landlords/DetailLandlord.vue":
/*!*********************************************************!*\
  !*** ./resources/js/Views/Landlords/DetailLandlord.vue ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DetailLandlord_vue_vue_type_template_id_0b7bbf2c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DetailLandlord.vue?vue&type=template&id=0b7bbf2c&scoped=true& */ "./resources/js/Views/Landlords/DetailLandlord.vue?vue&type=template&id=0b7bbf2c&scoped=true&");
/* harmony import */ var _DetailLandlord_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DetailLandlord.vue?vue&type=script&lang=js& */ "./resources/js/Views/Landlords/DetailLandlord.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _DetailLandlord_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _DetailLandlord_vue_vue_type_template_id_0b7bbf2c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _DetailLandlord_vue_vue_type_template_id_0b7bbf2c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "0b7bbf2c",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Views/Landlords/DetailLandlord.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/Views/Landlords/DetailLandlord.vue?vue&type=script&lang=js&":
/*!**********************************************************************************!*\
  !*** ./resources/js/Views/Landlords/DetailLandlord.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DetailLandlord_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./DetailLandlord.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Landlords/DetailLandlord.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DetailLandlord_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Views/Landlords/DetailLandlord.vue?vue&type=template&id=0b7bbf2c&scoped=true&":
/*!****************************************************************************************************!*\
  !*** ./resources/js/Views/Landlords/DetailLandlord.vue?vue&type=template&id=0b7bbf2c&scoped=true& ***!
  \****************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DetailLandlord_vue_vue_type_template_id_0b7bbf2c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./DetailLandlord.vue?vue&type=template&id=0b7bbf2c&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Landlords/DetailLandlord.vue?vue&type=template&id=0b7bbf2c&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DetailLandlord_vue_vue_type_template_id_0b7bbf2c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DetailLandlord_vue_vue_type_template_id_0b7bbf2c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=LandlordDetailView.js.map