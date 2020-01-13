class Buttons {
	constructor(element, xCoords) {
		this.element = element;
		this.xCoords = xCoords;
	}

	static setBorder(coordinates, rightEdge) {
		if (coordinates < 0) {
			coordinates = 0;
		}

		if (coordinates > rightEdge) {
			coordinates = Math.round(rightEdge);
		}

		return coordinates;
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

	renderButton(element, xCoords) {
		this.setCoordinates(xCoords);
		this.setElement(element);
		this.renderElement();
	}

	rangeButtonRender(target, coordinate, buttonFrom, buttonTo) {
		if (target.classList.contains('srs__button--from')) {
			buttonFrom.setElement(target);
			buttonFrom.xCoords = coordinate;

			if (
					buttonFrom.xCoords > buttonTo.xCoords &&
					coordinate > buttonTo.xCoords
			) {
				buttonFrom.xCoords = buttonTo.xCoords;
			}

			buttonFrom.renderElement();
		} else {
			buttonTo.setElement(target);
			buttonTo.xCoords = coordinate;

			if (
					buttonFrom.xCoords > buttonTo.xCoords &&
					coordinate < buttonFrom.xCoords
			) {
				buttonTo.xCoords = buttonFrom.xCoords;
			}

			buttonTo.renderElement();
		}
	}

	convertToCoords(coords, max) {
		return Math.floor(max * (coords / 100));
	}
}

export default Buttons;
