import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  MoreHorizontal,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Edit3,
  Trash2,
  Eye,
  Download,
  Upload
} from 'lucide-react';
import { RootState } from '../store';
import { setFilters } from '../store/slices/userSlice';
import { useAuth } from '../hooks/useAuth';

const EmployeeManagement: React.FC = () => {
  const dispatch = useDispatch();
  const { employees, filters } = useSelector((state: RootState) => state.user);
  const { canManageUsers } = useAuth();
  const [showAddModal, setShowAddModal] = useState(false);

  const departments = ['all', 'Engineering', 'Product', 'Design', 'Analytics', 'HR', 'Finance', 'Marketing'];
  const statuses = ['all', 'active', 'inactive', 'pending', 'onboarding'];

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.firstName.toLowerCase().includes(filters.search.toLowerCase()) ||
                         employee.lastName.toLowerCase().includes(filters.search.toLowerCase()) ||
                         employee.email.toLowerCase().includes(filters.search.toLowerCase());
    const matchesDepartment = filters.department === 'all' || employee.department === filters.department;
    const matchesStatus = filters.status === 'all' || employee.status === filters.status;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-100 text-emerald-700';
      case 'pending': return 'bg-amber-100 text-amber-700';
      case 'inactive': return 'bg-slate-100 text-slate-700';
      case 'onboarding': return 'bg-blue-100 text-blue-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const stats = [
    {
      label: 'Total Employees',
      value: employees.length,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      label: 'Active',
      value: employees.filter(emp => emp.status === 'active').length,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100'
    },
    {
      label: 'Onboarding',
      value: employees.filter(emp => emp.status === 'onboarding').length,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      label: 'Pending',
      value: employees.filter(emp => emp.status === 'pending').length,
      color: 'text-amber-600',
      bgColor: 'bg-amber-100'
    }
  ];

  if (!canManageUsers) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Access Denied</h2>
        <p className="text-slate-600">You don't have permission to access employee management.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Employee Management</h1>
          <p className="text-slate-600 mt-1 sm:mt-2">Manage your team members and their information</p>
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-all">
            <Download className="w-5 h-5" />
            <span>Export</span>
          </button>
          <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-all">
            <Upload className="w-5 h-5" />
            <span>Import</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
          >
            <UserPlus className="w-5 h-5" />
            <span className="font-medium">Add Employee</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-slate-500 font-medium truncate">{stat.label}</p>
                <p className={`text-xl sm:text-2xl lg:text-3xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
              <div className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 ${stat.bgColor} rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 ml-2`}>
                <Users className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-7 lg:h-7 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search employees by name or email..."
              value={filters.search}
              onChange={(e) => dispatch(setFilters({ search: e.target.value }))}
              className="w-full pl-10 sm:pl-12 pr-4 py-2 sm:py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-slate-400" />
              <select
                value={filters.department}
                onChange={(e) => dispatch(setFilters({ department: e.target.value }))}
                className="border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>
                    {dept === 'all' ? 'All Departments' : dept}
                  </option>
                ))}
              </select>
            </div>
            <select
              value={filters.status}
              onChange={(e) => dispatch(setFilters({ status: e.target.value }))}
              className="border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Employee List */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 border-b border-gray-100">
          <h3 className="text-lg sm:text-xl font-semibold text-slate-800">
            Employee Directory ({filteredEmployees.length})
          </h3>
        </div>
        <div className="divide-y divide-gray-100">
          {filteredEmployees.map((employee) => (
            <div key={employee.id} className="p-4 sm:p-6 lg:p-8 hover:bg-slate-50 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-3 sm:space-x-5">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-white font-semibold text-base sm:text-lg shadow-sm flex-shrink-0">
                    {employee.firstName[0]}{employee.lastName[0]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-base sm:text-lg font-semibold text-slate-800 truncate">
                      {employee.firstName} {employee.lastName}
                    </h4>
                    <p className="text-sm text-slate-600 font-medium truncate">{employee.position}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 mt-2 sm:mt-3 space-y-1 sm:space-y-0">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <span className="text-sm text-slate-600 truncate">{employee.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <span className="text-sm text-slate-600">Started {employee.startDate}</span>
                      </div>
                      {employee.onboardingProgress !== undefined && (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-slate-200 rounded-full flex items-center justify-center">
                            <div 
                              className="w-2 h-2 bg-blue-500 rounded-full"
                              style={{ 
                                transform: `scale(${employee.onboardingProgress / 100})` 
                              }}
                            />
                          </div>
                          <span className="text-sm text-slate-600">{employee.onboardingProgress}% onboarded</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end sm:space-x-5">
                  <div className="text-left sm:text-right">
                    <p className="text-sm font-semibold text-slate-800">{employee.department}</p>
                    <span className={`inline-block px-2 sm:px-3 py-1 rounded-full text-xs font-medium mt-1 ${getStatusColor(employee.status)}`}>
                      {employee.status}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                      <Eye className="w-5 h-5 text-slate-400" />
                    </button>
                    <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                      <Edit3 className="w-5 h-5 text-slate-400" />
                    </button>
                    <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                      <MoreHorizontal className="w-5 h-5 text-slate-400" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeManagement;