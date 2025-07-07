import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Users, GraduationCap, FileText, ShieldCheck, Settings, Sigma as Sitemap, Layout, MessageCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const Sidebar: React.FC = () => {
  const { user, canManageUsers, canManageAccess } = useAuth();

  const menuItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: Home, 
      path: '/',
      roles: ['admin', 'hr_manager', 'it_admin', 'employee', 'external_consultant']
    },
    { 
      id: 'employees', 
      label: 'Employees', 
      icon: Users, 
      path: '/employees',
      roles: ['admin', 'hr_manager']
    },
    { 
      id: 'onboarding', 
      label: 'Onboarding', 
      icon: GraduationCap, 
      path: '/onboarding',
      roles: ['admin', 'hr_manager', 'it_admin', 'employee']
    },
    { 
      id: 'access', 
      label: 'Access Management', 
      icon: ShieldCheck, 
      path: '/access',
      roles: ['admin', 'hr_manager', 'it_admin', 'employee']
    },
    { 
      id: 'documents', 
      label: 'Documentation', 
      icon: FileText, 
      path: '/documents',
      roles: ['admin', 'hr_manager', 'it_admin', 'employee', 'external_consultant']
    },
    { 
      id: 'org-chart', 
      label: 'Organization', 
      icon: Sitemap, 
      path: '/org-chart',
      roles: ['admin', 'hr_manager', 'employee']
    },
    { 
      id: 'templates', 
      label: 'Templates', 
      icon: Layout, 
      path: '/templates',
      roles: ['admin', 'hr_manager']
    },
    { 
      id: 'chatbot', 
      label: 'HR Assistant', 
      icon: MessageCircle, 
      path: '/chatbot',
      roles: ['admin', 'hr_manager', 'it_admin', 'employee', 'external_consultant']
    },
    { 
      id: 'settings', 
      label: 'Settings', 
      icon: Settings, 
      path: '/settings',
      roles: ['admin', 'hr_manager', 'it_admin', 'employee', 'external_consultant']
    },
  ];

  const filteredMenuItems = menuItems.filter(item => 
    user && item.roles.includes(user.role)
  );

  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-100 h-[calc(100vh-4rem)] overflow-y-auto">
      <nav className="p-4 space-y-2">
        {filteredMenuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-50 to-orange-50 text-blue-600 border-r-3 border-blue-500'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
      
      {/* User Info at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 bg-white">
        <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-medium shadow-sm">
            {user?.firstName?.[0]}{user?.lastName?.[0]}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-slate-800 truncate">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-slate-500 truncate">{user?.position}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;