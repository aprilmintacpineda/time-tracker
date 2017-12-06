import React from 'react';
import { connect } from 'react-redux';
// components
import View from '../components/View';
import DockMessage from '../components/DockMessage';
import Button from '../components/forms/Button';
import Modal from '../components/Modal';
// partials
import CreateTaskFormModal from './partials/CreateTaskFormModal';
// actions
import { fetch } from '../redux/tasks/actions';
import { fieldToggle as createTaskToggle } from '../redux/create_tasks/actions';
// helpers
import { delay } from '../helpers';

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		if (this.props.tasks.fetch.prestine && !this.props.tasks.fetch.sending) {
			// delay for 500ms before fetching
			delay(0.5, this.props.fetch);
		}
	}

	render() {
		return (
			<View>
				<div>
					<CreateTaskFormModal />

					{
						this.props.tasks.fetch.sending || (!this.props.tasks.fetch.sending && this.props.tasks.fetch.prestine)?
							<DockMessage styled={false}>
								<i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
								<span className="sr-only">Loading...</span>
							</DockMessage>
						: this.props.tasks.fetch.status == 500 && this.props.tasks.fetch.message?
							<DockMessage styled={false}>
								<p>{this.props.tasks.fetch.message}</p>
							</DockMessage>
						: this.props.tasks.data.length?
							<div className="task-list">
								{this.props.tasks.data.map((task, i) =>
									<div className="task" key={i}>
										<h1>{task.title}</h1>
										<p>{task.description}</p>
									</div>
								)}
							</div>
						: 	<DockMessage styled={false}>
								<p>You have no tasks yet.</p>
								<Button
									onClick={this.props.createTaskToggle}
									icon="plus"
									text="Create"
								/>
							</DockMessage>
					}
				</div>
			</View>
		);
	}
}

export default connect(store => ({
	tasks: { ...store.tasks }
}), {
	fetch,
	createTaskToggle
})(Dashboard);