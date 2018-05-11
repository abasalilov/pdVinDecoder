'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DropDownAPI = exports.decoder = exports.makeNHTSAReq = exports.baseURL = undefined;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _vinDecoder = require('./vinDecoder');

var _vinDecoder2 = _interopRequireDefault(_vinDecoder);

var _dropDownApi = require('./dropDownApi');

var _dropDownApi2 = _interopRequireDefault(_dropDownApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var baseURL = exports.baseURL = ["https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValuesExtended/", "?format=json&modelyear="];

var makeNHTSAReq = exports.makeNHTSAReq = function makeNHTSAReq(url) {
  return _axios2.default.create({
    timeout: 10000,
    method: "get",
    url: url.replace(/\s/g, "")
  });
};

var decoder = exports.decoder = _vinDecoder2.default;
var DropDownAPI = exports.DropDownAPI = _dropDownApi2.default;