class View {
	constructor() {
		document.addEventListener('DOMContentLoaded', () => {
			this.buttons = Array.from(document.querySelectorAll('.srs__button'));

			// listen event on each slider button
			this.buttons.forEach(button => {
				button.addEventListener('mousedown', e => {
					this.buttonOnDrag(e);
				});
			});
		});
	}

	//creating elements
	createLine(parent) {
		let line = document.createElement('div');

		line.classList.add('srs__line');
		parent.append(line);
	}

	createBoxWrap(parent, selector) {
		let boxWrap = document.createElement('div');

		boxWrap.classList.add('srs__box-wrap', selector);
		parent.append(boxWrap);
	}

	createBox(parent, selector, value, position = '') {
		let box = document.createElement('span');

		box.textContent = value;
		box.classList.add('srs__box', selector);
		box.style.left = position + '%';
		parent.append(box);
	}

	createButton(parent, selector, position) {
		let button = document.createElement('button');

		button.setAttribute('type', 'button');
		button.classList.add('srs__button', selector);
		button.style.left = position;
		parent.append(button);
	}

	// events
	buttonOnDrag(e) {
	}
}

export default View;
