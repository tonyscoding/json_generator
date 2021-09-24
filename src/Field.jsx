import React, { useState } from 'react';
import classNames from "classnames";

export const Field = (props) => {

    const [fieldinput, setFieldinput] = useState(false);
    const doubleClick = () => {
        setFieldinput(true);
    }

    const blurClick = () => {
        setFieldinput(false);
    }

    return (
      <div className="fieldfix">
        {
            fieldinput ?
            <input value = {props.value} onChange = {props.inputChange} onBlur = {blurClick} autoFocus/>
            :
            <div onDoubleClick = {doubleClick} className="fieldchange">
            {props.value}
          </div>
        }
        {props.children}
      </div>
    )
  }


export default Field;

