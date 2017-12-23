import {
  types as actionTypes,
  runTimerFailed,
  runTimerSuccessful,
  pauseTimerFailed,
  pauseTimerSuccessful
} from '../../redux/tasks/actions';
import initial_state from '../../redux/tasks/initial_state';
import reducer from '../../redux/tasks/reducer';
import settings from '../../settings';

describe('Reducers: tasks', () => {
  it('gives its default state', () => {
    expect(reducer(undefined, {
      type: 'init'
    })).toEqual(initial_state);
  });

  it('handles fetching', () => {
    expect(reducer({
      ...initial_state,
    }, {
      type: actionTypes.fetching
    })).toEqual({
      ...initial_state,
      fetch: {
        ...initial_state.fetch,
        prestine: false,
        sending: true,
        status: null,
        message: null
      }
    });
  });

  it('handles fetched', () => {
    // successful fetched
    expect(reducer({
      ...initial_state,
      fetch: {
        ...initial_state.fetch,
        sending: true,
        count: 1
      }
    }, {
      type: actionTypes.fetched,
      status: 200,
      data: [{ test: 1 }]
    })).toEqual({
      ...initial_state,
      fetch: {
        prestine: false,
        sending: false,
        status: 200,
        message: null,
        count: 2
      },
      data: [{ test: 1 }]
    });
  });

  it('handles prepend', () => {
    expect(reducer(initial_state, {
      type: actionTypes.prepend,
      data: [{
        random_data: 'test data',
        radom: 'another test data'
      }]
    })).toEqual({
      ...initial_state,
      data: [
        {
          random_data: 'test data',
          radom: 'another test data'
        }
      ]
    })
  });

  it('handles runTimer', () => {
    let timestamp = new Date().getTime();

    expect(reducer({
      ...initial_state,
      data: [{
        first_started: null,
        last_stopped: null,
        is_playing: false
      }]
    }, {
      type: actionTypes.runTimer,
      task: {
        first_started: null,
        last_stopped: null,
        is_playing: false
      },
      task_index: 0,
      timestamp
    })).toEqual({
      ...initial_state,
      data: [{
        first_started: timestamp,
        last_stopped: null,
        is_playing: true
      }]
    });
  });

  it('handles pauseTimer', () => {
    let timestamp = new Date().getTime();

    expect(reducer({
      ...initial_state,
      data: [{
        first_started: timestamp - 14400,
        last_stopped: null,
        secondsSpent: 60,
        is_playing: true
      }]
    }, {
      type: actionTypes.pauseTimer,
      task: {
        first_started: timestamp - 14400,
        last_stopped: null,
        is_playing: true
      },
      task_index: 0,
      timestamp,
      secondsSpent: 100
    })).toEqual({
      ...initial_state,
      data: [{
        first_started: timestamp - 14400,
        last_stopped: timestamp,
        secondsSpent: 100,
        is_playing: false
      }]
    });
  });

  it('handles runTimerFailed', () => {
    let state = {
      ...initial_state,
      data: [
        {
          id: 1,
          title: 'test',
          is_playing: false
        }
      ]
    };

    expect(reducer(state, runTimerFailed(0)))
      .toEqual({
        ...state,
        data: [
          {
            ...state.data[0],
            failedToRun: true
          }
        ]
      });
  });

  it('handles runTimerSuccessful', () => {
    let state = {
      ...initial_state,
      data: [
        {
          id: 1,
          title: 'test',
          is_playing: false,
          failedToRun: true
        }
      ]
    };

    expect(reducer(state, runTimerSuccessful(0)))
      .toEqual({
        ...state,
        data: [
          {
            ...state.data[0],
            failedToRun: false
          }
        ]
      });
  });

  it('handles pauseTimerFailed', () => {
    let state = {
      ...initial_state,
      data: [
        {
          id: 1,
          title: 'test',
          is_playing: false
        }
      ]
    };

    expect(reducer(state, pauseTimerFailed(0)))
      .toEqual({
        ...state,
        data: [
          {
            ...state.data[0],
            failedToPause: true
          }
        ]
      });
  });

  it('handles pauseTimerSuccessful', () => {
    let state = {
      ...initial_state,
      data: [
        {
          id: 1,
          title: 'test',
          is_playing: false,
          failedToPause: true
        }
      ]
    };

    expect(reducer(state, pauseTimerSuccessful(0)))
      .toEqual({
        ...state,
        data: [
          {
            ...state.data[0],
            failedToPause: false
          }
        ]
      });
  });
});