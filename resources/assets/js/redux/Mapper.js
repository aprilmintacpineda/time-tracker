class Mapper {
	/**
	 * @param  array fields
	 * @param  string value
	 * @param  int target_index
	 * @param  string target_field
	 * @param  function validator
	 * @return array fields
	 */
	mapValueToFieldWithValidations(fields, value, target_index, target_field, validator = null) {
		return fields.map((field, i) => i == target_index? {
			...field,
			[target_field]: {
				...field[target_field],
				value,
				errors: validator(value)
			}
		} : { ...field });
	}

	/**
	 * @param  array fields
	 * @param  string value
	 * @param  int target_index
	 * @param  string target_field
	 * @return array fields
	 */
	mapValueToField(fields, value, target_index, target_field) {
		return fields.map((field, i) => i == target_index? {
			...field,
			[target_field]: {
				...field[target_field],
				value
			}
		} : { ...field });
	}

	/**
	 * @param  array fields
	 * @param  object errors
	 * @return array fields
	 */
	mapBackendErrorsToFields(fields, errors) {
		return fields.map((field, i) => {
			// expects field as an object
			if (typeof field != 'object') throw new Error('mapBackendErrorsToFields expects fields to be an array containing objects.');
			
			let new_field = { ...field };
			let keys = Object.keys(new_field);

			keys.forEach(key => {
				let taskKey = 'task.' + i;

				new_field[key] = {
					...new_field[key],
					errors: errors[taskKey] && errors[taskKey][0][key]? [...errors[taskKey][0][key]] : []
				};
			});

			return new_field;
		});
	}
}

export default new Mapper;