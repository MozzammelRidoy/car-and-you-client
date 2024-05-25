
import { HiLockClosed } from "react-icons/hi2";
import { HiMiniLockOpen } from "react-icons/hi2";
import { useState } from "react";

const AdminLogin = () => {
    const [showPass, setShowPass] = useState(true) ; 

    const handleLogin = e => {
        e.preventDefault(); 
        const form = new FormData(e.currentTarget); 
        const name = form.get('name');
        const email = form.get('email');
        const password = form.get('password');
        const registerUser = {name, email, password }; 
        console.log(registerUser)
    }
    const handleForgetPass = () => {
        alert('Clicked')
    }
    return (
        <div className="font-Exo-2 container mx-auto ">
       
        <div className="flex  flex-col bg-login-reg-img-sm md:bg-login-reg-img-md bg-cover  min-h-screen justify-center  md:space-y-8">
          <h2 className="md:text-4xl text-2xl text-center text-red-500  md:mt-4 mt-20 font-extrabold">
            Admin Log-in Here
          </h2>
          <div className="text-white   backdrop-blur-sm md:border rounded-md   md:w-1/2 md:mx-auto bg-transparent">
            <form onSubmit={handleLogin} className="md:p-10 p-3 space-y-3 ">
              
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id=""
                  className="p-2 w-full bg-transparent border-b outline-none placeholder-slate-300"
                  placeholder="Enter your email" required
                />
              </div>
              <div className="relative">
                <label htmlFor="name">Password</label>
                <input
                  type={`${showPass ? 'password' : 'text'}`}
                  name="password"
                  id=""
                  className="p-2 w-full bg-transparent border-b outline-none placeholder-slate-300"
                  placeholder="Set Password" required
                />
                <span onClick={()=> setShowPass(!showPass)} className="absolute right-2 text-2xl">
                  {
                     showPass ? <HiLockClosed /> : <HiMiniLockOpen />
  
  
                  }
                </span>
              </div>
              <p onClick={handleForgetPass} className="cursor-pointer text-red-500">Forgotten your password ?</p>
              <div>
                <button className="w-full btn-outline btn rounded-md hover:bg-red-500 text-white">
                  Log-in
                </button>
              </div>
              
            </form>
            <div className="text-center  pb-4">
              
            </div>
          </div>
        </div>
       
      </div>
    );
};

export default AdminLogin;