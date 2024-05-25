import { useLoaderData } from "react-router-dom";
import Banner from "./Banner/Banner";
import Company from "./Company/Company";
import NewCar from "./NewCar/NewCar";

const Home = () => {
    const loadedBannerAndHeader = useLoaderData();
    return (
        <div>
               <Banner loadedBannerAndHeader={loadedBannerAndHeader}/>
               <Company/>
               <NewCar/>
        </div>
    );
};

export default Home;