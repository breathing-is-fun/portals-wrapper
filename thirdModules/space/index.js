export class TestModule {
	constructor (root) {
		let wrapper = document.createElement('div');

		wrapper.setAttribute('style', 'width: 100%; height: 100%;');

		this.wrapper = wrapper;
		this['_moduleOnMount'] = this.onMount;

		root.appendChild(wrapper);
	}

	onMount () {

	}
}