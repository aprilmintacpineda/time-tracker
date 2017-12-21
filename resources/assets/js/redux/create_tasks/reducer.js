import initial_state, { new_field_template } from './initial_state';
import { types as actionTypes } from './actions';
import Mapper from '../Mapper';
import { validateTitle, validateDescription, allowSubmit } from './validations';

export default (state = initial_state, action) => {
  let newState;

  switch (action.type) {
    case actionTypes.fieldToggle:
      return {
        ...initial_state,
        shown: !state.shown
      };

    case actionTypes.titleChange:
      newState = {
        ...state,
        fields: Mapper.mapValueToFieldWithValidations(state.fields, action.value, action.target_index, 'title', validateTitle)
      };

      return {
        ...newState,
        fetch: {
          ...newState.fetch,
          allow: allowSubmit(newState.fields)
        }
      };

    case actionTypes.descriptionChange:
      newState = {
        ...state,
        fields: Mapper.mapValueToFieldWithValidations(state.fields, action.value, action.target_index, 'description', validateDescription)
      };

      return {
        ...newState,
        fetch: {
          ...newState.fetch,
          allow: allowSubmit(newState.fields)
        }
      };

    case actionTypes.fieldRemove:
      newState = state.fields.length > 1
      ? {
        ...state,
        fields: state.fields.filter((field, field_index) => field_index != action.target_index)
        }
      : { ...initial_state };

      return {
        ...newState,
        fetch: {
          ...newState.fetch,
          allow: allowSubmit(newState.fields)
        }
      };

    case actionTypes.fieldAdd:
      return {
        ...state,
        fetch: {
          ...state.fetch,
          allow: false
        },
        fields: [
          ...state.fields,
          {
            ...new_field_template
          }
        ]
      };

    case actionTypes.submitting:
      return {
        ...state,
        fetch: {
          ...state.fetch,
          sending: true,
          status: null,
          message: null
        }
      };

    case actionTypes.submitted:
      return action.status == 200
      ? {
        ...initial_state,
        shown: true,
        fetch: {
          ...initial_state.fetch,
          status: 200,
          message: action.message
        }
      }
      : {
        ...state,
        fetch: {
          ...state.fetch,
          sending: false,
          status: action.status? action.status : null,
          message: action.message? action.message : null
        },
        fields: action.errors? Mapper.mapBackendErrorsToFields(state.fields, action.errors) : [...state.fields]
      };

    case actionTypes.clearFetch:
      return {
        ...state,
        fetch: {
          ...state.fetch,
          sending: false,
          status: null,
          message: null
        }
      };

    default:
      return { ...state };
  }
};