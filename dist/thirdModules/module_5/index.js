export class TestModule {
	constructor (root) {
		let wrapper = document.createElement('div');

		wrapper.setAttribute('style', 'background: #aaa; height: 100%;');

		root.appendChild(wrapper);
	}
}