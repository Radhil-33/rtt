'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageSquare, Clock, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const PHONE = '+919790699932';
const PHONE_DISPLAY = '+91 97906 99932';
const EMAIL = 'info@rashmitours.in';
const WA_URL = `https://wa.me/${PHONE}`;

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const set = (k: string, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.phone || !form.message) {
      toast.error('Please fill in required fields.');
      return;
    }

    try {
      setLoading(true);

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to send message');
      }

      toast.success('Message sent successfully!');
      setSent(true);

      setForm({
        name: '',
        phone: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      label: 'Call / WhatsApp',
      value: PHONE_DISPLAY,
      href: `tel:${PHONE}`,
      sub: 'Available 24/7',
    },
    {
      icon: Mail,
      label: 'Email Us',
      value: EMAIL,
      href: `mailto:${EMAIL}`,
      sub: 'Reply within 2 hours',
    },
    {
      icon: MapPin,
      label: 'Based In',
      value: 'Trichy, Tamil Nadu, India',
      href: undefined,
      sub: 'Serving all South India',
    },
    {
      icon: Clock,
      label: 'Working Hours',
      value: 'Open 24 Hours',
      href: undefined,
      sub: 'All days, all year',
    },
  ];

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <div
          style={{
            background:
              'linear-gradient(135deg, #0B2344 0%, #071523 100%)',
            padding: 'clamp(56px,8vw,100px) 16px',
            textAlign: 'center',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <span
              className="section-tag"
              style={{
                background: 'rgba(212,175,55,0.18)',
                color: '#D4AF37',
              }}
            >
              Get in Touch
            </span>

            <h1
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(30px,6vw,60px)',
                fontWeight: 700,
                color: 'white',
                marginBottom: 14,
              }}
            >
              Contact Us
            </h1>

            <p
              style={{
                color: 'rgba(248,246,240,0.7)',
                fontSize: 16,
                maxWidth: 440,
                margin: '0 auto',
              }}
            >
              We're always happy to help. Reach out for bookings,
              queries, or just to say hello!
            </p>
          </motion.div>
        </div>

        <div
          className="container"
          style={{ paddingTop: 56, paddingBottom: 72 }}
        >
          <div className="contact-grid">
            {/* Info cards */}
            <div>
              <h2
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 'clamp(22px,3vw,28px)',
                  fontWeight: 700,
                  color: 'var(--navy)',
                  marginBottom: 28,
                }}
              >
                How to Reach Us
              </h2>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                  marginBottom: 24,
                }}
              >
                {contactInfo.map(
                  ({ icon: Icon, label, value, href, sub }) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      style={{
                        display: 'flex',
                        gap: 14,
                        alignItems: 'flex-start',
                        padding: '18px 18px',
                        background: 'var(--bg-surface)',
                        borderRadius: 14,
                        border: '1px solid var(--border-light)',
                        transition: 'all 0.25s',
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-mid)';
                        (e.currentTarget as HTMLElement).style.boxShadow =
                          'var(--shadow-navy)';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-light)';
                        (e.currentTarget as HTMLElement).style.boxShadow =
                          'none';
                      }}
                    >
                      <div
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: 12,
                          background:
                            'linear-gradient(135deg, rgba(11,35,68,0.1), rgba(212,175,55,0.06))',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <Icon size={19} color="var(--text-heading)" />
                      </div>

                      <div>
                        <div
                          style={{
                            fontSize: 11,
                            color: 'var(--text-heading)',
                            fontWeight: 700,
                            letterSpacing: '0.5px',
                            textTransform: 'uppercase',
                            marginBottom: 3,
                          }}
                        >
                          {label}
                        </div>

                        {href ? (
                          <a
                            href={href}
                            style={{
                              fontSize: 14,
                              fontWeight: 600,
                              color: 'var(--text-heading)',
                              textDecoration: 'none',
                              wordBreak: 'break-word',
                            }}
                          >
                            {value}
                          </a>
                        ) : (
                          <div
                            style={{
                              fontSize: 14,
                              fontWeight: 600,
                              color: 'var(--text-heading)',
                            }}
                          >
                            {value}
                          </div>
                        )}

                        <div
                          style={{
                            fontSize: 12,
                            color: 'var(--text-muted)',
                            marginTop: 2,
                          }}
                        >
                          {sub}
                        </div>
                      </div>
                    </motion.div>
                  )
                )}
              </div>

              <a
                href={WA_URL}
                target="_blank"
                rel="noopener"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  background: '#25D366',
                  color: 'white',
                  padding: '14px 24px',
                  borderRadius: 50,
                  fontWeight: 600,
                  fontSize: 15,
                  textDecoration: 'none',
                  boxShadow:
                    '0 4px 18px rgba(37,211,102,0.28)',
                  transition: 'transform 0.2s',
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.transform =
                    'translateY(-2px)')
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.transform =
                    'none')
                }
              >
                <MessageSquare size={18} /> Chat on WhatsApp
              </a>
            </div>

            {/* Form */}
            <div
              style={{
                background: 'var(--bg-surface)',
                borderRadius: 20,
                padding: 'clamp(22px,4vw,40px)',
                boxShadow:
                  '0 8px 32px rgba(7,21,35,0.07)',
                border:
                  '1px solid rgba(11,35,68,0.07)',
              }}
            >
              {sent ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  style={{
                    textAlign: 'center',
                    padding: '32px 0',
                  }}
                >
                  <div
                    style={{
                      fontSize: 52,
                      marginBottom: 14,
                    }}
                  >
                    ✅
                  </div>

                  <h3
                    style={{
                      fontFamily:
                        'Playfair Display, serif',
                      fontSize: 22,
                      color: 'var(--navy)',
                      marginBottom: 10,
                    }}
                  >
                    Message Sent!
                  </h3>

                  <p
                    style={{
                      color: 'var(--text-body)',
                      lineHeight: 1.7,
                      fontSize: 14,
                    }}
                  >
                    Thank you! We&apos;ll get back to you
                    soon.
                  </p>

                  <button
                    onClick={() => setSent(false)}
                    className="btn-secondary"
                    style={{ marginTop: 22 }}
                  >
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <>
                  <h2
                    style={{
                      fontFamily:
                        'Playfair Display, serif',
                      fontSize:
                        'clamp(20px,2.5vw,24px)',
                      fontWeight: 700,
                      color: 'var(--navy)',
                      marginBottom: 26,
                    }}
                  >
                    Send Us a Message
                  </h2>

                  <form
                    onSubmit={handleSubmit}
                    autoComplete="off"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 16,
                    }}
                  >
                    <div className="contact-form-row">
                      <div>
                        <label className="form-label">
                          Your Name *
                        </label>

                        <input
                          className="form-input"
                          value={form.name}
                          onChange={(e) =>
                            set('name', e.target.value)
                          }
                          placeholder="Full name"
                          required
                          autoComplete="off"
                        />
                      </div>

                      <div>
                        <label className="form-label">
                          Phone *
                        </label>

                        <input
                          className="form-input"
                          value={form.phone}
                          onChange={(e) =>
                            set('phone', e.target.value)
                          }
                          placeholder="+91 97906 99932"
                          type="tel"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="form-label">
                        Email
                      </label>

                      <input
                        className="form-input"
                        value={form.email}
                        onChange={(e) =>
                          set('email', e.target.value)
                        }
                        placeholder="you@email.com"
                        type="email"
                      />
                    </div>

                    <div>
                      <label className="form-label">
                        Subject
                      </label>

                      <select
                        className="form-input"
                        value={form.subject}
                        onChange={(e) =>
                          set('subject', e.target.value)
                        }
                      >
                        <option value="">
                          Select a subject
                        </option>
                        <option>Booking Inquiry</option>
                        <option>
                          Package Information
                        </option>
                        <option>
                          Custom Tour Request
                        </option>
                        <option>
                          Complaint / Feedback
                        </option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="form-label">
                        Message *
                      </label>

                      <textarea
                        className="form-input"
                        value={form.message}
                        onChange={(e) =>
                          set(
                            'message',
                            e.target.value
                          )
                        }
                        placeholder="How can we help you?"
                        rows={5}
                        required
                        style={{
                          resize: 'vertical',
                        }}
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn-primary"
                      disabled={loading}
                      style={{
                        padding: '15px',
                        fontSize: 16,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        width: '100%',
                      }}
                    >
                      {loading ? (
                        <span>Sending...</span>
                      ) : (
                        <>
                          <Send size={16} />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>

                    <p
                      style={{
                        fontSize: 12,
                        color: 'var(--text-muted)',
                        textAlign: 'center',
                        lineHeight: 1.5,
                      }}
                    >
                      Your enquiry will be sent
                      securely to our team.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 36px;
          align-items: start;
        }

        .contact-form-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 14px;
        }

        @media (min-width: 540px) {
          .contact-form-row {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (min-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr 1.5fr;
            gap: 48px;
          }
        }
      `}</style>
    </>
  );
}