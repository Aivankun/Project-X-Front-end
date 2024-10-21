import React from 'react';

const UserInfo = ({ isDropdownVisible, setDropdownVisible }) => {
  return (
    <div
      className="user-info"
      onMouseEnter={() => setDropdownVisible(true)}
      onMouseLeave={() => setDropdownVisible(false)}
    >
      <span className="user-name" onClick={() => setDropdownVisible((prev) => !prev)}>User Name</span>
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
