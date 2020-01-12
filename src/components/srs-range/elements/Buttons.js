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

	update(element, xCoords) {
		this.setElement(element);
		this.setCoordinates(xCoords);
	}

	static collision(first, second, target) {
		if (first.xCoords > second.xCoords) {
			if (target.classList.contains("srs__button--to")) {
				// for buttonTo
				second.xCoords = first.xCoords;
				target.style.left = second.xCoords + '%';
			} else {
				// for buttonFrom
				first.xCoords = second.xCoords;
				target.style.left = first.xCoords + '%';
			}

		}
	}
}

export default Buttons;
