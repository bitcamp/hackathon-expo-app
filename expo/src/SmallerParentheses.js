import React, { Fragment } from "react";

export default function SmallerParentheses(props) {
  let reducedFontSize = { fontSize: props.font_size };
  return (
    <Fragment>
      <span style={reducedFontSize}>(</span>
      {props.children}
      <span style={reducedFontSize}>)</span>
    </Fragment>
  );
}
