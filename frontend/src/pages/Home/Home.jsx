import './style_Home.css'
import { Link } from "react-router-dom";
import SlideShow from './SlideShow';
import { NavBar } from '@/components/NavigationBar/NavBar';
import useFetchData from '@/hooks/useFetchData';



function Home() {
    const { data: carouselData, loading, error } = useFetchData("http://localhost:8080/places/images");

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        console.error("Error fetching data:", error);
        return <div>Error fetching data</div>;
    }

    return (
        <>
            <NavBar />
            <div id="frontpage">
                <div className="w-full p-8 font-sans bg-linear-to-br from-white to-gray-50">
                    <div className="flex flex-col md:flex-row items-center min-h-[600px] gap-8">
                        {/* Left side - Content */}

                        <div className="w-full md:w-1/2 space-y-6 py-6 flex flex-col">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-linear-to-r from-primary-600 to-primary-800 bg-clip-text text-purple-700 leading-tight">
                                Your Holiday, Made Easy
                            </h1>

                            {/* Tagline with star icon above paragraph */}
                            <div className="flex items-center space-x-2 text-primary-600 font-semibold text-md md:text-lg">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    stroke="none"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.462a1 1 0 00-.364 1.118l1.287 3.97c.3.922-.755 1.688-1.54 1.118l-3.388-2.462a1 1 0 00-1.175 0l-3.388 2.462c-.784.57-1.838-.196-1.539-1.118l1.287-3.97a1 1 0 00-.364-1.118L2.045 9.397c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.97z" />
                                </svg>
                                <span>Trusted recommendations for your perfect trip</span>
                            </div>

                            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                                We aim to help you to choose your ideal location for your holiday. Our
                                website combines technicality with real-life knownledge to deliver the best option without any bias for you
                            </p>

                            <div className="pt-4">
                                <Link
                                    to="/form"
                                    className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg mr-4"
                                >
                                    Get Started
                                </Link>
                                <Link
                                    to="#"
                                    className="border-2 border-primary-600 text-primary-600 hover:bg-primary-50 px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300"
                                >
                                    Learn More
                                </Link>
                            </div>
                        </div>

                        {/* Right side - Slideshow */}
                        <SlideShow pictures={carouselData?.imgs ?? []} />
                    </div>

                </div>
            </div>
            {/* Stats Section */}
            <div className="w-full py-16 bg-white">
                <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-8 text-center">

                    <div>
                        <h3 className="text-4xl font-bold text-primary-700">20+</h3>
                        <p className="text-gray-600 mt-2">Destinations</p>
                        <p className='text-gray-500 mt-2 text-sm'>From Vietnam And Around The World</p>
                    </div>

                    <div>
                        <h3 className="text-4xl font-bold text-primary-700">15k+</h3>
                        <p className="text-gray-600 mt-2">Happy Travelers</p>
                    </div>

                    <div>
                        <h3 className="text-4xl font-bold text-primary-700">98%</h3>
                        <p className="text-gray-600 mt-2">Recommendation Rate</p>
                    </div>

                </div>
            </div>

        </>


    )
}

export default Home