import React from 'react';
import styles from '../style/LandingPage.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerAbout}>
          <h3>About Us</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus corrupti consequatur dignissimos maxime earum ullam numquam unde ut laboriosam voluptate nesciunt non nostrum obcaecati cumque error, fugiat deserunt, praesentium eaque.
          </p>
        </div>
        <div className={styles.footerLinks}>
          <h3>Quick Links</h3>
          <ul>
          <li><a href="/home">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/contact">Contact</a></li>

          </ul>
        </div>
        <div className={styles.footerContact}>
          <h3>Contact Us</h3>
          <p>Email: support@anima.com</p>
          <p>Phone: +1 (555) 123-4567</p>
        </div>
        <div className={styles.footerSocial}>
          <h3>Follow Us</h3>
          <div className={styles.socialLinks}>
            <a href="/fb" aria-label="Facebook"><img src="https://cdn.builder.io/api/v1/image/assets/TEMP/d22bb3ee427cf33cb5c12c05e2e9f30dc44924dc870b47b29659f19e1127f60e?placeholderIfAbsent=true&apiKey=99befba2389e4532b93f471d4e4e6b0c" alt="Facebook" className={styles.socialIcon} /></a>
            <a href="/twitter" aria-label="Twitter"><img src="https://cdn.builder.io/api/v1/image/assets/TEMP/6796db4585f819c13c64fd8461e6b1774336175770aa6fb738a62e66c77c1672?placeholderIfAbsent=true&apiKey=99befba2389e4532b93f471d4e4e6b0c" alt="Twitter" className={styles.socialIcon} /></a>
            <a href="/instagram" aria-label="Instagram"><img src="https://cdn.builder.io/api/v1/image/assets/TEMP/07afa3d89074dad4a3b5a88769071f21fee1329597f9e7f8693ce905a40d8ae9?placeholderIfAbsent=true&apiKey=99befba2389e4532b93f471d4e4e6b0c" alt="Instagram" className={styles.socialIcon} /></a>
            <a href="/linkedin" aria-label="LinkedIn"><img src="https://cdn.builder.io/api/v1/image/assets/TEMP/315b03fd364e9ae8b7d9a7ae3b5dc2766e5e8bd7e93fcaf927ad95c18cf1cf2e?placeholderIfAbsent=true&apiKey=99befba2389e4532b93f471d4e4e6b0c" alt="LinkedIn" className={styles.socialIcon} /></a>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>© 2024 Aivan-Kun. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
