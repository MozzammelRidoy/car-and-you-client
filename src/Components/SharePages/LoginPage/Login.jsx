import { Link, useLocation, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Headers/Navbar";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { HiLockClosed } from "react-icons/hi2";
import { HiMiniLockOpen } from "react-icons/hi2";
import { useContext, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProviders";
import Swal from "sweetalert2";

const Login = () => {
  const {user, userLogin ,githubLogin, googleLogin, forgetPassword} = useContext(AuthContext);
  const [showPass, setShowPass] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation(); 

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");

    setErrorMessage("");

    if (password.length < 6) {
      return setErrorMessage("Password should be at least 6 characters");
    }


    userLogin(email, password)
      .then((result) => {
        
        const email = result.user?.email;

        const lastSignInTime = result.user?.metadata?.lastSignInTime;
        const loginUserInfo = {email, lastSignInTime}
        
        fetch("https://car-and-you-server.vercel.app/users", {
              method: "PATCH",
              headers: { "content-type": "application/json" },
              body: JSON.stringify(loginUserInfo),
            })
              .then((res) => res.json())
              .then(() => {
               
               
                  Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Login Success !",

                    iconColor: "green",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                
               
              });
            return  navigate(location?.state ? location.state : '/')

      })
      .catch((err) => {
        console.log(err.message);
        if(err.message.includes('auth/invalid-credential')){
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

  const handleGoogleLogin = () => {
    googleLogin()
    .then(result => {
      const userAllInfo = result.user; 
      const displayName = result.user?.displayName;
      const createdAt = result.user?.metadata?.createdAt;
      const creationTime = result.user?.metadata?.creationTime;
      const lastSignInTime = result.user?.metadata?.lastSignInTime;
      const email = result.user?.email;
      const reloadUserInfo = result.user?.reloadUserInfo;
      const newUser = { displayName, email, createdAt, creationTime , userAllInfo, reloadUserInfo, lastSignInTime};
      fetch("https://car-and-you-server.vercel.app/users", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newUser),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Login Success !",

              iconColor: "green",
              showConfirmButton: false,
              timer: 1500,
            });
            
          return  navigate(location?.state ? location.state : '/')
          }
        });
    })
    .catch(err => {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Login Failed !",
        iconColor: "red",
        text: `${err.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    })
  }
  const handleGithubLogin = () => {
    githubLogin()
    .then(result => {
      const userAllInfo = result.user; 
      const displayName = result.user?.displayName;
      const createdAt = result.user?.metadata?.createdAt;
      const lastSignInTime = result.user?.metadata?.lastSignInTime;
      const creationTime = result.user?.metadata?.creationTime;
      const email = 'github@mail.com';
      const reloadUserInfo = result.user?.reloadUserInfo;
      const newUser = { displayName, email, creationTime ,createdAt, userAllInfo, reloadUserInfo, lastSignInTime};
      fetch("https://car-and-you-server.vercel.app/users", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newUser),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (result) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Login Success !",

              iconColor: "green",
              showConfirmButton: false,
              timer: 1500,
            });
            
          return  navigate(location?.state ? location.state : '/')
          }
        });
    })
    .catch(err => {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Login Failed !",
        iconColor: "red",
        text: `${err.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    })
  }

  const handleForgetPass = async() => {
    const { value: email } = await Swal.fire({
      title: "Reset Your Password ?",
      input: "email",
      inputLabel: "Don't Worry. I Help You",
      inputPlaceholder: "Enter your email address",
      confirmButtonText:'Reset Request',
      confirmButtonColor: 'green'

    });
   
    if (email) {
      
      forgetPassword(email)
      .then( () => {
       
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Reset Success !",
          text:'Check Your Email Address and Set New Password',

          iconColor: "green",
          showConfirmButton: true,
          confirmButtonColor: 'green'
          
        });
      })
      .catch(err => console.log(err))
    }
    
  };
  return (
    !user && <div data-aos="zoom-in" data-aos-duration="1500" className="font-Exo-2 container mx-auto ">
    <div>
      <Navbar />
    </div>
    <div className="flex  flex-col bg-login-reg-img-sm md:bg-login-reg-img-md bg-cover  min-h-screen md:justify-start  md:space-y-8">
      <h2 className="md:text-4xl text-2xl text-center text-red-500  md:mt-4 mt-20 font-extrabold">
        Log-in Here
      </h2>
      <div className="text-white md:p-10 p-3 space-y-3  backdrop-blur-sm md:border rounded-md   md:w-1/2 md:mx-auto bg-transparent">
        <form onSubmit={handleLogin} className="space-y-3 ">
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
          {
            errorMessage && <p className="text-red-500">{errorMessage}</p>
          }
          <div>
            <button className="w-full btn-outline btn rounded-md hover:bg-red-500 text-white">
              Log-in
            </button>
          </div>
          
        </form>
        <div className="grid md:grid-cols-2 gap-3">
            <button onClick={handleGoogleLogin} className=" btn btn-outline rounded-md hover:bg-red-500 text-white">
              <span className="text-xl">
                <FcGoogle />
              </span>{" "}
              Continue With Google
            </button>
            <button onClick={handleGithubLogin} className=" btn btn-outline rounded-md hover:bg-red-500 text-white">
              <span className="text-xl">
                <FaGithub />
              </span>{" "}
              Continue With Github{" "}
            </button>
          </div>
        <div className="text-center  pb-4">
          <p>
            Don&#39;t have an Account ?{" "}
            <Link to={"/register"}>
              <span className="btn-link font-bold text-red-500">
                Register
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
    <div className="fixed md:static bottom-0 w-full">
      <Footer />
    </div>
  </div>
  );
};

export default Login;
