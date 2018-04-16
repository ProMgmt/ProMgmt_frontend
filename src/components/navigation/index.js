import React from 'react';
import {Link} from 'react-router-dom';

class NavBar extends React.Component {
  render() {
    return (
      <nav>
        <Link to='/myorgs'>My Orgs</Link>
        <Link to='/myprojects'>My Projects</Link>
        <Link to='/mytasks'>My Tasks</Link>
        <Link to='/logout'>Log Out</Link>
      </nav>
    )
  }
}

export default NavBar;