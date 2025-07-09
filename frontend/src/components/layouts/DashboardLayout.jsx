import { useContext } from "react"
import { UserContext } from "../../context/userContext"
import Navbar from "./Navbar";


const DashboardLayout = ({activeMenu,children}) => {

    const {user} = useContext(UserContext);

  return (
    <div>
        <Navbar activeMenu={activeMenu} />
        {user && <div className="container pt-4 pb-4 mx-auto">{children}</div>}
    </div>
  )
}

export default DashboardLayout