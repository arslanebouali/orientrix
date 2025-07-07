import React from 'react';
import { 
  Users, 
  UserCheck, 
  FileText, 
  TrendingUp, 
  Clock,
  Award,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    { 
      label: 'Total Employees', 
      value: '1,247', 
      change: '+12%', 
      icon: Users, 
      color: 'bg-orange-500' 
    },
    { 
      label: 'Active Onboarding', 
      value: '23', 
      change: '+5%', 
      icon: UserCheck, 
      color: 'bg-emerald-500' 
    },
    { 
      label: 'Pending Requests', 
      value: '8', 
      change: '-15%', 
      icon: Clock, 
      color: 'bg-amber-500' 
    },
    { 
      label: 'Documents', 
      value: '156', 
      change: '+8%', 
      icon: FileText, 
      color: 'bg-slate-600' 
    },
  ];

  const recentActivities = [
    { 
      type: 'onboarding', 
      message: 'Sarah Johnson completed IT Security training',
      time: '2 hours ago',
      icon: CheckCircle2,
      color: 'text-emerald-500'
    },
    { 
      type: 'access', 
      message: 'New access request for Database Admin tools',
      time: '4 hours ago',
      icon: AlertTriangle,
      color: 'text-amber-500'
    },
    { 
      type: 'hr', 
      message: 'Michael Chen updated employee handbook',
      time: '6 hours ago',
      icon: FileText,
      color: 'text-slate-600'
    },
    { 
      type: 'badge', 
      message: 'Alex Rodriguez earned Leadership badge',
      time: '1 day ago',
      icon: Award,
      color: 'text-orange-500'
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-slate-700 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-white shadow-xl">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3">Welcome back, John!</h1>
        <p className="text-orange-100 text-base sm:text-lg">Here's what's happening with your HR platform today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-slate-500 font-medium truncate">{stat.label}</p>
                  <div className="flex items-baseline space-x-1 sm:space-x-2 mt-1">
                    <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800">{stat.value}</p>
                    <span className={`text-xs sm:text-sm font-medium ${
                      stat.change.startsWith('+') ? 'text-emerald-600' : 'text-red-500'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 ${stat.color} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-sm flex-shrink-0 ml-2`}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts and Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Progress Chart */}
        <div className="bg-white p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-4 sm:mb-6">Onboarding Progress</h3>
          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600">IT Security Training</span>
              <span className="text-sm font-semibold text-slate-800">85%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 sm:h-3">
              <div className="bg-gradient-to-r from-orange-400 to-orange-500 h-2 sm:h-3 rounded-full shadow-sm" style={{ width: '85%' }}></div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600">HR Policies</span>
              <span className="text-sm font-semibold text-slate-800">92%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 sm:h-3">
              <div className="bg-gradient-to-r from-emerald-400 to-emerald-500 h-2 sm:h-3 rounded-full shadow-sm" style={{ width: '92%' }}></div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600">Company Culture</span>
              <span className="text-sm font-semibold text-slate-800">67%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 sm:h-3">
              <div className="bg-gradient-to-r from-amber-400 to-amber-500 h-2 sm:h-3 rounded-full shadow-sm" style={{ width: '67%' }}></div>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-4 sm:mb-6">Recent Activities</h3>
          <div className="space-y-4 sm:space-y-5">
            {recentActivities.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={index} className="flex items-start space-x-3 sm:space-x-4">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-slate-50 flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${activity.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 leading-relaxed">{activity.message}</p>
                    <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-4 sm:mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <button className="p-4 sm:p-6 border-2 border-dashed border-slate-200 rounded-xl sm:rounded-2xl hover:border-orange-300 hover:bg-orange-50 transition-all duration-200 group">
            <Users className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400 group-hover:text-orange-500 mx-auto mb-2 sm:mb-3 transition-colors" />
            <p className="text-sm font-medium text-slate-700 group-hover:text-orange-600">Add New Employee</p>
          </button>
          <button className="p-4 sm:p-6 border-2 border-dashed border-slate-200 rounded-xl sm:rounded-2xl hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-200 group">
            <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400 group-hover:text-emerald-500 mx-auto mb-2 sm:mb-3 transition-colors" />
            <p className="text-sm font-medium text-slate-700 group-hover:text-emerald-600">Upload Document</p>
          </button>
          <button className="p-4 sm:p-6 border-2 border-dashed border-slate-200 rounded-xl sm:rounded-2xl hover:border-slate-300 hover:bg-slate-50 transition-all duration-200 group sm:col-span-2 lg:col-span-1">
            <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400 group-hover:text-slate-600 mx-auto mb-2 sm:mb-3 transition-colors" />
            <p className="text-sm font-medium text-slate-700 group-hover:text-slate-700">Generate Report</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;