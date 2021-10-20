import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

//wrapper for the provieder
export const AuthProvider = ({ user, children }) => {
  const [currentUser, setCurrentUser] = useState(user)

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
