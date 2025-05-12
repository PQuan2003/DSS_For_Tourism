import { Link } from "react-router-dom"
import './Not_Found.css'


function Not_Found_Page() {
    return (
        <div className="not-found-container">
            <h1 className="error-code">404</h1>
            <p className="error-message">PAGE NOT FOUND</p>
            <p className="explanation">The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
            <Link className="error-back-to-home" to='/'>Back to main page</Link>
        </div>
    )
}

export default Not_Found_Page