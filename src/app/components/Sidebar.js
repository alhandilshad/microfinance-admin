"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
  Home,
  Watch,
  Tag,
  Users,
  FileText,
  Ticket,
  ShoppingCart,
  Settings,
  Menu,
  X,
  LogOut,
  Contact,
  UserPlus,
} from 'lucide-react';
import { auth } from '../utils/firebaseConfig';
import { useRouter } from 'next/navigation';

const Sidebar = () => {
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const router = useRouter();

  const menuItems = [
    { name: 'Dashboard', icon: Home, link: '/admin/Dashboard' },
    { name: 'Applications', icon: Watch, link: '/admin/Applications' },
    { name: 'Customers', icon: Users, link: '/admin/Users' },
  ];

  useEffect(() => {
    const storedActiveMenu = localStorage.getItem('activeMenu');
    if (storedActiveMenu) {
      setActiveMenu(storedActiveMenu);
    }
  }, []);

  const handleMenuClick = (menuName) => {
    localStorage.setItem('activeMenu', menuName);
    setActiveMenu(menuName);
    setIsSidebarOpen(!isSidebarOpen);
    if (menuName === 'Products') {
      setIsProductsOpen((prev) => !prev);
    } else {
      setIsProductsOpen(false);
    }
  };

  const handleLogout = () => {
    auth.signOut();
    router.push('/Login');
  };

  return (
    <div>
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="block md:hidden p-2 text-gray-700 fixed top-3 left-4 z-50"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside
        className={`fixed top-0 left-0 w-64 bg-white flex flex-col border-r h-full z-40 transform transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="p-6">
          <img src="https://saylaniwelfareusa.com/static/media/logo_saylaniwelfareusa.22bf709605809177256c.png" alt="Logo" />
        </div>

        <nav className="flex-1 overflow-y-auto">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              onClick={() => handleMenuClick(item.name)}
              className={`flex items-center gap-4 px-6 py-3 text-sm font-medium rounded-sm ${
                activeMenu === item.name
                  ? 'border-l-4 border-[#1e4846] text-[#1e4846] bg-gray-50'
                  : 'hover:bg-gray-200'
              }`}
            >
              <item.icon size={20} color="#AA6C39" />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-6">
          <button
            className="flex items-center gap-4 text-gray-700 hover:text-red-500"
            onClick={handleLogout}
          >
            <LogOut size={20} />
            Log out
          </button>
        </div>
      </aside>

      {/* Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-[#1e4846] opacity-50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Sidebar;
