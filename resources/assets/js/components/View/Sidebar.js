import React from 'react';
import { connect } from 'react-redux';
// components
import Button from '../forms/Button';
import DockMessage from '../DockMessage';
// actions
import { fetch } from '../../redux/collections/actions';
// helpers
import { delay } from '../../helpers';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (!this.props.collections.fetch.sending && this.props.collections.fetch.prestine) {
      // delay for 500ms before fetching
      delay(0.5, this.props.fetch);
    }
  }

  render() {
    return (
      <div className="side-bar">
        <h1><i className="fa fa-tasks" aria-hidden="true"></i> Your collections</h1>
        
        {
          this.props.collections.fetch.sending || (!this.props.collections.fetch.sending && this.props.collections.fetch.prestine)
          ? <DockMessage styled={false}>
              <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
              <span className="sr-only">Loading...</span>
            </DockMessage>
          : this.props.collections.fetch.status == 500 && this.props.collections.fetch.message?
            <DockMessage styled={false}>
              <i className="fa fa-exclamation-circle" aria-hidden="true"></i> {this.props.collections.fetch.message}
            </DockMessage>
          : this.props.collections.data.length?
            <ul>
              {this.props.collections.data.map(collection => <li>collection.title</li>)}
            </ul>
          :   <div>
              <p>You have no collections yet.</p>
              <Button
                onClick={() => alert('clicked')}
                icon="plus"
                text="Create"
              />
            </div>
        }
      </div>
    );
  }
}

export default connect(store => ({
  collections: { ...store.collections }
}), {
  fetch
})(Sidebar);