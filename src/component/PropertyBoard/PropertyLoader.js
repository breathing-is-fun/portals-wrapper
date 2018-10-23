/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-10-14 10:31:52
 * @Last Modified by: zy9
 * @Last Modified time: 2018-10-15 09:40:23
 */

// 获得style中文枚举
export default class PropertyLoader {
	load = (style = {}, callback) => {
		fetch('../../../mock/propertyDatas.json')
			.then(result => result.json())
			.then(result => {
				const propertyDatas = this.hanldePropertyEnum(style, result.data);

				callback && callback(propertyDatas);
			});
	}

	hanldePropertyEnum = (style, dataSource) => {
		let result = [];
		const styleKeys = Object.keys(style);

		for(let styleKey of styleKeys) {
			for(let item of dataSource) {
				const { text, key, isStyle = true } = item;

				if(key == styleKey) {
					result.push({ text, key, isStyle, value: style[styleKey] });
				}
			}
		}

		return result;
	}
}