export const types = {
	create: 'NOTIFICATIONS_CREATE',
	push: 'NOTIFICATIONS_PUSH',
	clear: 'NOTIFICATIONS_CLEAR',
	remove: 'NOTIFICATIONS_REMOVE'
};

export const create = message => ({
	type: types.create,
	message
});

export const push = notification => ({
	type: types.push,
	notification
});

export const clear = () => ({
	type: types.clear
});

export const remove = target_id => ({
	type: types.remove,
	target_id
});