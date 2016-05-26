import React from 'react';

export default class Hello extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<p>Hello, visitor.</p>
				<p>{new Date().toLocaleString()}</p>
			</div>
		);
	}
}