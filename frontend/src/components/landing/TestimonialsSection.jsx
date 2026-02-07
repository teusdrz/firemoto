import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Carlos Eduardo",
    role: "Empresário",
    avatar: "CE",
    rating: 5,
    text: "Excelente atendimento! Trouxe meu carro com problema no motor e a equipe da Fire Moto identificou e resolveu rapidamente. Preço justo e qualidade impecável. Recomendo demais!",
  },
  {
    name: "Mariana Santos",
    role: "Advogada",
    avatar: "MS",
    rating: 5,
    text: "Fui muito bem atendida desde o primeiro contato. Fizeram a revisão completa do meu carro e explicaram tudo detalhadamente. Profissionalismo de primeira!",
  },
  {
    name: "Roberto Silva",
    role: "Engenheiro",
    avatar: "RS",
    rating: 5,
    text: "Já testei várias oficinas na região, mas nenhuma se compara à Fire Moto. Equipamentos modernos, mecânicos qualificados e atendimento nota 10. Cliente fiel!",
  },
  {
    name: "Ana Paula Costa",
    role: "Médica",
    avatar: "AC",
    rating: 5,
    text: "Confio meu carro à Fire Moto há 3 anos. Sempre entregam no prazo e com qualidade excepcional. O ar condicionado do meu carro nunca funcionou tão bem!",
  },
  {
    name: "Fernando Oliveira",
    role: "Arquiteto",
    avatar: "FO",
    rating: 5,
    text: "Precisei de um serviço de emergência e a Fire Moto me atendeu prontamente. Resolveram o problema da suspensão no mesmo dia. Serviço impecável!",
  },
];

export const TestimonialsSection = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    goToSlide((currentIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    goToSlide((currentIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative py-24 md:py-32 bg-steel-gray/30 overflow-hidden"
      data-testid="testimonials-section"
    >
      {/* Quote decoration */}
      <div className="absolute top-20 left-10 opacity-5">
        <Quote className="w-64 h-64 text-fire-red" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div ref={headerRef} className="mb-16 text-center">
          <span className="font-heading text-xs uppercase tracking-[0.3em] text-fire-red mb-4 block">
            Depoimentos
          </span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tighter text-chrome-white mb-6">
            O que nossos<br />
            <span className="text-fire-red">clientes dizem</span>
          </h2>
          <p className="font-body text-lg text-white/50 max-w-2xl mx-auto">
            A satisfação dos nossos clientes é nossa maior conquista. Confira alguns 
            depoimentos de quem já experimentou nossos serviços.
          </p>
        </div>

        {/* Carousel */}
        <div ref={carouselRef} className="relative max-w-4xl mx-auto">
          {/* Main Card */}
          <div className="testimonial-card p-8 md:p-12">
            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-fire-red fill-fire-red"
                />
              ))}
            </div>

            {/* Text */}
            <p className="font-body text-lg md:text-xl text-white/80 leading-relaxed mb-8">
              "{testimonials[currentIndex].text}"
            </p>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-fire-red/20 border border-fire-red/30 flex items-center justify-center">
                <span className="font-heading text-lg font-bold text-fire-red">
                  {testimonials[currentIndex].avatar}
                </span>
              </div>
              <div>
                <div className="font-heading text-lg font-bold uppercase tracking-wide text-chrome-white">
                  {testimonials[currentIndex].name}
                </div>
                <div className="font-body text-sm text-white/50">
                  {testimonials[currentIndex].role}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 w-12 h-12 bg-carbon-black border border-white/10 flex items-center justify-center hover:border-fire-red hover:text-fire-red transition-colors duration-300"
            data-testid="testimonial-prev"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 w-12 h-12 bg-carbon-black border border-white/10 flex items-center justify-center hover:border-fire-red hover:text-fire-red transition-colors duration-300"
            data-testid="testimonial-next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-fire-red w-8"
                    : "bg-white/20 hover:bg-white/40"
                }`}
                data-testid={`testimonial-dot-${index}`}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mt-6 h-1 bg-white/10 overflow-hidden">
            <div
              className="h-full bg-fire-red transition-all duration-300"
              style={{
                width: `${((currentIndex + 1) / testimonials.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
