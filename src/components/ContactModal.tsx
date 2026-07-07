import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="bg-[#0C0C0C] border border-white/10 rounded-2xl p-6 sm:p-8 w-full max-w-md relative"
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-[#D7E2EA]/50 hover:text-[#D7E2EA] transition-colors text-xl leading-none"
              >
                ✕
              </button>
              <h2 className="text-[#D7E2EA] font-black uppercase text-2xl sm:text-3xl mb-6">
                Contact Me
              </h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const formData = new FormData(form);
                  const name = formData.get('name') as string;
                  const email = formData.get('email') as string;
                  const message = formData.get('message') as string;
                  window.location.href = `mailto:kavish@example.com?subject=Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}%0A%0AFrom: ${encodeURIComponent(email)}`;
                  onClose();
                }}
                className="flex flex-col gap-4"
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-[#D7E2EA] placeholder:text-[#D7E2EA]/30 focus:outline-none focus:border-[#8B5CF6] transition-colors text-sm"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-[#D7E2EA] placeholder:text-[#D7E2EA]/30 focus:outline-none focus:border-[#8B5CF6] transition-colors text-sm"
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  required
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-[#D7E2EA] placeholder:text-[#D7E2EA]/30 focus:outline-none focus:border-[#8B5CF6] transition-colors text-sm resize-none"
                />
                <button
                  type="submit"
                  className="w-full rounded-full font-medium uppercase tracking-widest text-white px-8 py-3 text-sm transition-opacity hover:opacity-90 active:opacity-75"
                  style={{
                    background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                    boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
                    outline: '2px solid #E3E3E3',
                    outlineOffset: '-3px',
                  }}
                >
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
