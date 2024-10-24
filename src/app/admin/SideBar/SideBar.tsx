import React from 'react';
import Link from 'next/link';

const SideBar = () => {
  return (
    <aside className="bg-white w-64 min-h-screen shadow-lg">
      <div className="p-5">
        <h1 className="text-2xl font-bold text-gray-800">RH Dashboard</h1>
      </div>
      <nav className="mt-6">
        <ul>
          <SideBarItem 
            href="/admin/dashboard" 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            } 
            text="Dashboard" 
          />
           <SideBarItem 
            href="/admin/candidatos" 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            } 
            text="Vagas" 
          />
          <SideBarItem 
            href="/admin/todos-candidatos" 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            } 
            text="Candidatos" 
          />
        </ul>
      </nav>
    </aside>
  );
};

const SideBarItem = ({ href, icon, text }: { href: string; icon: React.ReactNode; text: string }) => {
  return (
    <li className="mb-2">
      <Link href={href} className="flex items-center px-5 py-3 text-gray-600 hover:bg-gray-100 transition-colors duration-200">
        <span className="mr-3">{icon}</span>
        <span>{text}</span>
      </Link>
    </li>
  );
};

export default SideBar;