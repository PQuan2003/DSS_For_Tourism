import './style_Home.css'
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import SlideShow from './SlideShow';
function Home() {

    return (
        <>
            <NavBar />
            <div id="frontpage">
                <div className="w-full p-8 font-sans bg-gradient-to-br from-white to-gray-50">
                    <div className="flex flex-col md:flex-row items-center min-h-[600px] gap-8">
                        {/* Left side - Content */}
                        <div className="w-full md:w-1/2 space-y-6 py-6">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent leading-tight">
                                Choosing your holiday is easier than ever
                                {/* Next: "Add animated typing effect for dynamic headlines" */}
                            </h1>

                            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                                We aim to help you to choose your ideal location for your holiday. Our
                                website combines technicality with real-life knownledge to deliver the best option without any bias for you
                            </p>

                            <div className="pt-4">
                                <Link to='/form' className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg mr-4">
                                    Get Started
                                </Link>
                                <Link to='#' className="border-2 border-primary-600 text-primary-600 hover:bg-primary-50 px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300">
                                    Learn More
                                </Link>
                            </div>
                        </div>

                        {/* Right side - Slideshow */}
                        <SlideShow />
                    </div>

                </div>
            </div>
        </>
    )
}

export default Home