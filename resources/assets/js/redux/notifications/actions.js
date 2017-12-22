export const types = {
	push: 'NOTIFICATIONS_PUSH',
	clear: 'NOTIFICATIONS_CLEAR'
};

export const push = message => ({
	type: types.push,
	message
});

export const clear = notification_index => ({
	type: types.clear,
	notification_index
});