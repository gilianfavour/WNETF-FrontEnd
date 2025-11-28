"use client";

import React, { useState } from "react";
import Image from "next/image";

const FONT_COLOR = "#0000";
const PRIMARY_COLOR = "#032B53";
const LIGHT_BACKGROUND = "#EAEAEA";

export default function WhatWeDo() {
  const [flipped, setFlipped] = useState<number | null>(null);

  const cards = [
    {
      title: "Enhancing Mind Set Change",
      image: "/images/EducationAdvocacy.jpg",
      short:
        "Boosting community awareness and promoting educational advocacy to create positive mindset shifts.",
      full: `This initiative strengthens community awareness and education advocacy. It fosters deeper understanding of the significance of education, promotes mindset transformation, and supports the creation of conducive home learning environments.`,
    },
    {
      title: "Leadership Development",
      image: "/images/leadership.jpg",
      short:
        "Strengthening leadership that can champion and advance educational progress in West Nile.",
      full: `Grassroots leadership gaps hinder progress. WNETF aims to eliminate this obstacle to ensure all children—especially marginalized ones—can actively participate and achieve meaningful learning outcomes.`,
    },
    {
      title: "Data Information Management",
      image: "/images/dataCommunication.jpg",
      short:
        "Generating accurate educational data to support planning, policy advocacy, and decision-making.",
      full: `There is a shortage of reliable data on educational achievements. WNETF will focus on generating accurate data to guide planning, policy formulation, and advocacy for educational improvements.`,
    },
    {
      title: "Strategic Communication",
      image: "/images/communication.jpg",
      short:
        "Creating visibility and awareness by showcasing learning gaps and areas needing urgent action.",
      full: `By generating and sharing essential educational data, WNETF will spotlight disparities in learning outcomes and draw attention to disadvantaged learners for government and leadership intervention.`,
    },
    {
      title: "Policy Advocacy and Lobbying",
      image: "/images/PolicyAdvocacy.jpg",
      short:
        "Advocating for equitable educational policies and consistent implementation across regions.",
      full: `WNETF will collaborate with policymakers to advocate for improved learning outcomes and fair implementation of educational policies across all regions.`,
    },
    {
      title: "Partnership Development",
      image: "/images/partnership.jpg",
      short:
        "Building strong collaborations to advance the educational transformation agenda.",
      full: `WNETF will partner with government agencies, organizations, and individuals to mobilize stakeholders and achieve long-term educational transformation.`,
    },
    {
      title: "Sponsorship and Support",
      image: "/images/sponsorship.jpg",
      short:
        "Supporting underprivileged students to access and complete all levels of education.",
      full: `Limited sponsorship causes many promising learners to drop out. WNETF will mobilize resources and create sponsorship programs for disadvantaged students.`,
    },
    {
      title: "Strategic Areas of Support",
      image: "/images/support.jpg",
      short:
        "Advocating for facilities like libraries, labs, ICT centers & teacher-training opportunities.",
      full: `WNETF will advocate for and directly support the establishment of essential educational facilities such as libraries, laboratories, ICT centers, and teacher training hubs.`,
    },
  ];

  const handleFlip = (index: number) => {
    setFlipped(flipped === index ? null : index);
  };

  return (
    <div
      className="w-full py-12 flex flex-col items-center"
      style={{ backgroundColor: LIGHT_BACKGROUND, top:"180px" }}
    >
      {/* Heading */}
      <div
        className="w-11/12 md:w-9/12 text-center mb-12 fade-in"
        style={{ animation: "fadeSlide 0.8s ease-out" }}
      >
        <h1 className="font-bold text-3xl mb-2" style={{ color: PRIMARY_COLOR }}>
          WEST NILE EDUCATION TRUST FUND
        </h1>

        <h2 className="font-semibold text-xl mb-4" style={{ color: PRIMARY_COLOR }}>
          Strategic Plan
        </h2>

        <p className="text-gray-700 leading-relaxed text-md">
          A well-trained and skilled human resource pool in West Nile is crucial
          for bolstering regional progress and enabling active participation at
          national and international levels in strategic development.
        </p>
      </div>

      {/* GRID — NOW 3 PER ROW ON LARGE SCREENS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-11/12">
        {cards.map((card, index) => (
          <div
            key={index}
            className="relative w-full h-[380px] group cursor-pointer fade-in"
            onClick={() => handleFlip(index)}
            style={{
              animation: "fadeSlide 0.9s ease forwards",
              perspective: "1200px",
            }}
          >
            {/* Flip Wrapper */}
            <div
              className="absolute inset-0 transition-transform duration-700"
              style={{
                transformStyle: "preserve-3d",
                transform: flipped === index ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              {/* FRONT */}
              <div
                className="absolute inset-0 rounded-xl p-4 flex flex-col items-center"
                style={{
                  backgroundColor: "#fff",
                  backfaceVisibility: "hidden",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                }}
              >
                <h3
                  className="font-bold text-center mb-2"
                  style={{ color: PRIMARY_COLOR, fontSize: "18px" }}
                >
                  {card.title}
                </h3>

                {/* Image */}
                <div className="w-full h-40 relative rounded-lg overflow-hidden mb-3">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <p className="text-gray-700 text-sm text-center px-2">
                  {card.short}
                </p>

                <button
                  className="mt-3 py-2 px-4 rounded-md text-white text-sm"
                  style={{ backgroundColor: PRIMARY_COLOR }}
                >
                  Read More
                </button>
              </div>

              {/* BACK */}
              <div
                className="absolute inset-0 rounded-xl p-4 flex flex-col items-center justify-center text-center"
                style={{
                  backgroundColor: "#fff",
                  transform: "rotateY(180deg)",
                  backfaceVisibility: "hidden",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.18)",
                }}
              >
                <h3
                  className="font-bold mb-3"
                  style={{ color: PRIMARY_COLOR, fontSize: "18px" }}
                >
                  {card.title}
                </h3>

                <p className="text-gray-700 text-sm leading-relaxed px-2">
                  {card.full}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fade Animation */}
      <style jsx>{`
        @keyframes fadeSlide {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
