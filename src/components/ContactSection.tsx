import React, { useState, useEffect } from 'react';
import {
  Phone,
  MapPin,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Mail,
} from 'lucide-react';
import {
  COMPANY_CONTACT,
  SERVICE_INQUIRY_OPTIONS,
  ServiceInquiryOption,
  validateContactForm,
  ContactFormInput,
} from '../utils/waterCycleLogic';

interface ContactSectionProps {
  selectedService: ServiceInquiryOption;
  suggestedProblemMessage: string;
  onServiceChange: (service: ServiceInquiryOption) => void;
}

type SubmissionStatus =
  | { type: 'idle' }
  | { type: 'submitting' }
  | {
      type: 'delivered';
      record: ContactFormInput;
    }
  | {
      type: 'endpoint-not-configured';
      record: ContactFormInput;
    }
  | {
      type: 'error';
      errorMessage: string;
    };

export const ContactSection: React.FC<ContactSectionProps> = ({
  selectedService,
  suggestedProblemMessage,
  onServiceChange,
}) => {
  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<{
    name?: string;
    contactInfo?: string;
    service?: string;
    message?: string;
  }>({});
  const [status, setStatus] = useState<SubmissionStatus>({ type: 'idle' });

  const formEndpoint = (
    (import.meta as unknown as { env?: Record<string, string | undefined> }).env
      ?.VITE_CONTACT_FORM_ENDPOINT || ''
  ).trim();

  useEffect(() => {
    if (suggestedProblemMessage) {
      setMessage((prev) => (prev.trim() === '' ? suggestedProblemMessage : prev));
    }
  }, [suggestedProblemMessage]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formPayload: ContactFormInput = {
      name,
      contactInfo,
      service: selectedService,
      message,
      honeypot,
    };

    const validation = validateContactForm(formPayload);
    if (validation.isSpam) {
      return;
    }
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    const cleanRecord: ContactFormInput = {
      name: name.trim(),
      contactInfo: contactInfo.trim(),
      service: selectedService,
      message: message.trim(),
    };

    // Per PDF Section 5.G:
    // "If the endpoint is not configured, do not silently pretend the form has been sent;
    // instead show the phone and Instagram contact options and a transparent form-unavailable notice."
    if (!formEndpoint) {
      setStatus({
        type: 'endpoint-not-configured',
        record: cleanRecord,
      });
      return;
    }

    setStatus({ type: 'submitting' });
    try {
      const response = await fetch(formEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(cleanRecord),
      });

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      setStatus({
        type: 'delivered',
        record: cleanRecord,
      });
    } catch {
      setStatus({
        type: 'error',
        errorMessage:
          'Unable to send your message right now. Please contact Water Cycle directly by phone or Instagram below.',
      });
    }
  };

  const handleReset = () => {
    setStatus({ type: 'idle' });
    setName('');
    setContactInfo('');
    setMessage('');
    setHoneypot('');
    setErrors({});
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-20 bg-[#62A1C2] text-white"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact Details (Adma, Lebanon • +961 3 058 204 • Instagram • Facebook) */}
          <div className="lg:col-span-5">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#ABCDE9] text-[#063D5B] text-xs font-bold tracking-wider uppercase mb-3">
              Contact Us
            </span>
            <h1
              id="contact-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight text-balance"
            >
              Let&rsquo;s Talk About Your Water Project
            </h1>
            <p className="mt-3 text-base text-[#EFF7FD] leading-relaxed">
              Tell us what you need, and Water Cycle can discuss the right next step with you.
            </p>

            <div className="mt-8 space-y-4">
              {/* Clickable Telephone */}
              <a
                href={COMPANY_CONTACT.phoneHref}
                className="flex items-start gap-4 p-4 rounded-2xl bg-[#063D5B] border-2 border-[#156D95] hover:border-[#ABCDE9] transition-colors group shadow-sm"
              >
                <div className="w-11 h-11 rounded-xl bg-[#ABCDE9] text-[#063D5B] flex items-center justify-center shrink-0 group-hover:bg-white transition-colors">
                  <Phone className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <span className="block text-xs font-semibold text-[#ABCDE9]">
                    Telephone
                  </span>
                  <span className="mt-0.5 block text-lg font-bold text-white tabular-nums tracking-wide">
                    {COMPANY_CONTACT.phoneDisplay}
                  </span>
                </div>
              </a>

              {/* Clickable Location: Adma, Lebanon (Opens Google Maps) */}
              <a
                href={COMPANY_CONTACT.locationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 rounded-2xl bg-[#063D5B] border-2 border-[#156D95] hover:border-[#ABCDE9] transition-colors group shadow-sm"
              >
                <div className="w-11 h-11 rounded-xl bg-[#ABCDE9] text-[#063D5B] flex items-center justify-center shrink-0 group-hover:bg-white transition-colors">
                  <MapPin className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <span className="block text-xs font-semibold text-[#ABCDE9]">
                    Location (Open in Google Maps)
                  </span>
                  <span className="mt-0.5 inline-flex items-center gap-1.5 text-base font-bold text-white group-hover:text-[#ABCDE9] transition-colors">
                    <span>{COMPANY_CONTACT.location}</span>
                    <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
                  </span>
                </div>
              </a>

              {/* Clickable Instagram */}
              <a
                href={COMPANY_CONTACT.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 rounded-2xl bg-[#063D5B] border-2 border-[#156D95] hover:border-[#ABCDE9] transition-colors group shadow-sm"
              >
                <div className="w-11 h-11 rounded-xl bg-[#ABCDE9] text-[#063D5B] flex items-center justify-center shrink-0 group-hover:bg-white transition-colors">
                  <ExternalLink className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <span className="block text-xs font-semibold text-[#ABCDE9]">
                    Instagram
                  </span>
                  <span className="mt-0.5 block text-base font-bold text-white">
                    {COMPANY_CONTACT.instagramHandle}
                  </span>
                </div>
              </a>

              {/* Clickable Facebook */}
              <a
                href={COMPANY_CONTACT.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 rounded-2xl bg-[#063D5B] border-2 border-[#156D95] hover:border-[#ABCDE9] transition-colors group shadow-sm"
              >
                <div className="w-11 h-11 rounded-xl bg-[#ABCDE9] text-[#063D5B] flex items-center justify-center shrink-0 group-hover:bg-white transition-colors">
                  <ExternalLink className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <span className="block text-xs font-semibold text-[#ABCDE9]">
                    Facebook
                  </span>
                  <span className="mt-0.5 block text-base font-bold text-white">
                    facebook.com/watercycle
                  </span>
                </div>
              </a>

              {/* Optional Verified Email (Hidden until verifiedEmail is populated in siteContent.ts) */}
              {COMPANY_CONTACT.verifiedEmail && (
                <a
                  href={`mailto:${COMPANY_CONTACT.verifiedEmail}`}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-[#063D5B] border-2 border-[#156D95] hover:border-[#ABCDE9] transition-colors group shadow-sm"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#ABCDE9] text-[#063D5B] flex items-center justify-center shrink-0 group-hover:bg-white transition-colors">
                    <Mail className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-[#ABCDE9]">
                      Email
                    </span>
                    <span className="mt-0.5 block text-base font-bold text-white break-all">
                      {COMPANY_CONTACT.verifiedEmail}
                    </span>
                  </div>
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Contact / Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#063D5B] text-white rounded-2xl border-2 border-[#156D95] p-6 sm:p-8 shadow-md">
              {status.type === 'delivered' ? (
                <div
                  data-testid="contact-submission-confirmation"
                  className="py-4"
                >
                  <div className="w-12 h-12 rounded-full bg-[#ABCDE9] text-[#063D5B] flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <h2 className="text-xl font-bold text-white">
                    Message Sent
                  </h2>
                  <p className="mt-2 text-sm text-[#DCEBFA] leading-relaxed">
                    Thank you, <span className="font-bold text-white">{status.record.name}</span>. Your message regarding <span className="font-bold text-white">{status.record.service}</span> has been sent to Water Cycle.
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-5 py-2.5 text-sm font-bold text-[#063D5B] bg-[#ABCDE9] hover:bg-[#C6E0F5] rounded-full transition-colors cursor-pointer"
                    >
                      Send Another Inquiry
                    </button>
                    <a
                      href={COMPANY_CONTACT.phoneHref}
                      className="px-5 py-2.5 text-sm font-bold text-white bg-[#156D95] hover:bg-[#62A1C2] rounded-full transition-colors"
                    >
                      Call {COMPANY_CONTACT.phoneDisplay}
                    </a>
                  </div>
                </div>
              ) : status.type === 'endpoint-not-configured' ? (
                <div
                  data-testid="contact-submission-confirmation"
                  className="py-2"
                >
                  <div className="w-12 h-12 rounded-full bg-[#ABCDE9] text-[#063D5B] flex items-center justify-center mb-4">
                    <AlertCircle className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <h2 className="text-xl font-bold text-white">
                    Online Form Endpoint Not Connected Yet
                  </h2>
                  <p className="mt-2 text-sm text-[#DCEBFA] leading-relaxed">
                    Direct web form delivery (<code className="text-white">VITE_CONTACT_FORM_ENDPOINT</code>) is not configured yet. Please reach Water Cycle directly by telephone or Instagram using your prepared details below:
                  </p>

                  <dl className="mt-5 p-4 rounded-xl bg-[#156D95]/60 border border-[#62A1C2] text-xs space-y-2">
                    <div className="flex justify-between gap-4">
                      <dt className="text-[#ABCDE9]">Name:</dt>
                      <dd className="font-bold text-white">{status.record.name}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-[#ABCDE9]">Service Needed:</dt>
                      <dd className="font-bold text-white">{status.record.service}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-[#ABCDE9]">Phone / Email:</dt>
                      <dd className="font-bold text-white">{status.record.contactInfo}</dd>
                    </div>
                    <div className="pt-2 border-t border-[#62A1C2]/60">
                      <dt className="text-[#ABCDE9] mb-1">Your Message:</dt>
                      <dd className="text-white">{status.record.message}</dd>
                    </div>
                  </dl>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <a
                      href={COMPANY_CONTACT.phoneHref}
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-[#063D5B] bg-[#ABCDE9] hover:bg-[#C6E0F5] rounded-full transition-colors"
                    >
                      <Phone className="w-4 h-4" aria-hidden="true" />
                      <span>Call {COMPANY_CONTACT.phoneDisplay}</span>
                    </a>
                    <a
                      href={COMPANY_CONTACT.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-[#156D95] hover:bg-[#62A1C2] rounded-full transition-colors"
                    >
                      <span>Message on Instagram ({COMPANY_CONTACT.instagramHandle})</span>
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-4 py-2.5 text-xs font-semibold text-[#ABCDE9] hover:text-white underline underline-offset-4 cursor-pointer"
                    >
                      Edit Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div>
                    <h2 className="text-lg font-bold text-white">
                      Send an Inquiry
                    </h2>
                    <p className="mt-1 text-sm text-[#ABCDE9]">
                      Share your project details below or call us directly at {COMPANY_CONTACT.phoneDisplay}.
                    </p>
                  </div>

                  {/* Anti-spam Honeypot Field (hidden from human visitors) */}
                  <div className="sr-only" aria-hidden="true">
                    <label htmlFor="contact-website">Website</label>
                    <input
                      id="contact-website"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  {status.type === 'error' && (
                    <div
                      role="alert"
                      className="p-3.5 rounded-xl bg-red-950/80 border border-red-400 text-xs text-red-100"
                    >
                      {status.errorMessage}
                    </div>
                  )}

                  {/* Name */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-sm font-semibold text-[#ABCDE9] mb-1.5"
                    >
                      Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                      }}
                      placeholder="Your full name"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'contact-name-error' : undefined}
                      className={`w-full px-4 py-2.5 text-sm rounded-xl border-2 bg-[#C6E0F5] text-[#063D5B] font-medium placeholder:text-[#156D95]/80 focus:outline-none focus:ring-2 focus:ring-[#ABCDE9] ${
                        errors.name ? 'border-red-400' : 'border-[#62A1C2]'
                      }`}
                    />
                    {errors.name && (
                      <p
                        id="contact-name-error"
                        role="alert"
                        className="mt-1.5 text-xs font-semibold text-red-300"
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Phone or Email */}
                  <div>
                    <label
                      htmlFor="contact-info"
                      className="block text-sm font-semibold text-[#ABCDE9] mb-1.5"
                    >
                      Phone or Email
                    </label>
                    <input
                      id="contact-info"
                      name="contactInfo"
                      type="text"
                      value={contactInfo}
                      onChange={(e) => {
                        setContactInfo(e.target.value);
                        if (errors.contactInfo) {
                          setErrors((prev) => ({ ...prev, contactInfo: undefined }));
                        }
                      }}
                      placeholder="+961 3 058 204 or your@email.com"
                      aria-invalid={Boolean(errors.contactInfo)}
                      aria-describedby={
                        errors.contactInfo ? 'contact-info-error' : undefined
                      }
                      className={`w-full px-4 py-2.5 text-sm rounded-xl border-2 bg-[#C6E0F5] text-[#063D5B] font-medium placeholder:text-[#156D95]/80 focus:outline-none focus:ring-2 focus:ring-[#ABCDE9] ${
                        errors.contactInfo ? 'border-red-400' : 'border-[#62A1C2]'
                      }`}
                    />
                    {errors.contactInfo && (
                      <p
                        id="contact-info-error"
                        role="alert"
                        className="mt-1.5 text-xs font-semibold text-red-300"
                      >
                        {errors.contactInfo}
                      </p>
                    )}
                  </div>

                  {/* Service Needed Dropdown */}
                  <div>
                    <label
                      htmlFor="contact-service"
                      className="block text-sm font-semibold text-[#ABCDE9] mb-1.5"
                    >
                      Service Needed
                    </label>
                    <select
                      id="contact-service"
                      name="service"
                      value={selectedService}
                      onChange={(e) =>
                        onServiceChange(e.target.value as ServiceInquiryOption)
                      }
                      className="w-full px-4 py-2.5 text-sm rounded-xl border-2 border-[#62A1C2] bg-[#C6E0F5] text-[#063D5B] font-semibold focus:outline-none focus:ring-2 focus:ring-[#ABCDE9]"
                    >
                      {SERVICE_INQUIRY_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-sm font-semibold text-[#ABCDE9] mb-1.5"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (errors.message) {
                          setErrors((prev) => ({ ...prev, message: undefined }));
                        }
                      }}
                      placeholder="Tell us what you need..."
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={
                        errors.message ? 'contact-message-error' : undefined
                      }
                      className={`w-full px-4 py-2.5 text-sm rounded-xl border-2 bg-[#C6E0F5] text-[#063D5B] font-medium placeholder:text-[#156D95]/80 focus:outline-none focus:ring-2 focus:ring-[#ABCDE9] ${
                        errors.message ? 'border-red-400' : 'border-[#62A1C2]'
                      }`}
                    />
                    {errors.message && (
                      <p
                        id="contact-message-error"
                        role="alert"
                        className="mt-1.5 text-xs font-semibold text-red-300"
                      >
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={status.type === 'submitting'}
                    className="w-full sm:w-auto px-8 py-3.5 text-sm font-bold text-[#063D5B] bg-[#ABCDE9] hover:bg-[#C6E0F5] disabled:opacity-60 rounded-full transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-sm"
                  >
                    {status.type === 'submitting' ? 'Sending...' : 'Contact Us'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
