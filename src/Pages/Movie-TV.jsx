import '../Assets/css/Homee.css';
import Navbar from '../Components/Navbar/Navbar';
import MovietV from '../Components/Card-TV/TV';
import Footer from '../Components/Footer/footer';
import '../Assets/css/index.css'


const MovieTV = () => {
    return (

        <div className="home">
                <Navbar />
                <MovietV />
            <Footer />
        </div>
    )
}

export default MovieTV