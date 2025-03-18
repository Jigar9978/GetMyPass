'use client';
import Image from "next/image";
import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <div className="bg-gray-100">

      {/* 🟣 Hero Section with Purple Theme */}
      <section
        className="relative bg-gradient-to-br from-[#451e6e] to-[#2c0337] bg-center h-[300px] flex justify-center items-center text-white text-center px-4 overflow-hidden"
        style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?city,skyline')" }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-xl border border-white/30"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-purple-700 to-purple-300 drop-shadow-lg">
            CONTACT US
          </h2>
          <p className="max-w-xl mt-3 text-sm md:text-base text-purple-600">
            We're Here for You – Contact Our Support Team Today
          </p>
        </motion.div>
      </section>

      {/* 🟣 Contact Info Cards */}
      <section className="container mx-auto px-4 py-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          {[
            { icon: "📱", title: "Phone No.", text: "1-232-131-1400" },
            { icon: "📍", title: "Address", text: "Shri Chimanbhai Patel Institute" },
            { icon: "✉️", title: "E-mail", text: "getmypass@company.com" },
            { icon: "⏰", title: "Opening Hours", text: "24*7" }
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition border border-purple-100"
            >
              <div className="text-purple-600 text-4xl">{item.icon}</div>
              <h4 className="text-lg font-semibold mt-3 text-purple-800">{item.title}</h4>
              <p className="text-sm md:text-base text-gray-600">{item.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 🟣 Contact Form & Image */}
      <section className="container mx-auto px-4 pb-24 grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* 📝 Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <form className="bg-white p-8 shadow-xl rounded-2xl border border-purple-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="First Name" className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-purple-500" />
              <input type="text" placeholder="Last Name" className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-purple-500" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <input type="email" placeholder="E-mail" className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-purple-500" />
              <input type="text" placeholder="Phone" className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-purple-500" />
            </div>
            <textarea placeholder="Message" className="w-full p-3 border rounded-lg mt-4 h-32 focus:ring-2 focus:ring-purple-500"></textarea>
            <button className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:opacity-90 text-white p-3 rounded-lg mt-4 transition">
              SEND MESSAGE
            </button>
          </form>
        </motion.div>

        {/* 📷 Image Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center items-center"
        >
          <Image src="/contect.jpg" alt="Contact Illustration" width={320} height={320} className="w-3/4 md:w-80" />
        </motion.div>

      </section>

    </div>
  );
}
