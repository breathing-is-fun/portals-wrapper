export class TestModule {
	constructor (root) {
		let wrapper = document.createElement('div');

		wrapper.innerHTML = `
            <img src='http://47.95.1.229:9003/UploadFile/201808/rcap.png' style='width: 100%; height: 100%;' />
        `;
		wrapper.setAttribute('style', 'background: #F96; height: 100%; transition: background .7s cubic-bezier(.645, .045, .355, 1);');

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