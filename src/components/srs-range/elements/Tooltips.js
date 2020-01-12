import Buttons from "./Buttons";

class Tooltips extends Buttons {
	renderTextValue(max, xCoords) {
		return this.element.textContent = this.convertToCoords(xCoords, max);
	}
}

export default Tooltips;