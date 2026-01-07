// import { Link } from "react-router-dom"


// function Not_Found_Page() {
//     return (
//         <div className="not-found">
//             <h1>404</h1>
//             <p>PAGE NOT FOUND</p>
//             <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
//             <Link to='/'>Back to main page</Link>
//         </div>
//     )
// }

// export default Not_Found_Page

import { Link } from "react-router-dom";
import {
    Frown,
    Minus
} from "lucide-react";

function Not_Found_Page() {
    return (
        <div className="flex min-h-screen bg-linear-to-r from-indigo-100 via-purple-100 to-indigo-200 p-10">
            {/* Left Side: Text content */}
            <div className="flex-1 flex flex-col justify-center pl-16 space-y-6 max-w-[600px]">
                <h1 className="text-9xl font-bold text-gray-400">404</h1>
                <p className="text-3xl font-bold text-gray-800">Page Not Found</p>
                <p className="text-2xl text-gray-600">
                    Oops! The page you are looking for might have been removed, its name changed, or is temporarily unavailable.
                </p>
                <Link to="/" className="mt-6 px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300 max-w-fit">
                    Return Home
                </Link>

                <div className="mt-8">
                    <p className="text-sm text-gray-500">Popular Pages</p>
                    <div className="space-x-6 mt-2">
                        <Link to="/about" className="text-purple-600 hover:text-purple-700">About Us</Link>
                        <Link to="/faq" className="text-purple-600 hover:text-purple-700">FAQ</Link>
                    </div>
                </div>
            </div>

            {/* Right Side: Icon section */}
            <div className="flex items-center justify-center w-1/3 ">
                <div className="flex flex-col bg-white w-56 h-56 rounded-full shadow-2xl relative">
                    <div className="absolute top-1 right-1/2 transform translate-x-1/2 translate-y-1/2">
                        <div className="bg-purple-600 w-20 h-20 rounded-full shadow-xl flex items-center justify-center">
                            <Frown className="text-white w-12 h-12" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Not_Found_Page;
