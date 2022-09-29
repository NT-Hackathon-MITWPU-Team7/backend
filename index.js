const {
  getValues,
  getHighest,
  getLowest,
  getMonthlyValues,
  getQuaterlyValues,
  getWeeklyValues,
  getYearlyValues,
} = require("./calculations");
const cors = require(cors);
const path = require("path");
const chartTypes = require("./chartTypes.js");
const express = require("express");
const app = express();
const port = 5000;

app.use(express.static(path.join(__dirname, "/data")));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1>Hello from MIT-WPU Team 7!!</h1>");
});

app.post("/chart", (req, res) => {
  try {
    const body = req.body;

    if (!body) {
      throw "Request body cannot be empty!";
    }

    const { currency1, currency2, chartType, year } = req.body;

    const values = getValues(year, currency2);
    let returnValues = [];

    switch (chartType) {
      case chartTypes.monthly:
        returnValues = getMonthlyValues(values);
        break;
      case chartTypes.weekly:
        returnValues = getWeeklyValues(values);
        break;
      case chartTypes.quarterly:
        returnValues = getQuaterlyValues(values);
        break;
      case chartTypes.yearly:
        returnValues = getYearlyValues(values);
        break;
      default:
        break;
    }

    res.send({
      currency1,
      currency2,
      datapoints: returnValues,
      highest: getHighest(values),
      lowest: getLowest(values),
    });
  } catch (error) {
    console.log(error);
    res.send({ error: error });
  }
});

app.listen(port, () => {
  console.log(`App is up at http://localhost:${port}`);
});
