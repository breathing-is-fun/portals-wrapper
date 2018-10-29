/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-10-14 10:31:52
 * @Last Modified by: zy9
 * @Last Modified time: 2018-10-29 14:08:56
 */

// 获得style中文枚举
export default class PropertyLoader {
	load = (enumDatas, style = {}, key, callback) => {
		// fetch('../../../mock/propertyDatas.json')
		// 	.then(result => result.json())
		// 	.then(result => {
		// 		const propertyDatas = this.hanldePropertyEnum(style, result.data);

		// 		callback && callback(propertyDatas);
		// 	});
		const propertyDatas = this.hanldePropertyEnum(style, enumDatas, key);

		callback && callback(propertyDatas);
	}

	hanldePropertyEnum = (style, enumDatas, id) => {
		let result = [];
		const styleKeys = Object.keys(style);

		for(let styleKey of styleKeys) {
			for(let item of enumDatas) {
				const { text, key, isStyle = true } = item;

				if(key == styleKey) {
					result.push({ text, key, isStyle, value: style[styleKey], id });
				}
			}
		}

		return result;
	}
}