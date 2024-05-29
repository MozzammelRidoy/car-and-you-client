import Swal from "sweetalert2";
import { RiDeleteBin5Fill } from "react-icons/ri";


const User = ({user, index, users, setUsers}) => {
    const {_id, displayName, email, creationTime, lastSignInTime} = user; 
    const handleDelete = _id => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
          }).then((result) => {
            if (result.isConfirmed) {
              fetch(`http://localhost:5000/users/${_id}`, {
                method: "DELETE",
              })
                .then((res) => res.json())
                .then((data) => {
                  console.log(data);
                  if (data.deletedCount > 0) {
                    Swal.fire({
                      position: "center",
                      icon: "success",
                      iconColor: "green",
                      title: "Deleted Successful",
                      showConfirmButton: false,
                      timer: 1500,
                    });
                    const remaining = users.filter(
                      (banner) => banner._id !== _id
                    );
                    setUsers(remaining);
                  }
                });
            }
          });
        
        console.log(_id);
        
    }
    return (
        <tr className="hover">
        <th>{index}</th>
        <td>{_id}</td>
        <td>{displayName}</td>
        <td>{email}</td>
        <td>{creationTime}</td>
        <td>{lastSignInTime}</td>
        <td><button  onClick={()=> handleDelete(_id)} className="text-4xl hover:text-red-500"><RiDeleteBin5Fill /></button></td>
      </tr>
    );
};

export default User;