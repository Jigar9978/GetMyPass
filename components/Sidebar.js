'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { FiHome, FiGrid, FiUser, FiBell, FiCreditCard, FiBarChart2, FiSettings, FiMessageSquare, FiShoppingCart, FiCalendar, FiMenu, FiLogOut } from 'react-icons/fi';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter(); // ✅ router को यहाँ डिफाइन किया

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    router.push("/adminlogin"); 
  };

  const menuItems = [
    { name: 'Dashboard', href: '/admin/dasbord', icon: <FiHome size={20} /> },
    { name: 'Category Management', href: '/admin/categorymanagment', icon: <FiGrid size={20} /> },
    { name: 'User Management', href: '/admin/Usermanagement', icon: <FiUser size={20} /> },
    { name: 'Payment Management', href: '/admin/Payment', icon: <FiCreditCard size={20} /> },
    { name: 'List Your Event', href: '/admin/Listyourevent', icon: <FiCalendar size={20} /> },
  ];

  return (
    <motion.aside
      initial={{ width: isOpen ? 240 : 70 }}
      animate={{ width: isOpen ? 240 : 70 }}
      transition={{ duration: 0.3 }}
      className="bg-purple-700 text-white flex flex-col min-h-screen relative overflow-hidden backdrop-blur-lg bg-opacity-90 shadow-lg"
    >
      <div className="py-4 px-6 flex items-center justify-between border-b border-purple-500">
        <Link href="/admin">
          {isOpen && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="text-l font-bold">✨ Admin Panel ✨</motion.span>}
        </Link>
        <motion.button onClick={toggleSidebar} whileTap={{ scale: 0.9 }} className="text-white focus:outline-none">
          <FiMenu size={24} />
        </motion.button>
      </div>
      <nav className="flex-grow px-2 py-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <motion.li key={index} whileHover={{ scale: 1.1, backgroundColor: '#7E60BF' }} transition={{ duration: 0.2 }}>
              <Link
                href={item.href}
                className="flex items-center space-x-3 py-2 px-3 rounded transition"
              >
                {item.icon}
                {isOpen && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>{item.name}</motion.span>}
              </Link>
            </motion.li>
          ))}
          {/* ✅ Logout बटन सही से काम करने के लिए */}
          <motion.li whileHover={{ scale: 1.1, backgroundColor: '#7E60BF' }} transition={{ duration: 0.2 }}>
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 py-2 px-3 rounded transition text-left"
            >
              <FiLogOut size={20} />
              {isOpen && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>Logout</motion.span>}
            </button>
          </motion.li>
        </ul>
      </nav>
    </motion.aside>
  );
};

export default Sidebar;
