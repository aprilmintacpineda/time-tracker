export const types = {
	fetch: 'TASKS_FETCH',
	fetching: 'TASKS_FETCHING',
	fetched: 'TASKS_FETCHED',
	prepend: 'TASKS_PREPEND'
};

export const fetch = () => ({
	type: types.fetch
});

export const fetching = () => ({
	type: types.fetching
});

export const fetched = payload => ({
	type: types.fetched,
	...payload
});

export const prepend = data => ({
	type: types.prepend,
	data
});