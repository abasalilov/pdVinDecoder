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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJ2aW4iLCJ1bmRlZmluZWQiLCJsZW5ndGgiLCJyZXN1bHRzIiwidXJsIiwiYmFzZVVSTCIsInZpblJlcSIsIm1ha2VWaW5SZXEiLCJ2aW5SZXNwb25zZSIsInNvcnRlZFZpblJlc3BvbnNlIiwic29ydERhdGEiLCJkYXRhIiwiUmVzdWx0cyIsIk1vZGVsIiwiTWFrZSIsIk1vZGVsWWVhciIsImNvbmZpcm1WYWx1ZSIsInJlY2FsbFVSTCIsImdlblJlY2FsbFVSTCIsImdldCIsInJlY2FsbENvbmZpcm0iLCJDb3VudCIsImhhc1JlY2FsbCIsInJlY2FsbERldGFpbHMiLCJjb25zb2xlIiwibG9nIiwiZGVjb2RlIiwiYXJnIiwibW9kZWx5ZWFyIiwibWFrZSIsIm1vZGVsIiwiY3JlYXRlIiwidGltZW91dCIsIm1ldGhvZCIsInJlcGxhY2UiLCJub25FbXB0eURhdGEiLCJrZXkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7cUVBOEJBLGlCQUFzQkEsR0FBdEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsa0JBQ01BLFFBQVFDLFNBQVIsSUFBcUJELElBQUlFLE1BQUosR0FBYSxDQUFsQyxJQUF1Q0YsUUFBUSxJQURyRDtBQUFBO0FBQUE7QUFBQTs7QUFBQSw2Q0FFVyxFQUFFRyxTQUFTLEtBQVgsRUFGWDs7QUFBQTtBQUlRQyxlQUpSLEdBSWNDLFFBQVEsQ0FBUixJQUFhTCxHQUFiLEdBQW1CSyxRQUFRLENBQVIsQ0FKakM7QUFLUUMsa0JBTFIsR0FLaUJDLFdBQVdILEdBQVgsQ0FMakI7QUFBQTtBQUFBO0FBQUEsbUJBTzhCRSxRQVA5Qjs7QUFBQTtBQU9VRSx1QkFQVjtBQVFVQyw2QkFSVixHQVE4QkMsU0FBU0YsWUFBWUcsSUFBWixDQUFpQkMsT0FBakIsQ0FBeUIsQ0FBekIsQ0FBVCxDQVI5QjtBQVNZQyxpQkFUWixHQVN1Q0osaUJBVHZDLENBU1lJLEtBVFosRUFTbUJDLElBVG5CLEdBU3VDTCxpQkFUdkMsQ0FTbUJLLElBVG5CLEVBU3lCQyxTQVR6QixHQVN1Q04saUJBVHZDLENBU3lCTSxTQVR6Qjs7QUFBQSxrQkFVUUMsYUFBYUgsS0FBYixLQUF1QkcsYUFBYUYsSUFBYixDQUF2QixJQUE2Q0UsYUFBYUQsU0FBYixDQVZyRDtBQUFBO0FBQUE7QUFBQTs7QUFXWUUscUJBWFosR0FXd0JDLGFBQWFILFNBQWIsRUFBd0JELElBQXhCLEVBQThCRCxLQUE5QixDQVh4QjtBQUFBO0FBQUEsbUJBWWtDLGdCQUFNTSxHQUFOLENBQVVGLFNBQVYsQ0FabEM7O0FBQUE7QUFZWUcseUJBWlo7O0FBYU0sZ0JBQUlBLGNBQWNULElBQWQsQ0FBbUJVLEtBQW5CLEdBQTJCLENBQS9CLEVBQWtDO0FBQ2hDWixnQ0FBa0JhLFNBQWxCLEdBQThCLElBQTlCO0FBQ0FiLGdDQUFrQmMsYUFBbEIsR0FBa0NILGNBQWNULElBQWQsQ0FBbUJDLE9BQXJEO0FBQ0QsYUFIRCxNQUdPO0FBQ0xILGdDQUFrQmEsU0FBbEIsR0FBOEIsS0FBOUI7QUFDRDs7QUFsQlA7QUFBQSw2Q0FvQldiLGlCQXBCWDs7QUFBQTtBQUFBO0FBQUE7O0FBc0JJZSxvQkFBUUMsR0FBUixDQUFZLHNCQUFaO0FBdEJKOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEc7O2tCQUFlQyxNOzs7OztBQTlCZjs7Ozs7Ozs7QUFFQSxJQUFNVixlQUFlLFNBQWZBLFlBQWU7QUFBQSxTQUFRLE9BQU9XLEdBQVAsS0FBZSxXQUFmLEdBQTZCLElBQTdCLEdBQW9DLEtBQTVDO0FBQUEsQ0FBckI7O0FBRUEsSUFBTVQsZUFBZSxTQUFmQSxZQUFlLENBQUNVLFNBQUQsRUFBWUMsSUFBWixFQUFrQkMsS0FBbEI7QUFBQSx5RUFDMkNGLFNBRDNDLGNBQzZEQyxJQUQ3RCxlQUMyRUMsS0FEM0U7QUFBQSxDQUFyQjs7QUFHQSxJQUFNekIsVUFBVSxDQUNkLGtFQURjLEVBRWQseUJBRmMsQ0FBaEI7O0FBS0EsSUFBTUUsYUFBYSxTQUFiQSxVQUFhO0FBQUEsU0FDakIsZ0JBQU13QixNQUFOLENBQWE7QUFDWEMsYUFBUyxLQURFO0FBRVhDLFlBQVEsS0FGRztBQUdYN0IsU0FBS0EsSUFBSThCLE9BQUosQ0FBWSxLQUFaLEVBQW1CLEVBQW5CO0FBSE0sR0FBYixDQURpQjtBQUFBLENBQW5COztBQU9BLElBQU14QixXQUFXLFNBQVhBLFFBQVcsT0FBUTtBQUN2QixNQUFNeUIsZUFBZSxFQUFyQjtBQUNBLE9BQUssSUFBTUMsR0FBWCxJQUFrQnpCLElBQWxCLEVBQXdCO0FBQ3RCLFFBQUlBLEtBQUt5QixHQUFMLE1BQWMsRUFBbEIsRUFBc0I7QUFDcEJELG1CQUFhQyxHQUFiLElBQW9CekIsS0FBS3lCLEdBQUwsQ0FBcEI7QUFDRDtBQUNGO0FBQ0RELGVBQWEsU0FBYixJQUEwQixJQUExQjtBQUNBLFNBQU9BLFlBQVA7QUFDRCxDQVREOztrQkFzQ2VULE0iLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXhpb3MgZnJvbSBcImF4aW9zXCI7XG5cbmNvbnN0IGNvbmZpcm1WYWx1ZSA9IGFyZyA9PiAodHlwZW9mIGFyZyAhPT0gXCJ1bmRlZmluZWRcIiA/IHRydWUgOiBmYWxzZSk7XG5cbmNvbnN0IGdlblJlY2FsbFVSTCA9IChtb2RlbHllYXIsIG1ha2UsIG1vZGVsKSA9PlxuICBgaHR0cHM6Ly9vbmUubmh0c2EuZ292L3dlYmFwaS9hcGkvUmVjYWxscy92ZWhpY2xlL21vZGVseWVhci8ke21vZGVseWVhcn0vbWFrZS8ke21ha2V9L21vZGVsLyR7bW9kZWx9P2Zvcm1hdD1qc29uYDtcblxuY29uc3QgYmFzZVVSTCA9IFtcbiAgXCJodHRwczovL3ZwaWMubmh0c2EuZG90Lmdvdi9hcGkvdmVoaWNsZXMvRGVjb2RlVmluVmFsdWVzRXh0ZW5kZWQvXCIsXG4gIFwiP2Zvcm1hdD1qc29uJm1vZGVseWVhcj1cIlxuXTtcblxuY29uc3QgbWFrZVZpblJlcSA9IHVybCA9PlxuICBheGlvcy5jcmVhdGUoe1xuICAgIHRpbWVvdXQ6IDEwMDAwLFxuICAgIG1ldGhvZDogXCJnZXRcIixcbiAgICB1cmw6IHVybC5yZXBsYWNlKC9cXHMvZywgXCJcIilcbiAgfSk7XG5cbmNvbnN0IHNvcnREYXRhID0gZGF0YSA9PiB7XG4gIGNvbnN0IG5vbkVtcHR5RGF0YSA9IHt9O1xuICBmb3IgKGNvbnN0IGtleSBpbiBkYXRhKSB7XG4gICAgaWYgKGRhdGFba2V5XSAhPT0gXCJcIikge1xuICAgICAgbm9uRW1wdHlEYXRhW2tleV0gPSBkYXRhW2tleV07XG4gICAgfVxuICB9XG4gIG5vbkVtcHR5RGF0YVtcInJlc3VsdHNcIl0gPSB0cnVlO1xuICByZXR1cm4gbm9uRW1wdHlEYXRhO1xufTtcblxuYXN5bmMgZnVuY3Rpb24gZGVjb2RlKHZpbikge1xuICBpZiAodmluID09PSB1bmRlZmluZWQgfHwgdmluLmxlbmd0aCA8IDEgfHwgdmluID09PSBudWxsKSB7XG4gICAgcmV0dXJuIHsgcmVzdWx0czogZmFsc2UgfTtcbiAgfVxuICBjb25zdCB1cmwgPSBiYXNlVVJMWzBdICsgdmluICsgYmFzZVVSTFsxXTtcbiAgY29uc3QgdmluUmVxID0gbWFrZVZpblJlcSh1cmwpO1xuICB0cnkge1xuICAgIGNvbnN0IHZpblJlc3BvbnNlID0gYXdhaXQgdmluUmVxKCk7XG4gICAgY29uc3Qgc29ydGVkVmluUmVzcG9uc2UgPSBzb3J0RGF0YSh2aW5SZXNwb25zZS5kYXRhLlJlc3VsdHNbMF0pO1xuICAgIGNvbnN0IHsgTW9kZWwsIE1ha2UsIE1vZGVsWWVhciB9ID0gc29ydGVkVmluUmVzcG9uc2U7XG4gICAgaWYgKGNvbmZpcm1WYWx1ZShNb2RlbCkgJiYgY29uZmlybVZhbHVlKE1ha2UpICYmIGNvbmZpcm1WYWx1ZShNb2RlbFllYXIpKSB7XG4gICAgICBjb25zdCByZWNhbGxVUkwgPSBnZW5SZWNhbGxVUkwoTW9kZWxZZWFyLCBNYWtlLCBNb2RlbCk7XG4gICAgICBjb25zdCByZWNhbGxDb25maXJtID0gYXdhaXQgYXhpb3MuZ2V0KHJlY2FsbFVSTCk7XG4gICAgICBpZiAocmVjYWxsQ29uZmlybS5kYXRhLkNvdW50ID4gMCkge1xuICAgICAgICBzb3J0ZWRWaW5SZXNwb25zZS5oYXNSZWNhbGwgPSB0cnVlO1xuICAgICAgICBzb3J0ZWRWaW5SZXNwb25zZS5yZWNhbGxEZXRhaWxzID0gcmVjYWxsQ29uZmlybS5kYXRhLlJlc3VsdHM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzb3J0ZWRWaW5SZXNwb25zZS5oYXNSZWNhbGwgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHNvcnRlZFZpblJlc3BvbnNlO1xuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS5sb2coXCJFcnJvciBpbiB0aGUgcmVxdWVzdFwiLCBlKTtcbiAgICByZXR1cm4gZTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBkZWNvZGU7XG4iXX0=