var Dbzx = function (root) {
	root.innerHTML = '<img src=\'http://47.95.1.229:9003/UploadFile/201808/dbzx.png\' style=\'width: 100%; height: 100%;\' />';
};

Dbzx.prototype['_moduleOnMount'] = function () {
	console.log('dbzx on mount');
};

module.exports = Dbzx;