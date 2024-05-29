import { useContext } from "react";
import { AdminAuthContext } from "../AdminPrivateRoute/AdminAuthProvider/AdminAuthProvider";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const AdminHeader = () => {
    const {admin, adminLogout    } = useContext(AdminAuthContext); 
    const handleLogout = () => {
        adminLogout()
        .then(() => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Log Out Success !",
    
              iconColor: "green",
              showConfirmButton: false,
              timer: 1500,
            });
           
          })
          .catch((err) => console.log(err));
    }

    return (
        <div className="bg-black">
            
            <div className="flex justify-between items-center px-2">
            <h3 className="text-center text-4xl p-4 font-bold  text-white">Welcome to Admin Panel</h3>
            {
                admin && <div className="space-x-3"> <Link to="/admin/users"><button className="bg-blue-500 px-5 py-2 font-bold hover:bg-blue-800 text-white">Site Users</button></Link> <button onClick={handleLogout} className="bg-blue-500 px-5 py-2 font-bold hover:bg-blue-800 text-white">Log Out</button> </div>

            }

            </div>
            
        </div>
    );
};

export default AdminHeader;