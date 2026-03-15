import React from 'react';
import { NavLink } from 'react-router-dom';
import { Package, Plus, Settings } from 'lucide-react';
import { clsx } from 'clsx';

export const BottomNav: React.FC = () => {
  return (
    <nav className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 safe-bottom z-50">
      <div className="flex justify-around max-w-md mx-auto h-16">
        <NavLink
          to="/"
          className={({ isActive }) =>
            clsx(
              'flex flex-col items-center justify-center flex-1 transition-colors',
              isActive ? 'text-primary' : 'text-gray-400 hover:text-primary'
            )
          }
        >
          <Package className="w-6 h-6" />
          <span className="text-[10px] mt-1 font-medium">物料列表</span>
        </NavLink>
        <NavLink
          to="/add"
          className={({ isActive }) =>
            clsx(
              'flex flex-col items-center justify-center flex-1 transition-colors',
              isActive ? 'text-primary' : 'text-gray-400 hover:text-primary'
            )
          }
        >
          <Plus className="w-6 h-6" />
          <span className="text-[10px] mt-1 font-medium">添加</span>
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            clsx(
              'flex flex-col items-center justify-center flex-1 transition-colors',
              isActive ? 'text-primary' : 'text-gray-400 hover:text-primary'
            )
          }
        >
          <Settings className="w-6 h-6" />
          <span className="text-[10px] mt-1 font-medium">设置</span>
        </NavLink>
      </div>
    </nav>
  );
};
