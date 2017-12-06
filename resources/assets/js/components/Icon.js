import React from 'react';

export default ({ icon, text, className = null, standAlone = false }) =>
	<span className={'with-icon' + (className? ' ' + className : '') + (standAlone? ' stand-alone': '')}>
		{
			icon == 'plus'?
				<span className="fa fa-plus icon" aria-hidden="true" />
			: icon == 'error'?
				<span className="fa fa-exclamation-circle icon" aria-hidden="true" />
			: icon == 'cancel'?
				<i className="fa fa-ban icon" aria-hidden="true"></i>
			: icon == 'send'?
				<i className="fa fa-paper-plane icon" aria-hidden="true"></i>
			: icon == 'close'?
				<i className="fa fa-times icon" aria-hidden="true"></i>
			: icon == 'circled-close'?
				<i className="fa fa-times-circle icon" aria-hidden="true"></i>
			: icon == 'back'?
				<i className="fa fa-arrow-circle-left icon" aria-hidden="true"></i>
			: null
		} { text }
	</span>;