import Buttons from './elements/Buttons';
import Tooltips from './elements/Tooltips';

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.prevStep = this.model.step;
    this.prevX = this.model.min;

    this.view.buttonOnDrag = event => {
      this.buttonOnDrag(event);
    };
  }

  convertToPercents(numb, max) {
    return Math.floor((numb / max) * 100);
  }

  convertToValue(coordinates, max) {
    return Math.floor(max * (coordinates / 100));
  }

  incrementStep(prevStep, step, max) {
    if (step === max) {
      return max;
    }

    return (prevStep += step);
  }

  decrementStep(prevStep, step, min) {
    if (step === min) {
      return min;
    }

    return (prevStep = prevStep - step);
  }

  buttonOnDrag(event) {
    event.preventDefault();

    const target = event.target;
    const parent = target.closest('.srs__wrapper');
    const childrensList = [...parent.children];
    const line = childrensList[0];
    const handlers = childrensList[1];
    let buttons = [];
    let tooltips = [];

    [...handlers.querySelectorAll('.srs__button')].forEach(button => {
      buttons.push(button);
    });

    [...handlers.querySelectorAll('.srs__tooltip')].forEach(tooltip => {
      tooltips.push(tooltip);
    });

    const onMouseMove = event => {
      // calculating coordinates
      let cursorX = event.clientX - line.getBoundingClientRect().left;
      let x = Math.round((cursorX / line.offsetWidth) * 100);
      let rightEdge = Math.round(
        100 + (target.offsetWidth * 0.5) / line.offsetWidth
      );

      // set X borders
      x = Buttons.setBorder(x, rightEdge);

      this.buttonFrom.setElement(buttons[0]);
      this.tooltipFrom.setElement(tooltips[0]);

      if (this.model.step) {
        this.tooltipFrom.setValue(x, this.model.max);

        if (x > this.prevX && this.buttonFrom.value === this.prevStep) {
          this.buttonFrom.renderButtonOnStep(x, 'x');
          this.tooltipFrom.renderButtonOnStep(x, 'x');

          this.prevX = x;
          this.prevStep = this.incrementStep(
            this.prevStep,
            this.model.step,
            this.model.max
          );
        } else if (
          x < this.prevX &&
          this.buttonFrom.value === this.prevStep - this.model.step * 2
        ) {
          this.buttonFrom.updatePosition(x, 'x');
          this.tooltipFrom.updatePosition(x, 'x');

          this.prevX = x;
          this.prevStep = this.decrementStep(
            this.prevStep,
            this.model.step,
            this.model.min
          );
        }
      } else if (this.model.range) {
      } else {
        this.buttonFrom.updatePosition(x, 'x');
        this.tooltipFrom.setValue(x, this.model.max);
        this.tooltipFrom.updatePosition(x, 'x');
      }
    };

    // remove events on mouseUp
    const onMouseUp = () => {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    line.ondragstart = () => false;
  }

  init(context) {
    // TODO for 1 slider at start
    const container = context[0];
    let buttonFromCoords;
    let buttonToCoords;

    this.model.from === 0
      ? (buttonFromCoords = 0)
      : (buttonFromCoords = this.convertToPercents(
          this.model.from,
          this.model.max
        ));
    this.model.to === this.model.max
      ? (buttonToCoords = 100)
      : (buttonToCoords = this.convertToPercents(
          this.model.to,
          this.model.max
        ));

    container.classList.add('srs__wrapper');

    this.view.createTemplate(container, buttonFromCoords, this.model.from);
    this.view.createBoxWrap(container, 'srs__grid');

    // create From
    this.buttonFrom = new Buttons(null, buttonFromCoords);
    this.tooltipFrom = new Tooltips(null, buttonFromCoords);

    if (this.model.range) {
      // create To
      this.buttonTo = new Buttons(null, buttonToCoords);
      this.tooltipTo = new Tooltips(null, buttonToCoords);
    }
  }
}

export default Controller;
