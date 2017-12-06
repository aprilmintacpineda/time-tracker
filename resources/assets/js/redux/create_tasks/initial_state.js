export const new_field_template = {
	title: {
		value: '',
		errors: []
	},
	description: {
		value: '',
		errors: []
	}
};

export default {
	fetch: {
		sending: false,
		status: null,
		message: null,
		allow: false
	},
	shown: false,
	fields: [
		{
			...new_field_template
		}
	]
};