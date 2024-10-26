import React from 'react';
import styles from '../style/LandingPage.module.css';
import FeatureImg from '../assets/section-img.png';

function FeatureCard({ iconSrc, title }) {
  return (
    <div className={styles.featureCard}>
      <div className={styles.featureIcon}>
        <img src={iconSrc} alt="" className={styles.featureIconImage} />
      </div>
      <div className={styles.featureText}>{title}</div>
    </div>
  );
}

function FeaturesSection() {
  const features = [
    { iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/42e123c2d8991d8bb9e7da296727754e90ed71b8f16450edc3f0ddc5879b4a91?placeholderIfAbsent=true&apiKey=99befba2389e4532b93f471d4e4e6b0c", title: "Fast building" },
    { iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/0b99101d9d1d06d362ec2b2fd0d76271d40762e54d1e639eb733ba0b589bc984?placeholderIfAbsent=true&apiKey=99befba2389e4532b93f471d4e4e6b0c", title: "Easy to edit" },
    { iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/20c84bf1a3115a62cd21a684e6e0e29cbe9cf242a56ad9dc57f712f66dfbd5f0?placeholderIfAbsent=true&apiKey=99befba2389e4532b93f471d4e4e6b0c", title: "Responsiveness" },
    { iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/3de2cbb2b1da6742f80c3be57afaa3a5e7b0e28bac649be31539537cf344a370?placeholderIfAbsent=true&apiKey=99befba2389e4532b93f471d4e4e6b0c", title: "No code needed" }
  ];

  return (
    <section className={styles.featuresSection}>
      <img src={FeatureImg} alt="Features illustration" className={styles.featuresImage} />
      <div className={styles.featuresContent}>
        <h2 className={styles.featuresTitle}>Our features</h2>
        <p className={styles.featuresDescription}>
          commodi eius deleniti perspiciatis pariatur. Perferendis deserunt velit cum, officia totam ipsum soluta eveniet. Aliquam!
        </p>
        <div className={styles.featureCards}>
          {features.map((feature, index) => (
            <FeatureCard key={index} iconSrc={feature.iconSrc} title={feature.title} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;