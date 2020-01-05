class View {
  constructor() {
    this.ballBtns = document.querySelectorAll(".srs__btn");

  }

  //creating elements
  createLine(parentElement) {
    let line = document.createElement('div');

    line.classList.add('srs__line');
    parentElement.append(line);
  }

  createBoxWrap(parentElement) {
    let boxWrap = document.createElement('div');

    boxWrap.classList.add('srs__box-wrap');
    parentElement.append(boxWrap);
  }

  createBox(parentElement, selector, value) {
    let box = document.createElement('span');

    box.textContent = value;
    box.classList.add('srs__box', selector);
    parentElement.append(box);
  }

  createControlBtn(parentElement, selector, value, position) {
    let btn = document.createElement('btn');

    btn.textContent = value;
    btn.setAttribute('type', 'btn');
    btn.classList.add('srs__btn', selector);
    btn.style.left = position;
    parentElement.append(btn);
  }

  // events
  btnDrag(e) {}
}

export default View;
