import React from 'react';
import '../style/EvaluatorResult.css'; // Import a CSS file for styling if needed

const EvaluatorResult = () => {
  return (
    <div className="evaluator-result-container">
      <h2>OVERALL SCORE: 8.1/10</h2>

      <h3>RESUME STRENGTH:</h3>
      <p>
        I can see you've built a solid foundation here. Your academic
        background pairs nicely with your internship experience, showing both
        theoretical knowledge and practical application. The digital skills and
        certifications you've included are particularly relevant in today's
        market. What stands out is your balanced approach - you've shown
        technical capabilities while also highlighting soft skills through
        leadership roles and volunteer work. This kind of well-rounded profile
        is exactly what many employers are looking for in entry-level
        candidates.
      </p>

      <h3>AREAS FOR IMPROVEMENT:</h3>
      <p>
        Let's make your resume even stronger with a few quick adjustments.
        Right now, you're telling me what you did, but not how well you did it
        - adding specific numbers and results would make your achievements
        more impactful. For instance, mention the size of projects you managed
        or the percentage improvements you achieved. Also, your technical skills
        section could use some updating with more current tools that employers
        are specifically asking for. These are small changes that could make a
        big difference in how your resume performs.
      </p>
    </div>
  );
};

export default EvaluatorResult;