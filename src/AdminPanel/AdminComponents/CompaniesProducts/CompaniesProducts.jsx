import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const CompaniesProducts = () => {
  const loadedCompaniesProducts = useLoaderData();
  const [companiesProducts, setCompaniesProducts] = useState(
    loadedCompaniesProducts
  );


  const [inputs, setInputs] = useState([{ value: "" }]);
  const [allCompaniesName, setAllCompaniesName] = useState([]);
  useEffect(() => {
    fetch("https://car-and-you-server.vercel.app/companiesNameAndLogo")
      .then((res) => res.json())
      .then((data) => setAllCompaniesName(data));
  }, []);

  // Function to handle adding a new input field
  const handleAddInput = () => {
    setInputs([...inputs, { value: "" }]);
  };

  // Function to handle changes in the input fields
  const handleChange = (index, event) => {
    const newInputs = [...inputs];
    newInputs[index].value = event.target.value;
    setInputs(newInputs);
  };

  // Function to handle form submission
  const handleAddItem = (event) => {
    event.preventDefault();
    const moreImages = inputs.map((input) => input.value);

    const form = event.target;
    const companyName = form.companyName.value;
    const image = form.image.value;
    const description = form.description.value;

    const imageValidation = moreImages.every((image) =>
      /^(http|https):\/\/([\w-]+(\.[\w-]+)+)(\/[\w-./?%&=]*)?$/.test(image)
    );

    if (
      !/^(http|https):\/\/([\w-]+(\.[\w-]+)+)(\/[\w-./?%&=]*)?$/.test(image)
    ) {
      Swal.fire({
        position: "center",
        icon: "error",
        iconColor: "red",
        title: "Must be URL in image !",
        text: "Please Provide Image URL. Then Upload !",
        showConfirmButton: false,
        timer: 1500,
      });

      form.reset();

      return;
    } else if (!imageValidation) {
      Swal.fire({
        position: "center",
        icon: "error",
        iconColor: "red",
        title: "Must be URL in More image !",
        text: "Please Provide Image URL. Then Upload !",
        showConfirmButton: false,
        timer: 1500,
      });

      setInputs([{ value: "" }]);
      return;
    } else {
      const newItem = { companyName, image, description, moreImages };
      //   console.log(newItem);

      fetch("https://car-and-you-server.vercel.app/companiesProduct", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newItem),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.insertedId) {
            Swal.fire({
              position: "center",
              icon: "success",
              iconColor: "green",
              title: "Image Added Successfully",
              showConfirmButton: false,
              timer: 1500,
            });
          }
          form.reset();
        });
    }
  };

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://car-and-you-server.vercel.app/companiesProduct/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire({
                position: "center",
                icon: "success",
                iconColor: "green",
                title: "Deleted Successful",
                showConfirmButton: false,
                timer: 1500,
              });
              const remaining = companiesProducts.filter(
                (banner) => banner._id !== _id
              );
              setCompaniesProducts(remaining);
            }
          });
      }
    });
  };

  return (
    <div>
      <h3 className="text-center text-4xl my-4">
        Companies Similar Product Add
      </h3>
      <div className="w-3/4 mx-auto bg-slate-100">
        <form onSubmit={handleAddItem} className="p-4 grid grid-cols-2 gap-4">
          <h2 className="col-span-2 text-center font-bold text-2xl">
            New Product Adding Here
          </h2>

          <div className="space-y-1 ">
            <label htmlFor="companyName">Company Name</label>
            <select
              required
              name="companyName"
              className="w-full py-2 outline-none"
            >
              <option value="" selected>
                Select Company Name
              </option>
              {allCompaniesName.map((companyName) => (
                <option key={companyName._id} value={companyName.name}>
                  {companyName.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label htmlFor="image">Image</label>
            <input
              type="text"
              name="image"
              className="w-full border-b outline-none p-2 "
              placeholder="Enter Image URL"
              id=""
              required
            />
          </div>
          <div className="space-y-1 col-span-2">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              name="description"
              className="w-full border-b outline-none p-2 "
              placeholder="Enter Description This Item"
              id=""
              required
            />
          </div>
          <div className="space-y-1 col-span-2">
            <label htmlFor="moreImage">
              Add More Image{" "}
              <span className="font-bold text-slate-400">
                ( Minimum 1 Image or Maximum 7 Image Recomended )
              </span>
            </label>
            {inputs.map((input, index) => (
              <div key={index}>
                <input
                  name="moreImage"
                  type="text"
                  value={input.value}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full p-2 outline-none border-b mb-2"
                  placeholder={`Enter image ${index + 1} url`}
                  required
                />
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddInput}
              className="px-4 py-2 bg-blue-500 text-white"
            >
              Add More Image
            </button>
          </div>
          <div className="col-span-2">
            <button className="w-full py-2 bg-blue-500 hover:bg-blue-900 text-white font-bold">
              Item Add
            </button>
          </div>
        </form>
      </div>

            <h2 className="text-center text-3xl font-bold my-5">Client Side Show Products</h2>
      {/* display data  */}
      <div className="grid grid-cols-2 gap-3">
        
         {companiesProducts.map(product =>  <div key={product._id}>
            <h2 className="text-xl font-bold">Comapy Name : {product.companyName}</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-video">
                {/* click image */}
                <img className="image-full" src={product.image} alt="" />
              </div>
              <div className="grid grid-cols-3 gap-2">
                
                {product.moreImages.map((image, index) => (
                  <div key={index}>
                    <img
                      className="image-full aspect-video"
                      src={image}
                      alt=""
                    />
                  </div>
                ))}
              </div>
            </div>
            <div>
              {" "}
              <p><span className="font-bold">Description :</span> {product.description}</p>
            </div>
            <div className="grid grid-cols-2">
              <Link to={`/admin/UpdateComapiesProduct/${product._id}`}>
                <button className="w-full bg-blue-500 hover:bg-blue-800 text-white font-bold py-2">
                  Edit
                </button>
              </Link>
              <button
                onClick={() => handleDelete(product._id)}
                className="w-full bg-blue-500 hover:bg-blue-800 text-white font-bold py-2"
              >
                Delete
              </button>
            </div>
          </div>)}
        
      </div>
    </div>
  );
};

export default CompaniesProducts;
