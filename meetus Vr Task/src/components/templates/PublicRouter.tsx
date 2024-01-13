import { Navigate } from "react-router-dom";
import Login from "../../pages/Login/Login";
import Registeration from "../../pages/Login/Registeration";

 const PublicRoutes = () => {
  if(localStorage.getItem("token")){
    return [
      { path: "*", element: <Navigate to="/" replace /> },

    ]
  }else{

    return [
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Registeration /> },
      { path: "*", element: <Navigate to="/login" replace /> },
    ];
  }
}
export default PublicRoutes