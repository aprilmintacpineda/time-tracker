import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// actions
import { clear } from '../../redux/notifications/actions';
// helpers
import { delay } from '../../helpers';

class Notification extends React.Component {
  static propTypes = {
    message: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);

    this.clearNotification = this.clearNotification.bind(this);

    this.state = {
    	timer: null
    };
  }

  clearNotification() {
  	clearTimeout(this.state.timer);
  	this.setState({
  		...this.state,
  		timer: null
  	}, () => this.props.clear(this.props.index));
  }

  componentDidMount() {
  	let timer = setTimeout(this.clearNotification, 5000);
  	this.setState({
  		...this.state,
  		timer
  	});
  }

  render() {
    return (
      <div className="notification">
      	<p>{this.props.message}</p>
      	<a onClick={this.clearNotification}>Dismiss</a>
      </div>
    );
  }
}

export default connect(null, {
	clear
})(Notification);