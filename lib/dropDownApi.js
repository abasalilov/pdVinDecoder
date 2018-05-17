"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _carQuery = require("car-query");

var _index = require("./index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DropDown = function () {
  function DropDown() {
    _classCallCheck(this, DropDown);

    this.year = null;
    this.make = null;
    this.model_Name = null;
    this.model_ID = null;
    this.engSize = null;
    this.trims = null;
  }

  _createClass(DropDown, [{
    key: "sortMakes",
    value: function sortMakes(data) {
      return data.filter(function (a) {
        return a.isCommon === true;
      });
    }
  }, {
    key: "sortModels",
    value: function sortModels(data) {
      return data.sort(function (a, b) {
        if (a.name.toUpperCase() < b.name.toUpperCase()) return -1;
        if (a.name.toUpperCase() > b.name.toUpperCase()) return 1;
        return 0;
      });
    }
  }, {
    key: "setYear",
    value: function setYear(yr) {
      this.year = yr;
    }
  }, {
    key: "setMake",
    value: function setMake(make) {
      this.make = make;
    }
  }, {
    key: "setModel",
    value: function setModel(name) {
      this.model_Name = name;
    }
  }, {
    key: "setEngineSize",
    value: function setEngineSize(engSize) {
      this.engSize = engSize;
    }
  }, {
    key: "getYears",
    value: function getYears() {
      var years = { minYear: 1941, maxYear: new Date().getFullYear() };
      return years;
    }
  }, {
    key: "getNewModels",
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(make) {
        var carMakesReq, carMakesResponse;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                carMakesReq = (0, _index.makeNHTSAReq)("https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json");
                _context.prev = 1;
                _context.next = 4;
                return carMakesReq();

              case 4:
                carMakesResponse = _context.sent;
                return _context.abrupt("return", this.sortMakes(carMakesResponse.data.Results));

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](1);

                console.log("Error in the request", _context.t0);
                return _context.abrupt("return", _context.t0);

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 8]]);
      }));

      function getNewModels(_x) {
        return _ref.apply(this, arguments);
      }

      return getNewModels;
    }()
  }, {
    key: "getModelsByMake",
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(make) {
        var url, modelsReq, modelsResponse;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                url = "https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeId/" + make + "?format=json";
                modelsReq = (0, _index.makeNHTSAReq)(url);
                _context2.prev = 2;
                _context2.next = 5;
                return modelsReq();

              case 5:
                modelsResponse = _context2.sent;
                _context2.next = 12;
                break;

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](2);

                console.log("Error in the request", _context2.t0);
                return _context2.abrupt("return", _context2.t0);

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[2, 8]]);
      }));

      function getModelsByMake(_x2) {
        return _ref2.apply(this, arguments);
      }

      return getModelsByMake;
    }()
  }, {
    key: "getAllMakes",
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var makesReq, makeResponse;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                makesReq = (0, _index.makeNHTSAReq)("https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json");
                _context3.prev = 1;
                _context3.next = 4;
                return makesReq();

              case 4:
                makeResponse = _context3.sent;
                return _context3.abrupt("return", makeResponse.data.Results);

              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3["catch"](1);

                console.log("Error in the request", _context3.t0);
                return _context3.abrupt("return", _context3.t0);

              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[1, 8]]);
      }));

      function getAllMakes() {
        return _ref3.apply(this, arguments);
      }

      return getAllMakes;
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
    key: "getAllUSMakesByYear",
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(year) {
        var carQuery, makes;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                carQuery = new _carQuery.CarQuery();
                _context5.next = 4;
                return carQuery.getMakes().then(function (makes) {
                  return makes;
                });

              case 4:
                makes = _context5.sent;
                return _context5.abrupt("return", this.sortMakes(makes));

              case 8:
                _context5.prev = 8;
                _context5.t0 = _context5["catch"](0);

                console.log("Error in the request", _context5.t0);
                return _context5.abrupt("return", _context5.t0);

              case 12:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[0, 8]]);
      }));

      function getAllUSMakesByYear(_x4) {
        return _ref5.apply(this, arguments);
      }

      return getAllUSMakesByYear;
    }()
  }, {
    key: "getModels",
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var searchCriteria, carQuery, makes;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                // const modelsReq = makeNHTSAReq("https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/"+this.make+"/modelyear/"+this.year+"?format=json")
                // try {
                //   const modelsResponse = await modelsReq();
                //   return modelsResponse.data.Results;
                // } catch (e) {
                //   console.log("Error in the request", e);
                //   return e;
                // }

                searchCriteria = {
                  year: this.year,
                  make: this.make,
                  soldInUSA: true
                };
                _context6.prev = 1;
                carQuery = new _carQuery.CarQuery();
                _context6.next = 5;
                return carQuery.getModels(searchCriteria).then(function (makes) {
                  return makes;
                });

              case 5:
                makes = _context6.sent;
                return _context6.abrupt("return", makes);

              case 9:
                _context6.prev = 9;
                _context6.t0 = _context6["catch"](1);

                console.log("Error in the request", _context6.t0);
                return _context6.abrupt("return", _context6.t0);

              case 13:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[1, 9]]);
      }));

      function getModels() {
        return _ref6.apply(this, arguments);
      }

      return getModels;
    }()
  }, {
    key: "getTrims",
    value: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var _this = this;

        var trimsArr, searchCriteria, carQuery, engineData, data;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                trimsArr = [];
                searchCriteria = {
                  year: this.year,
                  make: this.make
                };
                carQuery = new _carQuery.CarQuery();
                _context7.next = 5;
                return carQuery.getTrims(searchCriteria).then(function (engineData) {
                  return engineData;
                });

              case 5:
                engineData = _context7.sent;
                _context7.next = 8;
                return carQuery.getModelDetail(17555).then(function (data) {
                  return data;
                });

              case 8:
                data = _context7.sent;

                engineData.forEach(function (trim) {
                  if (trim.name === _this.model_Name) {
                    console.log(trim.name);
                    trimsArr.push({ modelId: trim.modelId, engine: _this.getEngine(trim) });
                  };
                });
                this.trims = trimsArr;
                return _context7.abrupt("return", trimsArr);

              case 12:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function getTrims() {
        return _ref7.apply(this, arguments);
      }

      return getTrims;
    }()
  }, {
    key: "getModelData",
    value: function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(modelId) {
        var carQuery, data;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.prev = 0;
                carQuery = new _carQuery.CarQuery();
                _context8.next = 4;
                return carQuery.getModelDetail(modelId).then(function (data) {
                  return data;
                });

              case 4:
                data = _context8.sent;
                return _context8.abrupt("return", data);

              case 8:
                _context8.prev = 8;
                _context8.t0 = _context8["catch"](0);

                console.log("Error in the request", _context8.t0);
                return _context8.abrupt("return", _context8.t0);

              case 12:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this, [[0, 8]]);
      }));

      function getModelData(_x5) {
        return _ref8.apply(this, arguments);
      }

      return getModelData;
    }()
  }, {
    key: "getEngine",
    value: function getEngine(data) {
      console.log('data', data);
      var configs = {
        AA: data.engineLiters + "L " + data.engineCubicInches + "CI V" + data.engineCyclinders,
        AZ: data.engineCyclinders + " Cylinders " + data.engineValvesPerCylinder + " " + data.engineLiters + "L "
        //  : {
        //     AA: data.engineCubicInches + "CI V" + data.engineCyclinders,
        //     AZ: data.engineCyclinders +" Cylinders " + data.engineValvesPerCylinder,
        // } 
        // console.log('configs', configs)

      };return configs;
    }
  }]);

  return DropDown;
}();

// Most modern OHV engines have two valves per cylinder, 
// while many OHC engines can have three, four or even five valves per cylinder to achieve greater power.

// the DOHC engines usually have more valves per cylinder than the SOHC versions. 
// They will also usually have less parts involved (most DOHC directly actuate the valves, where SOHC usually have rocker arms). 


exports.default = DropDown;