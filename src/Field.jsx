import React, { useState } from 'react';

const style_fix = {
	backgroundColor: 'white',
	
}

const style_change = {
	backgroundColor: 'yellow',
}

export const Field = (props) => {

    const [fieldinput, setFieldinput] = useState(false);
    const doubleClick = () => {
        setFieldinput(true);
    }

    const blurClick = () => {
        setFieldinput(false);
    }

    return (
      <div style = {style_fix}>
        {
            fieldinput ?
            <input value = {props.value} onChange = {props.inputChange} onBlur = {blurClick} autoFocus/>
            :
            <div onDoubleClick = {doubleClick} style = {style_change}>
            {props.value}
          </div>
        }
        {props.children}
      </div>
    )
  }


export default Field;

