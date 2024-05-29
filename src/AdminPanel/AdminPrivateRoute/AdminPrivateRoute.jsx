import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AdminAuthContext } from "./AdminAuthProvider/AdminAuthProvider";

const AdminPrivateRoute = ({children}) => {

    const {admin, loading} = useContext(AdminAuthContext); 
    
    if(loading){
        return <p>Loading...</p>
    }
    
    if(admin){
        return children 
    }
    return <Navigate to={'/admin/login'}></Navigate>
};

export default AdminPrivateRoute;