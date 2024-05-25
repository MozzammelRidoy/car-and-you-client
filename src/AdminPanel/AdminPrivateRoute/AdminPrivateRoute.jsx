// import { useContext } from "react";
// import { Navigate } from "react-router-dom";
// import { AuthContext } from "../../Providers/AuthProviders";

const AdminPrivateRoute = ({children}) => {
    // const {user} = useContext(AuthContext); 
    // if(user){
    //     return {children}
    // }
    return (children)
    // <Navigate to={'/admin/login'}></Navigate>
};

export default AdminPrivateRoute;