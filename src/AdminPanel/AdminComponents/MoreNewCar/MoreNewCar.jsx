import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const MoreNewCar = () => {
    const loadedMoreCars = useLoaderData(); 
   const [moreCarLanuching, setMoreCarLaunching] = useState(loadedMoreCars);

  const handleMoreNewCarLaunching = (e) => {
    e.preventDefault();
    const form = e.target;
    const about = form.about.value;
    const image = form.image.value;

    if (
      !/^(http|https):\/\/([\w-]+(\.[\w-]+)+)(\/[\w-./?%&=]*)?$/.test(image)
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
      const newCarLaunching = { about, image };

      fetch("http://localhost:5000/moreNewCarLaunching", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newCarLaunching),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.insertedId) {
            Swal.fire({
              position: "center",
              icon: "success",
              iconColor: "green",
              title: "Successfully Launched",
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
        fetch(`http://localhost:5000/moreNewCarLaunching/${_id}`, {
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
              const remaining = moreCarLanuching.filter(
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
      <h3 className="text-center text-4xl my-4">More New Car Launching</h3>
      <div className="w-3/4 mx-auto bg-slate-100">
        <form
          onSubmit={handleMoreNewCarLaunching}
          className="p-4 grid grid-cols-2 gap-4"
        >
          <h2 className="col-span-2 text-center font-bold text-2xl">
            More New Car Launching
          </h2>
          <div className="space-y-1">
            <label htmlFor="about">Car About</label>
            <input
              type="text"
              name="about"
              className="w-full border-b outline-none p-2 "
              placeholder="Enter Car About"
              id=""
              required
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="image">Car Image</label>
            <input
              type="text"
              name="image"
              className="w-full border-b outline-none p-2 "
              placeholder="Enter Car Image URL"
              id=""
              required
            />
          </div>
          <div className="col-span-2">
            <button className="w-full py-2 bg-blue-500 hover:bg-blue-900 text-white font-bold">
              Launch
            </button>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {
            moreCarLanuching.map(newCar => 
            <div key={newCar._id}>
                <div className="aspect-video">
                    <h2 className="text-xl font-bold">About : {newCar.about}</h2>
                    <img src={newCar.image} alt="" />
                </div>
                <div className="grid grid-cols-2">
                    <Link to={`/admin/UpdateLaunchingCar/${newCar._id}`}><button className="w-full bg-blue-500 hover:bg-blue-800 text-white font-bold py-2">Edit</button></Link>
                    <button onClick={()=> handleDelete(newCar._id)} className="w-full bg-blue-500 hover:bg-blue-800 text-white font-bold py-2">Delete</button>

                </div>
            </div>)
        }

      </div>
    </div>
  );
};

export default MoreNewCar;
