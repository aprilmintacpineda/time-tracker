import React from 'react';
import Icon from '../Icon';
import { random } from '../../helpers/numbers';

export default ({ onChange = null, errors = [], value = '', placeholder = null, label = null, disabled = false, optional = false, occupySpace = false, size = null, id = random() }) => 
  <div className="form-input-text-wrapper">
    <p><label className={errors.length? 'danger-color' : ''} htmlFor={'input-text-' + id}>{label}{optional? <small>(optional)</small> : null} {errors.length? <Icon className="danger-color" icon="error" standAlone={true} /> : null}</label></p>
    <input
      id={'input-text-' + id}
      className={(disabled? 'disabled ' : '') + (size? size + ' ' : '') + (occupySpace? 'occupy-space' : '') + (errors.length? ' with-errors': '')}
      type="text"
      value={value}
      onChange={changeEvent => !disabled && onChange? onChange(changeEvent.target.value) : false }
      placeholder={placeholder}
      disabled={disabled}
    />
    {
      errors.length
      ? errors.map((error, i) => <p className="error-message" key={i}><small>* {error}</small></p>)
      : null
    }
  </div>;