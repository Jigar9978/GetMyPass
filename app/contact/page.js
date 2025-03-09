"use client";
import Image from "next/image";

export default function ContactPage() {
  return (
    <div className="bg-gray-100">
      
      {/* 🏙️ Hero Section */}
      <section
        className="bg-gradient-to-br from-[#2C1A35] to-[#A355B8] bg-center h-[200px] flex flex-col justify-center items-center text-white text-center px-4"
        style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?city,skyline')" }}
      >
        <h2 className="text-3xl md:text-4xl font-extrabold">CONTACT US</h2>
        <p className="max-w-xl mt-2 text-sm md:text-base">Were Here for You – Contact Our Support Team Today</p>    
      </section>

      {/* 📌 Contact Info (Responsive Grid) */}
      <section className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { icon: "📱", title: "Phone No.", text: "1-232-131-1400" },
            { icon: "📍", title: "Address", text: "Shri Chimanbhai Patel Institute" },
            { icon: "✉️", title: "E-mail", text: "getmypass@company.com" },
            { icon: "⏰", title: "Opening Hours", text: "24*7" }
          ].map((item, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <div className="text-pink-600 text-3xl md:text-4xl">{item.icon}</div>
              <h4 className="text-lg font-semibold mt-2">{item.title}</h4>
              <p className="text-sm md:text-base">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 📧 Contact Form & Image (Responsive Flex/Grid) */}
      <section className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* 📝 Contact Form */}
        <div>
          <form className="bg-white p-6 shadow-lg rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="First Name" className="p-3 border rounded-lg w-full" />
              <input type="text" placeholder="Last Name" className="p-3 border rounded-lg w-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <input type="email" placeholder="E-mail" className="p-3 border rounded-lg w-full" />
              <input type="text" placeholder="Phone" className="p-3 border rounded-lg w-full" />
            </div>
            <textarea placeholder="Message" className="w-full p-3 border rounded-lg mt-4 h-32"></textarea>
            <button className="w-full bg-[#a355b8] hover:translate-y-[5px] text-white p-3 rounded-lg mt-4  transition">
              SEND MESSAGE
            </button>
          </form>
        </div>

        {/* 📷 Image Section */}
        <div className="flex justify-center items-center">
          <Image src="/images/contact.png" alt="Contact Illustration" width={320} height={320} className="w-3/4 md:w-80" />
        </div>

      </section>

    </div>
  );
}
