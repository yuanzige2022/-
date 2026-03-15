/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MaterialProvider } from './context/MaterialContext';
import { MaterialList } from './pages/MaterialList';
import { MaterialDetail } from './pages/MaterialDetail';
import { MaterialForm } from './pages/MaterialForm';
import { Settings } from './pages/Settings';

export default function App() {
  return (
    <MaterialProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MaterialList />} />
          <Route path="/material/:id" element={<MaterialDetail />} />
          <Route path="/add" element={<MaterialForm />} />
          <Route path="/edit/:id" element={<MaterialForm />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
    </MaterialProvider>
  );
}

