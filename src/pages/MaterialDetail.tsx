import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Edit, Trash2, AlertTriangle } from 'lucide-react';
import { useMaterials } from '../context/MaterialContext';

export const MaterialDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getMaterial, deleteMaterial } = useMaterials();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const material = getMaterial(id || '');

  if (!material) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <p className="text-gray-500 mb-4">未找到该物料</p>
        <button
          onClick={() => navigate('/')}
          className="text-primary font-medium"
        >
          返回列表
        </button>
      </div>
    );
  }

  const handleDelete = () => {
    if (id) {
      deleteMaterial(id);
      navigate('/');
    }
  };

  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen flex flex-col">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 safe-top">
        <div className="px-4 h-14 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="text-primary flex items-center gap-1"
          >
            <ChevronLeft className="w-6 h-6" />
            <span>返回</span>
          </button>
          <h1 className="text-lg font-semibold">物料详情</h1>
          <div className="w-12"></div>
        </div>
      </header>

      <main className="flex-1 p-4 overflow-y-auto max-w-md mx-auto w-full">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-gray-50/50">
            <h2 className="text-sm font-medium text-gray-500">基本信息</h2>
          </div>
          <div className="divide-y divide-gray-100">
            <div className="p-4 flex flex-col gap-1">
              <span className="text-sm text-gray-500">名称</span>
              <span className="text-base font-semibold text-gray-900">{material.name}</span>
            </div>
            <div className="p-4 flex flex-col gap-1">
              <span className="text-sm text-gray-500">位置编号</span>
              <span className="text-base text-gray-900">{material.location}</span>
            </div>
            <div className="p-4 flex flex-col gap-1">
              <span className="text-sm text-gray-500">材质</span>
              <span className="text-base text-gray-900">{material.materialType}</span>
            </div>
            <div className="p-4 flex flex-col gap-1">
              <span className="text-sm text-gray-500">库存</span>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold text-primary">
                  {material.stock.toLocaleString()}
                </span>
                <span className="text-sm text-gray-600">PCS</span>
              </div>
            </div>
            <div className="p-4 flex flex-col gap-1">
              <span className="text-sm text-gray-500">生产批号</span>
              <span className="text-base text-gray-900 font-mono">{material.batchNo || '-'}</span>
            </div>
            <div className="p-4 flex flex-col gap-1">
              <span className="text-sm text-gray-500">备注</span>
              <p className="text-base text-gray-600 leading-relaxed">
                {material.remarks || '无'}
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 p-4 safe-bottom">
        <div className="flex gap-4 max-w-md mx-auto">
          <button
            onClick={() => navigate(`/edit/${material.id}`)}
            className="flex-1 bg-white border border-primary text-primary font-medium py-3 rounded-custom hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
          >
            <Edit className="w-5 h-5" />
            编辑物料
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="flex-1 bg-red-50 text-red-600 font-medium py-3 rounded-custom hover:bg-red-100 transition-colors border border-red-200 flex items-center justify-center gap-2"
          >
            <Trash2 className="w-5 h-5" />
            删除
          </button>
        </div>
      </footer>

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-lg w-full max-w-sm overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">确认删除？</h3>
              <p className="text-sm text-gray-500">
                删除后该物料信息将无法恢复，确定要继续吗？
              </p>
            </div>
            <div className="flex border-t border-gray-100">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 p-4 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 p-4 text-red-600 font-bold border-l border-gray-100 hover:bg-red-50 transition-colors"
              >
                确认删除
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
