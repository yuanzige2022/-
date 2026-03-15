import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, FileText, Download, Upload, Info } from 'lucide-react';
import { BottomNav } from '../components/BottomNav';
import { useMaterials } from '../context/MaterialContext';

export const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { fileName, importFromExcel, exportToExcel, downloadTemplate } = useMaterials();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        await importFromExcel(file);
        alert('数据导入成功！');
      } catch (error) {
        alert('导入失败，请检查文件格式是否正确。');
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen flex flex-col pb-20">
      <header className="bg-white border-b border-gray-200 safe-top sticky top-0 z-10">
        <div className="px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-1 -ml-1 text-gray-600"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-semibold">数据源管理</h1>
          </div>
          <div className="w-8"></div>
        </div>
      </header>

      <main className="flex-grow p-4 space-y-6 max-w-md mx-auto w-full">
        <section className="bg-white p-4 rounded-custom border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider">当前关联状态</h2>
            <span className={fileName ? "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800" : "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"}>
              {fileName ? '已连接' : '未连接'}
            </span>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 bg-blue-50 p-2 rounded-custom">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-grow overflow-hidden">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {fileName || '暂无数据源'}
              </p>
              <p className="text-xs text-gray-500 mt-1 truncate">
                {fileName ? '已加载本地数据' : '请导入 Excel 文件'}
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="bg-white rounded-custom border border-gray-200 overflow-hidden">
            <div className="p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">导入 Excel 数据源</label>
              <div className="flex gap-2">
                <input
                  type="file"
                  accept=".xlsx, .xls"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-2 bg-primary text-white text-sm font-medium rounded-custom hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  选择文件并导入
                </button>
              </div>
              <p className="mt-2 text-xs text-gray-500">选择本地存储的 Excel 文件，数据将追加到当前列表中。</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={downloadTemplate}
              className="flex flex-col items-center justify-center p-4 bg-white border border-gray-200 rounded-custom hover:bg-gray-50 transition-colors group"
            >
              <div className="mb-2 text-gray-400 group-hover:text-primary transition-colors">
                <Download className="h-8 w-8" />
              </div>
              <span className="text-sm font-medium text-gray-700">下载模板</span>
            </button>
            <button 
              onClick={exportToExcel}
              className="flex flex-col items-center justify-center p-4 bg-white border border-gray-200 rounded-custom hover:bg-gray-50 transition-colors group"
            >
              <div className="mb-2 text-gray-400 group-hover:text-primary transition-colors">
                <Download className="h-8 w-8" />
              </div>
              <span className="text-sm font-medium text-gray-700">导出数据</span>
            </button>
          </div>
        </section>

        <section className="bg-blue-50 p-4 rounded-custom border border-blue-100">
          <div className="flex gap-3">
            <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-primary">使用说明</h3>
              <ul className="mt-1 text-xs text-blue-800 space-y-1 list-disc list-inside">
                <li>首次使用请先下载 Excel 模板，按格式填入数据。</li>
                <li>导入数据会将 Excel 中的数据追加到当前列表中。</li>
                <li>导出数据会将当前所有物料信息保存为 Excel 文件。</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="pt-4 pb-2 text-center space-y-1">
          <p className="text-xs text-gray-400">开发者：元子哥</p>
          <div className="flex justify-center gap-4 text-xs text-gray-400">
            <span>微信：yuanzige2022</span>
            <span>QQ：19842834</span>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
};
