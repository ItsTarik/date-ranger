const millisecond = 1;
const second = 1000 * millisecond;
const minute = 60 * second;
const hour = 60 * minute;
const day = 24 * hour;
const week = 7 * day;

const addMinutes = (date, minutes) => date + minutes * minute;
const addHours = (date, hours) => date + hours * hour;
const addDays = (date, days) => date + days * day;
const addWeeks = (date, weeks) => date + weeks * week;
const addMonths = (date, months) => new Date(date).setMonth(new Date(date).getMonth() + months);

const incrementers = {
  minutes: addMinutes,
  hours: addHours,
  days: addDays,
  weeks: addWeeks,
  months: addMonths,
};

const commonGapGetter = (unit) => (start, end) => (end - start) / unit;

const dateGapGetter = {
  minutes: commonGapGetter(minute),
  hours: commonGapGetter(hour),
  days: commonGapGetter(day),
  weeks: commonGapGetter(week),
  months: (start, end) => {
    let monthsGap = 0;
    while (addMonths(start, monthsGap) < end) {
      monthsGap += 1;
    }
    return monthsGap;
  },
};

const plusOneReducer = (acc, val) => [...acc, val + 1];

const makeRange = ({ length }) => {
  return [...Array(length).keys()].reduce(plusOneReducer, []);
};

const resetters = {
  minutes: (date) => date.setUTCSeconds(0, 0),
  hours: (date) => date.setUTCHours(date.getUTCHours(), 0, 0, 0),
  days: (date) => date.setUTCHours(0, 0, 0, 0),
  weeks: (date) => date.setUTCHours(0, 0, 0, 0),
  months: (date) => new Date(date.setUTCDate(1)).setUTCHours(0, 0, 0, 0),
  years: (date) => new Date(date.setUTCDate(1)).setUTCHours(0, 0, 0, 0),
};

const resetDate = ({ toConsider, date }) => resetters[toConsider](new Date(date));

const dateRanger = (startDate, endDate, timeParam) => {
  const rangeStart = resetDate({ toConsider: timeParam, date: startDate });
  const rangeEnd = resetDate({ toConsider: timeParam, date: endDate });

  // console.log('rangeStart', new Date(rangeStart).toISOString());
  // console.log('rangeEnd', new Date(rangeEnd).toISOString());

  // console.log(rangeStart);

  const gapCoef = dateGapGetter[timeParam](rangeStart, rangeEnd);
  const intPart = parseInt(gapCoef);
  const floatPart = gapCoef - intPart;
  console.log('gapCoef', gapCoef);
  console.log('intPart', intPart);
  console.log('floatPart', floatPart);

  const pureRange = makeRange({
    length: intPart,
  });

  return [
    ...pureRange.reduce((acc, step) => [...acc, incrementers[timeParam](rangeStart, step)], [
      rangeStart,
    ]),
  ];
};

export default dateRanger;
