import Validator from '../Validator';

export const messages = {
	title: {
		required: 'Title is required.',
		max: 'Title should not exceed 255 characters.'
	},
	description: {
		max: 'Description should not exceed 255 characters.'
	}
};

export const validateTitle = value => {
	let errors = [];

	if (Validator.required(value)) {
		errors.push(messages.title.required);
	}

	if (Validator.max(value)) {
		errors.push(messages.title.max);
	}

	return errors;
};

export const validateDescription = value => {
	let errors = [];

	if (Validator.max(value)) {
		errors.push(messages.description.max);
	}

	return errors;
};

export const allowSubmit = fields => {
	for (let a in fields) {
		if (!fields[a].title.value.length || fields[a].title.errors.length
		|| fields[a].description.errors.length) {
			return false;
		}
	}

	return true;
};