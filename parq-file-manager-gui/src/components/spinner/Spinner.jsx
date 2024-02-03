import React from "react"
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/RingLoader";
import "./Spinner.css";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: blue;
`;

function Spinner({ loading }) {
  return (
    <div
      className="spinner-wrapper"
      style={{ display: loading ? "flex" : "none" }}
    >
      <ClipLoader color={"blue"} loading={loading} css={override} size={150} />
    </div>
  );
}

export default Spinner;
