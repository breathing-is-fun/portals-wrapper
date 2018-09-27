var testModule = (function (root) {
	var wrapper = document.createElement('div');

	wrapper.setAttribute('id', 'wrapper');
	wrapper.setAttribute('style', 'background: #F96; height: 100%;');

	root.appendChild(wrapper);
});

export { testModule };