"use client";
import { useState } from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Contact() {
  const primaryColor = "#ffffff";
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Message sent!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col items-center px-4 py-10">
      
      {/* Page Heading */}
      <motion.h1
        className="text-4xl font-bold mb-10 text-center text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Contact Me
      </motion.h1>

      {/* Form and Info Section */}
      <div className="flex flex-col md:flex-row w-full max-w-6xl gap-10">

        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="flex-1 bg-gray-800 p-6 rounded-xl shadow-lg"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-6 text-white">Send a Message</h2>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="w-full mb-4 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2"
            style={{ borderColor: primaryColor }}
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="w-full mb-4 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2"
            style={{ borderColor: primaryColor }}
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message"
            required
            className="w-full mb-4 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 h-36 resize-none"
            style={{ borderColor: primaryColor }}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 transition-colors text-white px-4 py-3 rounded-lg font-semibold"
          >
            Send Message
          </button>
        </motion.form>

        {/* Contact Info */}
        <motion.div
          className="flex-1 bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col gap-4"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-6 text-white">Contact Info</h2>

          <div className="flex items-center gap-3">
            <FaMapMarkerAlt style={{ color: primaryColor }} />
            <span>West Nile Region, Uganda</span>
          </div>
          <div className="flex items-center gap-3">
            <FaEnvelope style={{ color: primaryColor }} />
            <span>info@wnetf.org</span>
          </div>
          <div className="flex items-center gap-3">
            <FaPhone style={{ color: primaryColor }} />
            <span>+256 700 000000</span>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 mt-6">
            {[FaFacebook, FaTwitter, FaLinkedin].map((Icon, index) => (
              <a
                key={index}
                href="#"
                className="p-3 rounded-lg text-white hover:scale-110 transition-transform"
                style={{ backgroundColor: primaryColor }}
              >
                <Icon />
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Google Map */}
      <motion.div
        className="w-full h-80 md:h-96 mt-10 rounded-xl overflow-hidden shadow-lg max-w-6xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <iframe
          title="WNETF Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.0123456789!2d31.222222!3d2.555555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177db23456789%3A0x123456789abcdef!2sWest%20Nile%2C%20Uganda!5e0!3m2!1sen!2sus!4v1699999999999!5m2!1sen!2sus"
          className="w-full h-full border-0"
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </motion.div>
    </div>
  );
}
