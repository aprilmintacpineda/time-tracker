import React from 'react';
import { connect } from 'react-redux';
// components
import Icon from '../../components/Icon';
// actions
import { runTimer, pauseTimer } from '../../redux/tasks/actions';
import { create } from '../../redux/notifications/actions';
// helpers
import { timeSpent, delay } from '../../helpers';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      timer: null,
      secondsSpent: 0,
      shownStartupRunningNotification: false
    };

    this.handleRunTimer = this.handleRunTimer.bind(this);
    this.handlePauseTimer = this.handlePauseTimer.bind(this);
    this.stopCounting = this.stopCounting.bind(this);
    this.startCounting = this.startCounting.bind(this);
    this.renderTimeSpent = this.renderTimeSpent.bind(this);
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

  stopCounting(callback = null) {
    clearInterval(this.state.timer);
    this.setState({
      ...this.state,
      timer: null
    }, callback);
  }

  startCounting() {
    let timer = setInterval(this.tick, 1000);
    this.setState({
      ...this.state,
      timer
    });
  }

  renderTimeSpent(seconds) {
    let h = Math.floor((seconds / 3600));
    let m = Math.floor((seconds / 60) % 60);
    let s = Math.floor(seconds % 60);

    return (h.toString().length > 1? h : '0' + h) + ':' +
      (m.toString().length > 1? m : '0' + m) + ':' +
      (s.toString().length > 1? s : '0' + s);
  }

  calculateTimeSpent(task) {
    let lastTimeSpent = 0;

    if ((!task.last_stopped || task.last_stopped == 0) && task.first_started) {
      lastTimeSpent = Math.ceil((new Date().getTime() - task.first_started) / 1000);
    }

    let secondsSpent = task.seconds_spent
      ? parseInt(task.seconds_spent) + lastTimeSpent
      : lastTimeSpent;

    this.setState({
      ...this.state,
      secondsSpent
    }, () => {
      if (task.is_playing == 1) {
        this.startCounting();
        if (!this.state.shownStartupRunningNotification) {
          delay(1, () => {
            this.setState({
              ...this.state,
              shownStartupRunningNotification: true
            }, () => this.props.create('Timer for `'+ task.title +'` is running.'));
          });
        }
      }
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.task.id != nextProps.task.id) {
      this.stopCounting(() => this.calculateTimeSpent(nextProps.task));
    }
  }

  componentDidMount() {
    this.calculateTimeSpent(this.props.task);
  }

  render() {
    return (
      <tr className={(this.props.task_index % 2? 'task odd' : 'task even')}>
        <td>{this.props.task.title}</td>
        <td>{this.props.task.description? this.props.task.description : '------- none provided -------'}</td>
        <td>{new Date(this.props.task.created_at).toLocaleString()}</td>
        <td>
          <div className="timer">
            <div className={this.state.timer? 'playing' : ''}>
              {this.renderTimeSpent(this.state.secondsSpent)}
            </div>
            <div>
              {this.props.task.is_playing == 1
                ? <a onClick={this.handlePauseTimer}><Icon icon="player-pause" text="Pause" /></a>
                : <a onClick={this.handleRunTimer}><Icon icon="player-play" text="Run" /></a>
              }
            </div>
          </div>
        </td>
      </tr>
    );
  }
}

export default connect(null, {
  runTimer,
  pauseTimer,
  create
})(Timer);