import React from 'react';
import Icon from './Icon';

export default ({ children, title = false, dismissOnBackgroundClick = false, allowDismiss = true, dismiss = null }) =>
	<div className="modal-wrapper">
		<div className="modal-bg" onClick={() => dismissOnBackgroundClick && allowDismiss && dismiss? dismiss() : false } />
		<div className="modal-overlay-wrapper">
			<a className={'dismiss-btn' + (allowDismiss? '' : ' disabled')} onClick={() => allowDismiss && dismiss? dismiss() : false }><Icon icon="close" /></a>
			<div className="modal-overlay">
				{ title? <h1 className="title">{title}</h1> : null }
				<div>{ children }</div>
			</div>
		</div>
	</div>;