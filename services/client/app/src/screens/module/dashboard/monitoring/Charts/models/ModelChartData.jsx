class DataPoint {
  constructor(name, yValues) {
    this.name = name;
    this.y = yValues;
  }
}

class ChartData {
  constructor(xValues, dataPoints) {
    this.x = xValues;
    this.y = dataPoints;
  }
}
