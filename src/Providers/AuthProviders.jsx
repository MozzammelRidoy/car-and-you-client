import { createContext, useState } from "react";

export const AuthContext = createContext(null); 
const AuthProviders = ({children}) => {
    const [user, setUser] = useState(null); 

    const shareInfo = {
        user,

    }
    return (
        <AuthContext.Provider value={shareInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProviders;