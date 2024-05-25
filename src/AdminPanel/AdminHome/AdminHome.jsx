import { Outlet } from 'react-router-dom';
import AdminMenu from '../AdminMenu/AdminMenu';
import AdminHeader from '../AdminHeader/AdminHeader';

const AdminHome = () => {
    return (
        <div className='font-Exo-2'>
            <div>
                <AdminHeader/>
            </div>
            <div className=''>
                
             <div className=''>
                <AdminMenu/>
             </div>
             <div className='mb-10 max-w-6xl mx-auto'>
             <Outlet/>
             </div>
            </div>
           
        </div>
    );
};

export default AdminHome;