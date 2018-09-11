'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var millisecond = 1;
var second = 1000 * millisecond;
var minute = 60 * second;
var hour = 60 * minute;
var day = 24 * hour;
var week = 7 * day;

var addMinutes = function addMinutes(date, minutes) {
  return date + minutes * minute;
};
var addHours = function addHours(date, hours) {
  return date + hours * hour;
};
var addDays = function addDays(date, days) {
  return date + days * day;
};
var addWeeks = function addWeeks(date, weeks) {
  return date + weeks * week;
};
var addMonths = function addMonths(date, months) {
  return new Date(date).setMonth(new Date(date).getMonth() + months);
};

var incrementers = {
  minutes: addMinutes,
  hours: addHours,
  days: addDays,
  weeks: addWeeks,
  months: addMonths
};

var commonGapGetter = function commonGapGetter(unit) {
  return function (start, end) {
    return (end - start) / unit;
  };
};

var dateGapGetter = {
  minutes: commonGapGetter(minute),
  hours: commonGapGetter(hour),
  days: commonGapGetter(day),
  weeks: commonGapGetter(week),
  months: function months(start, end) {
    var monthsGap = 0;
    while (addMonths(start, monthsGap) < end) {
      monthsGap += 1;
    }
    return monthsGap;
  }
};

var plusOneReducer = function plusOneReducer(acc, val) {
  return [].concat((0, _toConsumableArray3.default)(acc), [val + 1]);
};

var makeRange = function makeRange(_ref) {
  var length = _ref.length;

  return [].concat((0, _toConsumableArray3.default)(Array(length).keys())).reduce(plusOneReducer, []);
};

var resetters = {
  minutes: function minutes(date) {
    return date.setUTCSeconds(0, 0);
  },
  hours: function hours(date) {
    return date.setUTCHours(date.getUTCHours(), 0, 0, 0);
  },
  days: function days(date) {
    return date.setUTCHours(0, 0, 0, 0);
  },
  weeks: function weeks(date) {
    return date.setUTCHours(0, 0, 0, 0);
  },
  months: function months(date) {
    return new Date(date.setUTCDate(1)).setUTCHours(0, 0, 0, 0);
  },
  years: function years(date) {
    return new Date(date.setUTCDate(1)).setUTCHours(0, 0, 0, 0);
  }
};

var resetDate = function resetDate(_ref2) {
  var toConsider = _ref2.toConsider,
      date = _ref2.date;
  return resetters[toConsider](new Date(date));
};

var dateRanger = function dateRanger(startDate, endDate, timeParam) {
  var rangeStart = resetDate({ toConsider: timeParam, date: startDate });
  var rangeEnd = resetDate({ toConsider: timeParam, date: endDate });

  console.log('rangeStart', new Date(rangeStart).toISOString());
  console.log('rangeEnd', new Date(rangeEnd).toISOString());

  console.log(rangeStart);

  var gapCoef = dateGapGetter[timeParam](rangeStart, rangeEnd);
  var intPart = parseInt(gapCoef);
  var floatPart = gapCoef - intPart;
  console.log('gapCoef', gapCoef);
  console.log('intPart', intPart);
  console.log('floatPart', floatPart);

  var pureRange = makeRange({
    length: intPart
  });

  return [].concat((0, _toConsumableArray3.default)(pureRange.reduce(function (acc, step) {
    return [].concat((0, _toConsumableArray3.default)(acc), [incrementers[timeParam](rangeStart, step)]);
  }, [rangeStart])));
};

exports.default = dateRanger;