import { Navigate } from "react-router-dom";
import Layout from "./Layout";
import Home from "../../pages/Home/Home";



const PrivateRotues = ()  => {
  return {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      
    ],
}
  };

  export default PrivateRotues