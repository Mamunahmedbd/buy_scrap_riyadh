'use client';

import { useState } from 'react';

interface ContactFormSectionProps {
  dict: {
    heading: string;
    subtext: string;
    phone: string;
    whatsapp: string;
    serviceArea: string;
    labels: {
      name: string;
      phone: string;
      email: string;
      scrapType: string;
      location: string;
      description: string;
      submit: string;
    };
    placeholder: {
      name: string;
      phone: string;
      email: string;
      scrapType: string;
      location: string;
      description: string;
    };
    options: string[];
    successMsg: string;
    validation: {
      name: string;
      phone: string;
      generic: string;
    };
  };
  locale: string;
}

export default function ContactFormSection({ dict, locale }: ContactFormSectionProps) {
  const isRtl = locale === 'ar';

  // State Management
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    scrapType: '',
    location: '',
    description: '',
  });

  const [errors, setErrors] = useState<{ name?: string; phone?: string; generic?: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form Inputs Handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error on change
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validations
    const newErrors: typeof errors = {};
    if (!formData.name.trim()) {
      newErrors.name = dict.validation.name;
    }
    if (!formData.phone.trim()) {
      newErrors.phone = dict.validation.phone;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit Simulation
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Reset Form
      setFormData({
        name: '',
        phone: '',
        email: '',
        scrapType: '',
        location: '',
        description: '',
      });
    }, 1200);
  };

  const formattedPhone = dict.phone.replace(/[^\d+]/g, '');

  return (
    <section 
      className="w-full py-16 md:py-24 px-4 bg-white" 
      id="contact"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Direct Call details */}
        <div className="lg:col-span-5 flex flex-col items-start text-start gap-6">
          <h2 id="contact-heading" className="text-3xl md:text-4.5xl font-black text-primary-dark leading-tight">
            {dict.heading}
          </h2>
          
          <p className="text-text-muted text-base md:text-lg leading-relaxed">
            {dict.subtext}
          </p>

          <div className="flex flex-col gap-4 w-full mt-4">
            
            {/* Direct Phone link card */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-primary/5 border border-primary/10">
              <span className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shrink-0">
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </span>
              <div>
                <span className="block text-xs text-text-muted font-bold uppercase tracking-wider">
                  {locale === 'ar' ? 'اتصال مباشر' : 'Call Us Directly'}
                </span>
                <a href={`tel:${formattedPhone}`} className="text-lg md:text-xl font-mono font-black text-primary-dark hover:text-secondary-dark transition-colors select-all">
                  {dict.phone}
                </a>
              </div>
            </div>

            {/* Direct WhatsApp link card */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-whatsapp/5 border border-whatsapp/15">
              <span className="w-12 h-12 rounded-full bg-whatsapp text-white flex items-center justify-center shrink-0">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.012 2c-5.506 0-9.988 4.482-9.988 9.988 0 1.76.46 3.48 1.332 5.006L2 22l5.184-1.36c1.468.8 3.12 1.228 4.82 1.228h.008c5.506 0 9.992-4.486 9.992-9.992C22.004 6.48 17.518 2 12.012 2zm0 18.294h-.006c-1.506 0-2.986-.406-4.278-1.176l-.308-.182-3.184.836.85-3.104-.2-.318c-.846-1.344-1.294-2.9-1.294-4.502 0-4.66 3.792-8.452 8.456-8.452 2.256 0 4.38.88 5.976 2.476a8.396 8.396 0 012.472 5.984c.002 4.66-3.792 8.454-8.458 8.454z"/>
                </svg>
              </span>
              <div>
                <span className="block text-xs text-text-muted font-bold uppercase tracking-wider">
                  {locale === 'ar' ? 'محادثة فورية' : 'WhatsApp Chat'}
                </span>
                <a href={`https://wa.me/${formattedPhone}`} target="_blank" rel="noopener noreferrer" className="text-lg md:text-xl font-mono font-black text-whatsapp hover:text-whatsapp-dark transition-colors">
                  {dict.whatsapp}
                </a>
              </div>
            </div>

            {/* Service coverage area info */}
            <div className="flex items-center gap-3 text-xs md:text-sm text-text-muted font-semibold mt-4">
              <svg className="w-5 h-5 text-secondary shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{dict.serviceArea}</span>
            </div>

          </div>
        </div>

        {/* Right Column: Contact form visual */}
        <div className="lg:col-span-7 bg-gray-50 border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm">
          
          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center py-12 text-center gap-4 animate-fadeIn" id="form-success-banner">
              <div className="w-16 h-16 rounded-full bg-whatsapp/15 text-whatsapp flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-black text-primary-dark">
                {locale === 'ar' ? 'تم الإرسال بنجاح!' : 'Submitted Successfully!'}
              </h3>
              <p className="text-text-muted max-w-sm leading-relaxed">
                {dict.successMsg}
              </p>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="mt-6 px-6 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary-light transition-colors text-sm cursor-pointer"
              >
                {locale === 'ar' ? 'إرسال رد آخر' : 'Submit Another Request'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-start" id="contact-form" noValidate>
              
              {/* Row: Name and Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-xs font-bold text-primary-dark">
                    {dict.labels.name}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={dict.placeholder.name}
                    className={`w-full px-4 py-3 bg-white border rounded-xl text-sm focus:outline-none transition-all ${
                      errors.name 
                        ? 'border-red-500 focus:ring-1 focus:ring-red-500' 
                        : 'border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary'
                    }`}
                  />
                  {errors.name && <span className="text-red-500 text-xs font-medium">{errors.name}</span>}
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="phone" className="text-xs font-bold text-primary-dark">
                    {dict.labels.phone}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={dict.placeholder.phone}
                    className={`w-full px-4 py-3 bg-white border rounded-xl text-sm focus:outline-none transition-all ${
                      errors.phone 
                        ? 'border-red-500 focus:ring-1 focus:ring-red-500' 
                        : 'border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary'
                    }`}
                  />
                  {errors.phone && <span className="text-red-500 text-xs font-medium">{errors.phone}</span>}
                </div>
              </div>

              {/* Row: Email and Scrap Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-xs font-bold text-primary-dark">
                    {dict.labels.email}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={dict.placeholder.email}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>

                {/* Scrap Type */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="scrapType" className="text-xs font-bold text-primary-dark">
                    {dict.labels.scrapType}
                  </label>
                  <select
                    id="scrapType"
                    name="scrapType"
                    value={formData.scrapType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-text-dark cursor-pointer"
                  >
                    <option value="">{dict.placeholder.scrapType}</option>
                    {dict.options.map((opt, idx) => (
                      <option key={idx} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Neighborhood Location */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="location" className="text-xs font-bold text-primary-dark">
                  {dict.labels.location}
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder={dict.placeholder.location}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
              </div>

              {/* Description Message Text */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="description" className="text-xs font-bold text-primary-dark">
                  {dict.labels.description}
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder={dict.placeholder.description}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-y"
                />
              </div>

              {/* Form Validation Feedback Banner */}
              {Object.keys(errors).length > 0 && (
                <div className="text-red-500 text-xs font-semibold py-1">
                  {dict.validation.generic}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-secondary hover:bg-secondary-light text-primary-dark font-black py-4 rounded-xl text-base transition-all duration-200 shadow-md hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none mt-2 cursor-pointer"
              >
                {isSubmitting 
                  ? (locale === 'ar' ? 'جاري الإرسال...' : 'Submitting...') 
                  : dict.labels.submit
                }
              </button>

            </form>
          )}

        </div>

      </div>
    </section>
  );
}
