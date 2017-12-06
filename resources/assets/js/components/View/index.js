import React from 'react';
import { connect } from 'react-redux';
// components
import Sidebar from './Sidebar';
import FloatingMenu from '../FloatingMenu';
// actions
import { fieldToggle as createTaskToggle } from '../../redux/create_tasks/actions';

class View extends React.Component {
	render() {
		return (
			<div className="view-wrapper">
				<FloatingMenu
					menus={[
						{
							text: 'Create Collection',
							icon: 'plus',
							onClick: () => alert('create colection')
						},
						{
							text: 'Create Task',
							icon: 'plus',
							onClick: this.props.createTaskToggle
						}
					]}
				/>
				<Sidebar />
				<div className="content-body">{this.props.children}</div>
			</div>
		);
	}
}

export default connect(null, {
	createTaskToggle
})(View);