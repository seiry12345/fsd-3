import View from "./View";

class Controller {
	constructor(settings) {
		this.settings = settings;
		this.view = new View();
		this.step = this.settings.step;
		this.coordsFrom = this.settings.coordsFrom;
		this.coordsTo = this.settings.coordsTo;
		this.max = this.settings.max;
		this.min = this.settings.min;

		// main function adding actions on Ball mouseDown
		this.view.btnDrag = (e) => {
			e.preventDefault();
			const target = event.target;
			const srsWrap = target.parentElement;
			const srsWrapList = Array.from(srsWrap.children);
			const shiftX = event.clientX - target.getBoundingClientRect().left;
			let line;
			let lineWidth;
			let ballFrom;
			let ballTo;
			let tooltipFrom;
			let tooltipTo;

			// get DOM elements from container
			srsWrapList.forEach((srsWrapItem) => {
				// assign line
				if (srsWrapItem.classList.contains("srs__line")) {
					line = srsWrapItem;
					lineWidth = line.offsetWidth;
				}

				// assign btns
				if (srsWrapItem.classList.contains("srs__btn-from")) {
					ballFrom = srsWrapItem;
				}

				if (srsWrapItem.classList.contains("srs__btn-to")) {
					ballTo = srsWrapItem;
				}

				// assign tooltips
				if (srsWrapItem.classList.contains("srs__box-values")) {
					let boxValues = Array.from(srsWrapItem.children);

					boxValues.forEach((boxValueItem) => {

						if (boxValueItem.classList.contains("srs__box-btn-from")) {
							tooltipFrom = boxValueItem;
						}

						if (boxValueItem.classList.contains("srs__box-btn-to")) {
							tooltipTo = boxValueItem;
						}
					});
				}
			});

			const moveBall = (xCoords) => {
				target.style.left = xCoords + '%';
			};

			const renderTooltip = (element, xCoords) => {
				let res = 0;

				if (xCoords !== 0) {
					res = this.getCoords(xCoords, this.max);
				}

				element.textContent = res;
				element.style.left = xCoords + "%";
			};

			const onMouseMove = (event) => {
				const mouseXCoords = event.clientX - line.getBoundingClientRect().left;
				let xCoords = Math.floor((mouseXCoords / line.offsetWidth) * 100);
				let rightEdge = Math.floor(100 + (target.offsetWidth * 0.5 / lineWidth));

				if (xCoords < 0) {
					xCoords = 0;
				}

				if (xCoords > rightEdge) {
					xCoords = Math.floor(rightEdge);
				}



				if (this.settings.range) {
					// TODO compare coords btnFrom and btnTo
				}

				moveBall(xCoords);

				if (target.classList.contains("srs__btn-from")) {
					renderTooltip(tooltipFrom ,xCoords);
				} else {
					renderTooltip(tooltipTo ,xCoords);
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
	}

	// init
	init(context) {
		const container = context[0];
		let from;
		let to;

		this.settings.from === 0 ? from = 0 : from = this.getPercents(this.settings.from, this.settings.max);
		this.settings.to === this.settings.max ? to = 100 : to = this.getPercents(this.settings.to, this.settings.max);

		container.classList.add('srs__wrapper');

		this.view.createBoxWrap(container, "srs__box-values");
		this.view.createLine(container);
		this.view.createBoxWrap(container, "srs__box-grid");

		let boxWrapValues = container.children[0];
		let boxWrapGrid = container.children[2];

		// create boxes
		this.view.createBox(boxWrapGrid, "srs__box-min", this.settings.min);
		this.view.createBox(boxWrapGrid, "srs__box-max", this.settings.max);

		// create btns and tooltips for btns

		this.view.createBox(boxWrapValues, "srs__box-btn-from", this.settings.from, from);
		this.view.createControllBtn(container, "srs__btn-from", this.settings.from, from);

		if (this.settings.range) {
			this.view.createBox(boxWrapValues, "srs__box-btn-to", this.settings.to, to);
			this.view.createControllBtn(container, "srs__btn-to", this.settings.to, to + "%");
		}
	}

	getPercents(numb, max) {
		return Math.floor(numb / max * 100);
	}

	getCoords(coords, max) {
		return Math.floor(max * (coords / 100));
	}
}

export default Controller;
