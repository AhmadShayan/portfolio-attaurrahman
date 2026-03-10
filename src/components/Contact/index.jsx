import React, { useState, useRef } from "react";
import emailjs from "emailjs-com";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import portfolio from "../portfolio.json";

const socialIcons = {
  GitHub: <FaGithub size={16} />,
  LinkedIn: <FaLinkedin size={16} />,
  X: <FaTwitter size={16} />,
  Email: <MdEmail size={16} />,
};

const inputCls =
  "w-full rounded-xl border border-black/10 dark:border-white/10 bg-zinc-50 dark:bg-zinc-800 px-4 py-3 text-sm outline-none placeholder:text-zinc-400 focus:border-purple-400 dark:focus:border-purple-500 focus:ring-2 focus:ring-purple-400/20 transition-all duration-200";

const Contact = () => {
  const formRef = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    emailjs
      .sendForm(
        "service_l8ccd29",
        "template_n9gdkoo",
        e.target,
        "xg43J3jzmOMb2K2sI"
      )
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

  return (
    <div>
      {/* Section header */}
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

      {/* Two-column layout */}
      <div className="grid gap-8 md:grid-cols-[1fr_1.4fr]">
        {/* Left — info panel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-6"
        >
          <div className="rounded-2xl border border-black/[0.07] dark:border-white/[0.07] bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 p-6">
            <h3 className="text-lg font-bold mb-2">Let's build something great</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              I'm open to full-time roles, freelance projects, and collaboration
              opportunities. Send me a message and I'll get back to you within 24 hours.
            </p>
          </div>

          {/* Social links */}
          <div className="rounded-2xl border border-black/[0.07] dark:border-white/[0.07] bg-white dark:bg-zinc-900 p-6">
            <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 mb-4 uppercase tracking-wide">
              Find me on
            </p>
            <div className="flex flex-col gap-3">
              {portfolio.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors group"
                >
                  <span className="w-8 h-8 rounded-lg border border-black/[0.07] dark:border-white/[0.07] bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center group-hover:border-purple-300 dark:group-hover:border-purple-700 group-hover:bg-purple-50 dark:group-hover:bg-purple-950/40 transition-all">
                    {socialIcons[s.label]}
                  </span>
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right — form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl border border-black/[0.07] dark:border-white/[0.07] bg-white dark:bg-zinc-900 p-6 shadow-sm"
        >
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase tracking-wide">
                  Name
                </label>
                <input required name="from_name" placeholder="Your name" className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase tracking-wide">
                  Email
                </label>
                <input required type="email" name="reply_to" placeholder="you@example.com" className={inputCls} />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase tracking-wide">
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
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
            >
              {status === "sending" ? "Sending…" : "Send Message →"}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
