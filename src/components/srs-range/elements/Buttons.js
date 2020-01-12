class Buttons {
	constructor(target, xCoords) {
		this.element = target;
		this.xCoords = xCoords;
	}

	setElement(element) {
		return this.element = element;
	}

	setCoordinates(xCoords) {
		return this.xCoords = xCoords;
	}

	renderElement() {
		this.element.style.left = this.xCoords + '%';
	}

	update(element, xCoords) {
		this.setElement(element);
		this.setCoordinates(xCoords);
	}

	static collision(first, second, target) {
		if (first.xCoords >= second.xCoords) {
			if (target.classList.contains("srs__button--to")) {
				// for buttonTo
				second.xCoords = first.xCoords;
				second.element.style.left = second.xCoords + '%';
			} else {
				// for buttonFrom
				first.xCoords = second.xCoords;
				first.element.style.left = first.xCoords + '%';
			}
		}
	}

	convertToCoords(coords, max) {
		return Math.floor(max * (coords / 100));
	}
}

export default Buttons;
