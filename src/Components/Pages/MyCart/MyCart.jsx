import { useEffect, useState } from "react";
import {
  getStoredCartFromLS,
  removeFormLocalStorage,
} from "../../../Providers/localStorage";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";




const MyCart = () => {
  const [cartProduct, setCartProduct] = useState([]);

  useEffect(() => {
    const myCart = getStoredCartFromLS();
    fetch("http://localhost:5000/companiesProduct")
      .then((res) => res.json())
      .then((data) => {
        const userCart = data.filter((item) =>
          myCart.find((id) => id === item._id)
        );
        setCartProduct(userCart);
      });
  }, []);

  const handleRemove = (_id) => {
    Swal.fire({
      title: "Are you sure ?",
      text: "Do you want to remove it ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeFormLocalStorage(_id);
        const remainingCart = cartProduct.filter((cart) => cart._id !== _id);
        setCartProduct(remainingCart);
        Swal.fire({
          title: "Removed Success !",
          icon: "success",
          iconColor: 'green',
          showConfirmButton: false,
          timer: '1500'
        });
      }
    });
  };
  return (
    <div>
      <h2 className="text-4xl text-center mb-3 md:my-6 font-bold">
        My Cart {cartProduct.length}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-7 gap-3">
        {cartProduct.map((product) => (
          <div
            key={product._id}
            className="grid grid-cols-2 gap-2 md:gap-3 p-2 md:p-3 rounded-md bg-slate-200"
          >
            <div>
              <img className="w-full" src={product.image} alt="" />
            </div>
            <div className="flex flex-col justify-between">
              <h2 className="font-bold text-nowrap text-xs md:text-xl">
                Company Name : {product.companyName}{" "}
              </h2>
              <div className=" flex flex-col gap-3">
                <Link to={`/details/${product._id}`}>
                  <button className="px-3 w-full md:font-bold text-sm text-white bg-red-500 hover:bg-red-900 py-1 md:py-2 ">
                    Details
                  </button>
                </Link>
                <button
                  onClick={() => handleRemove(product._id)}
                  className="px-3 w-full md:font-bold text-white text-sm bg-red-500 hover:bg-red-900 py-1 md:py-2 "
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCart;
