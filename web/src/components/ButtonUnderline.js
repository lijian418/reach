import {Button} from "reactstrap";
import React from "react";

export const ButtonUnderline = (props) => {
  return (
    <Button
      {...props}
      color={'link'}
      className={'px-0 py-1'}
      style={{
        color: '#333',
        textUnderlineOffset: '6px',
        textDecoration: 'underline'
    }}
    >
      {props.children}
    </Button>
  );
};
