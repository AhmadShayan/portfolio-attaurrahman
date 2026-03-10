import React, { useState, useRef } from "react";
import emailjs from "emailjs-com";
import { FaGithub, FaLinkedin, FaTwitter, FaMapMarkerAlt, FaCopy, FaCheck } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { HiArrowRight } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import portfolio from "../portfolio.json";

const socialIcons = {
  GitHub:   <FaGithub size={16} />,
  LinkedIn: <FaLinkedin size={16} />,
  X:        <FaTwitter size={16} />,
  Email:    <MdEmail size={16} />,
};

const socialColors = {
  GitHub:   "hover:border-zinc-700 hover:bg-zinc-800 hover:text-white",
  LinkedIn: "hover:border-blue-600 hover:bg-blue-600 hover:text-white",
  X:        "hover:border-sky-500 hover:bg-sky-500 hover:text-white",
  Email:    "hover:border-red-500 hover:bg-red-500 hover:text-white",
};

const inputCls =
  "w-full rounded-xl border border-black/10 dark:border-white/10 bg-zinc-50 dark:bg-zinc-800 px-4 py-3 text-sm outline-none placeholder:text-zinc-400 focus:border-purple-400 dark:focus:border-purple-500 focus:ring-2 focus:ring-purple-400/20 transition-all duration-200";

const EMAIL = "ar416.official@gmail.com";

const Contact = () => {
  const formRef = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    emailjs
      .sendForm("service_l8ccd29", "template_n9gdkoo", e.target, "xg43J3jzmOMb2K2sI")
      .then(
        () => {
          setStatus("success");
          formRef.current?.reset();
          setTimeout(() => setStatus("idle"), 5000);
        },
        () => {
          setStatus("error");
          setTimeout(() => setStatus("idle"), 5000);
        }
      );
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div>
      {/* ── Header ── */}
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-extrabold"
        >
          Get in{" "}
          <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-sky-500 bg-clip-text text-transparent">
            Touch
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-3 text-sm text-zinc-500 dark:text-zinc-400"
        >
          Have a project or role in mind? I'd love to connect.
        </motion.p>
        <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
      </div>

      {/* ── Two-column layout ── */}
      <div className="grid gap-8 md:grid-cols-[1fr_1.4fr]">
        {/* ── Left — info panel ── */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-5"
        >
          {/* CTA box */}
          <div className="rounded-2xl border border-black/[0.07] dark:border-white/[0.07] bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-purple-950/20 dark:via-pink-950/20 dark:to-indigo-950/20 p-6 relative overflow-hidden">
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-purple-300/20 dark:bg-purple-700/10 blur-2xl pointer-events-none" />
            <h3 className="text-lg font-bold mb-2 relative z-10">Let's build something great</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed relative z-10">
              I'm open to full-time roles, freelance projects, and collaboration
              opportunities. Send a message and I'll reply within 24 hours.
            </p>
          </div>

          {/* Location + Email quick-copy */}
          <div className="rounded-2xl border border-black/[0.07] dark:border-white/[0.07] bg-white dark:bg-zinc-900 p-5 flex flex-col gap-4">
            {/* Location */}
            <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-300">
              <span className="w-8 h-8 rounded-lg bg-pink-50 dark:bg-pink-950/40 border border-pink-200/60 dark:border-pink-800/40 flex items-center justify-center text-pink-500 shrink-0">
                <FaMapMarkerAlt size={13} />
              </span>
              <span className="font-medium">Lahore, Pakistan</span>
            </div>

            {/* Email + copy */}
            <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-300">
              <span className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200/60 dark:border-red-800/40 flex items-center justify-center text-red-500 shrink-0">
                <MdEmail size={15} />
              </span>
              <span className="font-medium flex-1 truncate">{EMAIL}</span>
              <button
                onClick={copyEmail}
                title="Copy email"
                className="w-7 h-7 rounded-lg border border-black/[0.07] dark:border-white/[0.07] flex items-center justify-center text-zinc-400 hover:text-purple-500 hover:border-purple-300 dark:hover:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-950/40 transition-all duration-200 shrink-0"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={copied ? "check" : "copy"}
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.7, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {copied ? <FaCheck size={10} className="text-green-500" /> : <FaCopy size={10} />}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
          </div>

          {/* Social links */}
          <div className="rounded-2xl border border-black/[0.07] dark:border-white/[0.07] bg-white dark:bg-zinc-900 p-5">
            <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-4">
              Find me on
            </p>
            <div className="flex flex-col gap-3">
              {portfolio.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 text-sm font-medium px-3 py-2 rounded-xl border border-black/[0.07] dark:border-white/[0.07] text-zinc-700 dark:text-zinc-300 transition-all duration-200 group ${socialColors[s.label] ?? ""}`}
                >
                  <span className="transition-transform group-hover:scale-110">
                    {socialIcons[s.label]}
                  </span>
                  {s.label}
                  <HiArrowRight size={12} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Right — form ── */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl border border-black/[0.07] dark:border-white/[0.07] bg-white dark:bg-zinc-900 p-6 shadow-sm"
        >
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-[11px] font-bold text-zinc-400 dark:text-zinc-500 mb-1.5 uppercase tracking-widest">
                  Name
                </label>
                <input required name="from_name" placeholder="Your name" className={inputCls} />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-zinc-400 dark:text-zinc-500 mb-1.5 uppercase tracking-widest">
                  Email
                </label>
                <input required type="email" name="reply_to" placeholder="you@example.com" className={inputCls} />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-zinc-400 dark:text-zinc-500 mb-1.5 uppercase tracking-widest">
                Subject
              </label>
              <input name="subject" placeholder="What's this about?" className={inputCls} />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-zinc-400 dark:text-zinc-500 mb-1.5 uppercase tracking-widest">
                Message
              </label>
              <textarea
                required
                name="message"
                placeholder="Tell me about your project or opportunity..."
                rows={5}
                className={inputCls + " resize-none"}
              />
            </div>

            {/* Status feedback */}
            <AnimatePresence mode="wait">
              {status === "success" && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="rounded-xl bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800/50 px-4 py-3 text-sm text-green-700 dark:text-green-400 flex items-center gap-2"
                >
                  ✅ Message sent! I'll reply within 24 hours.
                </motion.div>
              )}
              {status === "error" && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/50 px-4 py-3 text-sm text-red-700 dark:text-red-400 flex items-center gap-2"
                >
                  ❌ Something went wrong. Please try again or email me directly.
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={status === "sending"}
              className="btn-glow w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-2"
            >
              {status === "sending" ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Sending…
                </>
              ) : (
                <>Send Message <HiArrowRight size={15} /></>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
