import React from 'react'
import emailjs from "emailjs-com";

const Card = ({ children, className = "" }) => (
  <div
    className={`rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900 shadow-sm ${className}`}
  >
    {children}
  </div>
);
const Button = ({ href, children, onClick, variant = "solid" }) => {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition active:scale-[.98]";
  const styles = {
    solid: "bg-black text-white dark:bg-white dark:text-black hover:opacity-90",
    outline:
      "border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5",
  };
  const C = href ? "a" : "button";
  return (
    <C href={href} onClick={onClick} className={`${base} ${styles[variant]}`}>
      {children}
    </C>
  );
};
const Contact = () => {
  return (
    <Card className="p-6">
            <h2 className="text-2xl font-bold">Contact</h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-300">
              Have a project or role in mind? Let’s talk.
            </p>
            <form
              className="mt-4 grid gap-3 sm:grid-cols-2"
              onSubmit={(e) => {
                e.preventDefault();
                emailjs
                  .sendForm(
                    "service_l8ccd29", // ✅ your EmailJS Service ID
                    "template_n9gdkoo", // ✅ your Template ID
                    e.target,
                    "xg43J3jzmOMb2K2sI" // ✅ your Public Key
                  )
                  .then(
                    () => {
                      alert("✅ Message sent successfully!");
                      e.target.reset();
                    },
                    (error) => {
                      alert("❌ Failed to send. " + error.text);
                    }
                  );
              }}
            >
              {/* Name */}
              <input
                required
                name="from_name" // 🔹 must match {{from_name}}
                placeholder="Your name"
                className="rounded-xl border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 outline-none"
              />

              {/* Email */}
              <input
                required
                type="email"
                name="reply_to" // 🔹 must match {{reply_to}}
                placeholder="Your email"
                className="rounded-xl border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 outline-none"
              />

              {/* Message */}
              <textarea
                required
                name="message" // 🔹 must match {{message}}
                placeholder="Message"
                rows={4}
                className="sm:col-span-2 rounded-xl border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 outline-none"
              />

              {/* Submit */}
              <div className="sm:col-span-2">
                <Button>Send</Button>
              </div>
            </form>
    </Card>
  )
}

export default Contact
