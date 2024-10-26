import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import styles from '../style/LoginPage.module.css'; // Import CSS module
import googleicon from '../assets/icon-google.png';
function Login() {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleRegisterRedirect = () => {
    navigate('/register'); // Use navigate to redirect to the register page
  };

  const handleForgotPassword = () => {
    // Add your forgot password logic here, e.g., redirecting to a reset password page
    console.log('Forgot Password clicked'); // Placeholder action
  };

  return (
    <div className={styles.loginSection}> 
      <form className={styles.loginContainer}>
        <h2>LOGIN</h2>
        <button className={styles.googleButton}>
          <img src={googleicon} alt="" className={styles.googleicon} />
          Continue With Google</button>
        <p>or</p>
        
        <div className={styles.inputGroup}>
          <label htmlFor="email">
            Email <span className={styles.required}>*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="sample@gmail.com"
            className={styles.inputField}
          />
        </div>
        
        <div className={styles.inputGroup}>
          <label htmlFor="password">
            Password <span className={styles.required}>*</span>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="********"
            className={styles.inputField}
          />
        </div>
        
        <div className={styles.forgotPassword}>
          <div className={styles.remember}>
            <input type="checkbox" name="remember" id="remember" />
            <label htmlFor="remember">Remember Me</label>
          </div>
          
          <button className={styles.linkButton} onClick={handleForgotPassword}>
            Forgot Password?
          </button>
        </div>
        
        <button className={styles.loginButton}>Login</button>
        
        <p>
          Don't have an account?{' '}
          <button className={styles.linkButton} onClick={handleRegisterRedirect}>
            Create an account.
          </button>
        </p>
      </form>
    </div>
  );
}

export default Login;
