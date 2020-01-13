import Buttons from "./Buttons";

class Tooltips extends Buttons {
	renderTextValue(max, coordinates) {
		return this.element.textContent = this.convertToCoords(coordinates, max);
	}

	renderTooltip(element, coordinates, max) {
		this.setElement(element);
		this.setCoordinates(coordinates);
		this.renderTextValue(max, coordinates);
		this.renderElement();
	}
}

export default Tooltips;