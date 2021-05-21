(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["LandlordDetailView"],{

/***/ "./node_modules/ts-loader/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Landlords/DetailLandlord.vue?vue&type=script&lang=ts&":
/*!*********************************************************************************************************************************************************************!*\
  !*** ./node_modules/ts-loader??ref--5!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Views/Landlords/DetailLandlord.vue?vue&type=script&lang=ts& ***!
  \*********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var _API_LandlordAPI__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../API/LandlordAPI */ "./resources/js/API/LandlordAPI.ts");
/* harmony import */ var _Store_modules_AppState__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Store/modules/AppState */ "./resources/js/Store/modules/AppState.js");
/* harmony import */ var _Store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Store */ "./resources/js/Store/index.js");
/* harmony import */ var _Store_ActionTypes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../Store/ActionTypes */ "./resources/js/Store/ActionTypes.js");
/* harmony import */ var _Models_LandlordClass__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../Models/LandlordClass */ "./resources/js/Models/LandlordClass.ts");
/* harmony import */ var _Models_TenantClass__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../Models/TenantClass */ "./resources/js/Models/TenantClass.ts");
/* harmony import */ var _Models_PropertyClass__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../Models/PropertyClass */ "./resources/js/Models/PropertyClass.ts");
/* harmony import */ var _Store_modules_AuthenticationState__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../Store/modules/AuthenticationState */ "./resources/js/Store/modules/AuthenticationState.js");
/* harmony import */ var _Store_GetterTypes__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../Store/GetterTypes */ "./resources/js/Store/GetterTypes.js");
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");












/* harmony default export */ __webpack_exports__["default"] = (vue__WEBPACK_IMPORTED_MODULE_1__["default"].extend({
    data: function () {
        return {
            error: null,
            saved: false,
            landlord: new _Models_LandlordClass__WEBPACK_IMPORTED_MODULE_6__["default"]("", "", ""),
            tenants: [],
            addingTenant: false,
            newTenant: new _Models_TenantClass__WEBPACK_IMPORTED_MODULE_7__["default"]("", "", ""),
            addingProperty: false,
            properties: [],
            newProperty: new _Models_PropertyClass__WEBPACK_IMPORTED_MODULE_8__["default"]("", "", "", "", ""),
        };
    },
    computed: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, Object(vuex__WEBPACK_IMPORTED_MODULE_11__["mapGetters"])(_Store_modules_AppState__WEBPACK_IMPORTED_MODULE_3__["APP_MODULE"], { mobile: _Store_GetterTypes__WEBPACK_IMPORTED_MODULE_10__["MOBILE_WIDTH"] })), { IsYours: function () {
            return this.$store.getters[_Store_modules_AuthenticationState__WEBPACK_IMPORTED_MODULE_9__["AUTH_MODULE"] + "/" + _Store_GetterTypes__WEBPACK_IMPORTED_MODULE_10__["IS_ADMIN"]]
                ? this.landlord.first_name + " " + this.landlord.surname + "'s"
                : "Your";
        },
        AddOrCancelTenant: function () {
            return this.addingTenant ? "Cancel New Tenant" : "Add New Tenant";
        },
        AddOrCancelProperty: function () {
            return this.addingProperty ? "Cancel New Property" : "Add New Property";
        } }),
    beforeRouteEnter: function (to, from, next) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                _Store__WEBPACK_IMPORTED_MODULE_4__["default"].dispatch(_Store_modules_AppState__WEBPACK_IMPORTED_MODULE_3__["APP_MODULE"] + "/" + _Store_ActionTypes__WEBPACK_IMPORTED_MODULE_5__["BEGIN_LOAD"], true); //* Start loading
                _API_LandlordAPI__WEBPACK_IMPORTED_MODULE_2__["landlordAPI"].GetByID(parseInt(to.params.id), function (data, err) {
                    var _a;
                    if (((_a = data) === null || _a === void 0 ? void 0 : _a.status) === 403) {
                        next(false);
                    }
                    else {
                        next((function (vm) { return vm.SetData(data, err); }));
                    }
                });
                return [2 /*return*/];
            });
        });
    },
    methods: {
        SetData: function (data, err) {
            if (err)
                this.error = err.toString();
            else if (data) {
                this.tenants = data.tenants;
                this.properties = data.properties;
                this.landlord = data.landlord;
                // this.landlord = data['landlord'] as Landlord; //? Originall done this way since IDE guesses wrong
            }
        }
    }
}));


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Landlords/DetailLandlord.vue?vue&type=template&id=0b7bbf2c&":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Views/Landlords/DetailLandlord.vue?vue&type=template&id=0b7bbf2c& ***!
  \**********************************************************************************************************************************************************************************************************************/
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
      _c(
        "header-back-button",
        {
          attrs: {
            breadcrumb: "",
            reverse: "",
            headerClasses: [_vm.mobile ? "m-sm-l" : "m-md-l"]
          }
        },
        [_vm._v("\n    " + _vm._s(_vm.IsYours) + " Details\n  ")]
      ),
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
          attrs: { type: "button" },
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
                    "entity-name": "Tenant"
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
          attrs: { type: "button" },
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
                    "entity-name": "Tenant"
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

/***/ "./resources/js/Models/PropertyClass.ts":
/*!**********************************************!*\
  !*** ./resources/js/Models/PropertyClass.ts ***!
  \**********************************************/
/*! exports provided: default, PropertyWithImg */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyWithImg", function() { return PropertyWithImg; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _AbstractDbRecord__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AbstractDbRecord */ "./resources/js/Models/AbstractDbRecord.ts");


var Property = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(Property, _super);
    function Property(street, city, state, postal_code, //* Other countries often include # & letters!
    additional_info, landlord_id, id, created_at, updated_at) {
        var _this = _super.call(this, id, created_at, updated_at) || this;
        _this.street = street;
        _this.city = city;
        _this.state = state;
        _this.postal_code = postal_code;
        _this.additional_info = additional_info;
        _this.landlord_id = landlord_id;
        return _this;
    }
    return Property;
}(_AbstractDbRecord__WEBPACK_IMPORTED_MODULE_1__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (Property);
var PropertyWithImg = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(PropertyWithImg, _super);
    function PropertyWithImg(street, city, state, postal_code, //* Other countries often include # & letters!
    additional_info, img, landlord_id, id, created_at, updated_at) {
        var _this = _super.call(this, street, city, state, postal_code, additional_info, landlord_id, id, created_at, updated_at) || this;
        _this.img = img;
        return _this;
    }
    return PropertyWithImg;
}(Property));



/***/ }),

/***/ "./resources/js/Views/Landlords/DetailLandlord.vue":
/*!*********************************************************!*\
  !*** ./resources/js/Views/Landlords/DetailLandlord.vue ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DetailLandlord_vue_vue_type_template_id_0b7bbf2c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DetailLandlord.vue?vue&type=template&id=0b7bbf2c& */ "./resources/js/Views/Landlords/DetailLandlord.vue?vue&type=template&id=0b7bbf2c&");
/* harmony import */ var _DetailLandlord_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DetailLandlord.vue?vue&type=script&lang=ts& */ "./resources/js/Views/Landlords/DetailLandlord.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _DetailLandlord_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _DetailLandlord_vue_vue_type_template_id_0b7bbf2c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _DetailLandlord_vue_vue_type_template_id_0b7bbf2c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Views/Landlords/DetailLandlord.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/Views/Landlords/DetailLandlord.vue?vue&type=script&lang=ts&":
/*!**********************************************************************************!*\
  !*** ./resources/js/Views/Landlords/DetailLandlord.vue?vue&type=script&lang=ts& ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_5_node_modules_vue_loader_lib_index_js_vue_loader_options_DetailLandlord_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/ts-loader??ref--5!../../../../node_modules/vue-loader/lib??vue-loader-options!./DetailLandlord.vue?vue&type=script&lang=ts& */ "./node_modules/ts-loader/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Landlords/DetailLandlord.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_5_node_modules_vue_loader_lib_index_js_vue_loader_options_DetailLandlord_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Views/Landlords/DetailLandlord.vue?vue&type=template&id=0b7bbf2c&":
/*!****************************************************************************************!*\
  !*** ./resources/js/Views/Landlords/DetailLandlord.vue?vue&type=template&id=0b7bbf2c& ***!
  \****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DetailLandlord_vue_vue_type_template_id_0b7bbf2c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./DetailLandlord.vue?vue&type=template&id=0b7bbf2c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Views/Landlords/DetailLandlord.vue?vue&type=template&id=0b7bbf2c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DetailLandlord_vue_vue_type_template_id_0b7bbf2c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DetailLandlord_vue_vue_type_template_id_0b7bbf2c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=LandlordDetailView.js.map