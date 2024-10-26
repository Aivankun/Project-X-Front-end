import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../style/RegisterPage.module.css'; // Import CSS module
import googleicon from '../assets/icon-google.png';
function Register() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    // Handle registration logic here (e.g., API call)
    console.log('Registering user...');
    navigate('/login'); // Redirect to login after successful registration
  };

  return (
    <div className={styles.registerSection}>
      <form onSubmit={handleSubmit} className={styles.registerContainer}>
        <h2>REGISTER</h2>
        <button className={styles.googleButton}>
          <img src={googleicon} alt="" className={styles.googleicon} />
          Sign-Up With Google</button>
        <p>or</p>
          <div className={styles.inputGroup}>
            <label htmlFor="name">
              Full Name <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="John Doe"
              className={styles.inputField}
              required
            />
          </div>

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
              required
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
              required
            />
          </div>

          <button type="submit" className={styles.registerButton}>Register</button>

        <p>
          Already have an account?{' '}
          <button className={styles.linkButton} onClick={() => navigate('/login')}>
            Log in here.
          </button>
        </p>
      </form>
    </div>
  );
}

export default Register;
