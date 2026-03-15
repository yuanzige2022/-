import React, { createContext, useContext, useState, useEffect } from 'react';
import localforage from 'localforage';
import * as XLSX from 'xlsx';

export interface Material {
  id: string;
  name: string;
  location: string;
  materialType: string;
  stock: number | string;
  batchNo: string;
  remarks: string;
}

interface MaterialContextType {
  materials: Material[];
  addMaterial: (material: Omit<Material, 'id'>) => void;
  updateMaterial: (id: string, material: Omit<Material, 'id'>) => void;
  deleteMaterial: (id: string) => void;
  getMaterial: (id: string) => Material | undefined;
  importFromExcel: (file: File) => Promise<void>;
  exportToExcel: () => void;
  downloadTemplate: () => void;
  isLoaded: boolean;
  fileName: string | null;
}

const MaterialContext = createContext<MaterialContextType | undefined>(undefined);

const DB_KEY = 'materials_data';
const FILENAME_KEY = 'materials_filename';

export const MaterialProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedMaterials = await localforage.getItem<Material[]>(DB_KEY);
        const storedFileName = await localforage.getItem<string>(FILENAME_KEY);
        if (storedMaterials) {
          setMaterials(storedMaterials);
        }
        if (storedFileName) {
          setFileName(storedFileName);
        }
      } catch (error) {
        console.error('Failed to load data from localforage', error);
      } finally {
        setIsLoaded(true);
      }
    };
    loadData();
  }, []);

  const saveToStorage = async (newMaterials: Material[], newFileName?: string | null) => {
    setMaterials(newMaterials);
    try {
      await localforage.setItem(DB_KEY, newMaterials);
      if (newFileName !== undefined) {
        setFileName(newFileName);
        await localforage.setItem(FILENAME_KEY, newFileName);
      }
    } catch (error) {
      console.error('Failed to save data to localforage', error);
    }
  };

  const addMaterial = (material: Omit<Material, 'id'>) => {
    const newMaterial = { ...material, id: Math.random().toString(36).substr(2, 9) };
    saveToStorage([...materials, newMaterial]);
  };

  const updateMaterial = (id: string, updatedMaterial: Omit<Material, 'id'>) => {
    saveToStorage(materials.map(m => m.id === id ? { ...updatedMaterial, id } : m));
  };

  const deleteMaterial = (id: string) => {
    saveToStorage(materials.filter(m => m.id !== id));
  };

  const getMaterial = (id: string) => {
    return materials.find(m => m.id === id);
  };

  const importFromExcel = (file: File): Promise<void> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const jsonData = XLSX.utils.sheet_to_json<any>(worksheet);

          const newMaterials: Material[] = jsonData.map((row: any) => ({
            id: Math.random().toString(36).substr(2, 9),
            name: row['名称'] || '',
            location: row['位置编号'] || '',
            materialType: row['材质'] || '',
            stock: row['库存'] || 0,
            batchNo: row['生产批号'] || '',
            remarks: row['备注'] || ''
          }));

          // Merge or replace? Let's replace for simplicity, or merge if we want.
          // The prompt says "可以通过手动添加数据或者通过规定的excel模板来添加到现有的excel文件中来添加数据"
          // Let's merge them by appending, but avoid exact duplicates if possible, or just append.
          // Appending is safer.
          saveToStorage([...materials, ...newMaterials], file.name);
          resolve();
        } catch (error) {
          console.error('Error parsing Excel file', error);
          reject(error);
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  };

  const exportToExcel = () => {
    const exportData = materials.map(m => ({
      '名称': m.name,
      '位置编号': m.location,
      '材质': m.materialType,
      '库存': m.stock,
      '生产批号': m.batchNo,
      '备注': m.remarks
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, '物料列表');
    XLSX.writeFile(workbook, fileName || '物料数据.xlsx');
  };

  const downloadTemplate = () => {
    const templateData = [{
      '名称': '示例物料',
      '位置编号': 'A1-01',
      '材质': '丁基胶',
      '库存': 100,
      '生产批号': 'LOT20230101',
      '备注': '这里是备注信息'
    }];
    const worksheet = XLSX.utils.json_to_sheet(templateData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, '模板');
    XLSX.writeFile(workbook, '物料导入模板.xlsx');
  };

  return (
    <MaterialContext.Provider value={{ 
      materials, addMaterial, updateMaterial, deleteMaterial, getMaterial, 
      importFromExcel, exportToExcel, downloadTemplate, isLoaded, fileName 
    }}>
      {children}
    </MaterialContext.Provider>
  );
};

export const useMaterials = () => {
  const context = useContext(MaterialContext);
  if (!context) {
    throw new Error('useMaterials must be used within a MaterialProvider');
  }
  return context;
};
