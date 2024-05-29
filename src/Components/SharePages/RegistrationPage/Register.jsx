import { Link, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Headers/Navbar";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { HiLockClosed } from "react-icons/hi2";
import { HiMiniLockOpen } from "react-icons/hi2";
import { useContext, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProviders";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";

const Register = () => {
  const { newUserCreate, googleLogin, githubLogin } = useContext(AuthContext);

  const [showPass, setShowPass] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name");
    const email = form.get("email");
    const password = form.get("password");

    setErrorMessage("");

    if (password.length < 6) {
      return setErrorMessage("Password should be at least 6 characters");
    }

    newUserCreate(email, password)
      .then((result) => {
        console.log(result.user);

        updateProfile(result.user, {
          displayName: name,
        })
          .then(() => {
            const userAllInfo = result.user; 
            const displayName = result.user?.displayName;
            const createdAt = result.user?.metadata?.createdAt;
            const creationTime = result.user?.metadata?.creationTime;
            const email = result.user?.email;
            const reloadUserInfo = result.user?.reloadUserInfo;
            const newUser = { displayName, email, createdAt, creationTime ,userAllInfo, reloadUserInfo};
            fetch("http://localhost:5000/users", {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify(newUser),
            })
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
                if (data.insertedId) {
                  Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Registration Success !",

                    iconColor: "green",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  form.target.reset();
                  navigate('/')
                }
              });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err.code);

        if (err.code === "auth/email-already-in-use") {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Registration Failed !",

            iconColor: "red",
            text: "Email Already in Used. Try With Defferent Email",
            showConfirmButton: false,
            timer: 1500,
          });
          return;
        }

        Swal.fire({
          position: "center",
          icon: "error",
          title: "Registration Failed !",
          iconColor: "red",
          text: "Please Try Again with Valid Information",
          showConfirmButton: false,
          timer: 1500,
        });
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
      fetch("http://localhost:5000/users", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newUser),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.insertedId) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Registration Success !",

              iconColor: "green",
              showConfirmButton: false,
              timer: 1500,
            });
            
            navigate('/')
          }
        });
    })
    .catch(err => {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Registration Failed !",
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
      fetch("http://localhost:5000/users", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newUser),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.insertedId) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Registration Success !",

              iconColor: "green",
              showConfirmButton: false,
              timer: 1500,
            });
            
            navigate('/')
          }
        });
    })
    .catch(err => {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Registration Failed !",
        iconColor: "red",
        text: `${err.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    })
  }

  return (
    <div data-aos="zoom-in" data-aos-duration="1500" className="font-Exo-2 container mx-auto ">
      <div>
        <Navbar />
      </div>
      <div className="flex  flex-col bg-login-reg-img-sm md:bg-login-reg-img-md bg-cover  min-h-screen md:justify-start  md:space-y-8">
        <h2 className="md:text-4xl text-2xl text-center text-red-500  md:mt-4 mt-20 font-extrabold">
          Registration Here
        </h2>
        <div className="text-white   backdrop-blur-sm md:border rounded-md   md:w-1/2 md:mx-auto bg-transparent">
          <div className="md:p-10 p-3 space-y-3 ">
          <form onSubmit={handleRegister} className="space-y-3" >
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                
                className="p-2 w-full bg-transparent border-b outline-none placeholder-slate-300"
                placeholder="Enter your name"
                required
              />
            </div>
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
            {errorMessage && <p className=" text-red-500 ">{errorMessage}</p>}
            <div>
              <button className="w-full btn-outline btn rounded-md hover:bg-red-500 text-white">
                Register
              </button>
            </div>
            </form>
            <div className="grid md:grid-cols-2 gap-3 ">
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
              Already have an Account ?{" "}
              <Link to={"/login"}>
                <span className="btn-link font-bold text-red-500">Log-in</span>
              </Link>
            </p>
          </div>
            </div>
         
          
        </div>
      </div>
      <div className="fixed md:static bottom-0 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Register;
