import './style_Home.css'
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";

function Home() {

    return (
        <div className="home-container"

        >
            <NavBar />
            <h1>Home Page</h1>
            <div className="home-body"
                style={{
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    width: '100vw',
                    height: '100vh'
                }}
            >
                <h1>Explore Your Dream Destinations</h1>
                <h3>Sth sth sth sth sth</h3>
                {/* <Link to='/form'>Start finding</Link> */}
            </div >
        </div >
    )
}

export default Home