import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Wrench,
  Cpu,
  Car,
  Target,
  Thermometer,
  Zap,
  Droplet,
  Paintbrush,
  ClipboardCheck,
  Cog,
  Circle,
  Flame,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  wrench: Wrench,
  cpu: Cpu,
  car: Car,
  target: Target,
  thermometer: Thermometer,
  zap: Zap,
  droplet: Droplet,
  paintbrush: Paintbrush,
  "clipboard-check": ClipboardCheck,
  cog: Cog,
  circle: Circle,
  flame: Flame,
};

const services = [
  { id: "1", name: "Mecânica Geral", description: "Diagnóstico completo e reparos de motor, câmbio e sistemas mecânicos", icon: "wrench", price: "A partir de R$ 150" },
  { id: "2", name: "Injeção Eletrônica", description: "Diagnóstico e reparo de sistemas de injeção eletrônica e sensores", icon: "cpu", price: "A partir de R$ 200" },
  { id: "3", name: "Suspensão e Freios", description: "Manutenção e troca de amortecedores, molas, pastilhas e discos", icon: "car", price: "A partir de R$ 180" },
  { id: "4", name: "Alinhamento e Balanceamento", description: "Alinhamento 3D computadorizado e balanceamento de rodas", icon: "target", price: "A partir de R$ 120" },
  { id: "5", name: "Ar Condicionado Automotivo", description: "Recarga de gás, higienização e reparo do sistema de A/C", icon: "thermometer", price: "A partir de R$ 250" },
  { id: "6", name: "Elétrica Automotiva", description: "Diagnóstico e reparo de sistemas elétricos, alternador e bateria", icon: "zap", price: "A partir de R$ 130" },
  { id: "7", name: "Troca de Óleo e Filtros", description: "Troca de óleo sintético ou mineral com filtros de qualidade", icon: "droplet", price: "A partir de R$ 180" },
  { id: "8", name: "Funilaria e Pintura", description: "Reparos de lataria, pintura automotiva e polimento", icon: "paintbrush", price: "Sob consulta" },
  { id: "9", name: "Revisão Completa", description: "Check-up completo com inspeção de todos os sistemas do veículo", icon: "clipboard-check", price: "A partir de R$ 350" },
  { id: "10", name: "Embreagem e Câmbio", description: "Troca e reparo de embreagem, câmbio manual e automático", icon: "cog", price: "A partir de R$ 400" },
  { id: "11", name: "Direção Hidráulica", description: "Manutenção e reparo de sistemas de direção hidráulica e elétrica", icon: "circle", price: "A partir de R$ 200" },
  { id: "12", name: "GNV - Gás Natural", description: "Instalação, manutenção e vistoria de kit GNV", icon: "flame", price: "A partir de R$ 2.500" },
];

export const ServicesSection = () => {
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
            toggleActions: "play none none reverse",
          },
        }
      );

      // Cards stagger animation with 3D rotation
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            {
              opacity: 0,
              y: 80,
              rotateX: -15,
              scale: 0.9,
            },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              scale: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
              delay: (index % 3) * 0.1,
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e, index) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.3,
      ease: "power2.out",
      transformPerspective: 1000,
    });
  };

  const handleMouseLeave = (index) => {
    const card = cardsRef.current[index];
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-24 md:py-32 bg-carbon-black"
      data-testid="services-section"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div ref={headerRef} className="mb-16">
          <span className="font-heading text-xs uppercase tracking-[0.3em] text-fire-red mb-4 block">
            Nossos Serviços
          </span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tighter text-chrome-white mb-6">
            Excelência em cada<br />
            <span className="text-fire-red">detalhe mecânico</span>
          </h2>
          <p className="font-body text-lg text-white/50 max-w-xl">
            Oferecemos uma gama completa de serviços automotivos com equipamentos de última 
            geração e profissionais altamente qualificados.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Wrench;
            return (
              <div
                key={service.id}
                ref={(el) => (cardsRef.current[index] = el)}
                className="service-card group relative overflow-hidden bg-steel-gray/30 border border-white/5 p-8 cursor-pointer"
                style={{ transformStyle: "preserve-3d" }}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={() => handleMouseLeave(index)}
                data-testid={`service-card-${service.id}`}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-fire-red/10 via-transparent to-transparent" />
                
                {/* Border glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-fire-red to-transparent" />
                </div>

                {/* Content */}
                <div className="relative z-10" style={{ transform: "translateZ(30px)" }}>
                  <div className="service-icon-wrapper mb-6">
                    <IconComponent className="w-7 h-7 text-fire-red" />
                  </div>

                  <h3 className="font-heading text-xl font-bold uppercase tracking-wide text-chrome-white mb-3 group-hover:text-fire-red transition-colors duration-300">
                    {service.name}
                  </h3>

                  <p className="font-body text-sm text-white/50 mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="font-heading text-sm font-semibold text-fire-red">
                      {service.price}
                    </span>
                    <span className="font-body text-xs uppercase tracking-widest text-white/30 group-hover:text-white/60 transition-colors duration-300">
                      Saiba mais →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-fire-red/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
    </section>
  );
};

export default ServicesSection;
