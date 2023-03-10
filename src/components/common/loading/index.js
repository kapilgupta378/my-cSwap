import React from "react";

const Loading = () => {
  const styles = {
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontSize: "20px",
  };
  return (
    <div style={styles}>
      <h5>loading....</h5>
    </div>
  );
};

export default Loading;
