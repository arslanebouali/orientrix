import React, { useState } from 'react';
import { 
  GraduationCap, 
  Award, 
  Play, 
  CheckCircle2, 
  Clock,
  BookOpen,
  Video,
  FileText,
  Trophy,
  Target,
  Star,
  Users
} from 'lucide-react';
import { Course, Badge } from '../types';

const Onboarding: React.FC = () => {
  const [activeTab, setActiveTab] = useState('courses');

  const courses: Course[] = [
    {
      id: '1',
      title: 'IT Security Fundamentals',
      description: 'Learn the basics of cybersecurity and best practices for protecting company data.',
      duration: 120,
      difficulty: 'beginner',
      progress: 75,
      badge: 'Security Champion',
      completed: false,
      lessons: [
        { id: '1', title: 'Introduction to Cybersecurity', type: 'video', duration: 20, completed: true },
        { id: '2', title: 'Password Security', type: 'reading', duration: 15, completed: true },
        { id: '3', title: 'Phishing Awareness', type: 'video', duration: 25, completed: true },
        { id: '4', title: 'Security Assessment', type: 'quiz', duration: 30, completed: false },
      ]
    },
    {
      id: '2',
      title: 'Company Culture & Values',
      description: 'Understand our mission, vision, and the values that drive our organization.',
      duration: 90,
      difficulty: 'beginner',
      progress: 100,
      badge: 'Culture Ambassador',
      completed: true,
      lessons: [
        { id: '1', title: 'Our Story', type: 'video', duration: 30, completed: true },
        { id: '2', title: 'Core Values', type: 'reading', duration: 20, completed: true },
        { id: '3', title: 'Culture Quiz', type: 'quiz', duration: 40, completed: true },
      ]
    },
    {
      id: '3',
      title: 'HR Policies & Procedures',
      description: 'Essential policies, procedures, and guidelines for all employees.',
      duration: 60,
      difficulty: 'beginner',
      progress: 45,
      badge: 'Policy Expert',
      completed: false,
      lessons: [
        { id: '1', title: 'Employee Handbook', type: 'reading', duration: 30, completed: true },
        { id: '2', title: 'Benefits Overview', type: 'video', duration: 20, completed: false },
        { id: '3', title: 'Policy Assessment', type: 'quiz', duration: 10, completed: false },
      ]
    },
    {
      id: '4',
      title: 'Leadership Excellence',
      description: 'Advanced course for managers and team leaders.',
      duration: 180,
      difficulty: 'advanced',
      progress: 0,
      badge: 'Leadership Master',
      completed: false,
      lessons: [
        { id: '1', title: 'Leadership Fundamentals', type: 'video', duration: 45, completed: false },
        { id: '2', title: 'Team Management', type: 'reading', duration: 60, completed: false },
        { id: '3', title: 'Conflict Resolution', type: 'video', duration: 45, completed: false },
        { id: '4', title: 'Leadership Assessment', type: 'quiz', duration: 30, completed: false },
      ]
    },
  ];

  const badges: Badge[] = [
    {
      id: '1',
      name: 'Security Champion',
      description: 'Completed IT Security Fundamentals course',
      icon: '🛡️',
      color: 'bg-orange-100 text-orange-700',
      earnedDate: '2023-12-01'
    },
    {
      id: '2',
      name: 'Culture Ambassador',
      description: 'Mastered company culture and values',
      icon: '🎯',
      color: 'bg-emerald-100 text-emerald-700',
      earnedDate: '2023-11-15'
    },
    {
      id: '3',
      name: 'Policy Expert',
      description: 'Completed HR policies training',
      icon: '📋',
      color: 'bg-slate-100 text-slate-700'
    },
    {
      id: '4',
      name: 'Leadership Master',
      description: 'Advanced leadership certification',
      icon: '👑',
      color: 'bg-amber-100 text-amber-700'
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-emerald-100 text-emerald-700';
      case 'intermediate': return 'bg-amber-100 text-amber-700';
      case 'advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'reading': return BookOpen;
      case 'quiz': return Target;
      default: return FileText;
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 via-emerald-600 to-orange-500 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-white shadow-xl">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3">Employee Onboarding</h1>
        <p className="text-emerald-100 text-base sm:text-lg">Complete courses, earn badges, and master your role</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-slate-500 font-medium truncate">Courses Completed</p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-emerald-600">8</p>
            </div>
            <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-emerald-500 flex-shrink-0 ml-2" />
          </div>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-slate-500 font-medium truncate">Badges Earned</p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-orange-600">12</p>
            </div>
            <Award className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-orange-500 flex-shrink-0 ml-2" />
          </div>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-slate-500 font-medium truncate">Hours Learned</p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-600">47</p>
            </div>
            <Clock className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-slate-500 flex-shrink-0 ml-2" />
          </div>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-slate-500 font-medium truncate">Completion Rate</p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-amber-600">85%</p>
            </div>
            <Trophy className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-amber-500 flex-shrink-0 ml-2" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100">
        <div className="border-b border-gray-100">
          <nav className="flex px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setActiveTab('courses')}
              className={`py-4 sm:py-6 px-1 border-b-2 sm:border-b-3 font-semibold text-sm transition-all flex-1 sm:flex-none ${
                activeTab === 'courses'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              <div className="flex items-center justify-center sm:justify-start space-x-2 sm:space-x-3">
                <GraduationCap className="w-5 h-5" />
                <span>Courses</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('badges')}
              className={`py-4 sm:py-6 px-1 border-b-2 sm:border-b-3 font-semibold text-sm transition-all flex-1 sm:flex-none ${
                activeTab === 'badges'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              <div className="flex items-center justify-center sm:justify-start space-x-2 sm:space-x-3">
                <Award className="w-5 h-5" />
                <span>Badges</span>
              </div>
            </button>
          </nav>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          {activeTab === 'courses' && (
            <div className="space-y-6 sm:space-y-8">
              {courses.map((course) => (
                <div key={course.id} className="border border-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 hover:shadow-md transition-shadow">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0 mb-4 sm:mb-6">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-3">
                        <h3 className="text-lg sm:text-xl font-semibold text-slate-800">{course.title}</h3>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(course.difficulty)}`}>
                            {course.difficulty}
                          </span>
                          {course.completed && (
                            <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500" />
                          )}
                        </div>
                      </div>
                      <p className="text-slate-600 mb-3 sm:mb-4 text-base sm:text-lg leading-relaxed">{course.description}</p>
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-slate-500">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span className="font-medium">{course.duration} min</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <BookOpen className="w-4 h-4" />
                          <span className="font-medium">{course.lessons.length} lessons</span>
                        </div>
                        {course.badge && (
                          <div className="flex items-center space-x-2">
                            <Award className="w-4 h-4" />
                            <span className="font-medium">{course.badge}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <button className="w-full sm:w-auto lg:ml-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg">
                      <Play className="w-5 h-5" />
                      <span className="font-medium">{course.progress > 0 ? 'Continue' : 'Start'}</span>
                    </button>
                  </div>
                  
                  <div className="mb-4 sm:mb-6">
                    <div className="flex justify-between items-center mb-2 sm:mb-3">
                      <span className="text-sm font-semibold text-slate-700">Progress</span>
                      <span className="text-sm text-slate-600 font-medium">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 sm:h-3">
                      <div 
                        className="bg-gradient-to-r from-orange-400 to-orange-500 h-2 sm:h-3 rounded-full transition-all duration-300 shadow-sm"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-2 sm:space-y-3">
                    {course.lessons.map((lesson) => {
                      const Icon = getTypeIcon(lesson.type);
                      return (
                        <div key={lesson.id} className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-slate-50 rounded-xl">
                          <Icon className="w-5 h-5 text-slate-400 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-800 truncate">{lesson.title}</p>
                            <p className="text-xs text-slate-500">{lesson.duration} min</p>
                          </div>
                          {lesson.completed && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'badges' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {badges.map((badge) => (
                <div key={badge.id} className="bg-white border border-gray-100 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:shadow-md transition-shadow text-center">
                  <div className="text-4xl sm:text-5xl mb-4 sm:mb-6">{badge.icon}</div>
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-2 sm:mb-3">{badge.name}</h3>
                  <p className="text-sm text-slate-600 mb-4 sm:mb-6 leading-relaxed">{badge.description}</p>
                  <span className={`inline-block px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs font-medium ${badge.color}`}>
                    {badge.earnedDate ? `Earned ${badge.earnedDate}` : 'Not earned'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;