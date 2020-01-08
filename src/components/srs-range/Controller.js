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
			let tooltip1;
			let tooltip2;

			srsWrapList.forEach((srsWrapItem) => {
				// asign line
				if (srsWrapItem.classList.contains("srs__line")) {
					line = srsWrapItem;
					lineWidth = line.offsetWidth;
				}

				// asign tooltips
				if (srsWrapItem.classList.contains("srs__box-values")) {
					let boxValues = srsWrapItem.children;

					boxValues = Array.from(boxValues);

					boxValues.forEach((boxValueItem) => {
						if (boxValueItem.classList.contains("srs__box-btn-1")) {
							tooltip1 = boxValueItem;
						}

						if (boxValueItem.classList.contains("srs__box-btn-2")) {
							tooltip2 = boxValueItem;
						}
					});
				}
			});

			const moveBall = (xCoords) => {
				target.style.left = xCoords + '%';
			};

			const renderTooltip = (xCoords) => {
				if (xCoords === 0) {
					tooltip1.textContent = 0;
				} else {
					tooltip1.textContent = this.getCoords(xCoords, this.max);
				}
				tooltip1.style.left = xCoords + "%";
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
				renderTooltip(xCoords);
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
	init(settings, context) {
		const container = context[0];

		// convert from and to values
		let fromConverted;
		// TODO if 0 val = 0 : val = convertedVal;



		container.classList.add('srs__wrapper');

		this.view.createBoxWrap(container, "srs__box-values");
		this.view.createLine(container);
		this.view.createBoxWrap(container, "srs__box-grid");

		let boxWrapValues = container.children[0];
		let boxWrapGrid = container.children[2];

		// create boxes
		this.view.createBox(boxWrapGrid, "srs__box-min", settings.min);
		this.view.createBox(boxWrapGrid, "srs__box-max", settings.max);

		// create btns and value boxes for btns
		this.view.createBox(boxWrapValues, "srs__box-btn-1", settings.from, settings.from);
		this.view.createControlBtn(container, "srs__btn--from", settings.from, settings.from);

		if (settings.range) {
			this.view.createBox(boxWrapValues, "srs__box-btn-2", settings.to, settings.to);
			this.view.createControlBtn(container, "srs__btn--to", settings.to, settings.to);
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
