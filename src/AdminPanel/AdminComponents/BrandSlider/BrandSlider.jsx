import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const BrandSlider = () => {
  const loadedBarndSlider = useLoaderData();
  const [brandSliders, setMoreCarLaunching] = useState(loadedBarndSlider);
  const [allCompaniesName, setAllCompaniesName] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/companiesNameAndLogo")
      .then((res) => res.json())
      .then((data) => setAllCompaniesName(data));
  }, []);

  const handleSliderAdd = (e) => {
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
      form.reset();
      return;
    } else {
      const newSlider = { companyName, slider };

      fetch("http://localhost:5000/brandSlider", {
         method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newSlider),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.insertedId) {
            Swal.fire({
              position: "center",
              icon: "success",
              iconColor: "green",
              title: "Slider Added Successfully",
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
           fetch(`http://localhost:5000/brandSlider/${_id}`, {
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
                 const remaining = brandSliders.filter(
                   (banner) => banner._id !== _id
                 );
                 setMoreCarLaunching(remaining);
               }
             });
         }
       });
     };
  return (
    <div>
      <h3 className="text-center text-4xl my-4">Brand Slider Add</h3>
      <div className="w-3/4 mx-auto bg-slate-100">
        <form onSubmit={handleSliderAdd} className="p-4 grid grid-cols-2 gap-4">
          <h2 className="col-span-2 text-center font-bold text-2xl">
            Brand Slider Adding Here
          </h2>

          <div className="space-y-1 ">
            <label htmlFor="companyName">Company Name</label>
            <select
              required
              name="companyName"
              className="w-full py-2 outline-none"
            >
              <option  value="" selected>
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
            <label htmlFor="slider">Slider</label>
            <input
              type="text"
              name="slider"
              className="w-full border-b outline-none p-2 "
              placeholder="Enter Slider URL"
              id=""
              required
            />
          </div>
          <div className="col-span-2">
            <button className="w-full py-2 bg-blue-500 hover:bg-blue-900 text-white font-bold">
              Add Slider
            </button>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {
            brandSliders.map(slider => 
            <div key={slider._id}>
                <div className="aspect-video">
                    <h2 className="text-xl font-bold">Company : {slider.companyName}</h2>
                    <img src={slider.slider} alt="" />
                </div>
                <div className="grid grid-cols-2">
                    <Link to={`/admin/UpdatebrandSlider/${slider._id}`}><button className="w-full bg-blue-500 hover:bg-blue-800 text-white font-bold py-2">Edit</button></Link>
                    <button onClick={()=> handleDelete(slider._id)} className="w-full bg-blue-500 hover:bg-blue-800 text-white font-bold py-2">Delete</button>

                </div>
            </div>)
        }

      </div>
    </div>
  );
};

export default BrandSlider;
