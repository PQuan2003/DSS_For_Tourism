import { useState, useEffect, useRef } from "react";

const SlideShow = ({ pictures }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const intervalRef = useRef(null);
    const AUTO_DELAY = 3000;

    const nextSlide = () => {
        setCurrentIndex((prev) =>
            prev === pictures.length - 1 ? 0 : prev + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? pictures.length - 1 : prev - 1
        );
    };

    const startAutoScroll = () => {
        stopAutoScroll();
        intervalRef.current = setInterval(nextSlide, AUTO_DELAY);
    };

    const stopAutoScroll = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    const handleNext = () => {
        nextSlide();
        startAutoScroll();
    };

    const handlePrev = () => {
        prevSlide();
        startAutoScroll();
    };


    useEffect(() => {
        if (!pictures.length) return;
        startAutoScroll();
        return stopAutoScroll;
    }, [pictures.length]);



    return (
        <div className="w-full md:w-1/2 relative h-[400px] md:h-[500px] overflow-hidden rounded-2xl shadow-2xl">
            <div className="absolute inset-0 bg-linear-to-tr from-primary-900/20 to-transparent z-10"></div>

            <div className="carousel relative w-full h-full">
                {pictures && pictures.map((p, index) => {
                    return <div key={p.place_id}
                        // className="carousel-item absolute w-full h-full transition-opacity duration-1000 opacity-100"
                        className={`carousel-item absolute w-full h-full transition-opacity duration-1000
              ${index === currentIndex ? "opacity-100" : "opacity-0"}`}
                    >
                        <img
                            src={p.place_img}
                            alt="location picture"
                            className="w-full h-full object-cover"
                        />
                    </div>
                })}
            </div>

            <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2 z-20">
                <button className="w-3 h-3 rounded-full bg-white opacity-100 transition-all duration-300 hover:scale-125"></button>
                <button className="w-3 h-3 rounded-full bg-white opacity-50 transition-all duration-300 hover:scale-125 hover:opacity-100"></button>
                <button className="w-3 h-3 rounded-full bg-white opacity-50 transition-all duration-300 hover:scale-125 hover:opacity-100"></button>
            </div>

            <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20">
                <button
                    className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/50 transition-all duration-300"
                    onClick={handlePrev}>
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
            </div>

            <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20">
                <button
                    className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/50 transition-all duration-300"
                    onClick={handleNext}>
                    <span className="material-symbols-outlined">arrow_forward</span>
                </button>
            </div>
        </div>
    );
}

export default SlideShow;