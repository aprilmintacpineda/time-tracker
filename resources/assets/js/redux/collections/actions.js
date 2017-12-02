export const types = {
	fetch: 'COLLECTIONS_FETCH',
	fetching: 'COLLECTIONS_FETCHING',
	fetched: 'COLLECTIONS_FETCHED'
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