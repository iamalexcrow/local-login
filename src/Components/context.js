import React, { useState, useContext, useEffect } from 'react'
// make sure to use https

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
    const [Data, setData] = useState({
        firstName: "",
        password: '',
        rememberMe: ''
    });
    const [isAuth, setIsAuth] = useState(false);

    return (
        <AppContext.Provider value={{ Data, setData, isAuth, setIsAuth }}>
            {children}
        </AppContext.Provider>
    )
}
// make sure use
export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider }