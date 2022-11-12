import React from 'react';
import {NavLink} from 'react-router-dom';
import './Header.css';
import logo from "../../assets/love-birds.png"
import {IoGameController} from 'react-icons/io5'

function Header() {
  return (
    <header>
        <div className='h_left'>
            <NavLink to="/" className="logo">
                <img src={logo} alt="my logo"/>
                <p>FriendsQuiz</p>
            </NavLink>
        </div>

        <div className="user_section">
            <p className='my_res'>Go to results</p>
            <p className='my_res2'>Play <IoGameController style={{marginLeft:"5px"}}/> </p>
        </div>
    </header>
  )
}

export default Header