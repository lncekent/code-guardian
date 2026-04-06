/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Investigation } from './pages/Investigation';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/investigate/:id" element={<Investigation />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
}
