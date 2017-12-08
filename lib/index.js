'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

            return _context.abrupt('return', { results: false });

          case 2:
            url = baseURL[0] + vin + baseURL[1];
            vinReq = makeVinReq(url);
            _context.prev = 4;
            _context.next = 7;
            return vinReq();

          case 7:
            vinResponse = _context.sent;
            return _context.abrupt('return', sortData(vinResponse.data.Results[0]));

          case 11:
            _context.prev = 11;
            _context.t0 = _context['catch'](4);

            console.log('Error in the request', _context.t0);
            return _context.abrupt('return', _context.t0);

          case 15:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[4, 11]]);
  }));

  return function decode(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var baseURL = ['https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValuesExtended/', '?format=json&modelyear='];

var makeVinReq = function makeVinReq(url) {
  return _axios2.default.create({
    timeout: 10000,
    method: 'get',
    url: url.replace(/\s/g, '')
  });
};

var sortData = function sortData(data) {
  var nonEmptyData = {};
  for (var key in data) {
    if (data[key] !== '') {
      nonEmptyData[key] = data[key];
    }
  }
  nonEmptyData['results'] = true;
  return nonEmptyData;
};

exports.default = decode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJ2aW4iLCJ1bmRlZmluZWQiLCJsZW5ndGgiLCJyZXN1bHRzIiwidXJsIiwiYmFzZVVSTCIsInZpblJlcSIsIm1ha2VWaW5SZXEiLCJ2aW5SZXNwb25zZSIsInNvcnREYXRhIiwiZGF0YSIsIlJlc3VsdHMiLCJjb25zb2xlIiwibG9nIiwiZGVjb2RlIiwiY3JlYXRlIiwidGltZW91dCIsIm1ldGhvZCIsInJlcGxhY2UiLCJub25FbXB0eURhdGEiLCJrZXkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7cUVBdUJBLGlCQUFzQkEsR0FBdEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsa0JBQ0tBLFFBQVFDLFNBQVIsSUFBcUJELElBQUlFLE1BQUosR0FBYSxDQUFsQyxJQUF1Q0YsUUFBUSxJQURwRDtBQUFBO0FBQUE7QUFBQTs7QUFBQSw2Q0FFVyxFQUFDRyxTQUFTLEtBQVYsRUFGWDs7QUFBQTtBQUlRQyxlQUpSLEdBSWNDLFFBQVEsQ0FBUixJQUFhTCxHQUFiLEdBQW1CSyxRQUFRLENBQVIsQ0FKakM7QUFLUUMsa0JBTFIsR0FLaUJDLFdBQVdILEdBQVgsQ0FMakI7QUFBQTtBQUFBO0FBQUEsbUJBT2lDRSxRQVBqQzs7QUFBQTtBQU9hRSx1QkFQYjtBQUFBLDZDQVFjQyxTQUFTRCxZQUFZRSxJQUFaLENBQWlCQyxPQUFqQixDQUF5QixDQUF6QixDQUFULENBUmQ7O0FBQUE7QUFBQTtBQUFBOztBQVdPQyxvQkFBUUMsR0FBUixDQUFZLHNCQUFaO0FBWFA7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRzs7a0JBQWVDLE07Ozs7O0FBdkJmOzs7Ozs7OztBQUVBLElBQU1ULFVBQVUsQ0FBRSxrRUFBRixFQUFxRSx5QkFBckUsQ0FBaEI7O0FBRUEsSUFBTUUsYUFBYSxTQUFiQSxVQUFhLENBQUNILEdBQUQ7QUFBQSxTQUNoQixnQkFBTVcsTUFBTixDQUFhO0FBQ1pDLGFBQVMsS0FERztBQUVaQyxZQUFRLEtBRkk7QUFHWmIsU0FBS0EsSUFBSWMsT0FBSixDQUFZLEtBQVosRUFBbUIsRUFBbkI7QUFITyxHQUFiLENBRGdCO0FBQUEsQ0FBbkI7O0FBUUEsSUFBTVQsV0FBVyxTQUFYQSxRQUFXLENBQUNDLElBQUQsRUFBUztBQUN4QixNQUFNUyxlQUFlLEVBQXJCO0FBQ0UsT0FBSSxJQUFNQyxHQUFWLElBQWlCVixJQUFqQixFQUFzQjtBQUNwQixRQUFHQSxLQUFLVSxHQUFMLE1BQWMsRUFBakIsRUFBb0I7QUFDaEJELG1CQUFhQyxHQUFiLElBQW9CVixLQUFLVSxHQUFMLENBQXBCO0FBQ0g7QUFDRjtBQUNERCxlQUFhLFNBQWIsSUFBMEIsSUFBMUI7QUFDQSxTQUFPQSxZQUFQO0FBQ0gsQ0FURDs7a0JBNEJlTCxNIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcblxuY29uc3QgYmFzZVVSTCA9IFsgJ2h0dHBzOi8vdnBpYy5uaHRzYS5kb3QuZ292L2FwaS92ZWhpY2xlcy9EZWNvZGVWaW5WYWx1ZXNFeHRlbmRlZC8nLCc/Zm9ybWF0PWpzb24mbW9kZWx5ZWFyPSddO1xuXG5jb25zdCBtYWtlVmluUmVxID0gKHVybCkgPT4gKFxuICAgYXhpb3MuY3JlYXRlKHtcbiAgICB0aW1lb3V0OiAxMDAwMCxcbiAgICBtZXRob2Q6ICdnZXQnLFxuICAgIHVybDogdXJsLnJlcGxhY2UoL1xccy9nLCAnJylcbiAgfSlcbilcblxuY29uc3Qgc29ydERhdGEgPSAoZGF0YSkgPT57XG4gIGNvbnN0IG5vbkVtcHR5RGF0YSA9IHt9XG4gICAgZm9yKGNvbnN0IGtleSBpbiBkYXRhKXtcbiAgICAgIGlmKGRhdGFba2V5XSAhPT0gJycpe1xuICAgICAgICAgIG5vbkVtcHR5RGF0YVtrZXldID0gZGF0YVtrZXldXG4gICAgICB9XG4gICAgfVxuICAgIG5vbkVtcHR5RGF0YVsncmVzdWx0cyddID0gdHJ1ZTtcbiAgICByZXR1cm4gbm9uRW1wdHlEYXRhO1xufVxuXG5hc3luYyBmdW5jdGlvbiBkZWNvZGUodmluKSB7XG4gIGlmKHZpbiA9PT0gdW5kZWZpbmVkIHx8IHZpbi5sZW5ndGggPCAxIHx8IHZpbiA9PT0gbnVsbCl7XG4gICAgcmV0dXJuIHtyZXN1bHRzOiBmYWxzZX07XG4gIH1cbiAgY29uc3QgdXJsID0gYmFzZVVSTFswXSArIHZpbiArIGJhc2VVUkxbMV07XG4gIGNvbnN0IHZpblJlcSA9IG1ha2VWaW5SZXEodXJsKTtcbiAgdHJ5IHtcbiAgICAgICBjb25zdCB2aW5SZXNwb25zZSA9IGF3YWl0IHZpblJlcSgpO1xuICAgICAgIHJldHVybiBzb3J0RGF0YSh2aW5SZXNwb25zZS5kYXRhLlJlc3VsdHNbMF0pO1xuXG4gICAgfSBjYXRjaChlKSB7XG4gICAgICAgY29uc29sZS5sb2coJ0Vycm9yIGluIHRoZSByZXF1ZXN0JywgZSlcbiAgICAgICByZXR1cm4gZTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgZGVjb2RlOyJdfQ==