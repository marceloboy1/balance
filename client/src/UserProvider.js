import React, { createContext, useContext, useState } from 'react';


// Cria um componente que fornece o contexto
const UserProvider = ({ children }) => {
  // Cria um contexto
  const UserContext = createContext();

  const [user, setUser] = useState(localStorage.getItem('user'));

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
