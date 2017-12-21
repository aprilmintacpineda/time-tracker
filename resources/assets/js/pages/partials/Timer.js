import React from 'react';
import { connect } from 'react-redux';
// components
import Icon from '../../components/Icon';
// actions
import { runTimer, pauseTimer } from '../../redux/tasks/actions';
// helpers
import { timeSpent } from '../../helpers'

class Timer extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      timeLapse: 0,
      timer: null,
      timeSpent: null
    };

    this.handleRunTimer = this.handleRunTimer.bind(this);
    this.handlePauseTimer = this.handlePauseTimer.bind(this);
    this.displayTimeLapse = this.displayTimeLapse.bind(this);
    this.tick = this.tick.bind(this);
  }

  tick() {
    this.setState({
      ...this.state,
      timeLapse: this.state.timeLapse + 1
    });
  }

  handlePauseTimer() {
    this.props.pauseTimer(this.props.task, this.props.task_index, new Date().getTime());
    clearInterval(this.state.timer);
    this.setState({
      ...this.state,
      timer: null
    });
  }

  handleRunTimer() {
    this.props.runTimer(this.props.task, this.props.task_index, new Date().getTime());
    let timer = setInterval(this.tick, 1000);
    this.setState({
      ...this.state,
      timer
    });
  }

  componentWillMount() {
    this.setState({
      ...this.state,
      timeSpent:
        this.props.task.first_started || this.props.task.last_stopped
        ? 0
        : this.props.task.is_playing && this.props.task.last_stopped
        ? new Date().getTime() - this.props.task.first_started
        : this.props.task.last_stopped - this.props.task.first_started
    });
  }

  displayTimeLapse(seconds) {
    let h = Math.floor((seconds / 3600));
    let m = Math.floor((seconds / 60) % 60);
    let s = Math.floor(seconds % 60);

    return (h.toString().length > 1? h : '0' + h) + ':' +
      (m.toString().length > 1? m : '0' + m) + ':' +
      (s.toString().length > 1? s : '0' + s);
  }

  render() {
    return (
      <div className="timer">
        <div className={this.state.timer? 'playing' : ''}>
          {this.state.timer? this.displayTimeLapse(this.state.timeSpent + this.state.timeLapse) : this.displayTimeLapse(this.state.timeSpent)}
        </div>
        <div>
          {this.props.task.is_playing == 1
            ? <a onClick={this.handlePauseTimer}><Icon icon="player-pause" text="Pause" /></a>
            : <a onClick={this.handleRunTimer}><Icon icon="player-play" text="Run" /></a>
          }
        </div>
      </div>
    );
  }
}

export default connect(null, {
  runTimer,
  pauseTimer
})(Timer);