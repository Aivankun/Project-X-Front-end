import React from 'react';
import UserInfo from './UserInfo';

const NavbarMainDashboard = ({ isDropdownVisible, setDropdownVisible }) => {
  return (
    <div className="header-home">
      <UserInfo 
        isDropdownVisible={isDropdownVisible} 
        setDropdownVisible={setDropdownVisible} 
      />
      
    </div>
  );
};

export default NavbarMainDashboard;
