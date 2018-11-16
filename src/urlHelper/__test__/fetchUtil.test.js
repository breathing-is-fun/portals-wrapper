/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-11-15 15:23:20
 * @Last Modified by: zy9
 * @Last Modified time: 2018-11-15 20:59:36
 */
import { checkType, getRealParams, serialize, getRealUrl, checkMethod } from '..';

const error = console.error;

afterEach(() => {
	console.error = error;
});

describe('fetchUtil', () => {
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
		let data = { apple: 1, orange: 2 };

		expect(serialize(data, '&')).toBe('apple=1&orange=2');
		expect(serialize(data, '%26')).toBe('apple=1%26orange=2');

		data = 'apple=1&orange=2';
		expect(serialize(data, '&')).toBe('apple=1&orange=2');
	});
});