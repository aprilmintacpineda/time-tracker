import { types as actionTypes } from '../../redux/create_tasks/actions';
import initial_state, { new_field_template } from '../../redux/create_tasks/initial_state';
import { messages } from '../../redux/create_tasks/validations';
import reducer from '../../redux/create_tasks/reducer';
import settings from '../../settings';

describe('Reducers: create_tasks', () => {
  it('gives its default state', () => {
    expect(reducer(undefined, {
      type: 'init'
    })).toEqual(initial_state);
  });

  it('handles fieldToggle', () => {
    // toggle on
    expect(reducer(initial_state, {
      type: actionTypes.fieldToggle
    })).toEqual({
      ...initial_state,
      shown: true
    });
    // toggle off
    expect(reducer({
      ...initial_state,
      shown: true
    }, {
      type: actionTypes.fieldToggle
    })).toEqual({
      ...initial_state,
      shown: false
    });
  });

  it('handles titleChange', () => {
    // no error
    expect(reducer(initial_state, {
      type: actionTypes.titleChange,
      value: 'some title',
      target_index: 0
    })).toEqual({
      ...initial_state,
      fetch: {
        ...initial_state.fetch,
        // should allows submit even without description
        allow: true
      },
      fields: [
        {
          ...initial_state.fields[0],
          title: {
            value: 'some title',
            errors: []
          }
        }
      ]
    });
    // errors
    expect(reducer(initial_state, {
      type: actionTypes.titleChange,
      value: '',
      target_index: 0
    })).toEqual({
      ...initial_state,
      fields: [
        {
          ...initial_state.fields[0],
          title: {
            value: '',
            errors: [
              messages.title.required
            ]
          }
        }
      ]
    });
  });

  it('handles descriptionChange', () => {
    // no errors
    expect(reducer(initial_state, {
      type: actionTypes.descriptionChange,
      value: 'some description',
      target_index: 0
    })).toEqual({
      ...initial_state,
      fields: [
        {
          ...initial_state.fields[0],
          description: {
            value: 'some description',
            errors: []
          }
        }
      ]
    });
    // allow submit
    expect(reducer({
      ...initial_state,
      fields: [
        {
          ...initial_state.fields[0],
          title: {
            value: 'test title',
            errors: []
          }
        }
      ]
    }, {
      type: actionTypes.descriptionChange,
      value: 'some description',
      target_index: 0
    })).toEqual({
      ...initial_state,
      fetch: {
        ...initial_state.fetch,
        allow: true
      },
      fields: [
        {
          title: {
            value: 'test title',
            errors: []
          },
          description: {
            value: 'some description',
            errors: []
          }
        }
      ]
    });
  });

  it('handles fieldAdd', () => {
    expect(reducer({
      ...initial_state,
      fetch: {
        ...initial_state.fetch,
        allow: true
      }
    }, {
      type: actionTypes.fieldAdd
    })).toEqual({
      ...initial_state,
      fields: [
        ...initial_state.fields,
        {
          ...new_field_template
        }
      ]
    });
  });

  it('handles fieldRemove', () => {
    expect(reducer({
      ...initial_state,
      fields: [
        {
          ...new_field_template
        },
        {
          ...new_field_template
        },
        {
          something: 'something'
        },
        {
          ...new_field_template
        }
      ]
    }, {
      type: actionTypes.fieldRemove,
      target_index: 2
    })).toEqual({
      ...initial_state,
      fields: [
        {
          ...new_field_template
        },
        {
          ...new_field_template
        },
        {
          ...new_field_template
        }
      ]
    });
    // should have fetch allow true
    expect(reducer({
      ...initial_state,
      fields: [
        {
          title: {
            value: 'title 0',
            errors: []
          },
          description: {
            value: 'description 0',
            errors: []
          }
        },
        {
          title: {
            value: 'title 1',
            errors: []
          },
          description: {
            value: 'description 1',
            errors: []
          }
        }
      ]
    }, {
      type: actionTypes.fieldRemove,
      target_index: 1
    })).toEqual({
      ...initial_state,
      fetch: {
        ...initial_state.fetch,
        allow: true
      },
      fields: [
        {
          title: {
            value: 'title 0',
            errors: []
          },
          description: {
            value: 'description 0',
            errors: []
          }
        }
      ]
    });
  });

  it('handles submitting', () => {
    expect(reducer(initial_state, {
      type: actionTypes.submitting
    })).toEqual({
      ...initial_state,
      fetch: {
        ...initial_state.fetch,
        sending: true
      }
    })
  });

  it('handles submitted', () => {
    let state = {
      ...initial_state,
      shown: true,
      fetch: {
        ...initial_state.fetch,
        sending: true
      },
      fields: [
        {
          title: {
            value: 'test title',
            errors: []
          },
          description: {
            value: 'test description',
            errors: []
          }
        },
        {
          title: {
            value: 'test title 1',
            errors: []
          },
          description: {
            value: 'test description 1',
            errors: []
          }
        }
      ]
    };

    // 200
    expect(reducer({ ...state }, {
      type: actionTypes.submitted,
      status: 200,
      message: 'Successfully create 2 tasks.'
    })).toEqual({
      ...initial_state,
      shown: true,
      fetch: {
        ...initial_state.fetch,
        status: 200,
        message: 'Successfully create 2 tasks.'
      }
    });

    // error
    expect(reducer({ ...state }, {
      type: actionTypes.submitted,
      status: 500,
      message: settings.sendFailedMessage,
    })).toEqual({
      ...state,
      shown: true,
      fetch: {
        ...state.fetch,
        sending: false,
        status: 500,
        message: settings.sendFailedMessage
      }
    });

    // error
    expect(reducer({ ...state }, {
      type: actionTypes.submitted,
      status: 500,
      errors: {
        'task.1': [
          {
            title: [
              messages.title.required
            ],
            description: [
              messages.description.max
            ]
          }
        ]
      }
    })).toEqual({
      ...state,
      shown: true,
      fetch: {
        ...state.fetch,
        sending: false,
        status: 500
      },
      fields: [
        {
          title: {
            value: 'test title',
            errors: []
          },
          description: {
            value: 'test description',
            errors: []
          }
        },
        {
          title: {
            value: 'test title 1',
            errors: [
              messages.title.required
            ]
          },
          description: {
            value: 'test description 1',
            errors: [
              messages.description.max
            ]
          }
        }
      ]
    });
  });

  it('handles clearFetch', () => {
    expect(reducer({
      ...initial_state,
      fetch: {
        ...initial_state.fetch,
        sending: false,
        status: 500,
        message: settings.sendFailedMessage
      }
    }, {
      type: actionTypes.clearFetch
    })).toEqual({ ...initial_state });
  });
});