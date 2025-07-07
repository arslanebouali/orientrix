import React, { useState } from 'react';
import { 
  FileText, 
  FolderOpen, 
  Search, 
  Upload,
  Download,
  Eye,
  Share2,
  Filter,
  Grid,
  List,
  Calendar,
  Tag,
  File,
  Image,
  Video,
  FileSpreadsheet
} from 'lucide-react';
import { Document } from '../types';

const Documentation: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const documents: Document[] = [
    {
      id: '1',
      title: 'Employee Handbook 2024',
      category: 'HR Policies',
      type: 'pdf',
      size: '2.4 MB',
      uploadDate: '2024-01-15',
      tags: ['handbook', 'policies', 'hr'],
      url: '#'
    },
    {
      id: '2',
      title: 'Company Organigram',
      category: 'Organization',
      type: 'img',
      size: '1.2 MB',
      uploadDate: '2024-01-10',
      tags: ['organigram', 'structure', 'teams'],
      url: '#'
    },
    {
      id: '3',
      title: 'Benefits Overview',
      category: 'Benefits',
      type: 'pdf',
      size: '850 KB',
      uploadDate: '2024-01-08',
      tags: ['benefits', 'insurance', 'retirement'],
      url: '#'
    },
    {
      id: '4',
      title: 'IT Security Guidelines',
      category: 'IT',
      type: 'doc',
      size: '1.8 MB',
      uploadDate: '2024-01-05',
      tags: ['security', 'it', 'guidelines'],
      url: '#'
    },
    {
      id: '5',
      title: 'Remote Work Policy',
      category: 'HR Policies',
      type: 'pdf',
      size: '650 KB',
      uploadDate: '2024-01-03',
      tags: ['remote', 'work', 'policy'],
      url: '#'
    },
    {
      id: '6',
      title: 'Onboarding Checklist',
      category: 'Onboarding',
      type: 'doc',
      size: '320 KB',
      uploadDate: '2024-01-01',
      tags: ['onboarding', 'checklist', 'new-hire'],
      url: '#'
    },
    {
      id: '7',
      title: 'Training Schedule Q1',
      category: 'Training',
      type: 'doc',
      size: '420 KB',
      uploadDate: '2023-12-28',
      tags: ['training', 'schedule', 'q1'],
      url: '#'
    },
    {
      id: '8',
      title: 'Code of Conduct',
      category: 'HR Policies',
      type: 'pdf',
      size: '1.1 MB',
      uploadDate: '2023-12-25',
      tags: ['conduct', 'ethics', 'behavior'],
      url: '#'
    },
  ];

  const categories = ['all', 'HR Policies', 'Organization', 'Benefits', 'IT', 'Onboarding', 'Training'];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = filterCategory === 'all' || doc.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return File;
      case 'doc': return FileText;
      case 'img': return Image;
      case 'video': return Video;
      case 'xls': return FileSpreadsheet;
      default: return FileText;
    }
  };

  const getFileColor = (type: string) => {
    switch (type) {
      case 'pdf': return 'text-red-500';
      case 'doc': return 'text-blue-500';
      case 'img': return 'text-green-500';
      case 'video': return 'text-purple-500';
      case 'xls': return 'text-yellow-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Documentation</h1>
          <p className="text-slate-600 mt-1 sm:mt-2">Access and manage company documents and resources</p>
        </div>
        <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl w-full sm:w-auto">
          <Upload className="w-5 h-5" />
          <span className="font-medium">Upload Document</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-slate-500 font-medium truncate">Total Documents</p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800">156</p>
            </div>
            <FileText className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-orange-500 flex-shrink-0 ml-2" />
          </div>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-slate-500 font-medium truncate">Categories</p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-emerald-600">8</p>
            </div>
            <FolderOpen className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-emerald-500 flex-shrink-0 ml-2" />
          </div>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-slate-500 font-medium truncate">Recent Uploads</p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-600">12</p>
            </div>
            <Upload className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-slate-500 flex-shrink-0 ml-2" />
          </div>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-slate-500 font-medium truncate">Storage Used</p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-amber-600">2.8 GB</p>
            </div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-amber-100 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 ml-2">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-amber-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100">
        <div className="flex flex-col space-y-4">
          <div className="relative">
            <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-4 py-2 sm:py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-3">
              <Filter className="w-5 h-5 text-slate-400" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all flex-1 sm:flex-none"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-2 border border-slate-200 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-orange-100 text-orange-600' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-orange-100 text-orange-600' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Documents */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100">
        <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 border-b border-gray-100">
          <h3 className="text-lg sm:text-xl font-semibold text-slate-800">Documents</h3>
        </div>
        
        {viewMode === 'grid' ? (
          <div className="p-4 sm:p-6 lg:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredDocuments.map((doc) => {
              const Icon = getFileIcon(doc.type);
              return (
                <div key={doc.id} className="border border-gray-100 rounded-xl p-4 sm:p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <Icon className={`w-6 h-6 sm:w-8 sm:h-8 ${getFileColor(doc.type)}`} />
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <button className="p-1 sm:p-2 hover:bg-slate-100 rounded-lg transition-colors">
                        <Eye className="w-4 h-4 text-slate-400" />
                      </button>
                      <button className="p-1 sm:p-2 hover:bg-slate-100 rounded-lg transition-colors">
                        <Download className="w-4 h-4 text-slate-400" />
                      </button>
                      <button className="p-1 sm:p-2 hover:bg-slate-100 rounded-lg transition-colors">
                        <Share2 className="w-4 h-4 text-slate-400" />
                      </button>
                    </div>
                  </div>
                  <h4 className="font-medium text-slate-800 mb-2 line-clamp-2 text-sm sm:text-base">{doc.title}</h4>
                  <p className="text-sm text-slate-500 mb-2">{doc.category}</p>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                    <span>{doc.size}</span>
                    <span>{doc.uploadDate}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {doc.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-slate-100 text-slate-600 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredDocuments.map((doc) => {
              const Icon = getFileIcon(doc.type);
              return (
                <div key={doc.id} className="p-4 sm:p-6 lg:p-8 hover:bg-slate-50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                    <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
                      <Icon className={`w-6 h-6 sm:w-8 sm:h-8 ${getFileColor(doc.type)} flex-shrink-0`} />
                      <div className="min-w-0 flex-1">
                        <h4 className="font-medium text-slate-800 text-sm sm:text-base truncate">{doc.title}</h4>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-1 space-y-1 sm:space-y-0">
                          <span className="text-sm text-slate-500">{doc.category}</span>
                          <span className="text-sm text-slate-500">{doc.size}</span>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4 text-slate-400" />
                            <span className="text-sm text-slate-500">{doc.uploadDate}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {doc.tags.map((tag, index) => (
                            <span key={index} className="px-2 py-1 bg-slate-100 text-slate-600 rounded-full text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 justify-end sm:justify-start">
                      <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                        <Eye className="w-5 h-5 text-slate-400" />
                      </button>
                      <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                        <Download className="w-5 h-5 text-slate-400" />
                      </button>
                      <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                        <Share2 className="w-5 h-5 text-slate-400" />
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
  );
};

export default Documentation;