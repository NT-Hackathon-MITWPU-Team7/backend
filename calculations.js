const { readData } = require("./csvHandler");
const fs = require("fs");

const getValues = (year, currency) => {
  const input = fs.readFileSync(`./data/Exchange_Rate_Report_${year}.csv`);
  return readData(input, currency);
};

const getHighest = (data) => {
  const maxValue = data.reduce((p, c) => (p.value > c.value ? p : c));
  return maxValue;
};

const getLowest = (data) => {
  const minValue = data.reduce((p, c) =>
    p.value < c.value && p.value > 0 ? p : c
  );
  return minValue;
};

const getMonthlyValues = (values) => {
  var arr = [];

  for (let mon = 0; mon < 12; mon++) {
    var temp_arr = [];
    for (let i = 0; i < values.length; i++) {
      let od = new Date(values[i].date);
      let d = od.getMonth();
      if (d == mon) {
        temp_arr.push(values[i]);
      }
    }
    arr[mon] = temp_arr[0];
  }

  return arr;
};

const getQuaterlyValues = (values) => {
  const monthly = getMonthlyValues(values);
  const quaterly = [monthly[0], monthly[3], monthly[6], monthly[9]];
  return quaterly;
};

const getWeeklyValues = (values) => {
  var arr = [];
  var j = 0;
  for (let i = 0; i < values.length; ) {
    let temp_arr = [];
    let od = new Date(values[i].date);
    let w = od.getDay();
    let d = od.getDate();
    let temp_w = 6 - w;
    let temp_d = d + temp_w;
    while (w < 7 && d <= temp_d) {
      temp_arr.push(values[i]);
      w++;
      i++;
      if (i < values.length) {
        let td = new Date(values[i].date);
        d = td.getDate();
      } else {
        break;
      }
    }
    arr[j] = temp_arr[0];
    j++;
  }
  return arr;
};

const getYearlyValues = (values) => {
  const yearly = [values[0], values[values.length - 1]];
  console.log(yearly);
  return yearly;
};

module.exports = {
  getValues,
  getHighest,
  getLowest,
  getMonthlyValues,
  getQuaterlyValues,
  getWeeklyValues,
  getYearlyValues,
};
