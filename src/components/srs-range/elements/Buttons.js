class Buttons {
  constructor(element, x) {
    this.element = element;
    this.x = x;
    this.y = 0;
    this.curStep = x;
  }

  static setBorder(coordinates, rightEdge) {
    if (coordinates < 0) {
      coordinates = 0;
    }

    if (coordinates > rightEdge) {
      coordinates = Math.round(rightEdge);
    }

    return coordinates;
  }

  // init methods onMouseMove
  setCoordinate(coordinate, axis = 'x') {
    if (axis === 'x') {
      this.x = coordinate;
    } else {
      this.y = coordinate;
    }
  }

  setElement(element) {
    return (this.element = element);
  }

  setValue(coordinates, max) {
    return (this.value = this.convertToCoords(coordinates, max));
  }

  renderButton(axis) {
    if (axis === 'x') {
      this.element.style.left = this.x + '%';
    } else {
      this.element.style.bottom = this.y + '%';
    }
  }

  updatePosition(x, axis) {
    this.setCoordinate(x);
    this.renderButton(axis);
  }

  convertToCoords(coordinates, max) {
    return Math.floor(max * (coordinates / 100));
  }
}

export default Buttons;
