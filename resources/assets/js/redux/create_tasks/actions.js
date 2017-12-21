export const types = {
  submit: 'CREATETASK_SUBMIT',
  submitting: 'CREATETASK_SUBMITTING',
  submitted: 'CREATETASK_SUBMITTED',
  fieldAdd: 'CREATETASK_FIELD_ADD',
  fieldRemove: 'CREATETASK_FIELD_REMOVE',
  fieldToggle: 'CREATETASK_FIELD_TOGGLE',
  titleChange: 'CREATETASK_TITLE_CHANGE',
  descriptionChange: 'CREATETASK_DESCRIPTION_CHANGE',
  clearFetch: 'CREATETASK_FETCH_CLEAR'
};

export const submit = () => ({
  type: types.submit
});

export const submitting = () => ({
  type: types.submitting
});

export const submitted = (payload) => ({
  type: types.submitted,
  ...payload
});

export const titleChange = (value, target_index) => ({
  type: types.titleChange,
  value,
  target_index
});

export const descriptionChange = (value, target_index) => ({
  type: types.descriptionChange,
  value,
  target_index
});

export const fieldAdd = () => ({
  type: types.fieldAdd
});

export const fieldRemove = target_index => ({
  type: types.fieldRemove,
  target_index
});

export const fieldToggle = () => ({
  type: types.fieldToggle
});

export const clearFetch = () => ({
  type: types.clearFetch
});