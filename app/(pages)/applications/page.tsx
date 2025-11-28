// 'use client';

// import React, { useState } from 'react';
// import styles from './applications.module.css';

// export default function ApplicationsPage() {
//   // State: attachment starts as null, TS happy
//   const [formData, setFormData] = useState<{
//     fullName: string;
//     dob: string;
//     email: string;
//     phone: string;
//     program: string;
//     address: string;
//     guardianName: string;
//     schoolName: string;
//     grades: string;
//     attachment: File | null;
//   }>({
//     fullName: '',
//     dob: '',
//     email: '',
//     phone: '',
//     program: '',
//     address: '',
//     guardianName: '',
//     schoolName: '',
//     grades: '',
//     attachment: null,
//   });

//   const [submitted, setSubmitted] = useState(false);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

// const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   const files = e.target.files;
//   if (files && files.length > 0) {
//     setFormData(prev => ({ ...prev, attachment: files[0] }));
//   }
// }

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!formData.attachment) {
//       alert('Please upload a required document before submitting.');
//       return;
//     }

//     console.log('Application submitted:', formData);
//     setSubmitted(true);

//     // TODO: send formData to backend API
//   };

//   if (submitted) {
//     return (
//       <div className={styles.success}>
//         <h2 className="text-2xl font-bold">Thank you for applying!</h2>
//         <p>We will review your application and contact you soon.</p>
//       </div>
//     );
//   }

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.heading}>Scholarship / Beneficiary Application</h1>
//       <form onSubmit={handleSubmit} className={styles.form}>
//         <input
//           type="text"
//           name="fullName"
//           placeholder="Full Name"
//           value={formData.fullName}
//           onChange={handleChange}
//           required
//           className={styles.input}
//         />
//         <input
//           type="date"
//           name="dob"
//           value={formData.dob}
//           onChange={handleChange}
//           required
//           className={styles.input}
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//           className={styles.input}
//         />
//         <input
//           type="tel"
//           name="phone"
//           placeholder="Phone Number"
//           value={formData.phone}
//           onChange={handleChange}
//           required
//           className={styles.input}
//         />
//         <select
//           name="program"
//           value={formData.program}
//           onChange={handleChange}
//           required
//           className={styles.select}
//         >
//           <option value="">Select Program</option>
//           <option value="scholarship">Scholarship Program</option>
//           <option value="teacher-training">Teacher Training</option>
//           <option value="school-infra">School Infrastructure</option>
//         </select>
//         <input
//           type="text"
//           name="address"
//           placeholder="Residential Address"
//           value={formData.address}
//           onChange={handleChange}
//           required
//           className={styles.input}
//         />
//         <input
//           type="text"
//           name="guardianName"
//           placeholder="Parent / Guardian Name"
//           value={formData.guardianName}
//           onChange={handleChange}
//           required
//           className={styles.input}
//         />
//         <input
//           type="text"
//           name="schoolName"
//           placeholder="School Name"
//           value={formData.schoolName}
//           onChange={handleChange}
//           required
//           className={styles.input}
//         />
//         <textarea
//           name="grades"
//           placeholder="Grades / Academic Achievements"
//           value={formData.grades}
//           onChange={handleChange}
//           required
//           className={styles.textarea}
//         />
//         <input
//           type="file"
//           name="attachment"
//           onChange={handleFileChange}
//           required
//           className={styles.fileInput}
//         />
//         <button type="submit" className={styles.button}>
//           Submit Application
//         </button>
//       </form>
//     </div>
//   );
// }









// 'use client';

// import React, { useState } from 'react';
// import styles from './applications.module.css';

// const westNileDistricts = [
//   'Adjumani',
//   'Arua',
//   'Madi-Okollo',
//   'Maracha',
//   'Moyo',
//   'Nebbi',
//   'Terego',
//   'Yumbe',
//   'Zombo',
// ];

// export default function ApplicationsPage() {
//   const [formData, setFormData] = useState<{
//     fullName: string;
//     dob: string;
//     email: string;
//     phone: string;
//     course: string;
//     university: string;
//     district: string;
//     otherDistrict: string;
//     guardianName: string;
//     address: string;
//     grades: string;
//     attachment: File | null;
//   }>({
//     fullName: '',
//     dob: '',
//     email: '',
//     phone: '',
//     course: '',
//     university: '',
//     district: '',
//     otherDistrict: '',
//     guardianName: '',
//     address: '',
//     grades: '',
//     attachment: null,
//   });

//   const [submitted, setSubmitted] = useState(false);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (files && files.length > 0) {
//       setFormData(prev => ({ ...prev, attachment: files[0] }));
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!formData.attachment) {
//       alert('Please upload a required document before submitting.');
//       return;
//     }
//     console.log('Application submitted:', formData);
//     setSubmitted(true);
//     // TODO: send formData to backend API
//   };

//   if (submitted) {
//     return (
//       <div className={styles.success}>
//         <h2>Thank you for applying!</h2>
//         <p>We will review your application and contact you soon.</p>
//       </div>
//     );
//   }

//   return (
//     <div className={styles.container}>
//       {/* ================= HERO SECTION ================= */}
//       <section className={styles.hero}>
//         <img
//           src="/beneficiaries/hero.png"
//           alt="WNETF Background"
//           className={styles.heroImage}
//         />
//         <div className={styles.heroOverlay}>
//           <h1>Apply for the WNETF Scholarship</h1>
//           <p>
//             WNETF supports deserving students of West Nile origin to pursue University education
//             in professional courses like Medicine, Pharmacy, Nursing, and Engineering.
//             <br />
//             Fill out the application form below and upload your documents.
//           </p>
//         </div>
//       </section>

//       {/* ================= APPLICATION FORM ================= */}
//       <form onSubmit={handleSubmit} className={styles.formCard}>
//         <input
//           type="text"
//           name="fullName"
//           placeholder="Full Name"
//           value={formData.fullName}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="date"
//           name="dob"
//           value={formData.dob}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="tel"
//           name="phone"
//           placeholder="Phone Number"
//           value={formData.phone}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="text"
//           name="course"
//           placeholder="Course Applying For (e.g., Bachelor of Medicine)"
//           value={formData.course}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="text"
//           name="university"
//           placeholder="University"
//           value={formData.university}
//           onChange={handleChange}
//           required
//         />

//         {/* ================= DISTRICT SELECT ================= */}
//         <select
//           name="district"
//           value={formData.district}
//           onChange={handleChange}
//           required
//         >
//           <option value="">Select your district</option>
//           {westNileDistricts.map(d => (
//             <option key={d} value={d}>
//               {d}
//             </option>
//           ))}
//           <option value="Other">Other</option>
//         </select>

//         {/* Show text input if "Other" is selected */}
//         {formData.district === 'Other' && (
//           <input
//             type="text"
//             name="otherDistrict"
//             placeholder="Specify your district"
//             value={formData.otherDistrict}
//             onChange={handleChange}
//             required
//           />
//         )}

//         <input
//           type="text"
//           name="guardianName"
//           placeholder="Parent / Guardian Name"
//           value={formData.guardianName}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="text"
//           name="address"
//           placeholder="Residential Address"
//           value={formData.address}
//           onChange={handleChange}
//           required
//         />

//         <textarea
//           name="grades"
//           placeholder="Grades / Academic Achievements"
//           value={formData.grades}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="file"
//           name="attachment"
//           onChange={handleFileChange}
//           required
//         />

//         <button type="submit">Submit Application</button>
//       </form>
//     </div>
//   );
// }











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
    district: string;
    otherDistrict: string;
    guardianName: string;
    address: string;
    grades: string;
    attachment: File | null;
  }>({
    fullName: '',
    dob: '',
    email: '',
    phone: '',
    course: '',
    university: '',
    district: '',
    otherDistrict: '',
    guardianName: '',
    address: '',
    grades: '',
    attachment: null,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFormData(prev => ({ ...prev, attachment: files[0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.attachment) {
      alert('Please upload a required document before submitting.');
      return;
    }
    console.log('Application submitted:', formData);
    setSubmitted(true);
    // TODO: send formData to backend API
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

          <button type="submit" className={styles.submitBtn}>
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}