import { Link, useMatch, useResolvedPath } from 'react-router-dom'
import './style_NavBar.css'

function NavBar() {

    return (
        <nav className="navigation-container">
            <Link to="/" className="nav-site-title">Where to go</Link>
            <ul className="nav-link">
                <CustomLink to="/">Home</CustomLink>
                <CustomLink to="/form">Picker</CustomLink>
                <CustomLink to="/destination">Destination</CustomLink>
            </ul>
        </nav>)
}

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })

    return (
        <li>
            <Link className={isActive ? "active" : "nav-link-item"}
                to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}

export default NavBar