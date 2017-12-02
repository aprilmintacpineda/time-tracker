import React from 'react';
// components
import Icon from '../Icon';

export default ({ onClick, text, type = 'primary', disabled = false, icon = null, styled = true }) => 
	<a
		className={'btn ' + (styled? type == 'primary' ? 'primary' : 'btn default' : '') + (disabled? ' disabled' : '')}
		onClick={clickEvent => disabled? false : onClick(clickEvent)}
		disabled={disabled}>
		<Icon icon={icon} text={text} />
	</a>;