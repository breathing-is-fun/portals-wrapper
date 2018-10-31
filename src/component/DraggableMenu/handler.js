/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-10-25 14:29:08
 * @Last Modified by: zy9
 * @Last Modified time: 2018-10-31 16:36:29
 */
const handleMenuGroup = dataSource => {
	let result = [], groupDatas = selectGroup(dataSource);

	// 凑菜单数据结构，[{ groupName: '', children: [{ text: '', url: '' }] }]
	for(let item of groupDatas) {
		const { group, groupName } = item;
		let childResult = { groupName, group, children: [], key: '' };

		for(let jtem of dataSource) {
			const { group: groupChild, id, text, key } = jtem;
			const { children } = childResult;

			if(groupChild == group) {
				childResult.key = groupChild + id;

				children.push(Object.assign({}, jtem, { title: text, value: key, key }));
			}
		}

		result.push(childResult);
	}

	return result;
};

// 分出有哪几组及组别名称
const selectGroup = dataSource => {
	let result = [], tempGroupDatas = [];

	for(let item of dataSource) {
		const { group, groupname: groupName } = item;

		tempGroupDatas.push(JSON.stringify({ group, groupName }));
	}
	tempGroupDatas = Array.from(new Set(tempGroupDatas));

	for(let item of tempGroupDatas) {
		result.push(JSON.parse(item));
	}

	return result;
};

const recurseTreeNode = dataSource => {
	let result = [];

	return result;
};

export { handleMenuGroup };