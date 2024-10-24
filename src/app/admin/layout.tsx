import React from 'react';
import SideBar from './SideBar/SideBar';
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex">
      <SideBar />
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}