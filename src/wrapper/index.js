/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-04-24 15:34:46
 * @Last Modified by: zy9
 * @Last Modified time: 2018-08-28 09:46:54
 */
// import DataInstance from '../core/data-instance';

const frames = Array.from(document.getElementsByTagName('iframe'));
let dataInstances = [];

fetch('./mock/frameDatas.json')
	.then(result => result.json())
	.then(result => {
		const { data } = result;

		for (let i = 0, len = data.length; i < len; i++) {
			const { url } = data[i];

			let frame = document.getElementById('module_' + (i + 1));

			frame.src = url;

			frame.onload = e => {
				let dataIns = document.getElementById('module_' + (i + 1)).contentWindow;

				dataIns.changeBackgroundColor && dataIns.changeBackgroundColor('#ccc');
			};
		}
	});