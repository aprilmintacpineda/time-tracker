import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// actions
import { clear } from '../../redux/notifications/actions';
// helpers
import { delay, remove } from '../../helpers';

class Notification extends React.Component {
  constructor(props) {
    super(props);

    this.clearNotification = this.clearNotification.bind(this);

    this.state = {
    	timer: null
    };
  }

  clearNotification() {
    this.setState({
      ...this.state,
      timer: null
    }, () => this.props.notifications.length? this.props.clear() : false);

    if (!this.props.notifications.length) {
      clearTimeout(this.state.timer);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.notifications.length && !this.state.timer) {
      let timer = setTimeout(this.clearNotification, 5000);
      this.setState({
        ...this.state,
        timer
      });
    }
  }

  render() {
    return (
      <div className="notifications-list">
        {
          this.props.notifications.map((notification, i) =>
            <div key={i} className="notification">
              <p>{notification.message}</p>
              <a onClick={() => this.remove(notification.id)}>Dismiss</a>
            </div>
          )
        }
      </div>
    );
  }
}

export default connect(store => ({
  notifications: [...store.notifications]
}), {
	clear,
  remove
})(Notification);