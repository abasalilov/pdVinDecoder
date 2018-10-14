"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var decode = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(vin) {
    var url, vinReq, vinResponse, sortedVinResponse, Model, Make, ModelYear, recallURL, recallConfirm;
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
            vinReq = makeVinReq(url);
            _context.prev = 4;
            _context.next = 7;
            return vinReq();

          case 7:
            vinResponse = _context.sent;
            sortedVinResponse = sortData(vinResponse.data.Results[0]);
            Model = sortedVinResponse.Model, Make = sortedVinResponse.Make, ModelYear = sortedVinResponse.ModelYear;

            if (!(confirmValue(Model) && confirmValue(Make) && confirmValue(ModelYear))) {
              _context.next = 16;
              break;
            }

            recallURL = genRecallURL(ModelYear, Make, Model);
            _context.next = 14;
            return _axios2.default.get(recallURL);

          case 14:
            recallConfirm = _context.sent;

            if (recallConfirm.data.Count > 0) {
              sortedVinResponse.hasRecall = true;
              sortedVinResponse.recallDetails = recallConfirm.data.Results;
            } else {
              sortedVinResponse.hasRecall = false;
            }

          case 16:
            return _context.abrupt("return", sortedVinResponse);

          case 19:
            _context.prev = 19;
            _context.t0 = _context["catch"](4);

            console.log("Error in the request", _context.t0);
            return _context.abrupt("return", _context.t0);

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[4, 19]]);
  }));

  return function decode(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var confirmValue = function confirmValue(arg) {
  return typeof arg !== "undefined" ? true : false;
};

var genRecallURL = function genRecallURL(modelyear, make, model) {
  return "https://one.nhtsa.gov/webapi/api/Recalls/vehicle/modelyear/" + modelyear + "/make/" + make + "/model/" + model + "?format=json";
};

var baseURL = ["https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValuesExtended/", "?format=json&modelyear="];

var makeVinReq = function makeVinReq(url) {
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