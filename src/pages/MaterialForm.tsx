import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useMaterials } from '../context/MaterialContext';

export const MaterialForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addMaterial, updateMaterial, getMaterial } = useMaterials();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    materialType: '',
    stock: '',
    batchNo: '',
    remarks: ''
  });

  useEffect(() => {
    if (isEdit && id) {
      const material = getMaterial(id);
      if (material) {
        setFormData({
          name: material.name,
          location: material.location,
          materialType: material.materialType,
          stock: material.stock.toString(),
          batchNo: material.batchNo,
          remarks: material.remarks
        });
      }
    }
  }, [id, isEdit, getMaterial]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const materialData = {
      name: formData.name,
      location: formData.location,
      materialType: formData.materialType,
      stock: parseInt(formData.stock) || 0,
      batchNo: formData.batchNo,
      remarks: formData.remarks
    };

    if (isEdit && id) {
      updateMaterial(id, materialData);
      navigate(`/material/${id}`);
    } else {
      addMaterial(materialData);
      navigate('/');
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col bg-white shadow-sm">
      <header className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between safe-top">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-1 -ml-1 text-gray-600"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">{isEdit ? '编辑物料' : '添加物料'}</h1>
        </div>
        <button
          type="submit"
          form="material-form"
          className="bg-primary text-white px-5 py-1.5 rounded-custom font-medium text-sm active:opacity-80 transition-opacity"
        >
          保存
        </button>
      </header>

      <main className="flex-1 p-4 safe-bottom">
        <form id="material-form" onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">名称</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="请输入物料名称"
              required
              className="w-full border-gray-300 rounded-custom focus:ring-primary focus:border-primary block sm:text-sm px-3 py-2 border"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">位置编号</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="请输入存放位置编号"
              className="w-full border-gray-300 rounded-custom focus:ring-primary focus:border-primary block sm:text-sm px-3 py-2 border"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="materialType" className="block text-sm font-medium text-gray-700">材质</label>
            <select
              id="materialType"
              name="materialType"
              value={formData.materialType}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-custom focus:ring-primary focus:border-primary block sm:text-sm px-3 py-2 border"
            >
              <option value="" disabled>请选择材质</option>
              <option value="丁基胶">丁基胶</option>
              <option value="乙丙胶">乙丙胶</option>
              <option value="混合胶">混合胶</option>
              <option value="其他">其他</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700">库存</label>
            <input
              type="number"
              id="stock"
              name="stock"
              min="0"
              value={formData.stock}
              onChange={handleChange}
              placeholder="0"
              className="w-full border-gray-300 rounded-custom focus:ring-primary focus:border-primary block sm:text-sm px-3 py-2 border"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="batchNo" className="block text-sm font-medium text-gray-700">生产批号</label>
            <input
              type="text"
              id="batchNo"
              name="batchNo"
              value={formData.batchNo}
              onChange={handleChange}
              placeholder="请输入生产批次"
              className="w-full border-gray-300 rounded-custom focus:ring-primary focus:border-primary block sm:text-sm px-3 py-2 border"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="remarks" className="block text-sm font-medium text-gray-700">备注</label>
            <textarea
              id="remarks"
              name="remarks"
              rows={4}
              value={formData.remarks}
              onChange={handleChange}
              placeholder="请输入备注信息..."
              className="w-full border-gray-300 rounded-custom focus:ring-primary focus:border-primary block sm:text-sm px-3 py-2 border"
            ></textarea>
          </div>
        </form>
      </main>
    </div>
  );
};
