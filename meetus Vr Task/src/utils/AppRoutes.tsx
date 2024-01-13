import React from 'react'
import {  RouterProvider,  createBrowserRouter } from 'react-router-dom'
import PublicRoutes from '../components/templates/PublicRouter';
import PrivateRotues from '../components/templates/PrivateRouter';
import { useSelector } from 'react-redux';

const AppRoutes = () => {
    const isAuth = useSelector((state:{auth:{token:null|string}}) => state?.auth.token)
  


    const router = createBrowserRouter([
        isAuth || localStorage.getItem("token")? PrivateRotues() : {},
         ...PublicRoutes(),
      ]);

    


      return <RouterProvider router={router} />;

}

export default AppRoutes