
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (

<div className="min-h-screen flex flex-col bg-linear-to-b from-sky-50 via-white to-slate-100 text-gray-800"> {/* Header */} <Header />

 <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        theme="colored"
       containerStyle={{
          top: "90px", // 👈 pushes it down from the top (adjust for your header height)
          right: "20px",
        }}

         toastStyle={{
    background: "linear-gradient(to right, #e0f2fe, #f8fafc)",
    color: "#0369a1",
    fontWeight: 500,
    boxShadow: "0 4px 15px rgba(56, 189, 248, 0.25)",
    borderRadius: "12px",
    border: "1px solid rgba(186, 230, 253, 0.6)",
  }}

      />
     {/* Page content */}
<main className="flex-1 px-4 sm:px-8 md:px-12 py-6">
  <Outlet />
</main>

{/* Footer */}
<Footer />

 
    </div>
  );
}
