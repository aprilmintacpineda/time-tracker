import React from 'react';

export default ({ children, title = false }) =>
	<div className="modal">
		<div className="modal-overlay">
			{ title? <h1>{title}</h1> : null }
			<div>{ children }</div>
		</div>
	</div>;