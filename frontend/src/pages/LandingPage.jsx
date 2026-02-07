import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import Navbar from "../components/landing/Navbar";
import HeroSection from "../components/landing/HeroSection";
import ServicesSection from "../components/landing/ServicesSection";
import DifferentialsSection from "../components/landing/DifferentialsSection";
import GallerySection from "../components/landing/GallerySection";
import TestimonialsSection from "../components/landing/TestimonialsSection";
import TeamSection from "../components/landing/TeamSection";
import BookingSection from "../components/landing/BookingSection";
import Footer from "../components/landing/Footer";
import Preloader from "../components/landing/Preloader";

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
  const [loading, setLoading] = useState(true);
  const lenisRef = useRef(null);
  const mainRef = useRef(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
      // Initialize Lenis smooth scroll
      lenisRef.current = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });

      function raf(time) {
        lenisRef.current?.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      // Connect Lenis to GSAP ScrollTrigger
      lenisRef.current.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenisRef.current?.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }

    // Preloader timeout
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => {
      clearTimeout(timer);
      lenisRef.current?.destroy();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      // Refresh ScrollTrigger after preloader
      ScrollTrigger.refresh();
    }
  }, [loading]);

  if (loading) {
    return <Preloader />;
  }

  return (
    <div ref={mainRef} className="relative" data-testid="landing-page">
      {/* Noise Overlay */}
      <div className="noise-overlay" />
      
      {/* Navigation */}
      <Navbar lenis={lenisRef.current} />
      
      {/* Main Content */}
      <main>
        <HeroSection />
        <ServicesSection />
        <DifferentialsSection />
        <GallerySection />
        <TestimonialsSection />
        <TeamSection />
        <BookingSection />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
