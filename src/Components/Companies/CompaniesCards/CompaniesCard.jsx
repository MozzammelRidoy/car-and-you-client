import { Link, useNavigate } from "react-router-dom";
import {
  addInLocalStorage,
  getStoredCartFromLS,
} from "../../../Providers/localStorage";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProviders";

const CompaniesCard = ({ product }) => {
  const { _id, image } = product;
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleMyCart = (_id) => {
    if (!user) {
      return navigate("/login");
    }

    const myCart = getStoredCartFromLS();
    if (myCart.includes(_id)) {
      return toast.error("Oh No ! Already Added");
    } else {
      addInLocalStorage(_id);
    }

    return toast.success("Added Success. Check Your Cart");
  };
  return (
    <div className="aspect-square">
      <img className="image-full" src={image} alt="" />
      <div className="w-full grid grid-cols-2">
        <button
          onClick={() => handleMyCart(_id)}
          className="py-2 md:py-3 font-bold text-white bg-red-500 hover:bg-red-900"
        >
          My Cart
        </button>
        <Link to={`/details/${_id}`}>
          {" "}
          <button className="py-2 md:py-3 font-bold w-full text-white bg-red-500 hover:bg-red-900">
            Details
          </button>
        </Link>

        <ToastContainer />
      </div>
    </div>
  );
};

export default CompaniesCard;
