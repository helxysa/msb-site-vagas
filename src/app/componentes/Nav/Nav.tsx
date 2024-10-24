'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="relative px-4 py-4 flex justify-between items-center bg-gray-200 shadow-lgmax-h-screen">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold leading-none text-gray-900">
          <Image src="/images/logo-msb.png" alt="MSB Logo" width={60} height={60} />
        </Link>
        <div className="lg:hidden">
          <button className="navbar-burger flex items-center text-blue-600 p-3" onClick={toggleMenu}>
            <svg className="block h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Mobile menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </button>
        </div>
        <ul className="hidden lg:flex lg:mx-auto lg:items-center lg:w-auto lg:space-x-6 ">
          <li><Link href="/todas-vagas/" className="text-sm text-gray-900 hover:text-gray-500">Vagas</Link></li>
          <li className="text-gray-900">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </li>
          <li><Link href="/" className="text-sm text-gray-900 hover:text-gray-500">Preços</Link></li>
          <li className="text-gray-900">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </li>
          <li><Link href="/" className="text-sm text-gray-900 hover:text-gray-500">Sobre Nós</Link></li>
          <li className="text-gray-900">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </li>
        </ul>
        <div className="hidden lg:block">
          <Link href="/admin/" className="text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full transition duration-300">Área de Administração</Link>
        </div>
      </div>
      
      {isMenuOpen && (
      <div className="navbar-menu relative z-50 lg:hidden">
        <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
        <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
          {/* ... existing code ... */}
          <div>
            <ul>
              <li className="mb-1">
                <Link href="/todas-vagas/" className="block p-4 text-sm font-semibold text-gray-900 hover:bg-blue-50 hover:text-blue-600 rounded" onClick={closeMenu}>Vagas</Link>
              </li>
              <li className="mb-1">
                <Link href="/" className="block p-4 text-sm font-semibold text-gray-900 hover:bg-blue-50 hover:text-blue-600 rounded" onClick={closeMenu}>Preços</Link>
              </li>
              <li className="mb-1">
                <Link href="/" className="block p-4 text-sm font-semibold text-gray-900 hover:bg-blue-50 hover:text-blue-600 rounded" onClick={closeMenu}>Sobre Nós</Link>
              </li>
              <li className="mb-1">
                <Link href="/admin/" className="block p-4 text-sm font-semibold text-gray-900 hover:bg-blue-50 hover:text-blue-600 rounded" onClick={closeMenu}>Área de Administração</Link>
              </li>
            </ul>
          </div>
        </nav>
        </div>
      )}
    </nav>
  );
}