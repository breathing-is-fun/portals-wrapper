/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-04-24 15:34:46
 * @Last Modified by: zy9
 * @Last Modified time: 2018-08-28 11:37:26
 */
// import DataInstance from '../core/data-instance';

// const frames = Array.from(document.getElementsByTagName('iframe'));
let execObjects = [];

fetch('./mock/frameDatas.json')
	.then(result => result.json())
	.then(result => {
		const { data } = result;

		for (let i = 0, len = data.length; i < len; i++) {
			const { url } = data[i];

			let frame = document.getElementById('module_' + (i + 1));

			execObjects.push({
				node: frame,
				url,
				method: { key: 'changeBackgroundColor', params: '#ccc' }
			});
			// frame.src = url;

			// frame.onload = e => {
			// 	let dataIns = document.getElementById('module_' + (i + 1)).contentWindow;

			// 	dataIns.changeBackgroundColor && dataIns.changeBackgroundColor('#ccc');
			// };
		}

		recurseIframeLoad(execObjects, 0, () => {
			console.log('finished');
		});
	});

/**
 * iframe按顺序加载
 * @param execObjects [{ node: DomNode, url: string, method: [{ key: string, params: {} }] }]
 * @param callback 递归执行完成时的回调
 *
 * node：dom节点
 * url：iframe地址
 * callback：iframe加载完成后的回调
 * key：iframe中contentWindow的方法
 * params：传入参数
 */
const recurseIframeLoad = (execObjects = [], index = 0, callback) => {
	if(index < execObjects.length) {
		const item = execObjects[index];
		const { node, url, method } = item;
		const { key, params } = method;

		node.src = url;

		node.onload = e => {
			const instance = node.contentWindow;

			instance[key] && instance[key](params);

			recurseIframeLoad(execObjects, ++index, callback);
		};
	} else {
		callback && callback();
	}
};