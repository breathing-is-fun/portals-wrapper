var Bszx = function (root) {
	root.innerHTML = '<img id="showModal" src=\'http://47.95.1.229:9003/UploadFile/201808/工程运行.jpg\' style=\'width: 100%; height: 100%;\' />';
};

Bszx.prototype['_moduleOnMount'] = function () {
	document.getElementById('showModal').addEventListener('click', () => {
		window.SCTool.modal = {
			title: 'test',
			visible: true,
			content: '<div>content</div>',
		};
	}, false);
};

module.exports = Bszx;