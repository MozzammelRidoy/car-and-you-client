import { Outlet } from "react-router-dom"
import Headers from "../Components/SharePages/Headers/Headers"
import Footer from "../Components/SharePages/Footer/Footer"
import { IoCarSportSharp } from "react-icons/io5";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";


function Root() {
  const {loading} = useContext(AuthContext); 
  return ( 
    <div>
      {
        loading ?
        <div className="min-h-screen flex justify-center font-bold items-center text-5xl"><IoCarSportSharp className="animate-bounce" /></div>   :
        <div className="font-Exo-2 container overflow-hidden mx-auto">
      <div className="min-h-screen">
      <Headers></Headers>
      <Outlet/>
      </div>
      
      <Footer></Footer>

    </div>
       
      }
    </div>
    
  )
}

export default Root
