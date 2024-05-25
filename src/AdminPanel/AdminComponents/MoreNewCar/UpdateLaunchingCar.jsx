import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateLaunchingCar = () => {
    const loadedLaunchingCar = useLoaderData(); 
    const {_id, about, image} = loadedLaunchingCar; 
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
    
          fetch(`http://localhost:5000/moreNewCarLaunching/${_id}`, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(newCarLaunching),
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
        <h2 className="text-center text-4xl my-4">Update More New Car Launching Here</h2>
        <div className="w-3/4 mx-auto bg-slate-100">
          <form
            onSubmit={handleMoreNewCarLaunching}
            className="p-4 grid grid-cols-2 gap-4"
          >
            <h2 className="col-span-2 text-center font-bold text-2xl">
              Company Name & Logo
            </h2>
            <div className="space-y-1">
              <label htmlFor="companyName">Car About</label>
              <input defaultValue={about}
                type="text"
                name="about"
                className="w-full border-b outline-none p-2 "
                placeholder="Enter Car About"
                id=""
                required
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="companyName">New Car Image</label>
              <input
              defaultValue={image}
                type="text"
                name="image"
                className="w-full border-b outline-none p-2 "
                placeholder="Enter Car image URL"
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

export default UpdateLaunchingCar;