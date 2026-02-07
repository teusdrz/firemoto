import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios from "axios";
import { toast } from "sonner";
import {
  Calendar,
  Clock,
  Car,
  User,
  Phone,
  Mail,
  MessageSquare,
  CheckCircle,
  Loader2,
  AlertCircle,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const services = [
  "Mecânica Geral",
  "Injeção Eletrônica",
  "Suspensão e Freios",
  "Alinhamento e Balanceamento",
  "Ar Condicionado Automotivo",
  "Elétrica Automotiva",
  "Troca de Óleo e Filtros",
  "Funilaria e Pintura",
  "Revisão Completa",
  "Embreagem e Câmbio",
  "Direção Hidráulica",
  "GNV - Gás Natural",
];

const timeSlots = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

export const BookingSection = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    vehicle_brand: "",
    vehicle_model: "",
    vehicle_year: "",
    service_type: "",
    preferred_date: "",
    preferred_time: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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

      // Form animation
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Telefone é obrigatório";
    } else if (!/^\d{10,11}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Telefone inválido";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.vehicle_brand.trim()) {
      newErrors.vehicle_brand = "Marca é obrigatória";
    }

    if (!formData.vehicle_model.trim()) {
      newErrors.vehicle_model = "Modelo é obrigatório";
    }

    if (!formData.vehicle_year.trim()) {
      newErrors.vehicle_year = "Ano é obrigatório";
    }

    if (!formData.service_type) {
      newErrors.service_type = "Selecione um serviço";
    }

    if (!formData.preferred_date) {
      newErrors.preferred_date = "Selecione uma data";
    }

    if (!formData.preferred_time) {
      newErrors.preferred_time = "Selecione um horário";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Por favor, corrija os erros no formulário");
      return;
    }

    setIsSubmitting(true);

    try {
      await axios.post(`${API}/bookings`, formData);
      setIsSuccess(true);
      toast.success("Agendamento realizado com sucesso!");
      
      // Reset form after delay
      setTimeout(() => {
        setFormData({
          name: "",
          phone: "",
          email: "",
          vehicle_brand: "",
          vehicle_model: "",
          vehicle_year: "",
          service_type: "",
          preferred_date: "",
          preferred_time: "",
          message: "",
        });
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Erro ao realizar agendamento. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split("T")[0];

  return (
    <section
      ref={sectionRef}
      id="booking"
      className="relative py-24 md:py-32 bg-steel-gray/30"
      data-testid="booking-section"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(220,38,38,0.3) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div ref={headerRef} className="mb-16 text-center">
          <span className="font-heading text-xs uppercase tracking-[0.3em] text-fire-red mb-4 block">
            Agendamento
          </span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tighter text-chrome-white mb-6">
            Agende seu<br />
            <span className="text-fire-red">serviço agora</span>
          </h2>
          <p className="font-body text-lg text-white/50 max-w-2xl mx-auto">
            Preencha o formulário abaixo e nossa equipe entrará em contato para 
            confirmar seu agendamento.
          </p>
        </div>

        {/* Form */}
        <div
          ref={formRef}
          className="max-w-4xl mx-auto bg-carbon-black/50 border border-white/5 p-8 md:p-12"
        >
          {isSuccess ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              <h3 className="font-heading text-2xl font-bold uppercase text-chrome-white mb-4">
                Agendamento Confirmado!
              </h3>
              <p className="font-body text-white/50">
                Entraremos em contato em breve para confirmar os detalhes.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Info */}
              <div>
                <h3 className="font-heading text-lg font-bold uppercase tracking-wide text-chrome-white mb-6 flex items-center gap-3">
                  <User className="w-5 h-5 text-fire-red" />
                  Dados Pessoais
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block font-body text-sm text-white/70 mb-2">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`form-input w-full h-12 px-4 ${
                        errors.name ? "input-error" : ""
                      }`}
                      placeholder="Seu nome"
                      data-testid="booking-name"
                    />
                    {errors.name && (
                      <span className="text-fire-red text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.name}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block font-body text-sm text-white/70 mb-2">
                      Telefone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`form-input w-full h-12 px-4 ${
                        errors.phone ? "input-error" : ""
                      }`}
                      placeholder="(11) 99999-9999"
                      data-testid="booking-phone"
                    />
                    {errors.phone && (
                      <span className="text-fire-red text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.phone}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block font-body text-sm text-white/70 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`form-input w-full h-12 px-4 ${
                        errors.email ? "input-error" : ""
                      }`}
                      placeholder="seu@email.com"
                      data-testid="booking-email"
                    />
                    {errors.email && (
                      <span className="text-fire-red text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Vehicle Info */}
              <div>
                <h3 className="font-heading text-lg font-bold uppercase tracking-wide text-chrome-white mb-6 flex items-center gap-3">
                  <Car className="w-5 h-5 text-fire-red" />
                  Dados do Veículo
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block font-body text-sm text-white/70 mb-2">
                      Marca *
                    </label>
                    <input
                      type="text"
                      name="vehicle_brand"
                      value={formData.vehicle_brand}
                      onChange={handleChange}
                      className={`form-input w-full h-12 px-4 ${
                        errors.vehicle_brand ? "input-error" : ""
                      }`}
                      placeholder="Ex: Volkswagen"
                      data-testid="booking-brand"
                    />
                    {errors.vehicle_brand && (
                      <span className="text-fire-red text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.vehicle_brand}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block font-body text-sm text-white/70 mb-2">
                      Modelo *
                    </label>
                    <input
                      type="text"
                      name="vehicle_model"
                      value={formData.vehicle_model}
                      onChange={handleChange}
                      className={`form-input w-full h-12 px-4 ${
                        errors.vehicle_model ? "input-error" : ""
                      }`}
                      placeholder="Ex: Golf"
                      data-testid="booking-model"
                    />
                    {errors.vehicle_model && (
                      <span className="text-fire-red text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.vehicle_model}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block font-body text-sm text-white/70 mb-2">
                      Ano *
                    </label>
                    <input
                      type="text"
                      name="vehicle_year"
                      value={formData.vehicle_year}
                      onChange={handleChange}
                      className={`form-input w-full h-12 px-4 ${
                        errors.vehicle_year ? "input-error" : ""
                      }`}
                      placeholder="Ex: 2020"
                      data-testid="booking-year"
                    />
                    {errors.vehicle_year && (
                      <span className="text-fire-red text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.vehicle_year}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Service Info */}
              <div>
                <h3 className="font-heading text-lg font-bold uppercase tracking-wide text-chrome-white mb-6 flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-fire-red" />
                  Serviço e Agendamento
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block font-body text-sm text-white/70 mb-2">
                      Tipo de Serviço *
                    </label>
                    <select
                      name="service_type"
                      value={formData.service_type}
                      onChange={handleChange}
                      className={`form-input w-full h-12 px-4 ${
                        errors.service_type ? "input-error" : ""
                      }`}
                      data-testid="booking-service"
                    >
                      <option value="">Selecione...</option>
                      {services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                    {errors.service_type && (
                      <span className="text-fire-red text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.service_type}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block font-body text-sm text-white/70 mb-2">
                      Data Preferida *
                    </label>
                    <input
                      type="date"
                      name="preferred_date"
                      value={formData.preferred_date}
                      onChange={handleChange}
                      min={today}
                      className={`form-input w-full h-12 px-4 ${
                        errors.preferred_date ? "input-error" : ""
                      }`}
                      data-testid="booking-date"
                    />
                    {errors.preferred_date && (
                      <span className="text-fire-red text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.preferred_date}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block font-body text-sm text-white/70 mb-2">
                      Horário Preferido *
                    </label>
                    <select
                      name="preferred_time"
                      value={formData.preferred_time}
                      onChange={handleChange}
                      className={`form-input w-full h-12 px-4 ${
                        errors.preferred_time ? "input-error" : ""
                      }`}
                      data-testid="booking-time"
                    >
                      <option value="">Selecione...</option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                    {errors.preferred_time && (
                      <span className="text-fire-red text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.preferred_time}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <h3 className="font-heading text-lg font-bold uppercase tracking-wide text-chrome-white mb-6 flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-fire-red" />
                  Observações
                </h3>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="form-input w-full px-4 py-3 resize-none"
                  placeholder="Descreva o problema ou observações adicionais..."
                  data-testid="booking-message"
                />
              </div>

              {/* Submit Button */}
              <div className="text-center pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary inline-flex items-center gap-3 px-12 py-5 font-heading font-bold uppercase tracking-widest text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  data-testid="booking-submit"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Calendar className="w-5 h-5" />
                      Agendar Serviço
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
