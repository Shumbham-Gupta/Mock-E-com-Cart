
import React, { useState } from "react";

export default function Footer() {
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (type) => setActiveModal(type);
  const closeModal = () => setActiveModal(null);

  const Modal = ({ title, content }) => (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <div className="bg-slate-900 text-gray-200 rounded-xl p-6 w-[90%] sm:w-[500px] shadow-2xl border border-sky-700">
        <h2 className="text-sky-400 text-xl font-semibold mb-3">{title}</h2>
        <p className="text-gray-300 text-sm leading-relaxed">{content}</p>
        <button
          onClick={closeModal}
          className="mt-5 bg-sky-600 hover:bg-sky-500 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );

  return (
    <>
      <footer className="mt-10 bg-linear-to-r from-slate-800 via-slate-900 to-sky-950 text-gray-200 text-center py-8 border-t border-sky-800 shadow-inner">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-sky-400 font-semibold text-lg">
            © {new Date().getFullYear()} VibeCommerce
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Crafted with 💙 by the VibeCommerce Team — All Rights Reserved
          </p>

          <div className="mt-4 flex justify-center gap-5 text-sm">
            <button
              onClick={() => openModal("privacy")}
              className="text-sky-400 hover:text-sky-300 font-medium transition-colors"
            >
              Privacy Policy
            </button>
            <span className="text-sky-600">|</span>
            <button
              onClick={() => openModal("terms")}
              className="text-sky-400 hover:text-sky-300 font-medium transition-colors"
            >
              Terms of Service
            </button>
            <span className="text-sky-600">|</span>
            <button
              onClick={() => openModal("contact")}
              className="text-sky-400 hover:text-sky-300 font-medium transition-colors"
            >
              Contact Us
            </button>
          </div>
        </div>
      </footer>

      {activeModal === "privacy" && (
        <Modal
          title="Privacy Policy"
          content="We value your privacy. Your personal data is used solely to improve your shopping experience. We never share your data with third parties without consent."
        />
      )}

      {activeModal === "terms" && (
        <Modal
          title="Terms of Service"
          content="By using VibeCommerce, you agree to our terms regarding orders, refunds, and fair usage. Products remain the property of VibeCommerce until full payment is received."
        />
      )}

      {activeModal === "contact" && (
        <Modal
          title="Contact Us"
          content="Have questions or feedback? Reach us anytime at shubham959gupta@gmail.com or through our help center on the Contact page."
        />
      )}
    </>
  );
}
