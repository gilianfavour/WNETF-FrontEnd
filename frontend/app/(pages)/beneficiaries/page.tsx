

'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './WNETFBanner.module.css';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface Beneficiary {
  id: number;
  name: string;
  course: string;
  university: string;
  year: string;
  district: string;
  photo: string | null;
  bio: string;
  is_graduate: boolean;
}

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
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  const [loadingBeneficiaries, setLoadingBeneficiaries] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/beneficiaries/`)
      .then(res => res.json())
      .then(data => setBeneficiaries(data.results || data))
      .catch(() => {/* silently fall through — grid stays empty */})
      .finally(() => setLoadingBeneficiaries(false));
  }, []);

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

      {/* Beneficiaries Showcase */}
      <div className={styles.beneficiariesSection} id="stories">
        <div className={styles.beneficiariesContainer}>
          <div className={styles.beneficiariesHeader}>
            <span className={styles.beneficiariesTag}>OUR SCHOLARS</span>
            <h2 className={styles.beneficiariesHeading}>Meet Our Beneficiaries</h2>
            <p className={styles.beneficiariesSubtitle}>
              These are the bright minds from West Nile whose futures WNETF is helping to build.
            </p>
          </div>
          <div className={styles.beneficiariesGrid}>
            {loadingBeneficiaries ? (
              <p style={{ color: '#64748b', gridColumn: '1/-1', textAlign: 'center' }}>Loading beneficiaries…</p>
            ) : beneficiaries.map((b, i) => (
              <div key={i} className={styles.beneficiaryCard}>
                <div className={styles.beneficiaryPhotoWrapper}>
                  <img
                    src={b.photo ? `${API_BASE}${b.photo}` : ''}
                    alt={b.name}
                    className={styles.beneficiaryPhoto}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '';
                      e.currentTarget.style.display = 'none';
                      const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  <div className={styles.beneficiaryPhotoFallback}>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className={styles.fallbackIcon}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className={styles.yearBadge}>{b.year}</div>
                </div>
                <div className={styles.beneficiaryInfo}>
                  <h3 className={styles.beneficiaryName}>{b.name}</h3>
                  <p className={styles.beneficiaryCourse}>{b.course}</p>
                  <p className={styles.beneficiaryUniversity}>{b.university}</p>
                  <div className={styles.beneficiaryDistrict}>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className={styles.districtIcon}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {b.district} District
                  </div>
                </div>
              </div>
            ))}
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
