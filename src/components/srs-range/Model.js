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
    this.coords1 = {
      x: 0,
      y: 0
    };
    this.coords2 = {
      x: 0,
      y: 0
    };
  }
}

export default Model;
