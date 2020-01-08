class Controller {
	constructor(model, view) {
		this.model = model;
		this.view = view;
		this.step = this.model.step;
		this.coords1 = this.model.coords1;
		this.coords2 = this.model.coords2;
		this.max = this.model.max;
		this.min = this.model.min;

		// main function adding actions on Ball mouseDown
		this.view.btnDrag = (e) => {
			e.preventDefault();
			const target = event.target;
			const srsWrap = target.parentElement;
			const srsWrapList = Array.from(srsWrap.children);
			const shiftX = event.clientX - target.getBoundingClientRect().left;
			let line;
			let lineWidth;
			let tooltipFrom;
			let tooltipTo;

			// iterate parent container
			srsWrapList.forEach((srsWrapItem) => {
				// assign line
				if (srsWrapItem.classList.contains("srs__line")) {
					line = srsWrapItem;
					lineWidth = line.offsetWidth;
				}

				// asign tooltips
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
				if (xCoords === 0) {
					element.textContent = 0;
				} else {
					element.textContent = this.getCoords(xCoords, this.max);
				}

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

		// convert from and to values
		let from;
		let to;

		this.model.from === 0 ? from = 0 : from = this.getPercents(this.model.from, this.model.max);
		this.model.to === this.model.max ? to = 100 : to = this.getPercents(this.model.to, this.model.max);

		container.classList.add('srs__wrapper');

		this.view.createBoxWrap(container, "srs__box-values");
		this.view.createLine(container);
		this.view.createBoxWrap(container, "srs__box-grid");

		let boxWrapValues = container.children[0];
		let boxWrapGrid = container.children[2];

		// create boxes
		this.view.createBox(boxWrapGrid, "srs__box-min", this.model.min);
		this.view.createBox(boxWrapGrid, "srs__box-max", this.model.max);

		// create btns and value boxes for btns
		this.view.createBox(boxWrapValues, "srs__box-btn-from", this.model.from, from);
		this.view.createControllBtn(container, "srs__btn-from", this.model.from, from);

		if (this.model.range) {
			this.view.createBox(boxWrapValues, "srs__box-btn-to", this.model.to, to);
			this.view.createControllBtn(container, "srs__btn-to", this.model.to, to + "%");
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
