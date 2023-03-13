import React from "react";

const Background = ({ children, ...rest }) => {
  return (
    <div
      style={{
        margin: "30px 0px",
        padding: "30px",
        background: "#030b1e",
        border: "1px solid #303950",
        boxShadow: "inset 5px 5px 12px 1px #262b38",
        borderRadius: "20px",
      }}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Background;
