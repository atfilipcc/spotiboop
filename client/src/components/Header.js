import React from 'react'
import { NavLink } from 'react-router-dom';

const Header = () => (
  <nav className="Header">
    <ul className="Header__nav">
      <li>
        <NavLink className="Header__item" to="/">
        Home
        </NavLink>
      </li>
      <li>
        <NavLink className="Header__item" to="/about">
          About
        </NavLink>
      </li>
      <li>
        <NavLink className="Header__item" to="/toplist">Your Top Tracks
        </NavLink>
      </li>
      <li>
        <NavLink className="Header__item" to="/creator">Generate Playlist
        </NavLink>
      </li>
    </ul>
  </nav>
)

export default Header;
