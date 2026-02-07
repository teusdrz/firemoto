import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Shield, Award, Clock, Users, Wrench, ThumbsUp } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const differentials = [
  {
    icon: Shield,
    title: "Garantia de Serviço",
    description: "Todos os nossos serviços possuem garantia estendida de até 6 meses, proporcionando total segurança e tranquilidade.",
  },
  {
    icon: Award,
    title: "Certificação Premium",
    description: "Equipe certificada pelos principais fabricantes automotivos, garantindo procedimentos dentro dos padrões da indústria.",
  },
  {
    icon: Clock,
    title: "Pontualidade",
    description: "Respeitamos seu tempo. Entregas no prazo combinado e comunicação transparente durante todo o processo.",
  },
  {
    icon: Users,
    title: "Atendimento Personalizado",
    description: "Cada cliente recebe atenção exclusiva. Diagnósticos detalhados e explicações claras sobre cada serviço.",
  },
  {
    icon: Wrench,
    title: "Equipamentos Modernos",
    description: "Investimos constantemente em tecnologia de ponta para diagnósticos precisos e reparos de alta qualidade.",
  },
  {
    icon: ThumbsUp,
    title: "Peças Originais",
    description: "Utilizamos apenas peças originais ou de primeira linha, garantindo durabilidade e desempenho.",
  },
];

export const DifferentialsSection = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);
  const counterRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current.children,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
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
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
              },
              delay: index * 0.1,
            }
          );
        }
      });

      // Counter animation
      const counters = counterRef.current?.querySelectorAll(".counter-number");
      counters?.forEach((counter) => {
        const target = parseInt(counter.dataset.target, 10);
        gsap.fromTo(
          counter,
          { textContent: 0 },
          {
            textContent: target,
            duration: 2,
            ease: "power2.out",
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: counterRef.current,
              start: "top 80%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="differentials"
      className="relative py-24 md:py-32 bg-steel-gray/30"
      data-testid="differentials-section"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(220,38,38,0.1) 35px, rgba(220,38,38,0.1) 70px)`,
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div ref={headerRef} className="mb-16">
          <span className="font-heading text-xs uppercase tracking-[0.3em] text-fire-red mb-4 block">
            Por que nos escolher
          </span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tighter text-chrome-white mb-6">
            Diferenciais que<br />
            <span className="text-fire-red">fazem a diferença</span>
          </h2>
          <p className="font-body text-lg text-white/50 max-w-xl">
            Nossa missão é oferecer o melhor serviço automotivo, combinando expertise 
            técnica com atendimento de excelência.
          </p>
        </div>

        {/* Differentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {differentials.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className="group relative p-8 bg-carbon-black/50 border border-white/5 hover:border-fire-red/30 transition-colors duration-500"
                data-testid={`differential-card-${index}`}
              >
                {/* Icon */}
                <div className="relative w-14 h-14 flex items-center justify-center mb-6">
                  <div className="absolute inset-0 bg-fire-red/10 group-hover:bg-fire-red/20 transition-colors duration-500" />
                  <IconComponent className="w-7 h-7 text-fire-red relative z-10" />
                </div>

                {/* Content */}
                <h3 className="font-heading text-xl font-bold uppercase tracking-wide text-chrome-white mb-3 group-hover:text-fire-red transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="font-body text-sm text-white/50 leading-relaxed">
                  {item.description}
                </p>

                {/* Corner accent */}
                <div className="absolute bottom-0 right-0 w-16 h-16 overflow-hidden">
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-fire-red/5 group-hover:bg-fire-red/10 transition-colors duration-500 rotate-45 translate-x-16 translate-y-16" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Counter Section */}
        <div
          ref={counterRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-b border-white/10"
        >
          <div className="text-center">
            <div className="font-heading text-5xl md:text-6xl font-bold text-fire-red mb-2">
              <span className="counter-number" data-target="15">0</span>+
            </div>
            <div className="font-body text-sm uppercase tracking-widest text-white/50">
              Anos de Mercado
            </div>
          </div>
          <div className="text-center">
            <div className="font-heading text-5xl md:text-6xl font-bold text-fire-red mb-2">
              <span className="counter-number" data-target="8500">0</span>+
            </div>
            <div className="font-body text-sm uppercase tracking-widest text-white/50">
              Veículos Atendidos
            </div>
          </div>
          <div className="text-center">
            <div className="font-heading text-5xl md:text-6xl font-bold text-fire-red mb-2">
              <span className="counter-number" data-target="12">0</span>
            </div>
            <div className="font-body text-sm uppercase tracking-widest text-white/50">
              Profissionais
            </div>
          </div>
          <div className="text-center">
            <div className="font-heading text-5xl md:text-6xl font-bold text-fire-red mb-2">
              <span className="counter-number" data-target="98">0</span>%
            </div>
            <div className="font-body text-sm uppercase tracking-widest text-white/50">
              Satisfação
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DifferentialsSection;
