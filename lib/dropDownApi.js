"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DropDownAPI = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _carQuery = require("car-query");

var _index = require("./index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DropDownAPI = exports.DropDownAPI = function () {
  function DropDownAPI() {
    _classCallCheck(this, DropDownAPI);

    this.year = null;
    this.make = null;
    this.model = null;
    this.engSize = null;
  }

  _createClass(DropDownAPI, [{
    key: "sortMakes",
    value: function sortMakes(data) {
      // const nonEmptyData = {};
      // for (const key in data) {
      //   if (data[key] !== "") {
      //     nonEmptyData[key] = data[key];
      //   }
      // }
      // nonEmptyData["results"] = true;
      // return nonEmptyData;
      console.log('data', data);
    }
  }, {
    key: "updateYear",
    value: function updateYear(yr) {
      this.year = yr;
    }
  }, {
    key: "updateMake",
    value: function updateMake(make) {
      this.make = make;
    }
  }, {
    key: "updateModel",
    value: function updateModel(model) {
      this.model = model;
    }
  }, {
    key: "updateEngineSize",
    value: function updateEngineSize(engSize) {
      this.engSize = engSize;
    }
  }, {
    key: "getAvailableYears",
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var carQuery;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                carQuery = new _carQuery.CarQuery();
                return _context.abrupt("return", carQuery.getYears().then(function (years) {
                  return years;
                }));

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getAvailableYears() {
        return _ref.apply(this, arguments);
      }

      return getAvailableYears;
    }()
  }, {
    key: "getNewModels",
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(make) {
        var carMakesReq, carMakesResponse;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                carMakesReq = (0, _index.makeNHTSAReq)("https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json");
                _context2.prev = 1;
                _context2.next = 4;
                return carMakesReq();

              case 4:
                carMakesResponse = _context2.sent;
                return _context2.abrupt("return", sortMakes(carMakesResponse.data.Results));

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](1);

                console.log("Error in the request", _context2.t0);
                return _context2.abrupt("return", _context2.t0);

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 8]]);
      }));

      function getNewModels(_x) {
        return _ref2.apply(this, arguments);
      }

      return getNewModels;
    }()
  }, {
    key: "getModelsByMake",
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(make) {
        var url, modelsReq, modelsResponse;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                url = "https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeId/" + make + "?format=json";
                modelsReq = (0, _index.makeNHTSAReq)(url);
                _context3.prev = 2;
                _context3.next = 5;
                return modelsReq();

              case 5:
                modelsResponse = _context3.sent;
                _context3.next = 12;
                break;

              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3["catch"](2);

                console.log("Error in the request", _context3.t0);
                return _context3.abrupt("return", _context3.t0);

              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[2, 8]]);
      }));

      function getModelsByMake(_x2) {
        return _ref3.apply(this, arguments);
      }

      return getModelsByMake;
    }()
  }, {
    key: "getMakesByYear",
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(yr) {
        var carQuery, makeResults;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                carQuery = new _carQuery.CarQuery();
                _context4.next = 3;
                return carQuery.getMakes(yr).then(function (makes) {
                  return makes;
                });

              case 3:
                makeResults = _context4.sent;
                return _context4.abrupt("return", makeResults);

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getMakesByYear(_x3) {
        return _ref4.apply(this, arguments);
      }

      return getMakesByYear;
    }()
  }, {
    key: "getAllMakes",
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var makesReq, makeResponse;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                makesReq = (0, _index.makeNHTSAReq)("https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json");
                _context5.prev = 1;
                _context5.next = 4;
                return makesReq();

              case 4:
                makeResponse = _context5.sent;
                return _context5.abrupt("return", sortMakes(makeResponse.data.Results));

              case 8:
                _context5.prev = 8;
                _context5.t0 = _context5["catch"](1);

                console.log("Error in the request", _context5.t0);
                return _context5.abrupt("return", _context5.t0);

              case 12:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[1, 8]]);
      }));

      function getAllMakes() {
        return _ref5.apply(this, arguments);
      }

      return getAllMakes;
    }()
  }]);

  return DropDownAPI;
}();