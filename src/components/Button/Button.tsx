import React from "react";
import { PropsModel } from "./Type";
import "./Button.css";

export const Button = (props: any) => {
  return (
    <button onClick={props.onClick} className="btn">
      Run Code
    </button>
  );
};
