import Buttons from "./elements/Buttons";
import Tooltips from "./elements/Tooltips";

class Controller {
	constructor(model, view) {
		this.model = model;
		this.view = view;
		this.tooltips = [];

		this.view.buttonOnDrag = (event) => {
			this.buttonOnDrag(event)
		};
	}

	buttonOnDrag(event) {
		event.preventDefault();

		const target = event.target;
		const parent = target.parentElement;
		const childrensList = [...parent.children];

		childrensList.forEach((child) => {
			if (child.classList.contains('srs__line')) {
				this.line = child;
			}

			if (child.classList.contains('srs__tooltips')) {
				const tooltipsList = [...child.children];

				tooltipsList.forEach((tooltip) => {
					this.tooltips.push(tooltip);
				});
			}
		});

		const onMouseMove = (event) => {
			// tooltips
			const tooltipFrom = this.tooltips[0];
			const tooltipTo = this.tooltips[1];

			// calculating coordinates
			let mouseXCoords = event.clientX - this.line.getBoundingClientRect().left;
			let xCoords = Math.round((mouseXCoords / this.line.offsetWidth) * 100);
			let rightEdge = Math.round(100 + (target.offsetWidth * 0.5 / this.line.offsetWidth));
			let stepCount = 0;

			// set border for coordinates
			xCoords = Buttons.setBorder(xCoords, rightEdge);

			if (this.model.range) {
				// render elements with range options
				this.buttonFrom.rangeButtonRender(target, xCoords, this.buttonFrom, this.buttonTo);
				this.tooltipFrom.renderTooltip(
						tooltipFrom,
						this.buttonFrom.xCoords,
						this.model.max
				);

				this.buttonTo.rangeButtonRender(target, xCoords, this.buttonFrom, this.buttonTo);
				this.tooltipTo.renderTooltip(
						tooltipTo,
						this.buttonTo.xCoords,
						this.model.max
				);
			} else {
				// render single button with tooltip
				this.buttonFrom.renderButton(target, xCoords);
				this.tooltipFrom.renderTooltip(tooltipFrom, this.buttonFrom.xCoords, this.model.max);
			}
		};

		// remove events on mouseUp
		const onMouseUp = () => {
			document.removeEventListener('mouseup', onMouseUp);
			document.removeEventListener('mousemove', onMouseMove);
		};

		document.addEventListener('mousemove', onMouseMove);
		document.addEventListener('mouseup', onMouseUp);

		this.line.ondragstart = () => false;
	};

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
}

export default Controller;
