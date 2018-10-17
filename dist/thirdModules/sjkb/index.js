export class TestModule {
	constructor (root) {
		let wrapper = document.createElement('div');

		wrapper.innerHTML = `
            <img src='http://47.95.1.229:9003/UploadFile/201808/sjkb.png' style='width: 100%; height: 100%;' />
		`;
		wrapper.setAttribute('style', 'height: 100%;');

		this.wrapper = wrapper;
		this['_moduleOnMount'] = this.onMount;

		root.appendChild(wrapper);
	}

	onMount () {

	}

	changeBackgroundColor (color) {
		this.wrapper.style.backgroundColor = color;
	}
}