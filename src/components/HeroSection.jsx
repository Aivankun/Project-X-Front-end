import React from 'react';
import styles from '../style/LandingPage.module.css';
import HeroImg from '../assets/hero-img.png';

function HeroSection() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContent}>
        <div className={styles.heroHeader}>
          <h1 className={styles.heroTitle}>The Newest AI Interview Helper</h1>
          <p className={styles.heroDescription}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio et nesciunt nemo ratione exercitationem cum, dolorem nisi voluptatibus eligendi quas consequatur! Sapiente doloreur enim, tempora beatae eaque! Pariatur, labore!s aspernat
          </p>
          <div className={styles.heroCTAs}>
            <button className={styles.primaryButton}>
              <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/6c89dca7ba20915d45c8fea0b8bc2dfb72db02a7dadeacee3e3d06ed8193642f?placeholderIfAbsent=true&apiKey=99befba2389e4532b93f471d4e4e6b0c" alt="" className={styles.buttonIcon} />
              <span className={styles.buttonLabel}>Get Started</span>
            </button>
            <button className={styles.secondaryButton}>How it works</button>
          </div>
        </div>
        <img src={HeroImg} alt="Hero illustration" className={styles.heroImage} />
      </div>
    </section>
  );
}

export default HeroSection;