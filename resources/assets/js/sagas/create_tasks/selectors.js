export const selectFetchStatus = store => ({
  ...store.create_tasks.fetch
});

export const selectFields = store => store.create_tasks.fields.map(field => ({
  title: field.title.value,
  description: field.description.value
}));