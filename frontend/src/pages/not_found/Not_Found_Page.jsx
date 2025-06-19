import { Link } from "react-router-dom"
import './Not_Found.css'

function Not_Found_Page() {
    return (
        <div className="not-found">
            <h1>404</h1>
            <p>PAGE NOT FOUND</p>
            <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
            <Link to='/'>Back to main page</Link>
        </div>
    )
}

export default Not_Found_Page