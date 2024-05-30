import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateBanner = () => {
  const loadedBannerAndHeader = useLoaderData();
  const {_id, banner, header} = loadedBannerAndHeader; 
  const navigate = useNavigate();

  const handleUpdate = e => {
    e.preventDefault(); 
    const form = e.target; 
    const header = form.header.value; 
    const banner = form.banner.value; 
    
    const bannerAndHeader = {header, banner}; 
    console.log(bannerAndHeader);

    fetch(`https://car-and-you-server.vercel.app/bannerAndHeader/${_id}`, {
        method: "PUT", 
        headers: {'content-type':'application/json'},
        body: JSON.stringify(bannerAndHeader)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        if(data.modifiedCount > 0){
            Swal.fire({
                position: "center",
                icon: "success",
                iconColor:'green',
                title: "Successfully Updated",
                showConfirmButton: false,
                timer: 1500
              });
        }
        else{
            Swal.fire({
                position: "center",
                icon: "error",
                iconColor:'red',
                title: "Update Failed",
                showConfirmButton: false,
                timer: 1500
              });
        }
    })
}
  return (
    <div>
      <h2 className="text-4xl">{loadedBannerAndHeader.header}</h2>
      <div className="my-5 md:w-3/4 mx-auto border bg-slate-100">
        <form onSubmit={handleUpdate} className="p-4 space-y-3">
          <div>
            <label htmlFor="header">Header</label>
            <input
            defaultValue={header}
              type="text"
              name="header"
              className="w-full outline-none border-b p-2"
              placeholder="Enter Header"
              id=""
            />
          </div>
          <div>
            <label htmlFor="banner">Banner</label>
            <input
            defaultValue={banner}
              type="text"
              name="banner"
              className="w-full outline-none border-b p-2"
              placeholder="Enter Banner URL"
              id=""
            />
          </div>
          <div>
            <button className="w-full py-2 hover:bg-blue-700 bg-blue-500 font-bold text-white">
              Update
            </button>
          </div>
        </form>
        <div onClick={()=>navigate(-1)} className="w-full btn-outline text-center py-2">Go Back</div>
      </div>
    </div>
  );
};

export default UpdateBanner;
