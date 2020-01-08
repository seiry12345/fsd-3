class Controller {
	constructor(model, view) {
		this.model = model;
		this.view = view;
		this.step = this.model.step;
		this.coords1 = this.model.coords1;
		this.coords2 = this.model.coords2;
		this.max = this.model.max;
		this.min = this.model.min;

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
					const percentPart = Math.floor(this.max * (xCoords / 100));
					tooltip1.textContent = percentPart;
				}
				tooltip1.style.left = xCoords + "%";
			};

			const onMouseMove = (event) => {
				let value = event.clientX - line.getBoundingClientRect().left;
				let xCoords = (value / line.offsetWidth) * 100;
				xCoords = Math.floor(xCoords);
				let rightEdge = 100 + (target.offsetWidth * 0.5 / lineWidth);
				rightEdge = Math.floor(rightEdge);

				if (xCoords < 0) {
					xCoords = 0;
				}

				if (xCoords > rightEdge) {
					xCoords = Math.floor(rightEdge);
				}

				moveBall(xCoords);
				renderTooltip(xCoords);
			};

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
	init(model, context) {
		const container = context[0];

		container.classList.add('srs__wrapper');

		this.view.createBoxWrap(container, "srs__box-values");
		this.view.createLine(container);
		this.view.createBoxWrap(container, "srs__box-grid");

		const containerList = Object.values(container.children);
		let boxWrapValues = container.children[0];
		let boxWrapGrid = container.children[2];

		// create boxes
		this.view.createBox(boxWrapGrid, "srs__box-min", this.model.min);
		this.view.createBox(boxWrapGrid, "srs__box-max", this.model.max);

		// create value boxes
		this.view.createBox(boxWrapValues, "srs__box-btn-1", this.model.from, this.model.from);

		// create btns
		this.view.createControlBtn(container, "srs__btn--from", this.model.from, this.model.from);
	}
}

export default Controller;
