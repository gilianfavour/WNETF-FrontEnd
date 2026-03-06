'use client';

import React, { useState } from 'react';
import styles from './applications.module.css';

const westNileDistricts = [
  'Adjumani',
  'Arua',
  'Madi-Okollo',
  'Maracha',
  'Moyo',
  'Nebbi',
  'Terego',
  'Yumbe',
  'Zombo',
];

export default function ApplicationsPage() {
  const [formData, setFormData] = useState<{
    fullName: string;
    dob: string;
    email: string;
    phone: string;
    course: string;
    university: string;
    universityRegNumber: string;
    universityEmail: string;
    studentNumber: string;
    district: string;
    otherDistrict: string;
    guardianName: string;
    address: string;
    grades: string;
    personalStatement: string;
    attachment: File | null;
  }>({
    fullName: '',
    dob: '',
    email: '',
    phone: '',
    course: '',
    university: '',
    universityRegNumber: '',
    universityEmail: '',
    studentNumber: '',
    district: '',
    otherDistrict: '',
    guardianName: '',
    address: '',
    grades: '',
    personalStatement: '',
    attachment: null,
  });

  const [submitted, setSubmitted] = useState(false);

  const wordCount = formData.personalStatement.trim()
    ? formData.personalStatement.trim().split(/\s+/).length
    : 0;
  const WORD_LIMIT = 250;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'personalStatement') {
      const words = value.trim() ? value.trim().split(/\s+/).length : 0;
      if (words > WORD_LIMIT) return;
    }
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFormData(prev => ({ ...prev, attachment: files[0] }));
    }
  };

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.attachment) {
      alert('Please upload a required document before submitting.');
      return;
    }
    setSubmitting(true);
    setSubmitError('');
    try {
      const body = new FormData();
      (Object.keys(formData) as Array<keyof typeof formData>).forEach(key => {
        const val = formData[key];
        if (val !== null) body.append(key, val as string | Blob);
      });
      const res = await fetch(`${API_BASE}/api/applications/submit/`, {
        method: 'POST',
        body,
      });
      if (!res.ok) {
        const err = await res.json();
        setSubmitError(JSON.stringify(err));
      } else {
        setSubmitted(true);
      }
    } catch {
      setSubmitError('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.success}>
          <div className={styles.successIcon}>✓</div>
          <h2>Application Submitted Successfully!</h2>
          <p>Thank you for applying to the WNETF Scholarship program.</p>
          <p className={styles.successSubtext}>
            We will review your application and contact you via email within 2-3 weeks.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      {/* ================= HERO SECTION ================= */}
      <section className={styles.hero}>
        <img
          src="/applications/app_hero.jpg"
          alt="WNETF Background"
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay}>
          <div className={styles.heroContent}>
            <h1>WNETF Scholarship Application</h1>
            <p>
              Empowering the next generation of professionals from West Nile through education.
            </p>
            <div className={styles.heroStats}>
              <div className={styles.stat}>
                <strong>500+</strong>
                <span>Students Supported</span>
              </div>
              <div className={styles.stat}>
                <strong>10+</strong>
                <span>Years of Impact</span>
              </div>
              <div className={styles.stat}>
                <strong>9</strong>
                <span>Districts Served</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= APPLICATION FORM ================= */}
      <div className={styles.container}>
        <div className={styles.formIntro}>
          <h2>Apply Now</h2>
          {/* <p>
            Complete the application form below. We support students pursuing Medicine, Pharmacy, 
            Nursing, Engineering, and other professional courses at accredited universities.
          </p> */}
        </div>

        <form onSubmit={handleSubmit} className={styles.formCard}>
          <div className={styles.formSection}>
            <h3>Personal Information</h3>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="fullName">Full Name *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="dob">Date of Birth *</label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="+256 700 000 000"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className={styles.formSection}>
            <h3>Academic Information</h3>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="course">Course *</label>
                <input
                  type="text"
                  id="course"
                  name="course"
                  placeholder="e.g., Bachelor of Medicine and Surgery"
                  value={formData.course}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="university">University *</label>
                <input
                  type="text"
                  id="university"
                  name="university"
                  placeholder="e.g., Makerere University"
                  value={formData.university}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="universityRegNumber">University Registration Number *</label>
                <input
                  type="text"
                  id="universityRegNumber"
                  name="universityRegNumber"
                  placeholder="e.g., 24/U/1234"
                  value={formData.universityRegNumber}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="studentNumber">Student Number *</label>
                <input
                  type="text"
                  id="studentNumber"
                  name="studentNumber"
                  placeholder="e.g., 2400123456"
                  value={formData.studentNumber}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="universityEmail">University Email *</label>
                <input
                  type="email"
                  id="universityEmail"
                  name="universityEmail"
                  placeholder="e.g., s24.1234@students.mak.ac.ug"
                  value={formData.universityEmail}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="grades">Academic Achievements *</label>
              <textarea
                id="grades"
                name="grades"
                placeholder="Describe your grades, awards, and academic achievements..."
                value={formData.grades}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.formSection}>
            <h3>Location & Guardian Information</h3>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="district">District of Origin *</label>
                <select
                  id="district"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select your district</option>
                  {westNileDistricts.map(d => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                  <option value="Other">Other</option>
                </select>
              </div>

              {formData.district === 'Other' && (
                <div className={styles.formGroup}>
                  <label htmlFor="otherDistrict">Specify District *</label>
                  <input
                    type="text"
                    id="otherDistrict"
                    name="otherDistrict"
                    placeholder="Enter your district"
                    value={formData.otherDistrict}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="guardianName">Parent/Guardian Name *</label>
                <input
                  type="text"
                  id="guardianName"
                  name="guardianName"
                  placeholder="Full name of parent or guardian"
                  value={formData.guardianName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="address">Residential Address *</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Village, Parish, Sub-county"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className={styles.formSection}>
            <h3>Personal Statement</h3>
            <div className={styles.formGroup}>
              <label htmlFor="personalStatement">
                Why do you need this scholarship? * <span className={styles.wordLimitHint}>(max 250 words)</span>
              </label>
              <textarea
                id="personalStatement"
                name="personalStatement"
                placeholder="In 250 words or fewer, tell us about your background, financial circumstances, and why you believe you deserve this scholarship..."
                value={formData.personalStatement}
                onChange={handleChange}
                rows={8}
                required
              />
              <p className={`${styles.wordCounter} ${wordCount >= WORD_LIMIT ? styles.wordCounterLimit : ''}`}>
                {wordCount} / {WORD_LIMIT} words
              </p>
            </div>
          </div>

          <div className={styles.formSection}>
            <h3>Supporting Documents</h3>
            <div className={styles.formGroup}>
              <label htmlFor="attachment">Upload Documents *</label>
              <div className={styles.fileInputWrapper}>
                <input
                  type="file"
                  id="attachment"
                  name="attachment"
                  onChange={handleFileChange}
                  required
                />
                <p className={styles.fileHint}>
                  Upload academic transcripts, admission letter, or other supporting documents (PDF, JPG, PNG - Max 5MB)
                </p>
              </div>
            </div>
          </div>

          {submitError && (
            <p style={{ color: '#dc2626', marginBottom: '1rem', fontSize: '0.9rem' }}>
              {submitError}
            </p>
          )}

          <button type="submit" className={styles.submitBtn} disabled={submitting}>
            {submitting ? 'Submitting…' : 'Submit Application'}
          </button>
        </form>
      </div>
    </div>
  );
}