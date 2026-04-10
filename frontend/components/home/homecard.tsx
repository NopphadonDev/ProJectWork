"use client";

import React from 'react';
import Link from 'next/link';

interface HomeCardProps {
  id: string | number; // เพิ่ม id
  name: string;
  address: string;
  index: number;
}

export const HomeCard = ({ id, name, address, index }: HomeCardProps) => {
  return (
    <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all group">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <span className="text-xs font-bold text-blue-500 uppercase tracking-wider">
            No. {index + 1}
          </span>
          <h3 className="text-xl font-bold text-slate-800 mt-1">{name}</h3>
          <p className="text-slate-500 mt-2 text-sm italic">{address}</p>
        </div>
        
        {/* ปุ่มแก้ไข */}
        <Link 
          href={`/admin/${id}`}
          className="ml-4 p-2 bg-slate-50 text-slate-400 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors border border-transparent hover:border-blue-100"
        >
          <div className="flex items-center gap-1 text-sm font-medium">
            <svg 
              className="w-4 h-4" 
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            แก้ไข
          </div>
        </Link>
      </div>
    </div>
  );
};