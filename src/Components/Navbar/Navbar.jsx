import {NavLink} from "react-router-dom";

import './Navbar.css';
import logo from './../../img/logo.svg';

// import Burger from "./Burger";


const Navbar = () => {
    const activelink = 'top__link top__link_active';
    const normallink ='top__link';
    
    return (   
        <>
            <header className="top">
                <div className="top__wrapper">
                    
                    <NavLink to="/">
                        <img src={logo} alt="logo" className="top__logo" />
                    </NavLink>
                    
                    <nav className="top__menu">

                        <NavLink to="/" className={({isActive}) => isActive ? activelink : normallink}>Главная</NavLink>
                        <NavLink to="/Сhat" className={({isActive}) => isActive ? activelink : normallink}>Чат</NavLink>
                    </nav>

                    {/* <Burger /> */}
                </div>
            </header>
        </>  
    );
}
 
export default Navbar;