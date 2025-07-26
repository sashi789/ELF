import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CssBaseline from '@mui/material/CssBaseline';

// Client-facing components
import ClientLayout from './layouts/ClientLayout';
import ClientDashboard from './pages/client/ClientDashboard';
import ClientCaseList from './pages/client/ClientCaseList';
import ClientCaseDetail from './pages/client/ClientCaseDetail';
import ClientProfile from './pages/client/ClientProfile';

// Admin-facing components
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminCaseList from './pages/admin/AdminCaseList';
import AdminCaseDetail from './pages/admin/AdminCaseDetail';
import AdminCaseIntake from './pages/admin/AdminCaseIntake';
import AdminClients from './pages/admin/AdminClients';
import AdminAttorneys from './pages/admin/AdminAttorneys';
import AdminTasks from './pages/admin/AdminTasks';
import AdminSettings from './pages/admin/AdminSettings';

// Attorney-facing components
import AttorneyLayout from './layouts/AttorneyLayout';
import AttorneyDashboard from './pages/attorney/AttorneyDashboard';
import AttorneyCaseList from './pages/attorney/AttorneyCaseList';
import AttorneyCaseDetail from './pages/attorney/AttorneyCaseDetail';
import AttorneyClients from './pages/attorney/AttorneyClients';
import AttorneyTasks from './pages/attorney/AttorneyTasks';
import AttorneyProfile from './pages/attorney/AttorneyProfile';

// Landing page
import LandingPage from './pages/LandingPage';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          {/* Landing page - choose user type */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Client-facing routes */}
          <Route path="/client" element={<ClientLayout />}>
            <Route index element={<ClientDashboard />} />
            <Route path="cases" element={<ClientCaseList />} />
            <Route path="cases/:id" element={<ClientCaseDetail />} />
            <Route path="profile" element={<ClientProfile />} />
          </Route>
          
          {/* Admin-facing routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="cases">
              <Route index element={<AdminCaseList />} />
              <Route path="new" element={<AdminCaseIntake />} />
              <Route path=":id" element={<AdminCaseDetail />} />
            </Route>
            <Route path="clients" element={<AdminClients />} />
            <Route path="attorneys" element={<AdminAttorneys />} />
            <Route path="tasks" element={<AdminTasks />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
          
          {/* Attorney-facing routes */}
          <Route path="/attorney" element={<AttorneyLayout />}>
            <Route index element={<AttorneyDashboard />} />
            <Route path="cases" element={<AttorneyCaseList />} />
            <Route path="cases/:id" element={<AttorneyCaseDetail />} />
            <Route path="clients" element={<AttorneyClients />} />
            <Route path="tasks" element={<AttorneyTasks />} />
            <Route path="profile" element={<AttorneyProfile />} />
          </Route>
          
          {/* Redirect old routes to new structure */}
          <Route path="/cases" element={<Navigate to="/client/cases" replace />} />
          <Route path="/clients" element={<Navigate to="/admin/clients" replace />} />
          <Route path="/attorneys" element={<Navigate to="/admin/attorneys" replace />} />
          <Route path="/tasks" element={<Navigate to="/admin/tasks" replace />} />
          <Route path="/settings" element={<Navigate to="/admin/settings" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
); 