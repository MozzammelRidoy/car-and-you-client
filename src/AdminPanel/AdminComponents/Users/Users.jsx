import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import User from "./User";

const Users = () => {
  const loadedUsers = useLoaderData();
  const [users, setUsers] = useState(loadedUsers); 

  return (
    <div>
      <h2 className="text-center  text-4xl my-3">All Users {users.length}</h2>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="text-xl font-bold">
                <th>SL No</th>
                <th>DB ID</th>
                <th>Display Name</th>
                <th>Email</th>
                <th>Creation Time</th>
                <th>Last Login time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
             
             {
                users.map((user, index) => <User key={user._id} index={index+1} users={users} setUsers={setUsers} user={user}></User>)
             }
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
