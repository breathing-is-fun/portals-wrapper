/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-11-15 15:23:20
 * @Last Modified by: zy9
 * @Last Modified time: 2018-11-18 11:27:14
 */
import { checkType, getRealParams, serialize, getRealUrl, checkMethod } from '..';

const error = console.error;

afterEach(() => {
	console.error = error;
});

describe('fetchUtil', () => {
	let data = { apple: 1, orange: 2 };
	const dataStr = 'apple=1&orange=2';
	const url = 'http://localhost:9099';

	it('checkType should work', () => {
		const types = [
			{ type: 'test', result: undefined },
			{ type: 'Json', result: 'json' },
			{ type: 'TExT', result: 'text' },
			{ type: 'HTML', result: 'html' },
		];

		console.error = jest.fn();

		for(let item of types) {
			const { type, result } = item;

			expect(checkType(type)).toBe(result);
		}
	});

	it('checkMethod should work', () => {
		const methods = [
			{ type: 'post', result: 'POST' },
			{ type: 'TEST', result: undefined },
		];

		console.error = jest.fn();

		for(let item of methods) {
			const { type, result } = item;

			expect(checkMethod(type)).toBe(result);
		}
	});

	it('serialize should work', () => {
		expect(serialize(data, '&')).toBe(dataStr);
		expect(serialize(data, '%26')).toBe('apple=1%26orange=2');

		data = dataStr;
		expect(serialize(data, '&')).toBe(data);
		expect(serialize([])).toBe(undefined);
		expect(serialize({})).toBe(undefined);
	});

	it('getRealParams should work', () => {
		expect(getRealParams(url, data, '&')).toBe('?' + dataStr);
		expect(getRealParams(url, undefined, '&')).toBe('');
		expect(getRealParams(url, {}, '&')).toBe(undefined);
		expect(getRealParams(url, [], '&')).toBe(undefined);
	});

	it('getRealUrl should work without proxy', () => {
		expect(getRealUrl('test', { test: url })).toBe(url);
	});

	it('getRealUrl should work with proxy', () => {
		const proxy = 'http://localhost:9098?url=';

		expect(getRealUrl('test', { test: url }, proxy)).toBe(proxy + url);
	});
});