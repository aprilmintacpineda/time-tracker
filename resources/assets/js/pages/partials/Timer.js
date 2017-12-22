import React from 'react';
import { connect } from 'react-redux';
// components
import Icon from '../../components/Icon';
// actions
import { runTimer, pauseTimer } from '../../redux/tasks/actions';
// helpers
import { timeSpent } from '../../helpers';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      timer: null,
      secondsSpent: 0
    };

    this.handleRunTimer = this.handleRunTimer.bind(this);
    this.handlePauseTimer = this.handlePauseTimer.bind(this);
    this.stopCounting = this.stopCounting.bind(this);
    this.startCounting = this.startCounting.bind(this);
    this.calculateTimeSpent = this.calculateTimeSpent.bind(this);
    this.tick = this.tick.bind(this);
  }

  tick() {
    this.setState({
      ...this.state,
      secondsSpent: this.state.secondsSpent + 1
    });
  }

  handlePauseTimer() {
    this.props.pauseTimer(this.props.task, this.props.task_index, new Date().getTime(), this.state.secondsSpent);
    this.stopCounting();
  }

  handleRunTimer() {
    this.props.runTimer(this.props.task, this.props.task_index, new Date().getTime());
    this.startCounting();
  }

  stopCounting() {
    clearInterval(this.state.timer);
    this.setState({
      ...this.state,
      timer: null
    });
  }

  startCounting() {
    let timer = setInterval(this.tick, 1000);
    this.setState({
      ...this.state,
      timer
    });
  }

  calculateTimeSpent(seconds) {
    let h = Math.floor((seconds / 3600));
    let m = Math.floor((seconds / 60) % 60);
    let s = Math.floor(seconds % 60);

    return (h.toString().length > 1? h : '0' + h) + ':' +
      (m.toString().length > 1? m : '0' + m) + ':' +
      (s.toString().length > 1? s : '0' + s);
  }

  componentWillMount() {
    this.setState({
      ...this.state,
      secondsSpent: this.props.task.secondsSpent
        ? parseInt(this.props.task.secondsSpent)
        : 0
    }, () => {
      if (this.props.task.is_playing == 1) {
        this.startCounting();
      }
    });
  }

  render() {
    return (
      <div className="timer">
        <div className={this.state.timer? 'playing' : ''}>
          {this.calculateTimeSpent(this.state.secondsSpent)}
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