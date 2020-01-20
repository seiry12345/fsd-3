class View {
  constructor() {
    document.addEventListener('DOMContentLoaded', () => {
      this.buttons = Array.from(document.querySelectorAll('.srs__button'));

      // listen event on each slider button
      this.buttons.forEach(button => {
        button.addEventListener('mousedown', e => {
          this.buttonOnDrag(e);
        });
      });
    });
  }

  //creating element
  createTemplate(parent, val, position) {
    const template = `
			<div class="srs__line"></div>
			<div class="srs__handlers">
				<div class="srs__handler">
					<label for="handler-from" class="srs__tooltip srs__tooltip--from">
						${val}
					</label>
					<input
					type="button"
					class="srs__button srs__button--from"
					id="handler-from"
					data-value=${val}
					style="left: ${position}"
					/>
				</div>
			</div>
		`;

    parent.innerHTML = template;
  }

  createHandler(parent, id, tooltipSelector, buttonSelector, val, position) {
    const template = `
		<div class="srs__handler">
			<label for=${id} class="srs__tooltip ${tooltipSelector}">
				${val}
			</label>
			<input
			type="button"
			class="srs__button ${buttonSelector}"
			id=${id}
			data-value=${val}
			style="left: ${position}"
			/>
		</div>
		`;

    parent.innerHTML = template;
  }

  createBoxWrap(parent, selector) {
    let boxWrap = document.createElement('div');

    boxWrap.classList.add('srs__box-wrap', selector);
    parent.append(boxWrap);
  }

  // events
  buttonOnDrag(e) {}
}

export default View;
