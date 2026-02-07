import {
  Flame,
  Phone,
  Mail,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  Youtube,
  ChevronRight,
} from "lucide-react";

const quickLinks = [
  { name: "Início", href: "#hero" },
  { name: "Serviços", href: "#services" },
  { name: "Diferenciais", href: "#differentials" },
  { name: "Galeria", href: "#gallery" },
  { name: "Depoimentos", href: "#testimonials" },
  { name: "Equipe", href: "#team" },
  { name: "Agendamento", href: "#booking" },
];

const services = [
  "Mecânica Geral",
  "Injeção Eletrônica",
  "Suspensão e Freios",
  "Alinhamento",
  "Ar Condicionado",
  "Elétrica",
];

export const Footer = () => {
  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-carbon-black border-t border-white/5" data-testid="footer">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#hero");
              }}
              className="flex items-center gap-3 mb-6"
            >
              <Flame className="w-10 h-10 text-fire-red" />
              <span className="font-heading text-2xl font-bold uppercase tracking-wider text-chrome-white">
                Fire Moto
              </span>
            </a>
            <p className="font-body text-sm text-white/50 mb-6 leading-relaxed">
              Há mais de 15 anos oferecendo serviços de mecânica automotiva com 
              qualidade, transparência e tecnologia de ponta.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href="https://instagram.com/teusdrz"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                data-testid="social-instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="social-icon"
                data-testid="social-facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="social-icon"
                data-testid="social-youtube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-bold uppercase tracking-wide text-chrome-white mb-6">
              Links Rápidos
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="footer-link font-body text-sm text-white/50 hover:text-fire-red flex items-center gap-2"
                  >
                    <ChevronRight className="w-4 h-4" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading text-lg font-bold uppercase tracking-wide text-chrome-white mb-6">
              Serviços
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("#services");
                    }}
                    className="footer-link font-body text-sm text-white/50 hover:text-fire-red flex items-center gap-2"
                  >
                    <ChevronRight className="w-4 h-4" />
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg font-bold uppercase tracking-wide text-chrome-white mb-6">
              Contato
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+5511932049040"
                  className="font-body text-sm text-white/50 hover:text-fire-red flex items-start gap-3 transition-colors duration-300"
                >
                  <Phone className="w-5 h-5 text-fire-red flex-shrink-0 mt-0.5" />
                  <span>(11) 93204-9040</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:matheusviniciusdrs5555@gmail.com"
                  className="font-body text-sm text-white/50 hover:text-fire-red flex items-start gap-3 transition-colors duration-300"
                >
                  <Mail className="w-5 h-5 text-fire-red flex-shrink-0 mt-0.5" />
                  <span className="break-all">matheusviniciusdrs5555@gmail.com</span>
                </a>
              </li>
              <li className="font-body text-sm text-white/50 flex items-start gap-3">
                <MapPin className="w-5 h-5 text-fire-red flex-shrink-0 mt-0.5" />
                <span>Rua José Francisco Lopes, 213</span>
              </li>
              <li className="font-body text-sm text-white/50 flex items-start gap-3">
                <Clock className="w-5 h-5 text-fire-red flex-shrink-0 mt-0.5" />
                <div>
                  <div>Seg - Sex: 08:00 - 18:00</div>
                  <div>Sáb: 08:00 - 12:00</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-body text-xs text-white/40 text-center md:text-left">
              © {new Date().getFullYear()} Fire Moto. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="font-body text-xs text-white/40 hover:text-white/70 transition-colors duration-300">
                Política de Privacidade
              </a>
              <a href="#" className="font-body text-xs text-white/40 hover:text-white/70 transition-colors duration-300">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
