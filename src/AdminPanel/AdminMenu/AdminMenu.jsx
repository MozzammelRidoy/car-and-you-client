import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4">
      <NavLink to={"/admin/bannerAndHeader"}>
        <button className="w-full py-2 bg-blue-500 text-white font-bold hover:bg-red-900 text-center border-b">
          Banner & Header
        </button>
      </NavLink>
      <NavLink to={"/admin/companiesName"}>
        <button className="w-full py-2 bg-blue-500 text-white font-bold hover:bg-red-900 text-center border-b">
          Companies Name
        </button>
      </NavLink>
      <NavLink to={"/admin/moreNewCar"}>
        <button className="w-full py-1 md:py-2 bg-blue-500 text-white font-bold hover:bg-red-900 text-center border-b">
          More New Car Launching
        </button>
      </NavLink>
      <NavLink to={"/admin/brandSlider"}>
        <button className="w-full py-2 bg-blue-500 text-white font-bold hover:bg-red-900 text-center border-b">
          Brand Slider
        </button>
      </NavLink>
      
      
    </div>
  );
};

export default AdminMenu;
