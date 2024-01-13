import { Outlet } from "react-router-dom";

type IProps = {
    children?:React.ReactNode
}

 const Layout:React.FC<IProps> = ({children}) => {
  const getContent = () => {
    if(children ){
      return ( 
        <div className="main-layout">
          {children}
     </div>

      )
    }
    return <Outlet />
  }
  return getContent()

}
export default Layout