"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var vinDecoder = function () {
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
            url = _index.baseURL[0] + vin + _index.baseURL[1];
            vinReq = (0, _index.makeNHTSAReq)(url);
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

  return function vinDecoder(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _index = require("./index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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

exports.default = vinDecoder;