import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Components/Pages/Home/Home";
import ErrorPage from "../Components/SharePages/ErrorPage/ErrorPage";
import Login from "../Components/SharePages/LoginPage/Login";
import Register from "../Components/SharePages/RegistrationPage/Register";
import Companies from "../Components/Companies/Companies";
import BrandDetails from "../Components/Companies/BrandDetails/BrandDetails";
import AdminHome from "../AdminPanel/AdminHome/AdminHome";
import BannerAndHeader from "../AdminPanel/AdminComponents/BannerAndHeader/BannerAndHeader";
import CompaniesName from "../AdminPanel/AdminComponents/CompaniesName/CompaniesName";
import MoreNewCar from "../AdminPanel/AdminComponents/MoreNewCar/MoreNewCar";
import BrandSlider from "../AdminPanel/AdminComponents/BrandSlider/BrandSlider";
import AdminPrivateRoute from "../AdminPanel/AdminPrivateRoute/AdminPrivateRoute";
import AdminLogin from "../AdminPanel/AdminLogin/AdminLogin";
import UpdateBanner from "../AdminPanel/AdminComponents/BannerAndHeader/UpdateBanner";
import UpdateCompaniesNameAndLogos from "../AdminPanel/AdminComponents/CompaniesName/UpdateCompaniesNameAndLogos";
import UpdateLaunchingCar from "../AdminPanel/AdminComponents/MoreNewCar/UpdateLaunchingCar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader : () => fetch(`http://localhost:5000/bannerAndHeader/`)
      }, 
      {
        path: '/companies/:id',
        element: <Companies/>
      }, 
      {
        path: '/details/:id', 
        element: <BrandDetails/>
      }
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path:'/admin',
    element: <AdminPrivateRoute><AdminHome/></AdminPrivateRoute>,
    
    children: [
      {
        path: '/admin/bannerAndHeader',
        element:<BannerAndHeader/>,
        loader : () => fetch('http://localhost:5000/bannerAndHeader')
      },
      {
        path:'/admin/updateBanner/:id',
        element: <UpdateBanner/>,
        loader : ({params}) => fetch(`http://localhost:5000/bannerAndHeader/${params.id}`)
      },
      {
        path:'/admin/companiesName',
        element: <CompaniesName/>,
        loader : () => fetch('http://localhost:5000/companiesNameAndLogo')
      }, 
      {
        path: '/admin/updateComapniesNameAndLogo/:id',
        element: <UpdateCompaniesNameAndLogos/>,
        loader : ({params}) => fetch(`http://localhost:5000/companiesNameAndLogo/${params.id}`)
      },
      {
        path: '/admin/moreNewCar',
        element:<MoreNewCar/>,
        loader: () => fetch('http://localhost:5000/moreNewCarLaunching')
      }, 
      {
        path: '/admin/UpdateLaunchingCar/:id',
        element: <UpdateLaunchingCar/>,
        loader: ({params}) => fetch(`http://localhost:5000/moreNewCarLaunching/${params.id}`)
      },
      {
        path: '/admin/brandSlider', 
        element:<BrandSlider/>
      }
    ]
  }, 
  {
    path:'/admin/login',
    element: <AdminLogin/>
  },
]);

export default router;
