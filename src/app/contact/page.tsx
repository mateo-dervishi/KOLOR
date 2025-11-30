'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-24">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="pt-16 pb-16 max-w-2xl"
        >
          <p className="font-mono text-[10px] tracking-widest text-grey-mid mb-4">
            001 — CONTACT
          </p>
          <h1 className="font-display text-huge mb-6">
            GET IN TOUCH
          </h1>
          <p className="font-mono text-[12px] text-grey-light leading-relaxed">
            Have a question, feedback, or just want to say hi? We&apos;d love to 
            hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {isSubmitted ? (
              <div className="py-16">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <p className="font-display text-4xl mb-4">MESSAGE SENT</p>
                  <p className="font-mono text-[12px] text-grey-light mb-8">
                    Thank you for reaching out. We&apos;ll be in touch soon.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="font-mono text-[11px] tracking-widest text-white hover:text-kolor-orange transition-colors underline"
                  >
                    SEND ANOTHER MESSAGE
                  </button>
                </motion.div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="font-mono text-[10px] tracking-widest text-grey-mid block mb-2">
                      NAME
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b border-grey-dark py-3 font-mono text-[12px] text-white focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[10px] tracking-widest text-grey-mid block mb-2">
                      EMAIL
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b border-grey-dark py-3 font-mono text-[12px] text-white focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-mono text-[10px] tracking-widest text-grey-mid block mb-2">
                    SUBJECT
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-grey-dark py-3 font-mono text-[12px] text-white focus:outline-none focus:border-white transition-colors"
                  >
                    <option value="" className="bg-black">SELECT...</option>
                    <option value="order" className="bg-black">ORDER INQUIRY</option>
                    <option value="product" className="bg-black">PRODUCT QUESTION</option>
                    <option value="returns" className="bg-black">RETURNS & EXCHANGES</option>
                    <option value="wholesale" className="bg-black">WHOLESALE</option>
                    <option value="other" className="bg-black">OTHER</option>
                  </select>
                </div>

                <div>
                  <label className="font-mono text-[10px] tracking-widest text-grey-mid block mb-2">
                    MESSAGE
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full bg-transparent border border-grey-dark p-4 font-mono text-[12px] text-white focus:outline-none focus:border-white transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-white text-black font-mono text-[11px] tracking-widest hover:bg-kolor-orange transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                </button>
              </form>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-12"
          >
            <div>
              <p className="font-mono text-[10px] tracking-widest text-grey-mid mb-4">
                EMAIL
              </p>
              <a
                href="mailto:hello@kolor.com"
                className="font-mono text-[14px] text-white hover:text-kolor-orange transition-colors"
              >
                hello@kolor.com
              </a>
            </div>

            <div>
              <p className="font-mono text-[10px] tracking-widest text-grey-mid mb-4">
                FOLLOW
              </p>
              <div className="flex flex-col gap-2">
                {['INSTAGRAM', 'TIKTOK', 'TWITTER'].map((social) => (
                  <a
                    key={social}
                    href={`https://${social.toLowerCase()}.com/kolor`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[12px] text-white hover:text-kolor-orange transition-colors"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="font-mono text-[10px] tracking-widest text-grey-mid mb-4">
                RESPONSE TIME
              </p>
              <p className="font-mono text-[12px] text-grey-light">
                We typically respond within 24-48 hours during business days.
              </p>
            </div>
          </motion.div>
        </div>

        {/* FAQ */}
        <section className="mt-24 pt-16 border-t border-grey-dark">
          <p className="font-mono text-[10px] tracking-widest text-grey-mid mb-8">
            002 — FAQ
          </p>
          <div className="max-w-3xl space-y-0">
            {[
              { q: 'What is your shipping policy?', a: 'Free shipping on orders over $150. Standard shipping takes 5-7 business days.' },
              { q: 'How do returns work?', a: 'We accept returns within 30 days for unworn items with tags attached.' },
              { q: 'Do you ship internationally?', a: 'Yes, we ship to most countries worldwide. Shipping rates vary by location.' },
              { q: 'How can I track my order?', a: 'Once shipped, you\'ll receive an email with tracking information.' },
            ].map((faq, i) => (
              <details key={i} className="group border-b border-grey-dark">
                <summary className="flex justify-between items-center cursor-pointer py-6">
                  <span className="font-mono text-[12px] text-white">{faq.q}</span>
                  <span className="font-mono text-grey-mid group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="font-mono text-[12px] text-grey-light pb-6">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
