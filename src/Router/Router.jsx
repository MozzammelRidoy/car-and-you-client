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
import UpdateBrandSlider from "../AdminPanel/AdminComponents/BrandSlider/UpdateBrandSlider";
import CompaniesProducts from "../AdminPanel/AdminComponents/CompaniesProducts/CompaniesProducts";
import UpdateCompaniesProduct from "../AdminPanel/AdminComponents/CompaniesProducts/UpdateCompaniesProduct";
import MyCart from "../Components/Pages/MyCart/MyCart";
import PrivateRouter from "./PrivateRouter/PrivateRouter";
import Users from "../AdminPanel/AdminComponents/Users/Users";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader : () => fetch(`https://car-and-you-server.vercel.app/bannerAndHeader/`)
      }, 
      {
        path: '/mycart',
        element: <PrivateRouter><MyCart/></PrivateRouter>
      },
      {
        path: '/companies/:id',
        element: <Companies/>,
        loader: ({params}) => fetch(`https://car-and-you-server.vercel.app/companiesNameAndLogo/${params.id}`)
      }, 
      {
        path: '/details/:id', 
        element: <PrivateRouter><BrandDetails/></PrivateRouter>,
        loader : ({params}) => fetch(`https://car-and-you-server.vercel.app/companiesProduct/${params.id}`)
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
        loader : () => fetch('https://car-and-you-server.vercel.app/bannerAndHeader')
      },
      {
        path:'/admin/updateBanner/:id',
        element: <UpdateBanner/>,
        loader : ({params}) => fetch(`https://car-and-you-server.vercel.app/bannerAndHeader/${params.id}`)
      },
      {
        path:'/admin/companiesName',
        element: <CompaniesName/>,
        loader : () => fetch('https://car-and-you-server.vercel.app/companiesNameAndLogo')
      }, 
      {
        path: '/admin/updateComapniesNameAndLogo/:id',
        element: <UpdateCompaniesNameAndLogos/>,
        loader : ({params}) => fetch(`https://car-and-you-server.vercel.app/companiesNameAndLogo/${params.id}`)
      },
      {
        path: '/admin/moreNewCar',
        element:<MoreNewCar/>,
        loader: () => fetch('https://car-and-you-server.vercel.app/moreNewCarLaunching')
      }, 
      {
        path: '/admin/UpdateLaunchingCar/:id',
        element: <UpdateLaunchingCar/>,
        loader: ({params}) => fetch(`https://car-and-you-server.vercel.app/moreNewCarLaunching/${params.id}`)
      },
      {
        path: '/admin/brandSlider', 
        element:<BrandSlider/>,
        loader: () => fetch('https://car-and-you-server.vercel.app/brandSlider')
      }, 
      {
        path: '/admin/UpdatebrandSlider/:id',
        element: <UpdateBrandSlider/>,
        loader: ({params}) => fetch(`https://car-and-you-server.vercel.app/brandSlider/${params.id}`)
      },
      {
        path: '/admin/companiesProducts', 
        element:<CompaniesProducts/>,
        loader : () => fetch('https://car-and-you-server.vercel.app/companiesProduct')
      }, 
      {
        path: '/admin/UpdateComapiesProduct/:id', 
        element: <UpdateCompaniesProduct/>,
        loader : ({params}) => fetch(`https://car-and-you-server.vercel.app/companiesProduct/${params.id}`)
      }, 
      {
        path: '/admin/users',
        element: <Users/>,
        loader : () => fetch('https://car-and-you-server.vercel.app/users')
      }
    ]
  }, 
  {
    path:'/admin/login',
    element: <AdminLogin/>
  },
]);

export default router;
