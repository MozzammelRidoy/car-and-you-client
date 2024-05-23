import { Outlet } from "react-router-dom"
import Headers from "../Components/SharePages/Headers/Headers"
import Footer from "../Components/SharePages/Footer/Footer"


function Root() {

  return (
    <div className="font-Exo-2">
      <Headers></Headers>
      <Outlet/>
      <Footer></Footer>

    </div>
  )
}

export default Root
