import { Link, useNavigate, useRouteError } from "react-router-dom";
import Headers from "../Headers/Headers";

const ErrorPage = () => {
    const error = useRouteError(); 
    const navigate = useNavigate(); 
    
    return (
        <div className="font-Exo-2">
            <Headers/>
                <div className="bg-error-img flex flex-col justify-center  bg-cover bg-center min-h-screen ">
                <div className="bg-black bg-opacity-30 p-6 md:w-1/2 md:mx-auto">
                <h2 className="md:text-6xl text-3xl font-bold text-white text-center">{error.status}</h2>
                <h2 className="md:text-6xl text-3xl font-bold text-white text-center">Page {error.statusText}</h2>
               
                 </div>
                 <div className="md:w-1/2 w-full grid grid-cols-2  md:mx-auto">
                 <button onClick={()=>navigate(-1)} className="py-2 md:py-3 font-bold text-white bg-red-500 hover:bg-red-900">Go Back</button>
                 <button className="py-2 md:py-3 font-bold text-white bg-red-500 hover:bg-red-900"><Link to={'/'}>Home</Link></button>
                 </div>
               
                    
                </div>
        </div>
    );
};

export default ErrorPage;