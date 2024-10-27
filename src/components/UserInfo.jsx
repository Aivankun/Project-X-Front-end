import React, { useEffect, useRef } from 'react';

const UserInfo = ({ isDropdownVisible, setDropdownVisible }) => {
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    if (isDropdownVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownVisible]);

  return (
    <div className="user-info" ref={dropdownRef}>
      <span className="user-name" onClick={() => setDropdownVisible((prev) => !prev)}>
        <i class='bx bx-user' ></i>
      </span>
      {isDropdownVisible && (
        <div className="dropdown-menu">
          <div className="username-email-container">
            <p className='name-of-user'>John Doe</p>
            <p className='email'>sample@gmail.com</p>
          </div>
          <div className="dropdown-item" onClick={() => alert("Settings functionality not implemented yet.")}>
            Profile
          </div>
          <div className="dropdown-item" onClick={() => alert("Settings functionality not implemented yet.")}>
            Settings
          </div>
          <div className="dropdown-item" onClick={() => alert("Logout functionality not implemented yet.")}>
            Logout
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
