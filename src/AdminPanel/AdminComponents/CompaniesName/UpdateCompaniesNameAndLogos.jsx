import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateCompaniesNameAndLogos = () => {
  const loadedNameAndLogo = useLoaderData();
    const {_id, name, logo} = loadedNameAndLogo; 
  const handleCompaniesNameAndLogo = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const logo = form.logo.value;

    
      
    if (
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
      const companiesNameAndLogo = { name, logo };

      fetch(`http://localhost:5000/companiesNameAndLogo/${_id}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(companiesNameAndLogo),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.modifiedCount > 0) {
            Swal.fire({
              position: "center",
              icon: "success",
              iconColor: "green",
              title: "Successfully Updated",
              showConfirmButton: false,
              timer: 1500,
            });
          }
         else{
            Swal.fire({
                position: "center",
                icon: "error",
                iconColor: "red",
                title: "Update Failed !",
                text:'Try Again',
                showConfirmButton: false,
                timer: 1500,
              });
         }
        });
    }
  }

  return (
    <div>
      <h2 className="text-center text-4xl my-4">Update Companies Information Here</h2>
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
            <input defaultValue={name}
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
            defaultValue={logo}
              type="text"
              name="logo"
              className="w-full border-b outline-none p-2 "
              placeholder="Enter Company Logo URL"
              id=""
              required
            />
          </div>
          <div className="col-span-2">
            <button className="w-full py-2 bg-blue-500 hover:bg-blue-900 text-white font-bold">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCompaniesNameAndLogos;
