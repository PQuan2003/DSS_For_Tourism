import p1 from '../../assets/picture/sand.jpg'
import p2 from '../../assets/picture/testing.jpg'
import p3 from '../../assets/picture/vinh_ha_long.jpg'

const SlideShow = () => {
    const pictures = [p1, p2, p3]
    return (
        <div className="w-full md:w-1/2 relative h-[400px] md:h-[500px] overflow-hidden rounded-2xl shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-900/20 to-transparent z-10"></div>

            <div className="carousel relative w-full h-full">
                {pictures.map((p) => {
                    return <div className="carousel-item absolute w-full h-full transition-opacity duration-1000 opacity-100">
                        <img
                            src={p}
                            // src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
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
                <button className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/50 transition-all duration-300">
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
            </div>

            <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20">
                <button className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/50 transition-all duration-300">
                    <span className="material-symbols-outlined">arrow_forward</span>
                </button>
            </div>
        </div>
    );
}

export default SlideShow;