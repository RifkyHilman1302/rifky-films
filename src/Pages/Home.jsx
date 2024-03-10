
import Navbar from '../Components/Navbar/Navbar';
import Genre from '../Components/Genre/Genre';
import Footer from '../Components/Footer/footer';
import '../Assets/css/index.css'

const Home = () => {
    return (
        <div className='home'>
           <Navbar />
           <Genre />
           <Footer />
        </div>
        
    )
}

export default Home