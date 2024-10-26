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
        User Name
      </span>
      {isDropdownVisible && (
        <div className="dropdown-menu">
          <div className="dropdown-item" onClick={() => alert("Settings functionality not implemented yet.")}>
            <i className="bx bx-cog"></i>Settings
          </div>
          <div className="dropdown-item" onClick={() => alert("Logout functionality not implemented yet.")}>
            <i className="bx bx-log-out"></i>Logout
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
