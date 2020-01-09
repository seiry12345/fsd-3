class Model {
  constructor() {
    this.min = 0;
    this.max = 1000;
    this.from = 0;
    this.to = this.max;
    this.step = 100;
    this.range = false;
    this.horizontal = true;
    this.vertical = false;
    this.coordsFrom = {
      x: 0,
      y: 0
    };
    this.coordsTo = {
      x: 0,
      y: 0
    };
  }
}

export default Model;
