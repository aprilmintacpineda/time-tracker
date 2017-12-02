import React from 'react';

export default ({ icon, text }) =>
	<span className="with-icon">
		{
			icon == 'plus'?
				<span className="fa fa-plus icon" aria-hidden="true" />
			: <span className="fa fa-question" aria-hidden="true"></span>
		} {text}
	</span>;