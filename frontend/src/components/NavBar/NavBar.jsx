import { Link, useMatch, useResolvedPath } from 'react-router-dom'
import './style_NavBar.css'

function NavBar() {

    return (
        <div className="nav-bar">
            <div className="w-full bg-white shadow-md py-3 px-6 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center space-x-3">
                    <Link to="/" className='flex'>
                        <span className="material-symbols-outlined text-primary-600 text-2xl">flight_takeoff</span>
                        <h1 className="text-xl font-bold text-primary-800">TravelQuest</h1>
                    </Link>

                </div>
                <ul className="hidden md:flex items-center space-x-6">
                    {/* <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                        <span className="material-symbols-outlined">search</span>
                    </button>  */}
                    <CustomLink to="/">Home</CustomLink>
                    <CustomLink to="/form">Picker</CustomLink>
                    <CustomLink to="/destination">Destination</CustomLink>
                </ul>
                <div className="flex items-center">
                    <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow-sm">
                        Sign Up
                    </button>
                </div>
            </div>
        </div >
    )
}

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })
    const linkClass = (isActive ? "active" : "nav-link-item") + "font-medium hover:text-primary-600 transition-colors"
    return (
        <li>
            <Link className={linkClass}
                to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}

export default NavBar