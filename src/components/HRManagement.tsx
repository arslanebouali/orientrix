import React, { useState } from 'react';
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
  Eye
} from 'lucide-react';
import { User } from '../types';

const HRManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const employees: User[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@orientrix.com',
      role: 'Software Engineer',
      department: 'Engineering',
      startDate: '2023-01-15',
      status: 'active',
      avatar: 'SJ'
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael.chen@orientrix.com',
      role: 'Product Manager',
      department: 'Product',
      startDate: '2022-11-20',
      status: 'active',
      avatar: 'MC'
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@orientrix.com',
      role: 'UX Designer',
      department: 'Design',
      startDate: '2023-03-10',
      status: 'active',
      avatar: 'ER'
    },
    {
      id: '4',
      name: 'David Wilson',
      email: 'david.wilson@orientrix.com',
      role: 'Data Analyst',
      department: 'Analytics',
      startDate: '2023-02-01',
      status: 'pending',
      avatar: 'DW'
    },
  ];

  const departments = ['all', 'Engineering', 'Product', 'Design', 'Analytics', 'HR', 'Finance'];

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || employee.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-100 text-emerald-700';
      case 'pending': return 'bg-amber-100 text-amber-700';
      case 'inactive': return 'bg-slate-100 text-slate-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">HR Management</h1>
          <p className="text-slate-600 mt-1 sm:mt-2">Manage your employees and their information</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl w-full sm:w-auto"
        >
          <UserPlus className="w-5 h-5" />
          <span className="font-medium">Add Employee</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-slate-500 font-medium truncate">Total Employees</p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800">1,247</p>
            </div>
            <Users className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-orange-500 flex-shrink-0 ml-2" />
          </div>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-slate-500 font-medium truncate">Active</p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-emerald-600">1,186</p>
            </div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-emerald-100 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 ml-2">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 lg:w-7 lg:h-7 text-emerald-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-slate-500 font-medium truncate">Pending</p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-amber-600">23</p>
            </div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-amber-100 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 ml-2">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 lg:w-7 lg:h-7 text-amber-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-slate-500 font-medium truncate">Departments</p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-600">8</p>
            </div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-slate-100 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 ml-2">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 lg:w-7 lg:h-7 text-slate-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-4 py-2 sm:py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>
          <div className="flex items-center space-x-3">
            <Filter className="w-5 h-5 text-slate-400" />
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all min-w-0 flex-1 sm:flex-none"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>
                  {dept === 'all' ? 'All Departments' : dept}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Employee List */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 border-b border-gray-100">
          <h3 className="text-lg sm:text-xl font-semibold text-slate-800">Employee Directory</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {filteredEmployees.map((employee) => (
            <div key={employee.id} className="p-4 sm:p-6 lg:p-8 hover:bg-slate-50 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-3 sm:space-x-5">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-white font-semibold text-base sm:text-lg shadow-sm flex-shrink-0">
                    {employee.avatar}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-base sm:text-lg font-semibold text-slate-800 truncate">{employee.name}</h4>
                    <p className="text-sm text-slate-600 font-medium truncate">{employee.role}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 mt-2 sm:mt-3 space-y-1 sm:space-y-0">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <span className="text-sm text-slate-600 truncate">{employee.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <span className="text-sm text-slate-600">Started {employee.startDate}</span>
                      </div>
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

export default HRManagement;