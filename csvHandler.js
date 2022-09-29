// @ts-check
const { parse } = require("csv-parse/sync");
const currencyCodes = require("./currencyCodes");

const readData = (input, currency) => {
  const records = parse(input, {
    columns: true,
    rtrim: true,
    skip_empty_lines: true,
  });

  const column = records.map((rec) => {
    return {
      date: rec["Date"],
      value: Number(rec[currencyCodes[currency]]),
    };
  });
  return column;
};

module.exports = { readData };
