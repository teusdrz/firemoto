import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ZoomIn, X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  {
    url: "https://images.unsplash.com/photo-1665347249761-658102c63bea?crop=entropy&cs=srgb&fm=jpg&q=85",
    title: "Reparo de Motor",
    category: "Mecânica",
  },
  {
    url: "https://images.pexels.com/photos/3862614/pexels-photo-3862614.jpeg",
    title: "Diagnóstico Eletrônico",
    category: "Injeção",
  },
  {
    url: "https://images.unsplash.com/photo-1626037032364-b0dd4f9aa5f9?crop=entropy&cs=srgb&fm=jpg&q=85",
    title: "Funilaria",
    category: "Lataria",
  },
  {
    url: "https://images.pexels.com/photos/9028761/pexels-photo-9028761.jpeg",
    title: "Pintura Automotiva",
    category: "Pintura",
  },
  {
    url: "https://images.unsplash.com/photo-1605047539572-922220a0c213?crop=entropy&cs=srgb&fm=jpg&q=85&w=800",
    title: "Manutenção Geral",
    category: "Revisão",
  },
  {
    url: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?crop=entropy&cs=srgb&fm=jpg&q=85",
    title: "Troca de Pneus",
    category: "Rodas",
  },
];

export const GallerySection = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const galleryRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

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

      // Gallery items animation
      const items = galleryRef.current.querySelectorAll(".gallery-item");
      gsap.fromTo(
        items,
        { opacity: 0, scale: 0.8, y: 60 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const openLightbox = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = "";
  };

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative py-24 md:py-32 bg-carbon-black"
      data-testid="gallery-section"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div ref={headerRef} className="mb-16 text-center">
          <span className="font-heading text-xs uppercase tracking-[0.3em] text-fire-red mb-4 block">
            Nosso Trabalho
          </span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tighter text-chrome-white mb-6">
            Galeria de<br />
            <span className="text-fire-red">Trabalhos Realizados</span>
          </h2>
          <p className="font-body text-lg text-white/50 max-w-2xl mx-auto">
            Confira alguns dos nossos trabalhos realizados. Cada projeto representa nosso 
            compromisso com a qualidade e atenção aos detalhes.
          </p>
        </div>

        {/* Gallery Grid */}
        <div
          ref={galleryRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="gallery-item group relative aspect-[4/3] overflow-hidden cursor-pointer"
              onClick={() => openLightbox(image)}
              data-testid={`gallery-item-${index}`}
            >
              {/* Image */}
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />

              {/* Overlay */}
              <div className="gallery-overlay">
                <div className="text-center p-6">
                  <ZoomIn className="w-10 h-10 text-white mx-auto mb-4" />
                  <h3 className="font-heading text-xl font-bold uppercase tracking-wide text-white mb-2">
                    {image.title}
                  </h3>
                  <span className="font-body text-sm text-white/70 uppercase tracking-widest">
                    {image.category}
                  </span>
                </div>
              </div>

              {/* Category Tag */}
              <div className="absolute top-4 left-4 px-3 py-1 bg-fire-red/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="font-heading text-xs uppercase tracking-widest text-white">
                  {image.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
          onClick={closeLightbox}
          data-testid="lightbox"
        >
          <button
            className="absolute top-6 right-6 p-2 text-white hover:text-fire-red transition-colors duration-300"
            onClick={closeLightbox}
          >
            <X className="w-8 h-8" />
          </button>

          <div
            className="relative max-w-5xl max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="w-full h-full object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
              <h3 className="font-heading text-2xl font-bold uppercase text-white mb-1">
                {selectedImage.title}
              </h3>
              <span className="font-body text-sm text-fire-red uppercase tracking-widest">
                {selectedImage.category}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-fire-red/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none" />
    </section>
  );
};

export default GallerySection;
