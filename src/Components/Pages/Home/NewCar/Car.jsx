import { useContext } from "react";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { MdFavorite } from "react-icons/md";
import { AuthContext } from "../../../../Providers/AuthProviders";
import { useNavigate } from "react-router-dom";
import {  toast } from "react-toastify";

const Car = ({ car, index }) => {
  const {user} = useContext(AuthContext); 
  const navigate = useNavigate(); 


  const isOdd = index % 2 !== 0;

  const gridPosition = isOdd
    ? "md:col-start-1 md:col-end-3"
    : "md:col-start-2 md:col-end-4";
  const aosDerection = isOdd ? "fade-left" : "fade-right";
  const handleLike = _id => {
    if(!user){
      return navigate('/login')
    }
    console.log("liked",_id); 
    toast.success("One More Like Added");

    // others oparations

  }
  const handleDislike = _id => {
    if(!user){
      return navigate('/login')
    }
    console.log("Disliked",_id); 
    toast.success("One More Dislike Added");

    // others oparations

  }
  const handleFavorite = _id => {
    if(!user){
      return navigate('/login')
    }
    console.log("Favorite",_id); 
     toast.success("Added Your Favorite List");

    // others oparations

  }

  return (
    <div
      data-aos={`${aosDerection}`}
      data-aos-duration="1000"
      className={` ${gridPosition} relative flex flex-col `}
    >
      <div className="aspect-video   text-center">
        <img className="md:rounded-t-lg" src={car.image} alt="" />
      </div>

      <div className="md:absolute w-full md:text-center order-first md:transform md:bottom-12 ">
        <p className="md:text-xl font-bold px-1 text-black md:text-white md:bg-black bg-white md:bg-opacity-20 md:py-3 ">
          {car.about}
        </p>
      </div>
      <div  className=" flex justify-evenly bg-red-500 items-center">
        <button onClick={() => handleLike(car._id)} className="flex justify-center  items-center gap-x-3 py-1 hover:bg-red-900 md:py-3 text-white w-1/2">
          <span>
            <AiFillLike />
          </span>{" "}
          Like
        </button>
        <button onClick={() => handleDislike(car._id)} className="flex justify-center items-center gap-x-3 py-1 hover:bg-red-900 md:py-3 text-white w-1/2">
          <span>
            <AiFillDislike />
          </span>{" "}
          Dislike
        </button>
        <button onClick={() => handleFavorite(car._id)} className="flex justify-center items-center gap-x-3 py-1 hover:bg-red-900 md:py-3 text-white w-1/2">
          <span>
            <MdFavorite />
          </span>{" "}
          Favorite
        </button>
      </div>
      
    </div>
  );
};

export default Car;
