import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Squash as Hamburger } from "hamburger-react";
import { GiCarWheel } from "react-icons/gi";
import { IoCarSportSharp } from "react-icons/io5";
import { IoMdLogIn } from "react-icons/io";
import { AuthContext } from "../../../Providers/AuthProviders";
import Swal from "sweetalert2";

const Navbar = () => {
  const navigate = useNavigate(); 
  const [isOpen, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [userShow, setUserShow] = useState(false);
  const { user, userLogout } = useContext(AuthContext);

  const navLinks = (
    <>
      <li>
        <NavLink to={"/"}>HOME</NavLink>
      </li>
      <li>
        <NavLink to={"/inventory"}>INVENTORY</NavLink>
      </li>
      <li>
        <NavLink to={"/about"}>ABOUT</NavLink>
      </li>
      <li>
        <NavLink to={"/news"}>NEWS</NavLink>
      </li>
      <li>
        <NavLink to={"/contacts"}>CONTACTS</NavLink>
      </li>
      {user && (
        <li>
          <NavLink to={"/mycart"}>My Cart</NavLink>
        </li>
      )}
    </>
  );
  const handleLogout = () => {
    userLogout()
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Log Out Success !",

          iconColor: "green",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/')
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-4 gap-2  items-center py-2 md:py-4 bg-base-100">
        <div className="col-span-3 md:col-span-1  flex">
          <div className="">
            <div className="lg:hidden">
              <Hamburger toggled={isOpen} toggle={() => setOpen(!isOpen)} />
            </div>
            <div className={`${isOpen ? "flex absolute " : "hidden"}`}>
              <ul className=" mt-2  z-[12] p-3 font-bold space-y-3 shadow bg-base-100 rounded-sm w-48">
                {navLinks}
              </ul>
            </div>
          </div>
          <p className="ps-2 font-Orbitron text-xl text-nowrap md:text-4xl flex items-center font-extrabold">
            <IoCarSportSharp className="animate-bounce" />
            Car and You{" "}
            <span>
              <GiCarWheel className="animate-spin" />
            </span>
          </p>
        </div>
        <ul className="hidden md:flex justify-around font-bold md:col-span-2">
          {navLinks}
        </ul>

        {/* midium device login or register and profile  */}
        {user ? (
          <div className="hidden px-2 md:flex justify-around items-center md:col-span-1">
            <h2 className="font-bold text-red-500">{user.displayName}</h2>
            <button
              onClick={handleLogout}
              className="text-white bg-red-500 btn font-semibold px-5 py-3 btn-outline rounded-md"
            >
              LOG-OUT
            </button>
          </div>
        ) : (
          <div className="hidden px-2 md:flex justify-around items-center md:col-span-1">
            <div>
              <Link to={"/login"}>
                <button className="text-white bg-red-500 btn font-semibold px-5 py-3 btn-outline rounded-md">
                  LOG-IN
                </button>
              </Link>
              <span> Or </span>
              <Link to={"/register"}>
                <button className="text-white bg-red-500 btn font-semibold px-5 py-3 btn-outline rounded-md">
                  REGISTER
                </button>
              </Link>
            </div>
            <div className="avatar online">
              <div className="w-12 rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
          </div>
        )}

        {/* small device login reg and profile  */}
        {user ? (
          <button
            onClick={() => setUserShow(!userShow)}
            className="justify-self-end px-1 md:hidden"
          >
            {" "}
            <div className="avatar online">
              <div className="w-12 rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
          </button>
        ) : (
          <div className=" justify-self-end md:hidden">
            <button
              onClick={() => setShow(!show)}
              className="hover:text-red-500 text-4xl"
            >
              <IoMdLogIn />
            </button>
            <div className="avatar online hidden">
              <div className="w-12 rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
          </div>
        )}
      </div>
      {show && (
        <div className="absolute  z-[11] w-full grid text-center p-5 bg-base-100  ">
          <Link to={"/login"}>
            <button className="text-white w-full bg-red-500 font-semibold px-7 py-3 btn hover:bg-red-900 btn-outline rounded-md">
              LOG-IN
            </button>
          </Link>
          <span> Or </span>
          <Link to={"/register"}>
            <button className="text-white w-full bg-red-500 font-semibold px-7 hover:bg-red-900 py-3 btn btn-outline rounded-md">
              REGISTER
            </button>
          </Link>
        </div>
      )}
      {userShow && (
        <div className="absolute  z-[11] w-full grid text-center p-5 space-y-3 bg-base-100  ">
          
            <h2 className="border border-red-500 w-full text-red-500 font-semibold px-7 py-3  rounded-md">
              {user.displayName}
            </h2>
        
          
         
            <button onClick={handleLogout} className="text-white w-full bg-red-500 font-semibold px-7 hover:bg-red-900 py-3 btn btn-outline rounded-md">
              Log Out
            </button>
         
        </div>
      )}
    </div>
  );
};

export default Navbar;
