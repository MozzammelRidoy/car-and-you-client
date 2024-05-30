import { useLoaderData } from "react-router-dom";
import Banner from "./Banner/Banner";
import Company from "./Company/Company";
import NewCar from "./NewCar/NewCar";
import { ToastContainer } from "react-toastify";


const Home = () => {
    const loadedBannerAndHeader = useLoaderData();
   
    return (
        
        <div>
               <Banner loadedBannerAndHeader={loadedBannerAndHeader}/>
               <Company/>
               <NewCar/>
               <ToastContainer />
               <div className="text-center bg-slate-200 py-2">
        <p className="font-bold">Admin Site or Backend Side </p> <p><span>www.url<span className="font-bold">/admin</span></span> </p> <p> <span>Email : <span className="font-bold">mozzammelridoy5iii@gmail.com</span> OR <span className="font-bold">admin123@gmail.com</span></span> </p> <p> <span>Password : <span className="font-bold">admin123</span></span></p>
      </div>
        </div>
    );
};

export default Home;