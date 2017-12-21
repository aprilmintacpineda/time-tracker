import React from 'react';

export default ({ message, children, styled = true }) => 
  <div className={styled == false? 'dockmessage' : 'dockmessage styled'}>
    {
      message
      ? <p>{ message }</p>
      : children
    }
  </div>;