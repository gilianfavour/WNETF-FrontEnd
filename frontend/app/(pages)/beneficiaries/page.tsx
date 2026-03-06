// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import styles from './WNETFBanner.module.css';

// function AnimatedNumber({ target }: { target: number }) {
//   const [count, setCount] = useState(0);
//   const [isVisible, setIsVisible] = useState(false);
//   const ref = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//         }
//       },
//       { threshold: 0.5 }
//     );

//     if (ref.current) {
//       observer.observe(ref.current);
//     }

//     return () => observer.disconnect();
//   }, []);

//   useEffect(() => {
//     if (!isVisible) return;

//     const duration = 2000; // 2 seconds
//     const steps = 60;
//     const increment = target / steps;
//     let current = 0;

//     const timer = setInterval(() => {
//       current += increment;
//       if (current >= target) {
//         setCount(target);
//         clearInterval(timer);
//       } else {
//         setCount(Math.floor(current));
//       }
//     }, duration / steps);

//     return () => clearInterval(timer);
//   }, [isVisible, target]);

//   return <div ref={ref} className={styles.statNumber}>{count}</div>;
// }

// export default function WNETFBanner() {
//   return (
//     <div className={styles.banner}>
//       {/* Background Image */}
//       <div className={styles.backgroundImage}>
//         <img
//           src="/beneficiaries/hero.png"
//           alt="WNETF Background"
//           className={styles.image}
//         />
//         {/* Overlay with brand color */}
//         <div className={styles.overlay}></div>
//       </div>

//       {/* Grid pattern overlay */}
//       <div className={styles.gridPattern}>
//         <div className={styles.gridLines}></div>
//       </div>

//       {/* Content */}
//       <div className={styles.content}>
//         {/* Main heading */}
//         <h1 className={styles.mainHeading}>
//           Building a Brighter Future
//         </h1>

//         {/* Subtitle */}
//         <p className={styles.subtitle}>
//           Supporting education and opportunity for every child in West Nile
//         </p>

//         {/* CTA buttons */}
//         <div className={styles.ctaContainer}>
//           <a href="#stories" className={styles.primaryButton}>
//             Learn More
//           </a>
//           <a href="/donate" className={styles.secondaryButton}>
//             Donate Now
//           </a>
//         </div>

//         {/* Stats row with animated numbers */}
//         <div className={styles.statsContainer}>
//           <div className={styles.statCard}>
//             <AnimatedNumber target={26} />
//             <div className={styles.statLabel}>Students Sponsored</div>
//           </div>
//           <div className={styles.statCard}>
//             <AnimatedNumber target={9} />
//             <div className={styles.statLabel}>Graduates</div>
//           </div>
//           <div className={styles.statCard}>
//             <AnimatedNumber target={6} />
//             <div className={styles.statLabel}>Universities</div>
//           </div>
//         </div>

//         {/* Scroll indicator */}
//         <div className={styles.scrollIndicator}>
//           <svg className={styles.scrollArrow} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
//           </svg>
//         </div>
//       </div>

//       {/* Bottom wave */}
//       <div className={styles.bottomWave}>
//         <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
//           <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
//         </svg>
//       </div>
//     </div>
//   );
// }

// .banner {
//   position: relative;
//   width: 100%;
//   overflow: hidden;
//   min-height: 600px;
//   display: flex;
//   align-items: center;
// }

// .backgroundImage {
//   position: absolute;
//   inset: 0;
// }

// .image {
//   width: 100%;
//   height: 100%;
//   background-size:contain;
//   /* object-fit: cover; */
// }

// .overlay {
//   position: absolute;
//   inset: 0;
//   background-color: #2596be;
//   opacity: 0.3;
// }

// .gridPattern {
//   position: absolute;
//   inset: 0;
//   opacity: 0.1;
// }

// .gridLines {
//   position: absolute;
//   inset: 0;
//   background-image:
//     linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
//     linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
//   background-size: 50px 50px;
// }

// .content {
//   position: relative;
//   z-index: 10;
//   width: 100%;
//   max-width: 1200px;
//   margin: 0 auto;
//   padding: 5rem 1.5rem;
//   text-align: center;
// }

// .mainHeading {
//   font-size: 2.5rem;
//   font-weight: 700;
//   color: white;
//   line-height: 1.2;
//   margin-bottom: 1.5rem;
// }

// @media (min-width: 768px) {
//   .mainHeading {
//     font-size: 4rem;
//   }
// }

// .subtitle {
//   font-size: 1.25rem;
//   color: white;
//   max-width: 768px;
//   margin: 0 auto 2.5rem;
//   line-height: 1.2;
// }

// @media (min-width: 768px) {
//   .subtitle {
//     font-size: 1.5rem;
//   }
// }

// .ctaContainer {
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: center;
//   gap: 1rem;
//   margin-bottom: 4rem;
// }

// .primaryButton {
//   display: inline-flex;
//   align-items: center;
//   gap: 0.5rem;
//   background-color: #2563eb;
//   color: white;
//   padding: 1rem 2.5rem;
//   border-radius: 0.5rem;
//   font-weight: 600;
//   font-size: 1.125rem;
//   box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
//   transition: all 0.3s;
//   text-decoration: none;
// }

// .primaryButton:hover {
//   background-color: #1d4ed8;
//   box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
// }

// .secondaryButton {
//   display: inline-flex;
//   align-items: center;
//   gap: 0.5rem;
//   background-color: white;
//   color: #1f2937;
//   padding: 1rem 2.5rem;
//   border-radius: 0.5rem;
//   font-weight: 600;
//   font-size: 1.125rem;
//   box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
//   transition: all 0.3s;
//   text-decoration: none;
// }

// .secondaryButton:hover {
//   background-color: #f3f4f6;
//   box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
// }

// .statsContainer {
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: center;
//   gap: 1.5rem;
//   margin-top: 5rem;
// }

// .statCard {
//   background-color: rgba(255, 255, 255, 0.15);
//   backdrop-filter: blur(12px);
//   border: 1px solid rgba(255, 255, 255, 0.2);
//   border-radius: 0.75rem;
//   padding: 1rem 2rem;
//   min-width: 140px;
// }

// .statNumber {
//   font-size: 2.5rem;
//   font-weight: 700;
//   color: white;
// }

// .statLabel {
//   color: white;
//   font-size: 0.875rem;
//   margin-top: 0.25rem;
//   opacity: 0.9;
// }

// .scrollIndicator {
//   margin-top: 3rem;
//   animation: bounce 1s infinite;
// }

// @keyframes bounce {
//   0%, 100% {
//     transform: translateY(-25%);
//     animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
//   }
//   50% {
//     transform: translateY(0);
//     animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
//   }
// }

// .scrollArrow {
//   width: 1.5rem;
//   height: 1.5rem;
//   margin: 0 auto;
//   color: rgba(255, 255, 255, 0.6);
// }

// .bottomWave {
//   position: absolute;
//   bottom: 0;
//   left: 0;
//   right: 0;
// }

'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './WNETFBanner.module.css';

function AnimatedNumber({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, target]);

  return (
    <div ref={ref} className={styles.statNumber}>
      {count}
    </div>
  );
}

export default function WNETFBanner() {
  return (
    <>
      {/* Hero Section */}
      <div className={styles.banner}>
        {/* Background Image */}
        <div className={styles.backgroundImage}>
          {/* <img src="/beneficiaries/hero.png" alt="WNETF Background" className={styles.image} /> */}
             <img
          src="/applications/app_hero.jpg"
          alt="WNETF Background"
          className={styles.heroImage}
        />
          {/* Overlay with brand color */}
          <div className={styles.overlay}></div>
        </div>

        {/* Grid pattern overlay */}
        <div className={styles.gridPattern}>
          <div className={styles.gridLines}></div>
        </div>

        {/* Content */}
        <div className={styles.content}>
          {/* Main heading */}
          <h1 className={styles.mainHeading}>Building a Brighter Future</h1>

          {/* Subtitle */}
          <p className={styles.subtitle}>Supporting education and opportunity for every child in West Nile</p>

          {/* CTA buttons */}
          <div className={styles.ctaContainer}>
            <a href="#stories" className={styles.primaryButton}>
              Learn More
            </a>
            <a href="/donate" className={styles.secondaryButton}>
              Donate Now
            </a>
          </div>

          {/* Scroll indicator */}
          <div className={styles.scrollIndicator}>
            <svg className={styles.scrollArrow} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>

        {/* Bottom wave */}
        <div className={styles.bottomWave}>
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="white"
            />
          </svg>
        </div>
      </div>

      {/* Stats Section */}
      <div className={styles.statsSection}>
        <div className={styles.statsContainer}>
          <div className={styles.statCard}>
            <AnimatedNumber target={26} />
            <div className={styles.statLabel}>Students Sponsored</div>
          </div>
          <div className={styles.statCard}>
            <AnimatedNumber target={9} />
            <div className={styles.statLabel}>Graduates</div>
          </div>
          <div className={styles.statCard}>
            <AnimatedNumber target={6} />
            <div className={styles.statLabel}>Universities</div>
          </div>
        </div>
      </div>

      {/* Foundation Impact Section */}
      <div className={styles.impactSection}>
        <div className={styles.impactContainer}>
          <div className={styles.impactGrid}>
            {/* Card 1 - Mission */}
            <div className={styles.impactCard}>
              <div className={styles.iconCircle}>
                <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className={styles.impactTitle}>Our Mission</h3>
              <p className={styles.impactText}>
                Supporting deserving West Nile students to pursue professional university education
              </p>
            </div>

            {/* Card 2 - Impact */}
            <div className={styles.impactCard}>
              <div className={styles.iconCircle}>
                <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
              <h3 className={styles.impactTitle}>Full Scholarships</h3>
              <p className={styles.impactText}>
                Complete tuition coverage in Medicine, Engineering, Nursing & Pharmacy
              </p>
            </div>

            {/* Card 3 - Community */}
            <div className={styles.impactCard}>
              <div className={styles.iconCircle}>
                <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className={styles.impactTitle}>Community Powered</h3>
              <p className={styles.impactText}>
                Funded by West Nile Night, fundraising dinners & generous well-wishers
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 60 Million Challenge Section */}
      <div className={styles.challengeSection}>
        {/* Background Image */}
        <div className={styles.challengeBackground}>
          <img src="/beneficiaries/dinner.jpg" alt="Challenge Background" className={styles.challengeImage} />
          {/* Blue overlay */}
          <div className={styles.challengeOverlay}></div>
        </div>

        {/* Grid pattern overlay */}
        <div className={styles.challengeGridPattern}>
          <div className={styles.challengeGridLines}></div>
        </div>

        <div className={styles.challengeContent}>
          <div className={styles.challengeLeft}>
            <div className={styles.challengeTag}>STAND UP AND BE COUNTED</div>

            <h2 className={styles.challengeHeading}>
              The <span className={styles.highlightText}>60 days, 60 million</span> challenge
            </h2>

            <button className={styles.challengeButton}>CLICK HERE</button>
          </div>

          <div className={styles.challengeRight}>
            <p className={styles.challengeDescription}>
              Be part of the 30 distinguished volunteers and commit at least 2 million shillings in the next 2 months
              towards the <span className={styles.linkText}>West Nile Education Trust Fund</span>. Your support will go
              towards covering tuition fees for a needy and yet exceptional students pursue their dream professional
              courses.
            </p>

            <p className={styles.challengeReward}>
              Distinguished volunteers will be awarded a 2-star medal during the annual fund in November 2023.
            </p>
          </div>
        </div>
      </div>

      {/* West Nile Night Section */}
      <div className={styles.nightSection}>
        <img
          src="/beneficiaries/banner-wnn.png"
          alt="West Nile Night - Every Last Friday of the Month"
          className={styles.nightImage}
        />
      </div>
    </>
  );
}
