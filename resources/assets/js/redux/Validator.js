/**
 * always:
 * return false of valid, true if invalid
 */

class Validator {
  required(value) {
    return !value.length || !value.trim().length? true : false;
  }

  max(value, length) {
    return value.length > length? true : false;
  }

  min(value, length) {
    return value.length < length? true : false;
  }

  between(value, min, max) {
    return value.length < min || value.length > max? true : false;
  }
}

export default new Validator;