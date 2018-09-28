export class TestModule {
	constructor (root, callback) {
		let wrapper = document.createElement('div');

		wrapper.setAttribute('style', 'background: #F96; height: 100%; transition: background .7s cubic-bezier(.645, .045, .355, 1);');

		this.wrapper = wrapper;
		this.changeBackgroundColor = function (color) {
			this.wrapper.style.backgroundColor = color;
		}.bind(this);

		root.appendChild(wrapper);

		callback && callback();
	}
}