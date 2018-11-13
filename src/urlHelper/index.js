/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-11-01 18:48:56
 * @Last Modified by: zy9
 * @Last Modified time: 2018-11-13 17:43:12
 */
import { fetch } from 'whatwg-fetch';
import { path } from './path';

const types = ['json', 'html', 'text'];

/**
 * 封装的fetch请求
 * @param { key } 请求地址对应的简写key
 * @param { url } 请求地址，当传入此参数时，key将会失效
 * @param { method } 请求方式，只支持fetch自带的方法枚举，比如大写POST
 * @param { data } 请求参数，可以是对象或数组
 * @param { type } 解析方式，枚举['json', 'html', 'text']，默认为json
 * @param { params } 当需要设置header时可以用这个
 * @param { success } 请求结束时的回调
 */
const ajax = ({
	url,
	key,
	method = 'GET',
	data,
	type = 'json',
	success,
	params,
}) => {
	let realUrl, realParams;

	checkType(type);

	realUrl = getRealUrl(key);

	realParams = getRealParams(realUrl, data);

	let postParam = {};

	if(method != 'GET') {
		postParam = {
			body: JSON.stringify(data),
			method,
			headers: { 'Content-Type': 'application/json' },
		};
	}

	postParam = Object.assign({}, postParam, params);

	fetch(url ? url : (realUrl + realParams), postParam)
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
	if(!url) {
		return;
	}

	if(!data) {
		return '';
	}

	let fix = '';

	fix = url.includes('?') ? '&' : '?';

	return fix + serialize(data);
};

const serialize = data => {
	let paramStr = '';

	for(let key in data) {
		paramStr += `${ key }=${ data[key] }&`;
	}

	paramStr = paramStr.substr(0, paramStr.length - 1);

	return paramStr;
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