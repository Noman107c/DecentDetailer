'use client';

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServicesSection from "@/components/services/ServicesSection";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/testimonial/TestimonialsSection";
import CtaSection from "@/components/CtaSection";
import FeaturedWorks from "@/components/FeaturedWorks";
import ProcessSection from "@/components/ProcessSection";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import DiscountModal from "@/components/DiscountModal";
import discountData from "@/data/discountData.json";

// utility functions
const shouldShowModal = () => {
  if (typeof window === "undefined") return false;
  return !sessionStorage.getItem("discountModalShown");
};

const setModalShown = () => {
  if (typeof window === "undefined") return;
  sessionStorage.setItem("discountModalShown", "true");
};

export default function Home() {
  const [showModal, setShowModal] = useState(true);
  const [heroHeight, setHeroHeight] = useState(0);

  useEffect(() => {
    const hero = document.getElementById("hero-section");
    if (hero) {
      setHeroHeight(hero.offsetHeight);
    }

    const handleScroll = () => {
      // fade-in animations
      const elements = document.querySelectorAll(".fade-in");
      elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementHeight = element.getBoundingClientRect().height;

        if (elementTop < window.innerHeight - elementHeight / 2) {
          element.classList.add("visible");
        }
      });

      // modal trigger logic
      if (heroHeight > 0 && !showModal && shouldShowModal()) {
        const scrolledPastHero = window.scrollY > heroHeight * 0.8; // 30% hero ke neeche
        if (scrolledPastHero) {
          setShowModal(true);
          setModalShown();
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [heroHeight, showModal]); // 👈 add showModal also

  // scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <div className="min-h-screen overflow-hidden">
      <Navbar />
      {/* 👇 Make sure Hero has this id */}
   
        <Hero />
      

      {/* Discount Modal */}
      <DiscountModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        data={discountData}
      />

      <div className="bg-white">
        <motion.div
          id="premium-mobile-car-detailing"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="py-16 md:py-20"
        >
          <ServicesSection />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="py-16 md:py-20"
        >
          <ProcessSection />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="py-16 md:py-20"
        >
          <AboutSection />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="py-16 md:py-20"
        >
          <FeaturedWorks />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="py-16 md:py-20"
        >
          <TestimonialsSection />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="py-16 md:py-20"
        >
          <CtaSection />
        </motion.div>
      </div>
    </div>
  );
}
