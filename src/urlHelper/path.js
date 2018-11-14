/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-11-01 19:21:49
 * @Last Modified by: zy9
 * @Last Modified time: 2018-11-14 18:27:12
 */
// const proxy = 'http://47.95.1.229:9007/webapi/api/v1/zjzhsl/proxy?url=';
const proxy = null;

const prod = {
	propertyDatas: '../../mock/propertyDatas.json',
	's_slmh_menu_data': 'http://47.95.1.229:9003/webapi/api/v1.1/basic/data?key=s_slmh_menu_data',
	's_slmh_meal_layout_data': 'http://47.95.1.229:9003/webapi/api/v1.1/basic/data?key=s_slmh_meal_layout_data',
	's_slmh_meal_switch': 'http://47.95.1.229:9003/webapi/api/v1.1/basic/data?key=s_slmh_meal_switch',
	'd_slmh_meal': 'http://47.95.1.229:9003/webapi/api/v1.1/basic/data?key=d_slmh_meal',
	'add_meal': 'http://47.95.1.229:9007/webapi1/api/basic/meal',
	'style_menu_data': '../../mock/menuDatas.json',
};

const dev = {};

// const path = process.argv.toString().includes('development') ? dev : prod;
const path = prod;

export { path, proxy };