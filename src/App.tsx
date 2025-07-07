import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import EmployeeManagement from './pages/EmployeeManagement';
import Onboarding from './components/Onboarding';
import AccessManagement from './components/AccessManagement';
import Documentation from './components/Documentation';
import Settings from './components/Settings';
import OrgChart from './components/OrgChart';

// Placeholder components for new routes

const Templates = () => (
  <div className="text-center py-12">
    <h2 className="text-2xl font-bold text-slate-800 mb-4">Template Builder</h2>
    <p className="text-slate-600">Create and manage onboarding templates...</p>
  </div>
);

const Chatbot = () => (
  <div className="text-center py-12">
    <h2 className="text-2xl font-bold text-slate-800 mb-4">HR Assistant</h2>
    <p className="text-slate-600">AI-powered HR chatbot coming soon...</p>
  </div>
);

const Profile = () => (
  <div className="text-center py-12">
    <h2 className="text-2xl font-bold text-slate-800 mb-4">User Profile</h2>
    <p className="text-slate-600">Manage your profile information...</p>
  </div>
);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="employees" element={<EmployeeManagement />} />
            <Route path="onboarding" element={<Onboarding />} />
            <Route path="access" element={<AccessManagement />} />
            <Route path="documents" element={<Documentation />} />
            <Route path="org-chart" element={<OrgChart />} />
            <Route path="templates" element={<Templates />} />
            <Route path="chatbot" element={<Chatbot />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;