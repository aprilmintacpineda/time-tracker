import React from 'react';
import Icon from '../Icon';
import { random } from '../../helpers';

export default ({ onChange = null, errors = [], value = '', placeholder = null, label = null, disabled = false, optional = false, occupySpace = false, id = random() }) => 
  <div className="form-input-textarea-wrapper">
    <p><label className={errors.length? 'danger-color' : ''} htmlFor={'input-text-' + id}>{label}{optional? <small>(optional)</small> : null} {errors.length? <Icon className="danger-color" icon="error" /> : null}</label></p>
    <textarea
      id={'input-text-' + id}
      className={(disabled? 'disabled ' : '') + (occupySpace? 'occupy-space' : '') + (errors.length? 'with-errors': '')}
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