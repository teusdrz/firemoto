import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Linkedin, Instagram, Award } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    name: "Carlos Mendez",
    role: "Mecânico Chefe",
    experience: "20 anos",
    specialization: "Motores e Câmbio",
    image: "https://images.unsplash.com/photo-1687422810663-c316494f725a?crop=entropy&cs=srgb&fm=jpg&q=85",
    certifications: ["ASE Master", "Bosch Car Service"],
  },
  {
    name: "Roberto Santos",
    role: "Especialista em Injeção",
    experience: "15 anos",
    specialization: "Injeção Eletrônica",
    image: "https://images.pexels.com/photos/28100861/pexels-photo-28100861.jpeg",
    certifications: ["Delphi Certified", "Continental"],
  },
  {
    name: "Fernando Lima",
    role: "Eletricista Automotivo",
    experience: "12 anos",
    specialization: "Elétrica e Eletrônica",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=srgb&fm=jpg&q=85",
    certifications: ["Magneti Marelli", "Valeo"],
  },
  {
    name: "Marcos Oliveira",
    role: "Funileiro e Pintor",
    experience: "18 anos",
    specialization: "Funilaria e Pintura",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=srgb&fm=jpg&q=85",
    certifications: ["PPG Certified", "3M Expert"],
  },
];

export const TeamSection = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
          },
        }
      );

      // Cards animation
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            { opacity: 0, y: 60, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
              },
              delay: index * 0.15,
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="team"
      className="relative py-24 md:py-32 bg-carbon-black"
      data-testid="team-section"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div ref={headerRef} className="mb-16 text-center">
          <span className="font-heading text-xs uppercase tracking-[0.3em] text-fire-red mb-4 block">
            Nossa Equipe
          </span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tighter text-chrome-white mb-6">
            Profissionais<br />
            <span className="text-fire-red">especializados</span>
          </h2>
          <p className="font-body text-lg text-white/50 max-w-2xl mx-auto">
            Conheça os especialistas que cuidam do seu veículo. Uma equipe com anos de 
            experiência e certificações dos principais fabricantes.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="team-card group relative bg-steel-gray/30 border border-white/5 overflow-hidden"
              data-testid={`team-member-${index}`}
            >
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="team-image w-full h-full object-cover"
                  loading="lazy"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-carbon-black via-carbon-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                
                {/* Info on hover */}
                <div className="team-info">
                  {/* Social Links */}
                  <div className="flex gap-3 mb-4">
                    <a
                      href="#"
                      className="w-10 h-10 bg-white/10 border border-white/20 flex items-center justify-center hover:bg-fire-red hover:border-fire-red transition-colors duration-300"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 bg-white/10 border border-white/20 flex items-center justify-center hover:bg-fire-red hover:border-fire-red transition-colors duration-300"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Certifications */}
                  <div className="flex flex-wrap gap-2">
                    {member.certifications.map((cert, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-fire-red/20 text-xs font-body text-fire-red"
                      >
                        <Award className="w-3 h-3" />
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="font-heading text-xl font-bold uppercase tracking-wide text-chrome-white mb-1 group-hover:text-fire-red transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="font-body text-sm text-fire-red mb-3">
                  {member.role}
                </p>
                <div className="flex items-center justify-between text-xs text-white/50">
                  <span>{member.experience} de exp.</span>
                  <span>{member.specialization}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-fire-red/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
    </section>
  );
};

export default TeamSection;
