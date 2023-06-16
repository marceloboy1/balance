import { Input } from "@mui/material";
import React, { useState, useEffect } from "react";

function TestForm() {
  const [symbol, setSymbol] = useState('');
  
  function handleSubmit(event) {
    event.preventDefault();
    // enviar os dados do formulário para o backend ou outro componente
    (async () => {
      const rawResponse = await fetch('http://localhost:3001/formTest', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({a: symbol})
      });
      const content = await rawResponse.json();
    
      console.log(content);
    })();
   
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <label>
        {symbol}
        <input type="text" value={symbol} onChange={event => setSymbol(event.target.value)} />
      </label>
      <br />
      <input type="submit" value="Enviar" />
    </form>
  );
 
}

export default TestForm;