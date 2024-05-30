import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateBrandSlider = () => {
    const loadedBrandSliders = useLoaderData();
    const { _id, companyName, slider } = loadedBrandSliders;

  const [allCompaniesName, setAllCompaniesName] = useState([]);

  useEffect(() => {
    fetch("https://car-and-you-server.vercel.app/companiesNameAndLogo")
      .then((res) => res.json())
      .then((data) => {
       const otherCompany = data.filter(company => company.name !== companyName)
        setAllCompaniesName(otherCompany)});
  }, [companyName]);

  
  const handleUpdateBrandSlider = (e) => {
    e.preventDefault();
    const form = e.target;
    const companyName = form.companyName.value;
    const slider = form.slider.value;

    if (
      !/^(http|https):\/\/([\w-]+(\.[\w-]+)+)(\/[\w-./?%&=]*)?$/.test(slider)
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
      const newSlider = { companyName, slider };

      fetch(`https://car-and-you-server.vercel.app/brandSlider/${_id}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newSlider),
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
          } else {
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
      <h2 className="text-center text-4xl my-4">Update Brand Slider Here</h2>
      <div className="w-3/4 mx-auto bg-slate-100">
        <form
          onSubmit={handleUpdateBrandSlider}
          className="p-4 grid grid-cols-2 gap-4"
        >
          <h2 className="col-span-2 text-center font-bold text-2xl">
            Company Name & Logo
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
            <label htmlFor="companyName">Slider</label>
            <input
              defaultValue={slider}
              type="text"
              name="slider"
              className="w-full border-b outline-none p-2 "
              placeholder="Enter Car slider URL"
              id=""
              required
            />
          </div>
          <div className="col-span-2">
            <button className="w-full py-2 bg-blue-500 hover:bg-blue-900 text-white font-bold">
              Slider Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBrandSlider;
