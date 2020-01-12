import Buttons from "./elements/Buttons";
import Tooltips from "./elements/Tooltips";

class Controller {
	constructor(model, view) {
		this.model = model;
		this.view = view;
		this.buttons = [];
		this.tooltips = [];

		this.view.buttonDrag = (event) => {
			event.preventDefault();

			const target = event.target;
			const parent = target.parentElement;
			const childrensList = Array.from(parent.children);

			childrensList.forEach((child) => {
				if (child.classList.contains('srs__line')) {
					this.line = child;
				}

				if (child.classList.contains('srs__button')) {
					this.buttons.push(child);
				}

				if (child.classList.contains('srs__tooltips')) {
					const tooltipsList = Array.from(child.children);

					tooltipsList.forEach((tooltip) => {
						this.tooltips.push(child);
					});
				}
			});

			const onMouseMove = (event) => {
				let mouseXCoords = event.clientX - this.line.getBoundingClientRect().left;
				let xCoords = Math.round((mouseXCoords / this.line.offsetWidth) * 100);
				let rightEdge = Math.round(100 + (target.offsetWidth * 0.5 / this.line.offsetWidth));

				if (xCoords < 0) {
					xCoords = 0;
				}

				if (xCoords > rightEdge) {
					xCoords = Math.round(rightEdge);
				}

				target.style.left = xCoords + '%';

				// update buttons
				if (target === this.buttons[0]) {
					this.buttonFrom.update(target, xCoords);
					// analog for tooltipFrom
				}

				if (target === this.buttons[1]) {
					this.buttonTo.update(target, xCoords);
					// analog for tooltipTo
				}

				// buttons collision
				Buttons.collision(this.buttonFrom, this.buttonTo, target);
				// renderTooltip();
			};

			// remove events on mouseUp
			const onMouseUp = () => {
				document.removeEventListener('mouseup', onMouseUp);
				document.removeEventListener('mousemove', onMouseMove);
			};

			document.addEventListener('mousemove', onMouseMove);
			document.addEventListener('mouseup', onMouseUp);

			this.line.ondragstart = () => false;
		}
	}

	init(context) {
		// TODO for 1 slider at start
		const container = context[0];
		let buttonFromCoords;
		let buttonToCoords;

		this.model.from === 0
				? (buttonFromCoords = 0)
				: (buttonFromCoords = this.convertToPercents(this.model.from, this.model.max));
		this.model.to === this.model.max
				? (buttonToCoords = 100)
				: (buttonToCoords = this.convertToPercents(this.model.to, this.model.max));

		container.classList.add('srs__wrapper');

		this.view.createBoxWrap(container, 'srs__tooltips');
		this.view.createLine(container);
		this.view.createBoxWrap(container, 'srs__grid');

		const tooltips = container.children[0];
		const values = container.children[2];

		// create values
		this.view.createBox(values, 'srs__min', this.model.min);
		this.view.createBox(values, 'srs__max', this.model.max);

		// create buttonFrom
		this.view.createButton(container, 'srs__button--from', buttonFromCoords);
		this.buttonFrom = new Buttons(null, buttonFromCoords);
		// create tooltipFrom
		this.view.createBox(tooltips, 'srs__tooltip--from', this.model.from, buttonFromCoords);
		this.tooltipFrom = new Tooltips(null, buttonFromCoords);

		if (this.model.range) {
			// create buttonTo
			this.view.createButton(container, 'srs__button--to', buttonToCoords + '%');
			this.buttonTo = new Buttons(null, buttonToCoords);
			// create tooltipTo
			this.view.createBox(tooltips, 'srs__tooltip--to', this.model.to, buttonToCoords);
			this.tooltipTo = new Tooltips(null, buttonToCoords);
		}
	}

	convertToPercents(numb, max) {
		return Math.floor((numb / max) * 100);
	}

	convertToCoords(coords, max) {
		return Math.floor(max * (coords / 100));
	}
}

export default Controller;
