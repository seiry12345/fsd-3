import Buttons from "./Buttons";

class Tooltips extends Buttons {
	renderButton(axis) {
		super.renderButton(axis);
		this.element.textContent = this.value;
	}
}

export default Tooltips;