import React from 'react';
import { connect } from 'react-redux';
import Icon from './Icon';

class FloatingMenu extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			shown: false
		};

		this.toggle = this.toggle.bind(this);
	}

	componentWillMount() {
		if (this.props.showImmediately) {
			this.setState({
				shown: true
			});
		}
	}

	toggle() {
		this.setState({
			shown: !this.state.shown
		});
	}

	render() {
		return (
			<div className="floating-menu">
				<ul className="outer">
					<li>
						<span onClick={this.toggle} className="fa fa-chevron-circle-down" aria-hidden="true"></span>
						<ul className={(this.state.shown? 'inner shown': 'inner hidden')}>
							{this.props.menus.map((menu, i) =>
								<li key={i}>
									<a
										className={menu.disabled? 'disabled' : ''}
										onClick={() => this.state.shown && !menu.disabled && menu.onClick? menu.onClick() : false}>
										{
											menu.icon?
												<Icon icon={menu.icon} text={menu.text} />
											: 	menu.text
										}
									</a>
								</li>
							)}
						</ul>
					</li>
				</ul>
			</div>
		);
	}
}

export default connect(state => ({

}), {

})(FloatingMenu);