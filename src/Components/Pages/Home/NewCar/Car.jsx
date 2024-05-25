import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { MdFavorite } from "react-icons/md";

const Car = ({ car, index }) => {
  const isOdd = index % 2 !== 0;

  const gridPosition = isOdd
    ? "md:col-start-1 md:col-end-3"
    : "md:col-start-2 md:col-end-4";
  const aosDerection = isOdd ? "fade-left" : "fade-right";

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
      <div className=" flex justify-evenly bg-red-500 items-center">
        <button className="flex justify-center  items-center gap-x-3 py-1 hover:bg-red-900 md:py-3 text-white w-1/2">
          <span>
            <AiFillLike />
          </span>{" "}
          Like
        </button>
        <button className="flex justify-center items-center gap-x-3 py-1 hover:bg-red-900 md:py-3 text-white w-1/2">
          <span>
            <AiFillDislike />
          </span>{" "}
          Dislike
        </button>
        <button className="flex justify-center items-center gap-x-3 py-1 hover:bg-red-900 md:py-3 text-white w-1/2">
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
