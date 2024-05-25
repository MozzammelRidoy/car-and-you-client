import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const BannerAndHeader = () => {
  const loadedBannerAndHeader = useLoaderData();
  const [bannerHeaders, setbannerHeaders] = useState(loadedBannerAndHeader);

  const handleUpload = (e) => {
    e.preventDefault();
    const form = e.target;
    const header = form.header.value;
    const banner = form.banner.value;

    const bannerAndHeader = { header, banner };
    console.log(bannerAndHeader);

    if (
      !/^(http|https):\/\/([\w-]+(\.[\w-]+)+)(\/[\w-./?%&=]*)?$/.test(banner)
    ) {
      Swal.fire({
        position: "center",
        icon: "error",
        iconColor: "red",
        text: "Please Provide Valid Banner URL",
        title: "Only URL Suport",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    } else {
      fetch("http://localhost:5000/bannerAndHeader", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(bannerAndHeader),
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
        fetch(`http://localhost:5000/bannerAndHeader/${_id}`, {
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
              const remaining = bannerHeaders.filter(
                (banner) => banner._id !== _id
              );
              setbannerHeaders(remaining);
            }
          });
        
      }
    });
  };
  return (
    <div>
      <h3 className="text-4xl text-center">Banner and Header</h3>
      {/* upload banner and head */}
      <div className="my-5 md:w-3/4 mx-auto border bg-slate-100">
        <form onSubmit={handleUpload} className="p-4 space-y-3">
          <div>
            <label htmlFor="header">Header</label>
            <input
              type="text"
              name="header"
              className="w-full outline-none border-b p-2"
              placeholder="Enter Header"
              id=""
              required
            />
          </div>
          <div>
            <label htmlFor="banner">Banner</label>
            <input
              type="text"
              name="banner"
              className="w-full outline-none border-b p-2"
              placeholder="Enter Banner URL"
              id=""
              required
            />
          </div>
          <div>
            <button className="w-full py-2 hover:bg-blue-700 bg-blue-500 font-bold text-white">
              Upload
            </button>
          </div>
        </form>
      </div>

      {/* display banner and header  */}
      <div className="grid grid-cols-2 gap-3">
        {bannerHeaders.map((bannerHeader) => (
          <div key={bannerHeader._id}>
            <div>
              <h2 className="font-bold text-xl">
                Header : {bannerHeader.header}
              </h2>
              <img src={bannerHeader.banner} alt="" />
            </div>
            <div className="grid grid-cols-2">
              <Link to={`/admin/updateBanner/${bannerHeader._id}`}>
                <button className="w-full bg-red-500 py-1 hover:bg-red-900 text-white">
                  {" "}
                  Edit
                </button>
              </Link>
              <button
                onClick={() => handleDelete(bannerHeader._id)}
                className="w-full bg-red-500 py-1 hover:bg-red-900 text-white"
              >
                {" "}
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerAndHeader;
