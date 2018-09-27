export class TestModule {
	constructor (root, callback) {
		let wrapper = document.createElement('div');

		// wrapper.setAttribute('id', 'wrapper');
		wrapper.setAttribute('style', 'background: #F96; height: 100%;');

		root.appendChild(wrapper);

		callback && callback();
	}
}