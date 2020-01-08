class View {
	constructor() {
		// wait dom loading
		document.addEventListener("DOMContentLoaded", () => {
			this.ballBtns = Array.from(document.querySelectorAll(".srs__btn"));

			// add mousedown event to each btn-ball on page
			this.ballBtns.forEach((ball) => {
				ball.addEventListener("mousedown", (e) => {
					this.btnDrag(e);
				});
			});
		});
	}

	//creating elements
	createLine(parent) {
		let line = document.createElement("div");

		line.classList.add("srs__line");
		parent.append(line);
	}

	createBoxWrap(parent, selector) {
		let boxWrap = document.createElement('div');

		boxWrap.classList.add("srs__box-wrap", selector);
		parent.append(boxWrap);
	}

	createBox(parent, selector, value, position = "") {
		let box = document.createElement("span");

		box.textContent = value;
		box.classList.add("srs__box", selector);
		box.style.left = position + "%";
		parent.append(box);
	}

	createControllBtn(parent, selector, value, position) {
		let btn = document.createElement("btn");

		btn.setAttribute("data-xCoords", value);
		btn.setAttribute("type", "btn");
		btn.classList.add("srs__btn", selector);
		btn.style.left = position;
		parent.append(btn);
	}

	// events
	btnDrag(e) {
	}
}

export default View;
