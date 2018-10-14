/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-10-14 10:31:52
 * @Last Modified by: zy9
 * @Last Modified time: 2018-10-14 10:40:17
 */

// 获得style中文枚举
export default class PropertyLoader {
	constructor (style, callback) {
		this.style = style;
		this.callback = callback;

		this.load();
	}

	load = () => {
		fetch('../../../mock/propertyDatas.json')
			.then(result => result.json())
			.then(result => {
				this.callback && this.callback(result.data);
			});
	}
}