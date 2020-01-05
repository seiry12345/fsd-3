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

		}
	}

	// init
	init(model, context) {
		const element = context[0];

		element.classList.add('srs__wrapper');

		// create line bar
		this.view.createLine(element);
		const line = element.children[0];

		// create box wrap
		this.view.createBoxWrap(element);
		const boxWrap = element.children[1];

		// create min max boxes
		this.view.createBox(boxWrap, 'srs__box-min', this.model.min);
		this.view.createBox(boxWrap, 'srs__box-max', this.model.max);

		// create controll buttons
		this.view.createControlBtn(element, 'srs__btn--from', this.model.from, '0');
		// this.view.createControlBtn(element, 'srs__btn--to', this.model.to, '100%');
	}
}

export default Controller;
