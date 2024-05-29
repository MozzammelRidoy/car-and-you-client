import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import { Navigate } from "react-router-dom";
import { IoCarSportSharp } from "react-icons/io5";

const PrivateRouter = ({children}) => {
    const {user, loading} = useContext(AuthContext); 
    if(loading){
        return <div className="min-h-screen flex justify-center font-bold items-center text-4xl"><IoCarSportSharp className="animate-bounce" /></div>
    }
    if(user){
        return children    }


    return (<Navigate to={'/login'}></Navigate>);
};

export default PrivateRouter;