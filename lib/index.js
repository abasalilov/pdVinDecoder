"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMakesByYear = exports.getYears = exports.getNewModels = exports.DropDownMenuFetch = exports.models = exports.getAllMakes = exports.makeNHTSAReq = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var decode = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(vin) {
    var url, vinReq, vinResponse;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(vin === undefined || vin.length < 1 || vin === null)) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", { results: false });

          case 2:
            url = baseURL[0] + vin + baseURL[1];
            vinReq = makeNHTSAReq(url);
            _context.prev = 4;
            _context.next = 7;
            return vinReq();

          case 7:
            vinResponse = _context.sent;
            return _context.abrupt("return", sortData(vinResponse.data.Results[0]));

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](4);

            console.log("Error in the request", _context.t0);
            return _context.abrupt("return", _context.t0);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[4, 11]]);
  }));

  return function decode(_x) {
    return _ref.apply(this, arguments);
  };
}();

var getAllMakes = exports.getAllMakes = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var makesReq, makeResponse;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            makesReq = makeNHTSAReq("https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json");
            _context2.prev = 1;
            _context2.next = 4;
            return makesReq();

          case 4:
            makeResponse = _context2.sent;
            return _context2.abrupt("return", sortMakes(makeResponse.data.Results));

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

  return function getAllMakes() {
    return _ref2.apply(this, arguments);
  };
}();

var models = exports.models = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(make) {
    var url, modelsReq, modelsResponse;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            url = "https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeId/" + make + "?format=json";
            modelsReq = makeNHTSAReq(url);
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

  return function models(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

var getNewModels = exports.getNewModels = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(make) {
    var makesReq, makeResponse;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            makesReq = makeNHTSAReq("https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json");
            _context4.prev = 1;
            _context4.next = 4;
            return makesReq();

          case 4:
            makeResponse = _context4.sent;
            return _context4.abrupt("return", sortMakes(makeResponse.data.Results));

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](1);

            console.log("Error in the request", _context4.t0);
            return _context4.abrupt("return", _context4.t0);

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this, [[1, 8]]);
  }));

  return function getNewModels(_x3) {
    return _ref4.apply(this, arguments);
  };
}();

var getYears = exports.getYears = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
    var carQuery;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            carQuery = new _carQuery.CarQuery();
            return _context5.abrupt("return", carQuery.getYears().then(function (years) {
              return years;
            }));

          case 2:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function getYears() {
    return _ref5.apply(this, arguments);
  };
}();

var getMakesByYear = exports.getMakesByYear = function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(yr) {
    var carQuery, makeResults;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            carQuery = new _carQuery.CarQuery();
            _context6.next = 3;
            return carQuery.getMakes(yr).then(function (makes) {
              return makes;
            });

          case 3:
            makeResults = _context6.sent;
            return _context6.abrupt("return", makeResults);

          case 5:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function getMakesByYear(_x4) {
    return _ref6.apply(this, arguments);
  };
}();

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _carQuery = require("car-query");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var baseURL = ["https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValuesExtended/", "?format=json&modelyear="];

var makeNHTSAReq = exports.makeNHTSAReq = function makeNHTSAReq(url) {
  return _axios2.default.create({
    timeout: 10000,
    method: "get",
    url: url.replace(/\s/g, "")
  });
};

var sortData = function sortData(data) {
  var nonEmptyData = {};
  for (var key in data) {
    if (data[key] !== "") {
      nonEmptyData[key] = data[key];
    }
  }
  nonEmptyData["results"] = true;
  return nonEmptyData;
};

exports.default = decode;

var DropDownMenuFetch = exports.DropDownMenuFetch = function () {
  function DropDownMenuFetch() {
    _classCallCheck(this, DropDownMenuFetch);

    this.year = null;
    this.make = null;
    this.model = null;
  }

  _createClass(DropDownMenuFetch, [{
    key: "updateYear",
    value: function updateYear(yr) {
      this.year = yr;
    }
  }, {
    key: "updateMake",
    value: function updateMake(make) {
      this.make = make;
    }
  }]);

  return DropDownMenuFetch;
}();