import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Flame, Menu, X, Phone } from "lucide-react";

export const Navbar = ({ lenis }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const navLinks = [
    { name: "Início", href: "#hero" },
    { name: "Serviços", href: "#services" },
    { name: "Diferenciais", href: "#differentials" },
    { name: "Galeria", href: "#gallery" },
    { name: "Depoimentos", href: "#testimonials" },
    { name: "Equipe", href: "#team" },
    { name: "Agendamento", href: "#booking" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      // Animate mobile menu
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, x: "100%" },
        { opacity: 1, x: "0%", duration: 0.4, ease: "power3.out" }
      );

      // Stagger links
      gsap.fromTo(
        ".mobile-menu-link",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.2,
        }
      );
    }
  }, [mobileMenuOpen]);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element && lenis) {
      lenis.scrollTo(element, { offset: -80 });
    } else if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "nav-scrolled py-3" : "py-6"
        }`}
        data-testid="navbar"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#hero");
              }}
              className="flex items-center gap-3 group"
              data-testid="logo"
            >
              <div className="relative">
                <Flame className="w-10 h-10 text-fire-red transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 bg-fire-red blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
              </div>
              <span className="font-heading text-2xl font-bold uppercase tracking-wider text-chrome-white">
                Fire Moto
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="nav-link font-body text-sm uppercase tracking-widest text-white/70 hover:text-white"
                  data-testid={`nav-link-${link.name.toLowerCase()}`}
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="tel:+5511932049040"
                className="flex items-center gap-2 text-white/70 hover:text-fire-red transition-colors duration-300"
              >
                <Phone className="w-4 h-4" />
                <span className="font-body text-sm">(11) 93204-9040</span>
              </a>
              <button
                onClick={() => scrollToSection("#booking")}
                className="btn-primary px-6 py-3 font-heading font-bold uppercase tracking-widest text-sm text-white"
                data-testid="cta-button"
              >
                Agendar
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white"
              data-testid="mobile-menu-button"
            >
              {mobileMenuOpen ? (
                <X className="w-8 h-8" />
              ) : (
                <Menu className="w-8 h-8" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="mobile-menu"
          data-testid="mobile-menu"
        >
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-6 right-6 p-2 text-white"
          >
            <X className="w-8 h-8" />
          </button>

          <div className="flex flex-col items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="mobile-menu-link"
              >
                {link.name}
              </a>
            ))}

            <a
              href="tel:+5511932049040"
              className="mt-8 flex items-center gap-3 text-fire-red"
            >
              <Phone className="w-6 h-6" />
              <span className="font-heading text-xl">(11) 93204-9040</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
