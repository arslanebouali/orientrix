import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Employee, OrgNode } from '../types';
import { 
  Users, 
  Mail, 
  Briefcase, 
  Calendar,
  MapPin,
  Phone,
  X,
  Crown,
  Star,
  Target,
  MoreHorizontal,
  ChevronDown,
  Building2,
  ArrowDown
} from 'lucide-react';

interface DepartmentGroup {
  name: string;
  employees: Employee[];
  manager?: Employee;
  color: string;
  position: { x: number; y: number };
}

const OrgChart: React.FC = () => {
  const { employees } = useSelector((state: RootState) => state.user);
  const [hoveredEmployee, setHoveredEmployee] = useState<Employee | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [expandedDepartments, setExpandedDepartments] = useState<Set<string>>(new Set());
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'board' | 'detailed' | 'organigram'>('board');

  // Department colors
  const departmentColors = {
    'Executive': 'bg-purple-100 border-purple-300',
    'Engineering': 'bg-blue-100 border-blue-300',
    'Product': 'bg-green-100 border-green-300',
    'Design': 'bg-pink-100 border-pink-300',
    'HR': 'bg-orange-100 border-orange-300',
    'Marketing': 'bg-yellow-100 border-yellow-300',
    'Sales': 'bg-red-100 border-red-300',
    'Finance': 'bg-indigo-100 border-indigo-300',
    'Analytics': 'bg-teal-100 border-teal-300'
  };

  // Group employees by department
  const departmentGroups = useMemo(() => {
    const groups = new Map<string, Employee[]>();
    
    employees.forEach(emp => {
      if (!groups.has(emp.department)) {
        groups.set(emp.department, []);
      }
      groups.get(emp.department)!.push(emp);
    });

    const departmentArray: DepartmentGroup[] = [];
    let x = 0;
    let y = 0;
    const maxPerRow = 3;
    let currentRow = 0;

    Array.from(groups.entries()).forEach(([deptName, deptEmployees], index) => {
      // Find department manager
      const manager = deptEmployees.find(emp => 
        emp.role.toLowerCase().includes('manager') || 
        emp.role.toLowerCase().includes('director') ||
        emp.role.toLowerCase().includes('ceo') ||
        emp.role.toLowerCase().includes('head')
      );

      // Sort employees: manager first, then others
      const sortedEmployees = deptEmployees.sort((a, b) => {
        if (a.id === manager?.id) return -1;
        if (b.id === manager?.id) return 1;
        return a.firstName.localeCompare(b.firstName);
      });

      departmentArray.push({
        name: deptName,
        employees: sortedEmployees,
        manager,
        color: departmentColors[deptName as keyof typeof departmentColors] || 'bg-gray-100 border-gray-300',
        position: { 
          x: (index % maxPerRow) * 400, 
          y: Math.floor(index / maxPerRow) * 300 
        }
      });
    });

    return departmentArray;
  }, [employees]);

  const handleMouseEnter = (employee: Employee, event: React.MouseEvent) => {
    setHoveredEmployee(employee);
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (hoveredEmployee) {
      setMousePosition({ x: event.clientX, y: event.clientY });
    }
  };

  const handleMouseLeave = () => {
    setHoveredEmployee(null);
  };

  const toggleDepartment = (deptName: string) => {
    const newExpanded = new Set(expandedDepartments);
    if (newExpanded.has(deptName)) {
      newExpanded.delete(deptName);
    } else {
      newExpanded.add(deptName);
    }
    setExpandedDepartments(newExpanded);
  };

  const viewDepartmentDetails = (deptName: string) => {
    setSelectedDepartment(deptName);
    setViewMode('organigram');
  };

  const backToBoard = () => {
    setViewMode('board');
    setSelectedDepartment(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'ring-2 ring-emerald-400';
      case 'onboarding': return 'ring-2 ring-blue-400';
      case 'pending': return 'ring-2 ring-amber-400';
      case 'inactive': return 'ring-2 ring-slate-400';
      default: return 'ring-2 ring-slate-400';
    }
  };

  const getRoleIcon = (role: string) => {
    if (role.toLowerCase().includes('ceo') || role.toLowerCase().includes('chief')) {
      return Crown;
    }
    if (role.toLowerCase().includes('manager') || role.toLowerCase().includes('director')) {
      return Star;
    }
    return Target;
  };

  // Build hierarchical tree for organigram
  const buildOrgTree = (departmentEmployees: Employee[]): OrgNode[] => {
    const employeeMap = new Map<string, Employee>();
    departmentEmployees.forEach(emp => employeeMap.set(emp.id, emp));

    // Find root nodes (employees with no manager or manager not in this department)
    const rootEmployees = departmentEmployees.filter(emp => 
      !emp.managerId || !employeeMap.has(emp.managerId)
    );

    // Build tree recursively
    const buildNode = (employee: Employee, level: number = 0): OrgNode => {
      const children = departmentEmployees
        .filter(emp => emp.managerId === employee.id)
        .map(child => buildNode(child, level + 1));

      return {
        employee,
        children,
        level,
        x: 0,
        y: 0,
        width: 200
      };
    };

    return rootEmployees.map(emp => buildNode(emp));
  };

  // Calculate positions for tree layout
  const calculatePositions = (nodes: OrgNode[], startX: number = 0): number => {
    let currentX = startX;
    
    nodes.forEach(node => {
      if (node.children.length === 0) {
        // Leaf node
        node.x = currentX;
        currentX += node.width + 50;
      } else {
        // Parent node - position children first
        const childrenWidth = calculatePositions(node.children, currentX);
        const childrenStart = currentX;
        const childrenEnd = currentX + childrenWidth - 50;
        
        // Center parent over children
        node.x = (childrenStart + childrenEnd) / 2 - node.width / 2;
        currentX += childrenWidth;
      }
      
      node.y = node.level * 150;
    });

    return currentX - startX;
  };

  // Render organigram tree
  const renderOrgTree = (nodes: OrgNode[]) => {
    const allNodes: OrgNode[] = [];
    const connections: { from: OrgNode; to: OrgNode }[] = [];

    const collectNodes = (nodeList: OrgNode[]) => {
      nodeList.forEach(node => {
        allNodes.push(node);
        node.children.forEach(child => {
          connections.push({ from: node, to: child });
        });
        collectNodes(node.children);
      });
    };

    collectNodes(nodes);
    calculatePositions(nodes);

    const maxX = Math.max(...allNodes.map(n => n.x + n.width));
    const maxY = Math.max(...allNodes.map(n => n.y)) + 100;

    return (
      <div className="relative bg-white rounded-xl border border-gray-100 p-8 overflow-auto">
        <svg 
          width={Math.max(maxX + 100, 800)} 
          height={maxY + 100}
          className="absolute top-0 left-0 pointer-events-none"
        >
          {/* Render connection lines */}
          {connections.map((conn, index) => (
            <g key={index}>
              {/* Vertical line from parent */}
              <line
                x1={conn.from.x + conn.from.width / 2 + 32}
                y1={conn.from.y + 80 + 32}
                x2={conn.from.x + conn.from.width / 2 + 32}
                y2={conn.from.y + 80 + 75}
                stroke="#e2e8f0"
                strokeWidth="2"
              />
              {/* Horizontal line */}
              <line
                x1={Math.min(conn.from.x + conn.from.width / 2, conn.to.x + conn.to.width / 2) + 32}
                y1={conn.from.y + 80 + 75}
                x2={Math.max(conn.from.x + conn.from.width / 2, conn.to.x + conn.to.width / 2) + 32}
                y2={conn.from.y + 80 + 75}
                stroke="#e2e8f0"
                strokeWidth="2"
              />
              {/* Vertical line to child */}
              <line
                x1={conn.to.x + conn.to.width / 2 + 32}
                y1={conn.from.y + 80 + 75}
                x2={conn.to.x + conn.to.width / 2 + 32}
                y2={conn.to.y + 32}
                stroke="#e2e8f0"
                strokeWidth="2"
              />
            </g>
          ))}
        </svg>

        {/* Render employee nodes */}
        {allNodes.map((node) => {
          const RoleIcon = getRoleIcon(node.employee.role);
          const isManager = node.employee.role.toLowerCase().includes('manager') || 
                           node.employee.role.toLowerCase().includes('director') ||
                           node.employee.role.toLowerCase().includes('ceo');
          
          return (
            <div
              key={node.employee.id}
              className="absolute pointer-events-auto"
              style={{
                left: node.x + 32,
                top: node.y + 32,
                width: node.width
              }}
              onMouseEnter={(e) => handleMouseEnter(node.employee, e)}
              onMouseLeave={handleMouseLeave}
            >
              <div className={`bg-white border-2 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer ${
                isManager ? 'border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50' : 'border-blue-300 bg-gradient-to-br from-blue-50 to-slate-50'
              }`}>
                <div className="flex flex-col items-center space-y-3">
                  <div className={`relative w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg ${
                    isManager 
                      ? 'bg-gradient-to-br from-amber-500 to-orange-600' 
                      : 'bg-gradient-to-br from-blue-500 to-blue-600'
                  } ${getStatusColor(node.employee.status)}`}>
                    {node.employee.firstName[0]}{node.employee.lastName[0]}
                    {isManager && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center">
                        <Crown className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <div className="text-center">
                    <h4 className="font-bold text-slate-800 text-sm">
                      {node.employee.firstName} {node.employee.lastName}
                    </h4>
                    <p className="text-xs text-slate-600 mb-1">{node.employee.position}</p>
                    <div className="flex items-center justify-center space-x-1">
                      <RoleIcon className="w-3 h-3 text-slate-400" />
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        node.employee.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                        node.employee.status === 'onboarding' ? 'bg-blue-100 text-blue-700' :
                        node.employee.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {node.employee.status}
                      </span>
                    </div>
                  </div>
                  
                  {node.employee.onboardingProgress !== undefined && (
                    <div className="w-full">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-slate-500">Progress</span>
                        <span className="text-xs font-medium text-slate-700">{node.employee.onboardingProgress}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5">
                        <div 
                          className="bg-gradient-to-r from-blue-400 to-blue-500 h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${node.employee.onboardingProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  // Detailed Department View
  if (viewMode === 'organigram' && selectedDepartment) {
    const department = departmentGroups.find(dept => dept.name === selectedDepartment);
    if (!department) return null;

    const orgTree = buildOrgTree(department.employees);
    return (
      <div className="space-y-6 sm:space-y-8">
        {/* Header with Back Button */}
        <div className="flex items-center space-x-4">
          <button
            onClick={backToBoard}
            className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
          >
            <ChevronDown className="w-4 h-4 rotate-90" />
            <span>Back to Overview</span>
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">{department.name} Organigram</h1>
            <p className="text-slate-600 mt-1">Hierarchical organizational chart showing reporting relationships</p>
          </div>
        </div>

        {/* Department Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 font-medium">Total Members</p>
                <p className="text-2xl font-bold text-slate-800">{department.employees.length}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 font-medium">Active</p>
                <p className="text-2xl font-bold text-emerald-600">
                  {department.employees.filter(emp => emp.status === 'active').length}
                </p>
              </div>
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 font-medium">Onboarding</p>
                <p className="text-2xl font-bold text-blue-600">
                  {department.employees.filter(emp => emp.status === 'onboarding').length}
                </p>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 font-medium">Avg Progress</p>
                <p className="text-2xl font-bold text-orange-600">
                  {Math.round(department.employees.reduce((acc, emp) => acc + (emp.onboardingProgress || 0), 0) / department.employees.length)}%
                </p>
              </div>
              <Target className="w-8 h-8 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Department Manager Card */}
        {department.manager && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Department Manager</h3>
            <div className="flex items-center space-x-4">
              <div className={`relative w-16 h-16 bg-gradient-to-br from-slate-600 to-slate-700 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg ${getStatusColor(department.manager.status)}`}>
                {department.manager.firstName[0]}{department.manager.lastName[0]}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center">
                  <Crown className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-slate-800">
                  {department.manager.firstName} {department.manager.lastName}
                </h4>
                <p className="text-slate-600 mb-2">{department.manager.position}</p>
                <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                  <div className="flex items-center space-x-1">
                    <Mail className="w-4 h-4" />
                    <span>{department.manager.email}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Started {department.manager.startDate}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Organigram Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-800">Organizational Structure</h3>
              <div className="flex items-center space-x-4 text-sm text-slate-600">
                <div className="flex items-center space-x-2">
                  <Crown className="w-4 h-4 text-amber-500" />
                  <span>Manager</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-blue-500" />
                  <span>Team Member</span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 overflow-auto">
            {orgTree.length > 0 ? (
              renderOrgTree(orgTree)
            ) : (
              <div className="text-center py-12">
                <Building2 className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-800 mb-2">No Organizational Structure</h3>
                <p className="text-slate-600">No reporting relationships found for this department.</p>
              </div>
            )}
          </div>
        </div>

        {/* Additional Department Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Department Insights</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Reporting Levels</span>
                <span className="font-semibold text-slate-800">
                  {Math.max(...orgTree.map(node => {
                    const getMaxLevel = (n: OrgNode): number => {
                      if (n.children.length === 0) return n.level;
                      return Math.max(...n.children.map(getMaxLevel));
                    };
                    return getMaxLevel(node);
                  }), 0) + 1}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Direct Reports to Manager</span>
                <span className="font-semibold text-slate-800">
                  {department.manager ? 
                    department.employees.filter(emp => emp.managerId === department.manager?.id).length : 
                    0
                  }
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Average Onboarding</span>
                <span className="font-semibold text-slate-800">
                  {Math.round(department.employees.reduce((acc, emp) => acc + (emp.onboardingProgress || 0), 0) / department.employees.length)}%
                </span>
              </div>
            </div>
          </div>

          {/* Team Contacts */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Key Contacts</h3>
            <div className="space-y-3">
              {department.employees.slice(0, 4).map((employee) => (
                <div key={employee.id} className="flex items-center space-x-3">
                  <div className={`w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-semibold text-xs ${getStatusColor(employee.status)}`}>
                    {employee.firstName[0]}{employee.lastName[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">
                      {employee.firstName} {employee.lastName}
                    </p>
                    <p className="text-xs text-slate-500 truncate">{employee.email}</p>
                  </div>
                  <div className="text-xs text-slate-400">
                    {employee.role.toLowerCase().includes('manager') || employee.role.toLowerCase().includes('director') ? (
                      <Crown className="w-4 h-4 text-amber-500" />
                    ) : (
                      <Target className="w-4 h-4" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Organization Chart</h1>
          <p className="text-slate-600 mt-1 sm:mt-2">Interactive view of our team structure by departments</p>
        </div>
        <div className="flex items-center space-x-4 text-sm text-slate-600">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
            <span>Active</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
            <span>Onboarding</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
            <span>Pending</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-slate-500 font-medium truncate">Total Employees</p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800">{employees.length}</p>
            </div>
            <Users className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-blue-500 flex-shrink-0 ml-2" />
          </div>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-slate-500 font-medium truncate">Departments</p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-emerald-600">
                {departmentGroups.length}
              </p>
            </div>
            <Building2 className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-emerald-500 flex-shrink-0 ml-2" />
          </div>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-slate-500 font-medium truncate">Managers</p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-orange-600">
                {departmentGroups.filter(dept => dept.manager).length}
              </p>
            </div>
            <Star className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-orange-500 flex-shrink-0 ml-2" />
          </div>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-slate-500 font-medium truncate">Avg Team Size</p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-600">
                {Math.round(employees.length / departmentGroups.length)}
              </p>
            </div>
            <MapPin className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-slate-500 flex-shrink-0 ml-2" />
          </div>
        </div>
      </div>

      {/* Organization Board */}
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl sm:rounded-2xl p-6 sm:p-8 min-h-[600px]" onMouseMove={handleMouseMove}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {departmentGroups.map((department) => (
            <div
              key={department.name}
              className={`${department.color} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2`}
            >
              {/* Department Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    <Building2 className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg">{department.name}</h3>
                    <p className="text-sm text-slate-600">{department.employees.length} members</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleDepartment(department.name)}
                  className="p-2 hover:bg-white/50 rounded-lg transition-colors"
                >
                  <MoreHorizontal className="w-5 h-5 text-slate-600" />
                </button>
              </div>

              {/* Department Manager */}
              {department.manager && (
                <div className="mb-4 p-3 bg-white/70 rounded-xl border border-white/50">
                  <div className="flex items-center space-x-3">
                    <div className={`relative w-10 h-10 bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl flex items-center justify-center text-white font-semibold text-sm shadow-sm ${getStatusColor(department.manager.status)}`}>
                      {department.manager.firstName[0]}{department.manager.lastName[0]}
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center">
                        <Crown className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-800 text-sm truncate">
                        {department.manager.firstName} {department.manager.lastName}
                      </p>
                      <p className="text-xs text-slate-600 truncate">{department.manager.position}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Team Members */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-slate-700 text-sm">Team</h4>
                  <span className="text-xs text-slate-500">
                    {department.employees.filter(emp => emp.id !== department.manager?.id).length} members
                  </span>
                </div>
                
                {/* Key Contacts (first 3 non-manager employees) */}
                <div className="grid grid-cols-3 gap-2">
                  {department.employees
                    .filter(emp => emp.id !== department.manager?.id)
                    .slice(0, 3)
                    .map((employee) => {
                      const RoleIcon = getRoleIcon(employee.role);
                      return (
                        <div
                          key={employee.id}
                          className="group cursor-pointer"
                          onMouseEnter={(e) => handleMouseEnter(employee, e)}
                          onMouseLeave={handleMouseLeave}
                        >
                          <div className={`w-full p-2 bg-white/70 rounded-xl hover:bg-white hover:shadow-md transition-all duration-200 border border-white/50`}>
                            <div className="flex flex-col items-center space-y-1">
                              <div className={`relative w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-semibold text-xs shadow-sm ${getStatusColor(employee.status)}`}>
                                {employee.firstName[0]}{employee.lastName[0]}
                              </div>
                              <div className="text-center">
                                <p className="text-xs font-medium text-slate-800 truncate w-full">
                                  {employee.firstName}
                                </p>
                                <p className="text-xs text-slate-500 truncate w-full">
                                  {employee.lastName}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>

                {/* Show more indicator */}
                {department.employees.filter(emp => emp.id !== department.manager?.id).length > 3 && (
                  <button
                    onClick={() => toggleDepartment(department.name)}
                    className="w-full p-2 bg-white/50 hover:bg-white/70 rounded-xl transition-colors border border-white/50 text-center"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-xs text-slate-600 font-medium">
                        +{department.employees.filter(emp => emp.id !== department.manager?.id).length - 3} more
                      </span>
                      <ChevronDown className="w-4 h-4 text-slate-500" />
                    </div>
                  </button>
                )}

                {/* View organigram link */}
                <button 
                  onClick={() => viewDepartmentDetails(department.name)}
                  className="w-full p-2 bg-white/50 hover:bg-white/70 rounded-xl transition-colors border border-white/50 text-center"
                >
                  <span className="text-xs text-slate-600 font-medium">View organigram</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hover Overlay */}
      {hoveredEmployee && (
        <div
          className="fixed z-50 bg-white rounded-xl shadow-xl border border-gray-200 p-6 max-w-sm pointer-events-none"
          style={{
            left: mousePosition.x + 20,
            top: mousePosition.y - 100,
            transform: mousePosition.x > window.innerWidth - 300 ? 'translateX(-100%)' : 'none'
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-semibold shadow-sm ${getStatusColor(hoveredEmployee.status)}`}>
                {hoveredEmployee.firstName[0]}{hoveredEmployee.lastName[0]}
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">
                  {hoveredEmployee.firstName} {hoveredEmployee.lastName}
                </h3>
                <p className="text-sm text-slate-600">{hoveredEmployee.position}</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-sm">
              <Briefcase className="w-4 h-4 text-slate-400" />
              <span className="text-slate-600">{hoveredEmployee.department}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Mail className="w-4 h-4 text-slate-400" />
              <span className="text-slate-600">{hoveredEmployee.email}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span className="text-slate-600">Started {hoveredEmployee.startDate}</span>
            </div>
            {hoveredEmployee.managerId && (
              <div className="flex items-center space-x-2 text-sm">
                <Users className="w-4 h-4 text-slate-400" />
                <span className="text-slate-600">
                  Reports to: {(() => {
                    const manager = employees.find(emp => emp.id === hoveredEmployee.managerId);
                    return manager ? `${manager.firstName} ${manager.lastName}` : 'Unknown';
                  })()}
                </span>
              </div>
            )}
            {hoveredEmployee.onboardingProgress !== undefined && (
              <div className="pt-2 border-t border-gray-100">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-slate-500">Onboarding Progress</span>
                  <span className="text-xs font-medium text-slate-700">{hoveredEmployee.onboardingProgress}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-400 to-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${hoveredEmployee.onboardingProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrgChart;