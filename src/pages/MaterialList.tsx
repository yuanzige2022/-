import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Package } from 'lucide-react';
import { useMaterials } from '../context/MaterialContext';
import { BottomNav } from '../components/BottomNav';

export const MaterialList: React.FC = () => {
  const { materials, isLoaded } = useMaterials();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredMaterials = materials.filter(m => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      m.name.toLowerCase().includes(term) ||
      m.location.toLowerCase().includes(term) ||
      m.materialType.toLowerCase().includes(term) ||
      m.stock.toString().includes(term) ||
      m.remarks.toLowerCase().includes(term)
    );
  });

  if (!isLoaded) {
    return <div className="min-h-screen flex items-center justify-center">加载中...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen pb-20">
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3 safe-top">
        <div className="relative max-w-md mx-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="search"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-custom leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
            placeholder="搜索名称或编号..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-md mx-auto p-4 space-y-3">
          <div className="flex items-center justify-between mb-4 px-1">
            <div className="flex items-center gap-2 text-gray-800">
              <Package className="w-5 h-5" />
              <h1 className="text-lg font-bold">物料列表</h1>
            </div>
            <div className="flex items-center gap-1 text-gray-500 text-sm font-medium">
              <span>共 {filteredMaterials.length} 个</span>
            </div>
          </div>

          {filteredMaterials.map((material) => (
            <div
              key={material.id}
              onClick={() => navigate(`/material/${material.id}`)}
              className="bg-white p-4 rounded-custom shadow-sm border border-gray-100 flex flex-col gap-2 cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center overflow-x-auto w-full justify-between">
                  <h2 className="text-lg text-gray-800 whitespace-nowrap font-normal">
                    {material.name}
                  </h2>
                  <div className="flex gap-1.5">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-50 text-primary border border-blue-100 whitespace-nowrap">
                      {material.materialType}
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-50 text-primary border border-blue-100 whitespace-nowrap">
                      {material.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {filteredMaterials.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              没有找到匹配的物料
            </div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

