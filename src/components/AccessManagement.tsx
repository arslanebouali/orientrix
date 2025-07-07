import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Plus, 
  Search, 
  Filter,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Eye,
  MoreHorizontal,
  Key,
  Calendar,
  User
} from 'lucide-react';
import { AccessRequest, Access } from '../types';

const AccessManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('requests');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const accessRequests: AccessRequest[] = [
    {
      id: '1',
      requesterId: '1',
      requesterName: 'Sarah Johnson',
      resourceName: 'Database Admin Tools',
      resourceType: 'Software',
      reason: 'Need access to manage customer database for new project',
      status: 'pending',
      requestDate: '2024-01-15',
      urgency: 'high'
    },
    {
      id: '2',
      requesterId: '2',
      requesterName: 'Michael Chen',
      resourceName: 'Marketing Analytics Dashboard',
      resourceType: 'Platform',
      reason: 'Required for quarterly campaign analysis',
      status: 'approved',
      requestDate: '2024-01-14',
      approver: 'John Doe',
      approvalDate: '2024-01-15',
      urgency: 'medium'
    },
    {
      id: '3',
      requesterId: '3',
      requesterName: 'Emily Rodriguez',
      resourceName: 'Design System Library',
      resourceType: 'Repository',
      reason: 'Need access to maintain design components',
      status: 'pending',
      requestDate: '2024-01-13',
      urgency: 'low'
    },
    {
      id: '4',
      requesterId: '4',
      requesterName: 'David Wilson',
      resourceName: 'Financial Reports',
      resourceType: 'Documents',
      reason: 'Access denied - insufficient permissions',
      status: 'rejected',
      requestDate: '2024-01-12',
      approver: 'Jane Smith',
      approvalDate: '2024-01-13',
      urgency: 'medium'
    },
  ];

  const userAccesses: Access[] = [
    {
      id: '1',
      resourceName: 'Email System',
      resourceType: 'Platform',
      grantedDate: '2023-01-15',
      status: 'active'
    },
    {
      id: '2',
      resourceName: 'Project Management Tool',
      resourceType: 'Software',
      grantedDate: '2023-01-15',
      status: 'active'
    },
    {
      id: '3',
      resourceName: 'HR Information System',
      resourceType: 'Platform',
      grantedDate: '2023-01-15',
      status: 'active'
    },
    {
      id: '4',
      resourceName: 'Legacy CRM System',
      resourceType: 'Software',
      grantedDate: '2022-03-20',
      expiryDate: '2023-12-31',
      status: 'expired'
    },
    {
      id: '5',
      resourceName: 'Test Environment',
      resourceType: 'Server',
      grantedDate: '2023-06-01',
      expiryDate: '2024-02-01',
      status: 'active'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-100 text-amber-700';
      case 'approved': return 'bg-emerald-100 text-emerald-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      case 'active': return 'bg-emerald-100 text-emerald-700';
      case 'expired': return 'bg-red-100 text-red-700';
      case 'revoked': return 'bg-slate-100 text-slate-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return Clock;
      case 'approved': return CheckCircle2;
      case 'rejected': return XCircle;
      case 'active': return CheckCircle2;
      case 'expired': return XCircle;
      case 'revoked': return XCircle;
      default: return Clock;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-amber-100 text-amber-700';
      case 'low': return 'bg-emerald-100 text-emerald-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const filteredRequests = accessRequests.filter(request => {
    const matchesSearch = request.requesterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.resourceName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || request.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const filteredAccesses = userAccesses.filter(access => {
    const matchesSearch = access.resourceName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || access.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Access Management</h1>
          <p className="text-slate-600 mt-1 sm:mt-2">Manage access requests and review user permissions</p>
        </div>
        <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl w-full sm:w-auto">
          <Plus className="w-5 h-5" />
          <span className="font-medium">New Request</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-slate-500 font-medium truncate">Pending Requests</p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-amber-600">8</p>
            </div>
            <Clock className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-amber-500 flex-shrink-0 ml-2" />
          </div>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-slate-500 font-medium truncate">Approved Today</p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-emerald-600">5</p>
            </div>
            <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-emerald-500 flex-shrink-0 ml-2" />
          </div>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-slate-500 font-medium truncate">Active Accesses</p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-600">247</p>
            </div>
            <Key className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-slate-500 flex-shrink-0 ml-2" />
          </div>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-slate-500 font-medium truncate">Expiring Soon</p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-red-600">12</p>
            </div>
            <AlertTriangle className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-red-500 flex-shrink-0 ml-2" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100">
        <div className="border-b border-gray-100">
          <nav className="flex px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setActiveTab('requests')}
              className={`py-4 sm:py-6 px-1 border-b-2 sm:border-b-3 font-semibold text-sm transition-all flex-1 sm:flex-none ${
                activeTab === 'requests'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              <div className="flex items-center justify-center sm:justify-start space-x-2 sm:space-x-3">
                <Clock className="w-5 h-5" />
                <span>Access Requests</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('accesses')}
              className={`py-4 sm:py-6 px-1 border-b-2 sm:border-b-3 font-semibold text-sm transition-all flex-1 sm:flex-none ${
                activeTab === 'accesses'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              <div className="flex items-center justify-center sm:justify-start space-x-2 sm:space-x-3">
                <Key className="w-5 h-5" />
                <span>My Accesses</span>
              </div>
            </button>
          </nav>
        </div>

        {/* Search and Filter */}
        <div className="p-4 sm:p-6 lg:p-8 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder={`Search ${activeTab === 'requests' ? 'requests' : 'accesses'}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-4 py-2 sm:py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="flex items-center space-x-3">
              <Filter className="w-5 h-5 text-slate-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all min-w-0 flex-1 sm:flex-none"
              >
                <option value="all">All Status</option>
                {activeTab === 'requests' ? (
                  <>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </>
                ) : (
                  <>
                    <option value="active">Active</option>
                    <option value="expired">Expired</option>
                    <option value="revoked">Revoked</option>
                  </>
                )}
              </select>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          {activeTab === 'requests' && (
            <div className="space-y-4 sm:space-y-6">
              {filteredRequests.map((request) => {
                const StatusIcon = getStatusIcon(request.status);
                return (
                  <div key={request.id} className="border border-gray-100 rounded-xl p-4 sm:p-6 lg:p-8 hover:shadow-md transition-shadow">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-3">
                          <h3 className="text-base sm:text-lg font-semibold text-slate-800">{request.resourceName}</h3>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                              {request.status}
                            </span>
                            <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${getUrgencyColor(request.urgency)}`}>
                              {request.urgency}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm text-slate-500 mb-3 space-y-1 sm:space-y-0">
                          <div className="flex items-center space-x-1">
                            <User className="w-4 h-4" />
                            <span>{request.requesterName}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{request.requestDate}</span>
                          </div>
                          <span className="hidden sm:inline text-slate-400">•</span>
                          <span>{request.resourceType}</span>
                        </div>
                        <p className="text-slate-700 mb-4 leading-relaxed">{request.reason}</p>
                        {request.approver && (
                          <p className="text-sm text-slate-500">
                            {request.status === 'approved' ? 'Approved' : 'Rejected'} by {request.approver} on {request.approvalDate}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 lg:ml-4">
                        {request.status === 'pending' && (
                          <>
                            <button className="bg-emerald-600 text-white px-3 sm:px-4 py-2 rounded-xl text-sm hover:bg-emerald-700 transition-colors">
                              Approve
                            </button>
                            <button className="bg-red-600 text-white px-3 sm:px-4 py-2 rounded-xl text-sm hover:bg-red-700 transition-colors">
                              Reject
                            </button>
                          </>
                        )}
                        <div className="flex items-center space-x-2">
                          <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                            <Eye className="w-5 h-5 text-slate-400" />
                          </button>
                          <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                            <MoreHorizontal className="w-5 h-5 text-slate-400" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'accesses' && (
            <div className="space-y-4 sm:space-y-6">
              {filteredAccesses.map((access) => {
                const StatusIcon = getStatusIcon(access.status);
                return (
                  <div key={access.id} className="border border-gray-100 rounded-xl p-4 sm:p-6 lg:p-8 hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-3">
                          <h3 className="text-base sm:text-lg font-semibold text-slate-800">{access.resourceName}</h3>
                          <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(access.status)} w-fit`}>
                            {access.status}
                          </span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm text-slate-500 space-y-1 sm:space-y-0">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>Granted: {access.grantedDate}</span>
                          </div>
                          {access.expiryDate && (
                            <div className="flex items-center space-x-1">
                              <AlertTriangle className="w-4 h-4" />
                              <span>Expires: {access.expiryDate}</span>
                            </div>
                          )}
                          <span className="hidden sm:inline text-slate-400">•</span>
                          <span>{access.resourceType}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 justify-end sm:justify-start">
                        <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                          <Eye className="w-5 h-5 text-slate-400" />
                        </button>
                        <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                          <MoreHorizontal className="w-5 h-5 text-slate-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccessManagement;