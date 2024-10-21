import React from 'react';
import styles from '../style/LandingPage.module.css';

function ProjectCard({ imageSrc, title, description, category }) {
  return (
    <div className={styles.projectCard}>
      <img src={imageSrc} alt={title} className={styles.projectImage} />
      <div className={styles.projectInfo}>
        <h3 className={styles.projectTitle}>{title}</h3>
        <p className={styles.projectDescription}>{description}</p>
        <p className={styles.projectCategory}>{category}</p>
      </div>
    </div>
  );
}

function ProjectsSection() {
  const projects = [
    { imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/bace3ed12fbb15affc07aabb37f3501d4fdacdf9102e5fc1756a98f4da978cce?placeholderIfAbsent=true&apiKey=99befba2389e4532b93f471d4e4e6b0c", title: "Project Title", description: "Short Description", category: "Category" },
    { imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/bace3ed12fbb15affc07aabb37f3501d4fdacdf9102e5fc1756a98f4da978cce?placeholderIfAbsent=true&apiKey=99befba2389e4532b93f471d4e4e6b0c", title: "Project Title", description: "Short Description", category: "Category" },
    { imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/bace3ed12fbb15affc07aabb37f3501d4fdacdf9102e5fc1756a98f4da978cce?placeholderIfAbsent=true&apiKey=99befba2389e4532b93f471d4e4e6b0c", title: "Project Title", description: "Short Description", category: "Category" }
  ];

  return (
    <section className={styles.projectsSection}>
      <h2 className={styles.sectionTitle}>Discover our latest work</h2>
      <p className={styles.sectionDescription}>
        Explore our portfolio and see the latest and greatest projects that we've brought to life.
      </p>
      <div className={styles.projectCards}>
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </section>
  );
}

export default ProjectsSection;