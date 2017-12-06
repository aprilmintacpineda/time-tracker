import React from 'react';
// components
import Icon from '../Icon';

export default ({ onClick = null, text = 'Submit', type = null, disabled = false, loading = false, icon = null, styled = true }) => 
	loading?
		<a className="btn loading"><span><i className="fa fa-circle-o-notch fa-spin fa-1x fa-fw"></i></span></a>
	: 	<a
			className={'btn ' + (styled?
				type == 'primary' ?
					'primary'
				: type == 'cancel'?
					'cancel'
				: 'default'
				: '') + (disabled? ' disabled' : '')}
			onClick={clickEvent => !disabled && onClick? onClick(clickEvent) : false}
			disabled={disabled}>
			{
				icon?
					<Icon icon={icon} text={text} />
				: <span>{text}</span>
			}
		</a>;