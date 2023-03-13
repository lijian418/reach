import {BsSearch} from "react-icons/bs";
import React from "react";

export const Empty = (props) => {
  return (
    <div className={'d-flex justify-content-center flex-column align-items-center'}>
      {props.icon}
      <h5 className={'text-center mt-2 text-muted'}>
        {props.label}
      </h5>
    </div>
  )
}
