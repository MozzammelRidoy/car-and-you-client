import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Squash as Hamburger } from "hamburger-react";
import { GiCarWheel } from "react-icons/gi";
import { IoCarSportSharp } from "react-icons/io5";
import { IoMdLogIn } from "react-icons/io";


const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  const [show, setShow] = useState(false); 

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
    </>
  );
  return (
    <div>
      <div className="grid grid-cols-4 gap-2 border-2  items-center py-2 md:py-6 bg-base-100">
        <div className="col-span-3 md:col-span-1  flex">
          <div className="">
            <div className="lg:hidden">
              <Hamburger toggled={isOpen} toggle={() => setOpen(!isOpen)} />
            </div>
            <div className={`${isOpen ? "flex absolute " : "hidden"}`}>
              <ul className=" mt-3 z-[1] p-3 font-bold space-y-3 shadow bg-base-100 rounded-sm w-48">
                {navLinks}
              </ul>
            </div>
          </div>
          <p className="ps-2 font-Orbitron text-xl text-nowrap md:text-4xl flex items-center font-extrabold">
            <IoCarSportSharp className="animate-bounce"  />
            Car and You{" "}
            <span>
              <GiCarWheel className="animate-spin" />
            </span>
          </p>
        </div>
        <ul className="hidden md:flex justify-between font-bold md:col-span-2">
          {navLinks}
        </ul>

        {/* midium device login or register and profile  */}
        <div className="hidden px-2 md:flex justify-between items-center md:col-span-1">
          <div>
          <button className="text-white bg-red-500 btn font-semibold px-7 py-3 btn-outline rounded-md">
            LOG-IN
          </button>
          <span> Or </span>
          <button className="text-white bg-red-500 btn font-semibold px-7 py-3 btn-outline rounded-md">
            REGISTER
          </button>
          </div>
          <div className="avatar online">
            <div className="w-12 rounded-full">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
        </div>

        {/* small device login reg and profile  */}
        <div className=" justify-self-end md:hidden">
            <button onClick={() => setShow(!show) } className="dropdown text-4xl"><IoMdLogIn /></button>
            <div className="avatar online hidden">
            <div className="w-12 rounded-full">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>

        </div>
      </div>
      {
        show && <div className="absolute w-full grid text-center p-5 bg-base-100  ">
        <button className="text-white bg-red-500 font-semibold px-7 py-3 btn hover:bg-red-900 btn-outline rounded-md">
          LOG-IN
        </button>
        <span> Or </span>
        <button className="text-white bg-red-500 font-semibold px-7 hover:bg-red-900 py-3 btn btn-outline rounded-md">
          REGISTER
        </button>
        </div>
      }
    </div>
  );
};

export default Navbar;