import React, { createContext, useState} from 'react'

export const UserContext = createContext(null)

// eslint-disable-next-line import/no-anonymous-default-export
export default ({children}) =>{
    const [user, setUser] = useState(null)
    
    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}