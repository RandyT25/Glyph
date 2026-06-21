"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, Clock, CheckCircle, MapPin } from "lucide-react";
import ScrollReveal from "@/components/animations/scroll-reveal";
import { slideLeft, slideRight } from "@/lib/motion";

type FormData = {
  businessName: string;
  email: string;
  phone: string;
  businessType: string;
  message: string;
};

const initialFormData: FormData = {
  businessName: "",
  email: "",
  phone: "",
  businessType: "",
  message: "",
};

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.businessName.trim()) newErrors.businessName = "Business name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Please enter a valid email";
    if (!formData.businessType) newErrors.businessType = "Please select a business type";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const inputClass =
    "w-full bg-[#111113] border border-[#27272A] rounded-xl px-4 py-3 text-sm text-[#F4F4F5] placeholder:text-[#52525B] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]/50 transition-all duration-200";

  const labelClass = "block text-xs font-medium text-[#A1A1AA] mb-1.5 uppercase tracking-wide";

  return (
    <main className="bg-[#09090B] min-h-screen">
      {/* Header */}
      <section className="pt-36 pb-16 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 50% 0%, rgba(79,70,229,0.1) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />
        <div className="max-w-2xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block mb-5 text-xs font-semibold uppercase tracking-widest text-[#6366F1] bg-[#4F46E5]/10 px-3 py-1 rounded-full border border-[#4F46E5]/20">
              Contact
            </span>
            <h1 className="font-[family-name:var(--font-dm-sans)] text-5xl font-bold text-[#F4F4F5] mb-4">
              Let&apos;s talk.
            </h1>
            <p className="text-[#71717A] text-lg">
              Tell us about your business. We&apos;ll get back to you within one business day.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Two-column layout */}
      <section className="pb-28">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: form */}
          <ScrollReveal variants={slideLeft}>
            <div className="rounded-2xl border border-[#27272A] bg-[#111113] p-8">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-12 gap-5"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center">
                      <CheckCircle size={32} className="text-[#10B981]" />
                    </div>
                    <div>
                      <h2 className="font-[family-name:var(--font-dm-sans)] text-2xl font-bold text-[#F4F4F5] mb-2">
                        Message received!
                      </h2>
                      <p className="text-[#71717A] text-sm max-w-xs">
                        Thanks, {formData.businessName}. We&apos;ll be in touch within one business day.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData(initialFormData);
                      }}
                      className="text-sm text-[#4F46E5] hover:text-[#6366F1] transition-colors duration-200 cursor-pointer"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    noValidate
                  >
                    <div>
                      <label htmlFor="businessName" className={labelClass}>
                        Business Name *
                      </label>
                      <input
                        id="businessName"
                        name="businessName"
                        type="text"
                        value={formData.businessName}
                        onChange={handleChange}
                        placeholder="Maison Café"
                        className={inputClass}
                        autoComplete="organization"
                      />
                      {errors.businessName && (
                        <p className="mt-1 text-xs text-red-400">{errors.businessName}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="email" className={labelClass}>
                          Email *
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="hello@maison.cafe"
                          className={inputClass}
                          autoComplete="email"
                        />
                        {errors.email && (
                          <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="phone" className={labelClass}>
                          Phone
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+1 234 567 8900"
                          className={inputClass}
                          autoComplete="tel"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="businessType" className={labelClass}>
                        Business Type *
                      </label>
                      <select
                        id="businessType"
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleChange}
                        className={[inputClass, "cursor-pointer"].join(" ")}
                      >
                        <option value="">Select your business type</option>
                        <option value="cafe">Café / Coffee Shop</option>
                        <option value="restaurant">Restaurant</option>
                        <option value="barbershop">Barbershop / Salon</option>
                        <option value="fitness">Fitness / Gym</option>
                        <option value="retail">Retail</option>
                        <option value="wellness">Wellness / Spa</option>
                        <option value="food">Food & Drink</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.businessType && (
                        <p className="mt-1 text-xs text-red-400">{errors.businessType}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="message" className={labelClass}>
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Tell us about your business and what you're looking for..."
                        className={[inputClass, "resize-none"].join(" ")}
                      />
                      {errors.message && (
                        <p className="mt-1 text-xs text-red-400">{errors.message}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="w-full cursor-pointer bg-[#4F46E5] hover:bg-[#6366F1] text-white font-semibold py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/25 text-sm"
                    >
                      Send Message
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </ScrollReveal>

          {/* Right: contact info */}
          <ScrollReveal variants={slideRight}>
            <div className="flex flex-col gap-6">
              {/* Contact info card */}
              <div className="rounded-2xl border border-[#27272A] bg-[#111113] p-7">
                <h2 className="font-[family-name:var(--font-dm-sans)] font-bold text-[#F4F4F5] text-lg mb-6">
                  Contact Information
                </h2>
                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-lg bg-[#4F46E5]/15 border border-[#4F46E5]/20 flex items-center justify-center flex-shrink-0">
                      <Mail size={15} className="text-[#6366F1]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#52525B] mb-0.5">Email</p>
                      <a
                        href="mailto:hello@glyph.app"
                        className="text-sm text-[#F4F4F5] hover:text-[#6366F1] transition-colors duration-200"
                      >
                        hello@glyph.app
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-lg bg-[#4F46E5]/15 border border-[#4F46E5]/20 flex items-center justify-center flex-shrink-0">
                      <Phone size={15} className="text-[#6366F1]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#52525B] mb-0.5">Phone</p>
                      <a
                        href="tel:+44-20-0000-0000"
                        className="text-sm text-[#F4F4F5] hover:text-[#6366F1] transition-colors duration-200"
                      >
                        +44 20 0000 0000
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-lg bg-[#4F46E5]/15 border border-[#4F46E5]/20 flex items-center justify-center flex-shrink-0">
                      <Clock size={15} className="text-[#6366F1]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#52525B] mb-0.5">Response Time</p>
                      <p className="text-sm text-[#F4F4F5]">Within 1 business day</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-lg bg-[#4F46E5]/15 border border-[#4F46E5]/20 flex items-center justify-center flex-shrink-0">
                      <MapPin size={15} className="text-[#6366F1]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#52525B] mb-0.5">Headquarters</p>
                      <p className="text-sm text-[#F4F4F5]">London, United Kingdom</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Book a demo card */}
              <div className="rounded-2xl border border-[#4F46E5]/30 bg-[#4F46E5]/05 p-7">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#4F46E5] flex items-center justify-center flex-shrink-0">
                    <Clock size={18} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-dm-sans)] font-bold text-[#F4F4F5] mb-1">
                      Book a 15-min demo call
                    </h3>
                    <p className="text-sm text-[#71717A] leading-relaxed mb-4">
                      Skip the form. Pick a time that works for you and we&apos;ll show you Glyph live — for your specific type of business.
                    </p>
                    <a
                      href="https://calendly.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer inline-flex items-center gap-2 bg-[#4F46E5] hover:bg-[#6366F1] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all duration-200"
                    >
                      Schedule on Calendly
                    </a>
                  </div>
                </div>
              </div>

              {/* Promise */}
              <div className="rounded-2xl border border-[#27272A] bg-[#111113] p-6">
                <p className="text-sm text-[#52525B] italic text-center leading-relaxed">
                  &ldquo;We read every message ourselves. No bots, no ticketing systems — just a human who cares about helping your business grow.&rdquo;
                </p>
                <p className="text-center text-xs text-[#3F3F46] mt-3">— The Glyph Team</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
