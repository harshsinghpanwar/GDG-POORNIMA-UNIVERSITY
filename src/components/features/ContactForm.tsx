import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Send, CheckCircle2, AlertCircle, AlertTriangle, RefreshCw } from 'lucide-react';
import { Field } from '../ui/Field';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';

export const ContactForm: React.FC = () => {
  const contactEndpoint = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_CONTACT_ENDPOINT) || '';
  const isEndpointConfigured = Boolean(contactEndpoint && contactEndpoint.startsWith('https://'));

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('General Community Inquiry');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState(''); // Hidden honeypot field (Section 8.9)

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const errorSummaryRef = useRef<HTMLDivElement>(null);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName) {
      errs.name = 'Please provide your name.';
    } else if (trimmedName.length > 80) {
      errs.name = 'Name must be 80 characters or fewer.';
    }

    if (!trimmedEmail) {
      errs.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      errs.email = 'Please enter a valid email address.';
    } else if (trimmedEmail.length > 100) {
      errs.email = 'Email address must be 100 characters or fewer.';
    }

    if (!topic) {
      errs.topic = 'Please select a topic.';
    }

    if (!trimmedMessage) {
      errs.message = 'Please provide a message.';
    } else if (trimmedMessage.length < 10) {
      errs.message = 'Message must be at least 10 characters.';
    } else if (trimmedMessage.length > 2000) {
      errs.message = 'Message must be 2000 characters or fewer.';
    }

    setErrors(errs);

    if (Object.keys(errs).length > 0) {
      setTimeout(() => {
        errorSummaryRef.current?.focus();
      }, 50);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEndpointConfigured || isSubmitting) return;

    // Honeypot check (Section 8.9, 13) - silent discard if filled
    if (honeypot) {
      setIsSuccess(true);
      return;
    }

    if (!validate()) return;

    setIsSubmitting(true);
    setServerError(null);

    try {
      const response = await fetch(contactEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          topic,
          message: message.trim()
        })
      });

      if (response.ok) {
        setIsSuccess(true);
        setName('');
        setEmail('');
        setMessage('');
        setErrors({});
      } else {
        const errorData = await response.json().catch(() => null);
        setServerError(
          (errorData && errorData.error) ||
          `Submission failed (${response.status}). Please verify your information or contact organizers directly.`
        );
      }
    } catch {
      setServerError('A network error occurred while connecting to the submission service. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FFFFFF] border border-[#E6E3DC] rounded-2xl p-6 sm:p-8 shadow-[0_4px_16px_-4px_rgba(21,23,26,0.06)]">
      <div className="mb-6">
        <h2 className="text-xl font-bold font-display text-[#15171A] mb-2">
          Send a Message to Organizers
        </h2>
        <p className="text-sm text-[#4B525C] leading-relaxed">
          Reach out regarding workshops, event attendance, or campus collaborations.
        </p>
      </div>

      {/* Prominent endpoint missing notice (Section 8.9) */}
      {!isEndpointConfigured && (
        <div 
          role="status"
          className="p-4 mb-6 rounded-xl bg-[#FEF7E0] border border-[#FEEFC3] text-xs text-[#5F4100] flex items-start gap-3"
        >
          <AlertTriangle className="w-5 h-5 text-[#F9AB00] shrink-0 mt-0.5" aria-hidden="true" />
          <div className="space-y-1">
            <span className="font-bold text-sm block">Contact Form Endpoint Not Connected</span>
            <p className="leading-relaxed">
              The contact form isn't connected yet; please reach out through the channels above (WhatsApp, Telegram, or LinkedIn).
            </p>
          </div>
        </div>
      )}

      {/* Success State (Section 8.9) */}
      {isSuccess ? (
        <div className="p-6 rounded-xl bg-[#E6F4EA] border border-[#CEEAD6] text-center space-y-3">
          <CheckCircle2 className="w-10 h-10 text-[#188038] mx-auto" aria-hidden="true" />
          <h3 className="text-lg font-bold text-[#137333]">Message Sent Successfully</h3>
          <p className="text-sm text-[#4B525C] max-w-md mx-auto">
            Thank you for reaching out. The chapter organizers will review your message.
          </p>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsSuccess(false)}
          >
            Send Another Message
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          
          {/* Error Summary (Accessible Section 8.9 & 11) */}
          {Object.keys(errors).length > 0 && (
            <div 
              ref={errorSummaryRef}
              tabIndex={-1}
              role="alert"
              aria-labelledby="error-summary-title"
              className="p-4 rounded-xl bg-[#FCE8E6] border border-[#FAD2CF] text-xs text-[#B31412] space-y-1 focus:outline-none"
            >
              <span id="error-summary-title" className="font-bold flex items-center gap-1.5 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>Please correct the errors before submitting:</span>
              </span>
              <ul className="list-disc list-inside space-y-0.5 pt-1 pl-1">
                {Object.values(errors).map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Server Error Alert with Retry (Section 8.9) */}
          {serverError && (
            <div role="alert" className="p-4 rounded-xl bg-[#FCE8E6] border border-[#FAD2CF] text-xs text-[#B31412] flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="flex-1 space-y-2">
                <p>{serverError}</p>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="inline-flex items-center gap-1 font-bold underline hover:no-underline"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Retry submission</span>
                </button>
              </div>
            </div>
          )}

          {/* Hidden Honeypot Field (Section 8.9 & Section 13) */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="contact-bot-field">Do not fill this field</label>
            <input
              type="text"
              id="contact-bot-field"
              name="_gotcha"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* Full Name */}
          <Field
            id="contact-name"
            label="Your Name"
            required
            error={errors.name}
          >
            <Input
              id="contact-name"
              name="name"
              type="text"
              value={name}
              disabled={!isEndpointConfigured || isSubmitting}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
              }}
              placeholder="e.g. Rahul Sharma"
              error={!!errors.name}
              aria-invalid={errors.name ? 'true' : 'false'}
              aria-describedby={errors.name ? 'contact-name-error' : undefined}
              maxLength={80}
            />
          </Field>

          {/* Email Address */}
          <Field
            id="contact-email"
            label="Email Address"
            required
            error={errors.email}
            helpText="We will only use this to respond to your inquiry."
          >
            <Input
              id="contact-email"
              name="email"
              type="email"
              value={email}
              disabled={!isEndpointConfigured || isSubmitting}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
              }}
              placeholder="student@poornima.edu.in"
              error={!!errors.email}
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'contact-email-error' : undefined}
              maxLength={100}
            />
          </Field>

          {/* Topic Select */}
          <Field
            id="contact-topic"
            label="Topic / Category"
            required
            error={errors.topic}
          >
            <select
              id="contact-topic"
              name="topic"
              value={topic}
              disabled={!isEndpointConfigured || isSubmitting}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#FFFFFF] border border-[#E6E3DC] text-[#15171A] text-sm focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:border-[#1A73E8] disabled:bg-[#F4F2EC] disabled:cursor-not-allowed cursor-pointer"
            >
              <option value="General Community Inquiry">General Community Inquiry</option>
              <option value="Workshops & Events Inquiry">Workshops & Events Inquiry</option>
              <option value="Student Project Collaboration">Student Project Collaboration</option>
              <option value="Beginner Learning Guidance">Beginner Learning Guidance</option>
            </select>
          </Field>

          {/* Message Textarea */}
          <Field
            id="contact-message"
            label="Your Message"
            required
            error={errors.message}
            helpText={`${message.length}/2000 characters`}
          >
            <Textarea
              id="contact-message"
              name="message"
              value={message}
              disabled={!isEndpointConfigured || isSubmitting}
              onChange={(e) => {
                setMessage(e.target.value);
                if (errors.message) setErrors(prev => ({ ...prev, message: '' }));
              }}
              placeholder="Describe your question or message for the chapter organizers..."
              rows={4}
              maxLength={2000}
              error={!!errors.message}
              aria-invalid={errors.message ? 'true' : 'false'}
              aria-describedby={errors.message ? 'contact-message-error' : undefined}
            />
          </Field>

          {/* Consent / Privacy Line (Section 8.9) */}
          <div className="pt-2">
            <p className="text-xs text-[#4B525C] leading-relaxed">
              By submitting this form, you acknowledge that your name, email, topic, and message will be processed solely to address your inquiry as described in our{' '}
              <Link to="/privacy" className="text-[#1557B0] underline hover:text-[#1A73E8]">
                Privacy Notice
              </Link>.
            </p>
          </div>

          {/* Submit Button */}
          <div className="pt-3">
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={!isEndpointConfigured || isSubmitting}
              loading={isSubmitting}
              icon={<Send className="w-4 h-4" />}
            >
              {isSubmitting ? 'Submitting...' : 'Send Message'}
            </Button>
          </div>

        </form>
      )}
    </div>
  );
};
