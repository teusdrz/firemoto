import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, Play, Wrench, Shield, Clock } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const HeroSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const statsRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Background parallax
      gsap.to(bgRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Title animation - letter by letter
      const titleChars = titleRef.current.querySelectorAll(".char");
      gsap.fromTo(
        titleChars,
        { opacity: 0, y: 100, rotateX: -90 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.03,
          ease: "power4.out",
          delay: 0.3,
        }
      );

      // Subtitle slide up
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          delay: 0.8,
        }
      );

      // CTA buttons
      gsap.fromTo(
        ctaRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
          delay: 1.2,
        }
      );

      // Stats animation
      gsap.fromTo(
        statsRef.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          delay: 1.5,
        }
      );

      // Scroll indicator
      gsap.to(".scroll-indicator", {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: "power1.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Split title into chars
  const titleText = "FIRE MOTO";
  const titleChars = titleText.split("").map((char, i) => (
    <span key={i} className="char inline-block" style={{ transformStyle: "preserve-3d" }}>
      {char === " " ? "\u00A0" : char}
    </span>
  ));

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="hero-section relative min-h-screen flex items-center"
      data-testid="hero-section"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
      >
        <img
          src="https://images.unsplash.com/photo-1605047539572-922220a0c213?crop=entropy&cs=srgb&fm=jpg&q=85"
          alt="Fire Moto Workshop"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Overlay */}
      <div className="hero-overlay" />

      {/* Content */}
      <div className="hero-content relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-32 pb-20">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-fire-red/10 border border-fire-red/30 mb-8">
            <div className="w-2 h-2 bg-fire-red rounded-full animate-pulse" />
            <span className="font-heading text-xs uppercase tracking-[0.3em] text-fire-red">
              Excelência em Mecânica Automotiva
            </span>
          </div>

          {/* Title */}
          <h1
            ref={titleRef}
            className="font-heading text-6xl md:text-8xl lg:text-9xl font-bold uppercase tracking-tighter text-chrome-white mb-6"
            style={{ perspective: "1000px" }}
          >
            {titleChars}
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="font-body text-lg md:text-xl text-white/60 max-w-2xl mb-10 leading-relaxed"
          >
            Há mais de 15 anos oferecendo serviços de mecânica automotiva com qualidade, 
            transparência e tecnologia de ponta. Sua confiança é nosso combustível.
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 mb-16">
            <a
              href="#booking"
              className="btn-primary px-10 py-5 font-heading font-bold uppercase tracking-widest text-white text-center"
              data-testid="hero-cta-primary"
            >
              Agendar Serviço
            </a>
            <a
              href="#services"
              className="group flex items-center justify-center gap-3 px-10 py-5 bg-transparent border border-white/20 font-heading font-bold uppercase tracking-widest text-white hover:bg-white/5 transition-colors duration-300"
              data-testid="hero-cta-secondary"
            >
              <Play className="w-5 h-5 text-fire-red" />
              Nossos Serviços
            </a>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">
            <div className="counter-item px-0 md:px-6 first:pl-0">
              <div className="font-heading text-4xl md:text-5xl font-bold text-fire-red mb-1">
                15+
              </div>
              <div className="font-body text-xs uppercase tracking-widest text-white/50">
                Anos de Experiência
              </div>
            </div>
            <div className="counter-item px-0 md:px-6">
              <div className="font-heading text-4xl md:text-5xl font-bold text-fire-red mb-1">
                8.5K
              </div>
              <div className="font-body text-xs uppercase tracking-widest text-white/50">
                Veículos Atendidos
              </div>
            </div>
            <div className="counter-item px-0 md:px-6">
              <div className="font-heading text-4xl md:text-5xl font-bold text-fire-red mb-1">
                98%
              </div>
              <div className="font-body text-xs uppercase tracking-widest text-white/50">
                Clientes Satisfeitos
              </div>
            </div>
            <div className="counter-item px-0 md:px-6 last:pr-0">
              <div className="font-heading text-4xl md:text-5xl font-bold text-fire-red mb-1">
                24h
              </div>
              <div className="font-body text-xs uppercase tracking-widest text-white/50">
                Suporte Emergencial
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 scroll-indicator">
          <a href="#services" className="flex flex-col items-center gap-2 text-white/40 hover:text-fire-red transition-colors duration-300">
            <span className="font-body text-xs uppercase tracking-widest">Scroll</span>
            <ChevronDown className="w-6 h-6" />
          </a>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-carbon-black to-transparent z-10" />
    </section>
  );
};

export default HeroSection;
