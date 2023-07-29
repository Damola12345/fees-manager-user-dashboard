import React from 'react'
import './Header.css'
import SearchBar from '../SearchBar/SearchBar'
import ProfileIcon from '../ProfileIcon/ProfileIcon'
//import AppLogo from './applogo/appLogo'
import OptionsBars from '../SideBar/SideBar'
import { useState, useEffect } from 'react'

const Header = () => {
  //Entire page header
  const [currentSch, setCurrentSch] = useState(localStorage.getItem('currentSchool'));
  return (
    <header id="header-container">
      <OptionsBars />
      <SearchBar />
      <ProfileIcon />
    </header>
  )
}

export default Header;
