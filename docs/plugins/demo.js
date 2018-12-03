import React from 'react';
import ReactDOM from 'react-dom';

import YourModule from '.';

export default class Wrapper {
	constructor (root, ticket) {
		ReactDOM.render(<YourModule ticket={ ticket } />, root);
	}
}