import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faX } from '@fortawesome/free-solid-svg-icons';


const Navbar = () => {
    const navigate = useNavigate()
    const myRef = useRef(null);

    const handleClick = () => {
        myRef.current.style.display = 'flex';
      };

    const close = () => {
        myRef.current.style.display = 'none';
    }

    return (
        <div>
            <div className="Navbar">
                <div className="Navbar-title">
                    <p className='title-first'>Ky</p>
                    <p className='title-second'>Cinema</p>
                </div>
                <div className="hr"></div>
                <div className="btn-nav" ref={myRef}>
                    <button className='btn-Navbar' onClick={() => navigate('/')}>
                        Home
                    </button>
                    <button className='btn-Navbar' onClick={() => navigate('/movie')}>
                        TV Movie
                    </button>
                    <div className="btn-close">
                        <FontAwesomeIcon icon={faX} onClick={close} />
                    </div>
                </div>
                <div className="burger-btn">
                    <FontAwesomeIcon icon={faBars}  onClick={handleClick} className="fa-bars"   />
                </div>
            </div>
        </div>
    )
}

export default Navbar;
