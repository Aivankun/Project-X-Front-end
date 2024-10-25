import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import styles from '../style/LandingPage.module.css';
import logo from '../assets/logo.png';
function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img
          src={logo}
          alt="Company Logo"
          className={styles.logoImage}
        />
      </div>
      <div className={styles.navigationMenu}>
        <Link to="/login"> {/* Use Link to navigate to Login component */}
          <button className={styles.secondaryButton}>Login</button>
        </Link>
        <button className={styles.primaryButton}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c0e2b6ab9510cc33080d35cf1a0addfc16fe6b011c1170ca547ccbbc845e4da1?placeholderIfAbsent=true&apiKey=99befba2389e4532b93f471d4e4e6b0c"
            alt=""
            className={styles.buttonIcon}
          />
          <span className={styles.buttonLabel}>Get Started</span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
