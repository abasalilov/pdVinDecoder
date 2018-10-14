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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJ2aW4iLCJ1bmRlZmluZWQiLCJsZW5ndGgiLCJyZXN1bHRzIiwidXJsIiwiYmFzZVVSTCIsInZpblJlcSIsIm1ha2VWaW5SZXEiLCJ2aW5SZXNwb25zZSIsInNvcnRlZFZpblJlc3BvbnNlIiwic29ydERhdGEiLCJkYXRhIiwiUmVzdWx0cyIsIk1vZGVsIiwiTWFrZSIsIk1vZGVsWWVhciIsImNvbmZpcm1WYWx1ZSIsInJlY2FsbFVSTCIsImdlblJlY2FsbFVSTCIsImF4aW9zIiwiZ2V0IiwicmVjYWxsQ29uZmlybSIsIkNvdW50IiwiaGFzUmVjYWxsIiwicmVjYWxsRGV0YWlscyIsImNvbnNvbGUiLCJsb2ciLCJkZWNvZGUiLCJhcmciLCJtb2RlbHllYXIiLCJtYWtlIiwibW9kZWwiLCJjcmVhdGUiLCJ0aW1lb3V0IiwibWV0aG9kIiwicmVwbGFjZSIsIm5vbkVtcHR5RGF0YSIsImtleSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztxRUE4QkEsaUJBQXNCQSxHQUF0QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxrQkFDTUEsUUFBUUMsU0FBUixJQUFxQkQsSUFBSUUsTUFBSixHQUFhLENBQWxDLElBQXVDRixRQUFRLElBRHJEO0FBQUE7QUFBQTtBQUFBOztBQUFBLDZDQUVXLEVBQUVHLFNBQVMsS0FBWCxFQUZYOztBQUFBO0FBSVFDLGVBSlIsR0FJY0MsUUFBUSxDQUFSLElBQWFMLEdBQWIsR0FBbUJLLFFBQVEsQ0FBUixDQUpqQztBQUtRQyxrQkFMUixHQUtpQkMsV0FBV0gsR0FBWCxDQUxqQjtBQUFBO0FBQUE7QUFBQSxtQkFPOEJFLFFBUDlCOztBQUFBO0FBT1VFLHVCQVBWO0FBUVVDLDZCQVJWLEdBUThCQyxTQUFTRixZQUFZRyxJQUFaLENBQWlCQyxPQUFqQixDQUF5QixDQUF6QixDQUFULENBUjlCO0FBU1lDLGlCQVRaLEdBU3VDSixpQkFUdkMsQ0FTWUksS0FUWixFQVNtQkMsSUFUbkIsR0FTdUNMLGlCQVR2QyxDQVNtQkssSUFUbkIsRUFTeUJDLFNBVHpCLEdBU3VDTixpQkFUdkMsQ0FTeUJNLFNBVHpCOztBQUFBLGtCQVVRQyxhQUFhSCxLQUFiLEtBQXVCRyxhQUFhRixJQUFiLENBQXZCLElBQTZDRSxhQUFhRCxTQUFiLENBVnJEO0FBQUE7QUFBQTtBQUFBOztBQVdZRSxxQkFYWixHQVd3QkMsYUFBYUgsU0FBYixFQUF3QkQsSUFBeEIsRUFBOEJELEtBQTlCLENBWHhCO0FBQUE7QUFBQSxtQkFZa0NNLGdCQUFNQyxHQUFOLENBQVVILFNBQVYsQ0FabEM7O0FBQUE7QUFZWUkseUJBWlo7O0FBYU0sZ0JBQUlBLGNBQWNWLElBQWQsQ0FBbUJXLEtBQW5CLEdBQTJCLENBQS9CLEVBQWtDO0FBQ2hDYixnQ0FBa0JjLFNBQWxCLEdBQThCLElBQTlCO0FBQ0FkLGdDQUFrQmUsYUFBbEIsR0FBa0NILGNBQWNWLElBQWQsQ0FBbUJDLE9BQXJEO0FBQ0QsYUFIRCxNQUdPO0FBQ0xILGdDQUFrQmMsU0FBbEIsR0FBOEIsS0FBOUI7QUFDRDs7QUFsQlA7QUFBQSw2Q0FvQldkLGlCQXBCWDs7QUFBQTtBQUFBO0FBQUE7O0FBc0JJZ0Isb0JBQVFDLEdBQVIsQ0FBWSxzQkFBWjtBQXRCSjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHOztrQkFBZUMsTTs7Ozs7QUE5QmY7Ozs7Ozs7O0FBRUEsSUFBTVgsZUFBZSxTQUFmQSxZQUFlO0FBQUEsU0FBUSxPQUFPWSxHQUFQLEtBQWUsV0FBZixHQUE2QixJQUE3QixHQUFvQyxLQUE1QztBQUFBLENBQXJCOztBQUVBLElBQU1WLGVBQWUsU0FBZkEsWUFBZSxDQUFDVyxTQUFELEVBQVlDLElBQVosRUFBa0JDLEtBQWxCO0FBQUEseUVBQzJDRixTQUQzQyxjQUM2REMsSUFEN0QsZUFDMkVDLEtBRDNFO0FBQUEsQ0FBckI7O0FBR0EsSUFBTTFCLFVBQVUsQ0FDZCxrRUFEYyxFQUVkLHlCQUZjLENBQWhCOztBQUtBLElBQU1FLGFBQWEsU0FBYkEsVUFBYTtBQUFBLFNBQ2pCWSxnQkFBTWEsTUFBTixDQUFhO0FBQ1hDLGFBQVMsS0FERTtBQUVYQyxZQUFRLEtBRkc7QUFHWDlCLFNBQUtBLElBQUkrQixPQUFKLENBQVksS0FBWixFQUFtQixFQUFuQjtBQUhNLEdBQWIsQ0FEaUI7QUFBQSxDQUFuQjs7QUFPQSxJQUFNekIsV0FBVyxTQUFYQSxRQUFXLE9BQVE7QUFDdkIsTUFBTTBCLGVBQWUsRUFBckI7QUFDQSxPQUFLLElBQU1DLEdBQVgsSUFBa0IxQixJQUFsQixFQUF3QjtBQUN0QixRQUFJQSxLQUFLMEIsR0FBTCxNQUFjLEVBQWxCLEVBQXNCO0FBQ3BCRCxtQkFBYUMsR0FBYixJQUFvQjFCLEtBQUswQixHQUFMLENBQXBCO0FBQ0Q7QUFDRjtBQUNERCxlQUFhLFNBQWIsSUFBMEIsSUFBMUI7QUFDQSxTQUFPQSxZQUFQO0FBQ0QsQ0FURDs7a0JBc0NlVCxNIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGF4aW9zIGZyb20gXCJheGlvc1wiO1xuXG5jb25zdCBjb25maXJtVmFsdWUgPSBhcmcgPT4gKHR5cGVvZiBhcmcgIT09IFwidW5kZWZpbmVkXCIgPyB0cnVlIDogZmFsc2UpO1xuXG5jb25zdCBnZW5SZWNhbGxVUkwgPSAobW9kZWx5ZWFyLCBtYWtlLCBtb2RlbCkgPT5cbiAgYGh0dHBzOi8vb25lLm5odHNhLmdvdi93ZWJhcGkvYXBpL1JlY2FsbHMvdmVoaWNsZS9tb2RlbHllYXIvJHttb2RlbHllYXJ9L21ha2UvJHttYWtlfS9tb2RlbC8ke21vZGVsfT9mb3JtYXQ9anNvbmA7XG5cbmNvbnN0IGJhc2VVUkwgPSBbXG4gIFwiaHR0cHM6Ly92cGljLm5odHNhLmRvdC5nb3YvYXBpL3ZlaGljbGVzL0RlY29kZVZpblZhbHVlc0V4dGVuZGVkL1wiLFxuICBcIj9mb3JtYXQ9anNvbiZtb2RlbHllYXI9XCJcbl07XG5cbmNvbnN0IG1ha2VWaW5SZXEgPSB1cmwgPT5cbiAgYXhpb3MuY3JlYXRlKHtcbiAgICB0aW1lb3V0OiAxMDAwMCxcbiAgICBtZXRob2Q6IFwiZ2V0XCIsXG4gICAgdXJsOiB1cmwucmVwbGFjZSgvXFxzL2csIFwiXCIpXG4gIH0pO1xuXG5jb25zdCBzb3J0RGF0YSA9IGRhdGEgPT4ge1xuICBjb25zdCBub25FbXB0eURhdGEgPSB7fTtcbiAgZm9yIChjb25zdCBrZXkgaW4gZGF0YSkge1xuICAgIGlmIChkYXRhW2tleV0gIT09IFwiXCIpIHtcbiAgICAgIG5vbkVtcHR5RGF0YVtrZXldID0gZGF0YVtrZXldO1xuICAgIH1cbiAgfVxuICBub25FbXB0eURhdGFbXCJyZXN1bHRzXCJdID0gdHJ1ZTtcbiAgcmV0dXJuIG5vbkVtcHR5RGF0YTtcbn07XG5cbmFzeW5jIGZ1bmN0aW9uIGRlY29kZSh2aW4pIHtcbiAgaWYgKHZpbiA9PT0gdW5kZWZpbmVkIHx8IHZpbi5sZW5ndGggPCAxIHx8IHZpbiA9PT0gbnVsbCkge1xuICAgIHJldHVybiB7IHJlc3VsdHM6IGZhbHNlIH07XG4gIH1cbiAgY29uc3QgdXJsID0gYmFzZVVSTFswXSArIHZpbiArIGJhc2VVUkxbMV07XG4gIGNvbnN0IHZpblJlcSA9IG1ha2VWaW5SZXEodXJsKTtcbiAgdHJ5IHtcbiAgICBjb25zdCB2aW5SZXNwb25zZSA9IGF3YWl0IHZpblJlcSgpO1xuICAgIGNvbnN0IHNvcnRlZFZpblJlc3BvbnNlID0gc29ydERhdGEodmluUmVzcG9uc2UuZGF0YS5SZXN1bHRzWzBdKTtcbiAgICBjb25zdCB7IE1vZGVsLCBNYWtlLCBNb2RlbFllYXIgfSA9IHNvcnRlZFZpblJlc3BvbnNlO1xuICAgIGlmIChjb25maXJtVmFsdWUoTW9kZWwpICYmIGNvbmZpcm1WYWx1ZShNYWtlKSAmJiBjb25maXJtVmFsdWUoTW9kZWxZZWFyKSkge1xuICAgICAgY29uc3QgcmVjYWxsVVJMID0gZ2VuUmVjYWxsVVJMKE1vZGVsWWVhciwgTWFrZSwgTW9kZWwpO1xuICAgICAgY29uc3QgcmVjYWxsQ29uZmlybSA9IGF3YWl0IGF4aW9zLmdldChyZWNhbGxVUkwpO1xuICAgICAgaWYgKHJlY2FsbENvbmZpcm0uZGF0YS5Db3VudCA+IDApIHtcbiAgICAgICAgc29ydGVkVmluUmVzcG9uc2UuaGFzUmVjYWxsID0gdHJ1ZTtcbiAgICAgICAgc29ydGVkVmluUmVzcG9uc2UucmVjYWxsRGV0YWlscyA9IHJlY2FsbENvbmZpcm0uZGF0YS5SZXN1bHRzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc29ydGVkVmluUmVzcG9uc2UuaGFzUmVjYWxsID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzb3J0ZWRWaW5SZXNwb25zZTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgaW4gdGhlIHJlcXVlc3RcIiwgZSk7XG4gICAgcmV0dXJuIGU7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZGVjb2RlO1xuIl19