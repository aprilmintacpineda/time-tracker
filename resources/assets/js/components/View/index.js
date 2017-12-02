import React from 'react';
// components
import Sidebar from './Sidebar';
import FloatingMenu from '../FloatingMenu';
import Modal from '../Modal';

export default class View extends React.Component {
	render() {
		return (
			<div className="view-wrapper">
				<FloatingMenu
					menus={[
						{
							text: 'Create Collection',
							icon: 'plus',
							onClick: () => alert('Create Collection')
						},
						{
							text: 'Create Task',
							icon: 'plus',
							onClick: () => alert('Create Task')
						}
					]}
				/>
				<Sidebar />
				<div className="content-body">{this.props.children}</div>
			</div>
		);
	}
}