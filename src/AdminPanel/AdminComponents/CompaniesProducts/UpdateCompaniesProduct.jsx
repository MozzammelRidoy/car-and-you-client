import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateCompaniesProduct = () => {
    const loadedCompaniesProduct = useLoaderData(); 
    const {_id, companyName, description, image, moreImages} = loadedCompaniesProduct; 

    

    const [inputs, setInputs] = useState(moreImages.map(img => ({value : img})));
   
    const [allCompaniesName, setAllCompaniesName] = useState([]);

    useEffect(() => {
      fetch("http://localhost:5000/companiesNameAndLogo")
        .then((res) => res.json())
        .then((data) => {
         const otherCompany = data.filter(company => company.name !== companyName)
          setAllCompaniesName(otherCompany)});
    }, [companyName]);

  // Function to handle adding a new input field
  const handleAddInput = () => {
    setInputs([...inputs, { value: "" }]);
  };

   // Function to handle removing an input field
   const handleRemoveInput = (index) => {
    const newInputs = inputs.filter((_, i) => i !== index);
    setInputs(newInputs);
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
    const moreImage = inputs.map((input) => input.value);
    const form = event.target;
    const companyName = form.companyName.value;
    const image = form.image.value;
    const description = form.description.value;

    const imageValidation = moreImage.every((image) =>
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

      
      return;
    } else {
      const updateItem = { companyName, image, description, moreImage };

      fetch(`http://localhost:5000/companiesProduct/${_id}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(updateItem),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if  (data.modifiedCount > 0) {
            Swal.fire({
              position: "center",
              icon: "success",
              iconColor: "green",
              title: "Product Updated Successfully",
              showConfirmButton: false,
              timer: 1500,
            });
          }
          else {
            Swal.fire({
              position: "center",
              icon: "error",
              iconColor: "red",
              title: "Update Failed !",
              text: "Try Again",
              showConfirmButton: false,
              timer: 1500,
            });
          }
          
        });
    }
  };
    return (
        <div>
             <h3 className="text-center text-4xl my-4">
        Companies Product Update
      </h3>
      <div className="w-3/4 mx-auto bg-slate-100">
        <form onSubmit={handleAddItem} className="p-4 grid grid-cols-2 gap-4">
          <h2 className="col-span-2 text-center font-bold text-2xl">
             Product Updating Here
          </h2>

          <div className="space-y-1 ">
            <label htmlFor="companyName">Company Name</label>
            <select
              required
              name="companyName"
              className="w-full py-2 outline-none"
            >
              <option value="">
                Select Company Name
              </option>
              <option value={companyName} selected>
               {companyName}
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
              defaultValue={image}
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
              defaultValue={description}
              className="w-full border-b outline-none p-2 "
              placeholder="Enter Description This Item"
              id=""
              required
            />
          </div>
          <div className="space-y-1 col-span-2">
            <label htmlFor="moreImage">
              More Images{" "}
              <span className="font-bold text-slate-400">
                ( Minimum 1 Image or Maximum 7 Image Recomended )
              </span>
            </label>
            {inputs.map((image, index) => (
              <div className="relative" key={index}>
                <input
                  defaultValue={image}
                  name="moreImage"
                  type="text"
                  value={image.value}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full  p-2 outline-none border-b mb-2"
                  placeholder={`Enter image ${index + 1} url`}
                  required
                />
                 <button
                  type="button"
                  onClick={() => handleRemoveInput(index)}
                  className="px-4 right-0 hover:bg-red-900 border-b absolute py-2  bg-red-500 text-white"
                >
                  Delete
                </button>
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
              Item Update
            </button>
          </div>
        </form>
      </div>
            
        </div>
    );
};

export default UpdateCompaniesProduct;