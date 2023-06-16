import React, { useState, useEffect } from "react";

function Connex() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <div className="App">
      <h1>{message}</h1>
    </div>
  );
}

export default Connex;