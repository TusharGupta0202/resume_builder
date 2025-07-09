import ProfileInfoCard from "../Cards/ProfileInfoCard"
import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <div className="h-16 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] px-4 py-2.5 md:px-0 sticky top-0 z-30">
        <div className="container flex items-center justify-between gap-5 mx-auto">
            <Link to='/dashboard' >
                <h2 className="text-lg font-medium leading-5 text-black md:text-xl">
                    Resume Builder
                </h2>
            </Link>
            <ProfileInfoCard />
        </div>
    </div>
  )
}

export default Navbar