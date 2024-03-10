import './footer.css'

const Footer = () => {
    return (
        <div className="footer">
            <p className="text-center">
              &copy; {new Date().getFullYear()} All Rights Reserved. Rifky Hilman
            </p>
        </div>
    )
}

export default Footer