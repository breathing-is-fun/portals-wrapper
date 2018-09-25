/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-04-24 15:34:46
 * @Last Modified by: zy9
 * @Last Modified time: 2018-09-25 19:34:59
 */
// import DataInstance from '../core/data-instance';

let execObjects = [];

fetch('./mock/frameDatas.json')
	.then(result => result.json())
	.then(result => {
		const { data } = result;

		initWrapper(data);

		for (let i = 0, len = data.length; i < len; i++) {
			const { url } = data[i];

			let node = document.getElementById('module_' + (i + 1));

			execObjects.push({ node, url, method: [{ key: 'changeBackgroundColor', params: '#aaa' }] });
		}

		recurseIframeLoad(execObjects, 0, () => {
			console.log('finished');

			document.getElementById('wrapper_1').addEventListener('dragstart', event => {
				event.dataTransfer.setData('Text', event.target.id);
			}, false);

			document.getElementById('wrapper_2').addEventListener('dragenter', event => {
				event.preventDefault();
			}, false);

			document.getElementById('wrapper_2').addEventListener('dragover', event => {
				event.preventDefault();
			}, false);

			document.getElementById('wrapper_2').addEventListener('drop', event => {
				event.preventDefault();
				const data = event.dataTransfer.getData('Text');

				console.log(data);

				event.target.innerText = 'test';
			}, false);
		});
	});

/**
 * 初始化根节点及模块容器
 * @param options 配置数据，[], 参数尚未确定
 */
const initWrapper = options => {
	const root = document.getElementById('root');

	for(let item of options) {
		const { left, top, width, height, style, id } = item;

		root.innerHTML += `
			<div style='left: ${ left }; top: ${ top }; width: ${ width }; height: ${ height }; ${ style }' id='wrapper_${ id }' class='wrapper' draggable='true'>
				<div class='title' style='cursor: default;'>
					<span>title_${ id }</span>
				</div>
				<iframe id='module_${ id }' frameborder='0'></iframe>
			</div>
		`;
	}
};

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

		node.src = url;

		node.onload = e => {
			const instance = node.contentWindow;

			for(let item of method) {
				const { key, params } = item;

				instance[key] && instance[key](params);
			}

			recurseIframeLoad(execObjects, ++index, callback);
		};
	} else {
		callback && callback();
	}
};