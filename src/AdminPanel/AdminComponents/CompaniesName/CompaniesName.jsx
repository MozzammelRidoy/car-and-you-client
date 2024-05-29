import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const CompaniesName = () => {
  const loadedNameAndLogo = useLoaderData();
  const [nameAndLogos, setNameAndLogos] = useState(loadedNameAndLogo);

  const handleCompaniesNameAndLogo = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const logo = form.logo.value;
    const details = form.details.value;


    if (
      nameAndLogos.find(
        (nameN) => nameN.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      Swal.fire({
        position: "center",
        icon: "error",
        iconColor: "red",
        title: "This name already Used!",
        text: "Please Provide Defferent Name",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    } else if (
      !/^(http|https):\/\/([\w-]+(\.[\w-]+)+)(\/[\w-./?%&=]*)?$/.test(logo)
    ) {
      Swal.fire({
        position: "center",
        icon: "error",
        iconColor: "red",
        title: "Must be URL !",
        text: "Please Provide Logo URL. Then Upload !",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    } else {
      const companiesNameAndLogo = { name, logo, details };
      console.log(companiesNameAndLogo);

      fetch("http://localhost:5000/companiesNameAndLogo", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(companiesNameAndLogo),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.insertedId) {
            Swal.fire({
              position: "center",
              icon: "success",
              iconColor: "green",
              title: "Successfully Uploaded",
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
        fetch(`http://localhost:5000/companiesNameAndLogo/${_id}`, {
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
              const remaining = nameAndLogos.filter(
                (banner) => banner._id !== _id
              );
              setNameAndLogos(remaining);
            }
          });
      }
    });
  };
  return (
    <div>
      <h2 className="text-center text-4xl my-4">Companies Information Here</h2>
      <div className="w-3/4 mx-auto bg-slate-100">
        <form
          onSubmit={handleCompaniesNameAndLogo}
          className="p-4 grid grid-cols-2 gap-4"
        >
          <h2 className="col-span-2 text-center font-bold text-2xl">
            Company Name & Logo
          </h2>
          <div className="space-y-1">
            <label htmlFor="companyName">Company Name</label>
            <input
              type="text"
              name="name"
              className="w-full border-b outline-none p-2 "
              placeholder="Enter Company Name"
              id=""
              required
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="companyName">Company Logo</label>
            <input
              type="text"
              name="logo"
              className="w-full border-b outline-none p-2 "
              placeholder="Enter Company Logo URL"
              id=""
              required
            />
          </div>
          <div className="space-y-1 col-span-2">
            <label htmlFor="details">Details</label>
            <input
              type="text"
              name="details"
              className="w-full border-b outline-none p-2 "
              placeholder="Enter Company Details"
              id=""
              required
            />
          </div>
          <div className="col-span-2">
            <button className="w-full py-2 bg-blue-500 hover:bg-blue-900 text-white font-bold">
              Upload
            </button>
          </div>
        </form>
      </div>

      <div className="my-10 grid grid-cols-6 gap-2 m-2">
        {nameAndLogos.map((company) => (
          <div key={company._id}>
            <img src={company.logo} alt="" />{" "}
            <p className="w-full text-center  bg-red-500 text-white font-bold rounded-none py-1 md:py-3 border-0">
              {company.name}
            </p>
            <p className="border p-1 text-justify">
              {company.details}
            </p>
            <div className="grid grid-cols-2">
              <Link to={`/admin/updateComapniesNameAndLogo/${company._id}`}><button className="w-full bg-blue-500 py-2 hover:bg-blue-800 text-white">
                Edit
              </button></Link>
              <button
                onClick={() => handleDelete(company._id)}
                className="w-full bg-blue-500 py-2 hover:bg-blue-800 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompaniesName;

{
  /* <form className="p-4 grid grid-cols-2 gap-4">
          <h2 className="col-span-2 text-center font-bold text-2xl">
            Company Releted Slider
          </h2>
          <div className="col-span-2 space-y-1">
            <label htmlFor="companyName">Slider</label>
            <input
              type="text"
              name="companyName"
              className="w-full border-b outline-none p-2 "
              placeholder="Enter Slider URL"
              id=""
            />
          </div>
          <div className="col-span-2"><button className="w-full py-2 bg-blue-500 hover:bg-blue-900 text-white font-bold">Upload</button></div>
            </form> */
}
{
  /* <form className="p-4 grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label htmlFor="companyName">Slider 1</label>
            <input
              type="text"
              name="companyName"
              className="w-full border-b outline-none p-2 "
              placeholder="Enter Slider URL 1"
              id=""
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="companyName">Slider 2</label>
            <input
              type="text"
              name="companyName"
              className="w-full border-b outline-none p-2 "
              placeholder="Enter Slider URL 2"
              id=""
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="companyName">Slider 3</label>
            <input
              type="text"
              name="companyName"
              className="w-full border-b outline-none p-2 "
              placeholder="Enter Slider URL 3"
              id=""
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="companyName">Slider 4</label>
            <input
              type="text"
              name="companyName"
              className="w-full border-b outline-none p-2 "
              placeholder="Enter Slider URL 4"
              id=""
            />
          </div>
          <div className="col-span-2 space-y-1">
            <label htmlFor="companyName">Short Description</label>
            <input
              type="text"
              name="companyName"
              className="w-full border-b outline-none p-2 "
              placeholder="Enter Short Description"
              id=""
            />
          </div>
        </form> */
}
