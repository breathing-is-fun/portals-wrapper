/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-10-25 14:29:08
 * @Last Modified by: zy9
 * @Last Modified time: 2018-10-30 11:10:23
 */
const handleMenuGroup = dataSource => {
	let result = [], groupDatas = [], tempGroupDatas = [];

	// 分出有哪几组及组别名称
	for(let item of dataSource) {
		const { group, groupname: groupName } = item;

		tempGroupDatas.push(JSON.stringify({ group, groupName }));
	}
	tempGroupDatas = Array.from(new Set(tempGroupDatas));

	for(let item of tempGroupDatas) {
		groupDatas.push(JSON.parse(item));
	}

	// 凑菜单数据结构，[{ groupName: '', children: [{ text: '', url: '' }] }]
	for(let item of groupDatas) {
		const { group, groupName } = item;
		let childResult = { groupName, group, children: [] };

		for(let jtem of dataSource) {
			const { group: groupChild } = jtem;
			const { children } = childResult;

			if(groupChild == group) {
				children.push(jtem);
			}
		}

		// if(childResult.children && childResult.children.length == 1) {
		// 	delete childResult.children;
		// }

		result.push(childResult);
	}

	return result;
};

export { handleMenuGroup };