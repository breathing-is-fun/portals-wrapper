/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-11-01 18:48:56
 * @Last Modified by: zy9
 * @Last Modified time: 2018-11-01 19:48:22
 */
import serialize from 'daily-util/Serialize';
import { path } from './path';

// const param = {
// 	method: 'GET',
// 	body: serialize({ id }),
// 	headers: { 'Content-Type': 'application/json' },
// };

const types = ['json', 'html', 'text'];

/**
 * 封装的fetch请求
 * @param { key } 请求地址对应的简写key
 * @param { url } 请求地址，当传入此参数时，key将会失效
 * @param { method } 请求方式，只支持fetch自带的方法枚举，比如大写POST
 * @param { data } 请求参数，可以是对象或数组
 * @param { type } 解析方式，枚举['json', 'html', 'text']，默认为json
 * @param { success } 请求结束时的回调
 */
const ajax = ({
	url,
	key,
	method = 'GET',
	data,
	type = 'json',
	success,
}) => {
	let realUrl, realParams;

	checkType(type);

	realUrl = getRealUrl(key);

	realParams = getRealParams(realUrl, data);

	fetch(url ? url : (realUrl + realParams))
		.then(result => result[type]())
		.then(result => success && success(result))
		.catch(error => console.error(error));
};

const checkType = type => {
	if (!types.includes(type)) {
		console.error('fetch type error.');

		return;
	}

	return type;
};

const getRealParams = (url, data) => {
	let fix = '';

	fix = url.includes('?') ? '&' : '?';

	return fix + serialize(data);
};

const getRealUrl = key => {
	let realUrl;

	for (let realKey in path) {
		if (key == realKey) {
			realUrl = path[realKey];

			break;
		}
	}

	if (!realUrl) {
		return;
	}

	return realUrl;
};

export { ajax };