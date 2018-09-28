export class TestModule {
	constructor (root) {
		let wrapper = document.createElement('div');

		wrapper.setAttribute('style', 'background: #F96; height: 100%; transition: background .7s cubic-bezier(.645, .045, .355, 1);');

		this.wrapper = wrapper;
		this['_moduleOnMount'] = this.onMount;

		root.appendChild(wrapper);
	}

	onMount () {
		let color = '#F96';
		const colorOrigin = '#F96';
		const colorChange = 'green';

		setInterval(() => {
			if(color == colorOrigin) {
				this.changeBackgroundColor(colorChange);
				color = colorChange;
			} else {
				this.changeBackgroundColor(colorOrigin);
				color = colorOrigin;
			}
		}, 2000);
	}

	changeBackgroundColor (color) {
		this.wrapper.style.backgroundColor = color;
	}
}