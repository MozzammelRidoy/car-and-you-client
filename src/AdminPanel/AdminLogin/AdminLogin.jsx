import { HiLockClosed } from "react-icons/hi2";
import { HiMiniLockOpen } from "react-icons/hi2";
import { useContext, useState } from "react";
import { AdminAuthContext } from "../AdminPrivateRoute/AdminAuthProvider/AdminAuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const { adminLogin, adminForgetPassword } = useContext(AdminAuthContext);
  const navigate = useNavigate();

  const [showPass, setShowPass] = useState(true);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const email = form.get("email");
    const password = form.get("password");

    adminLogin(email, password)
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Login Success !",

          iconColor: "green",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/admin");
      })
      .catch((err) => {
        if (err) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Login Failed !",

            iconColor: "red",
            text: "Your Email or Password Invalid. Please Try again",
            showConfirmButton: false,
            timer: 1500,
          });
          return;
        }
      });
  };
  const handleForgetPass = async () => {
    const { value: email } = await Swal.fire({
      title: "Reset Your Password ?",
      input: "email",
      inputLabel: "Don't Worry. I Help You",
      inputPlaceholder: "Enter your email address",
      confirmButtonText: "Reset Request",
      confirmButtonColor: "green",
    });

    if (email) {
      adminForgetPassword(email)
        .then(() => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Reset Success !",
            text: "Check Your Email Address and Set New Password",

            iconColor: "green",
            showConfirmButton: true,
            confirmButtonColor: "green",
          });
        })
        .catch((err) => {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Reset Failed !",
            text: `Your Email is Invalid, Try Again With Valid Email ${err.message}`,

            iconColor: "green",
            showConfirmButton: true,
            confirmButtonColor: "green",
          });
          });
    }
  };
  return (
    <div data-aos="zoom-in" data-aos-duration="1500" className="font-Exo-2 container mx-auto ">
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
                className="p-2 w-full bg-transparent border-b outline-none placeholder-slate-300"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="relative">
              <label htmlFor="name">Password</label>
              <input
                type={`${showPass ? "password" : "text"}`}
                name="password"
                defaultValue={"admin123"}
                className="p-2 w-full bg-transparent border-b outline-none placeholder-slate-300"
                placeholder="Set Password"
                required
              />
              <span
                onClick={() => setShowPass(!showPass)}
                className="absolute right-2 text-2xl"
              >
                {showPass ? <HiLockClosed /> : <HiMiniLockOpen />}
              </span>
            </div>
            <p
              onClick={handleForgetPass}
              className="cursor-pointer text-red-500"
            >
              Forgotten your password ?
            </p>
            <div>
              <button className="w-full btn-outline btn rounded-md hover:bg-red-500 text-white">
                Log-in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
