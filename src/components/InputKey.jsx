import React from "react";
import { Button } from "@mui/material";

const InputKey = (props) => {
  function handleClick() {
    props.onClick(props.value);
  }
  return <Button sx={{ fontSize: 20 }} onClick={handleClick}>{props.value}</Button>;
};

export default InputKey;
