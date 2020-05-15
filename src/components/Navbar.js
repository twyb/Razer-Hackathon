import React from "react";
import "./Componentstyles.css";

const Navbar = props => {
    return (
        <div className = 'Navbar'>
            
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#cpfp">CPF Board</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#faq">FAQ</a></li>
            </ul>
        </div>
    );
}

export default Navbar;