import React from 'react';
import { 
  Home, 
  Users, 
  GraduationCap, 
  FileText, 
  ShieldCheck, 
  Settings
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'hr-management', label: 'HR Management', icon: Users },
    { id: 'onboarding', label: 'Onboarding', icon: GraduationCap },
    { id: 'documentation', label: 'Documentation', icon: FileText },
    { id: 'access', label: 'Access Management', icon: ShieldCheck },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-screen flex flex-col border-r border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <img 
            src="/public/image.png" 
            alt="Orientrix Logo" 
            className="w-10 h-10 object-contain"
          />
          <div>
            <h1 className="text-xl font-bold text-slate-800">Orientrix</h1>
            <p className="text-sm text-slate-500">HR Platform</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-orange-50 to-orange-100 text-orange-600 shadow-sm border-r-3 border-orange-500'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-medium shadow-sm">
            JD
          </div>
          <div>
            <p className="text-sm font-medium text-slate-800">John Doe</p>
            <p className="text-xs text-slate-500">HR Manager</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;