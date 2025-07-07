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
  Target
} from 'lucide-react';

const OrgChart: React.FC = () => {
  const { employees } = useSelector((state: RootState) => state.user);
  const [hoveredEmployee, setHoveredEmployee] = useState<Employee | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Transform flat employee data into hierarchical tree structure
  const orgTree = useMemo(() => {
    const buildTree = (employees: Employee[]): OrgNode[] => {
      const employeeMap = new Map<string, Employee>();
      const childrenMap = new Map<string, Employee[]>();

      // Create maps for quick lookup
      employees.forEach(emp => {
        employeeMap.set(emp.id, emp);
        if (!childrenMap.has(emp.id)) {
          childrenMap.set(emp.id, []);
        }
      });

      // Group employees by their manager
      employees.forEach(emp => {
        if (emp.managerId) {
          const siblings = childrenMap.get(emp.managerId) || [];
          siblings.push(emp);
          childrenMap.set(emp.managerId, siblings);
        }
      });

      // Find root employees (those without managers)
      const roots = employees.filter(emp => !emp.managerId);

      // Build tree recursively
      const buildNode = (employee: Employee, level: number = 0): OrgNode => {
        const children = (childrenMap.get(employee.id) || [])
          .map(child => buildNode(child, level + 1));

        return {
          employee,
          children,
          level,
          x: 0,
          y: 0,
          width: 0
        };
      };

      return roots.map(root => buildNode(root));
    };

    // Calculate positions for nodes
    const calculatePositions = (nodes: OrgNode[], startX: number = 0): number => {
      const nodeWidth = 200;
      const nodeHeight = 120;
      const horizontalSpacing = 40;
      const verticalSpacing = 80;

      let currentX = startX;

      nodes.forEach(node => {
        if (node.children.length > 0) {
          // Calculate positions for children first
          const childrenWidth = calculatePositions(node.children, currentX);
          
          // Position parent in the center of children
          const firstChildX = node.children[0].x;
          const lastChildX = node.children[node.children.length - 1].x;
          node.x = firstChildX + (lastChildX - firstChildX) / 2;
          node.y = node.level * (nodeHeight + verticalSpacing);
          node.width = nodeWidth;

          currentX = Math.max(currentX, childrenWidth);
        } else {
          // Leaf node
          node.x = currentX;
          node.y = node.level * (nodeHeight + verticalSpacing);
          node.width = nodeWidth;
          currentX += nodeWidth + horizontalSpacing;
        }
      });

      return currentX;
    };

    const tree = buildTree(employees);
    calculatePositions(tree);
    return tree;
  }, [employees]);

  // Get all nodes in a flat array for rendering
  const allNodes = useMemo(() => {
    const flattenNodes = (nodes: OrgNode[]): OrgNode[] => {
      return nodes.reduce((acc, node) => {
        acc.push(node);
        acc.push(...flattenNodes(node.children));
        return acc;
      }, [] as OrgNode[]);
    };
    return flattenNodes(orgTree);
  }, [orgTree]);

  // Calculate SVG dimensions
  const svgDimensions = useMemo(() => {
    if (allNodes.length === 0) return { width: 800, height: 600 };
    
    const maxX = Math.max(...allNodes.map(node => node.x + node.width));
    const maxY = Math.max(...allNodes.map(node => node.y + 120));
    
    return {
      width: Math.max(maxX + 100, 800),
      height: Math.max(maxY + 100, 600)
    };
  }, [allNodes]);

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'border-emerald-400 bg-emerald-50';
      case 'onboarding': return 'border-blue-400 bg-blue-50';
      case 'pending': return 'border-amber-400 bg-amber-50';
      case 'inactive': return 'border-slate-400 bg-slate-50';
      default: return 'border-slate-400 bg-slate-50';
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

  const renderConnections = () => {
    const connections: JSX.Element[] = [];

    const addConnections = (nodes: OrgNode[]) => {
      nodes.forEach(node => {
        node.children.forEach(child => {
          const startX = node.x + node.width / 2;
          const startY = node.y + 120;
          const endX = child.x + child.width / 2;
          const endY = child.y;

          // Create a curved connection
          const midY = startY + (endY - startY) / 2;

          connections.push(
            <path
              key={`${node.employee.id}-${child.employee.id}`}
              d={`M ${startX} ${startY} Q ${startX} ${midY} ${(startX + endX) / 2} ${midY} Q ${endX} ${midY} ${endX} ${endY}`}
              stroke="#e2e8f0"
              strokeWidth="2"
              fill="none"
              className="transition-all duration-300"
            />
          );
        });
        addConnections(node.children);
      });
    };

    addConnections(orgTree);
    return connections;
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Organization Chart</h1>
          <p className="text-slate-600 mt-1 sm:mt-2">Interactive view of our team structure and hierarchy</p>
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
                {new Set(employees.map(emp => emp.department)).size}
              </p>
            </div>
            <Briefcase className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-emerald-500 flex-shrink-0 ml-2" />
          </div>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-slate-500 font-medium truncate">Managers</p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-orange-600">
                {employees.filter(emp => employees.some(e => e.managerId === emp.id)).length}
              </p>
            </div>
            <Star className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-orange-500 flex-shrink-0 ml-2" />
          </div>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-slate-500 font-medium truncate">Hierarchy Levels</p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-600">
                {Math.max(...allNodes.map(node => node.level)) + 1}
              </p>
            </div>
            <MapPin className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-slate-500 flex-shrink-0 ml-2" />
          </div>
        </div>
      </div>

      {/* Organization Chart */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 overflow-auto">
        <div className="relative" onMouseMove={handleMouseMove}>
          <svg
            width={svgDimensions.width}
            height={svgDimensions.height}
            className="w-full h-auto"
            style={{ minHeight: '400px' }}
          >
            {/* Render connections */}
            {renderConnections()}
            
            {/* Render employee nodes */}
            {allNodes.map(node => {
              const RoleIcon = getRoleIcon(node.employee.role);
              return (
                <g key={node.employee.id}>
                  <foreignObject
                    x={node.x}
                    y={node.y}
                    width={node.width}
                    height="120"
                  >
                    <div
                      className={`w-full h-full p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${getStatusColor(node.employee.status)}`}
                      onMouseEnter={(e) => handleMouseEnter(node.employee, e)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="flex items-center space-x-3 h-full">
                        <div className="relative">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                            {node.employee.firstName[0]}{node.employee.lastName[0]}
                          </div>
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm">
                            <RoleIcon className="w-3 h-3 text-slate-600" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-slate-800 text-sm truncate">
                            {node.employee.firstName} {node.employee.lastName}
                          </h4>
                          <p className="text-xs text-slate-600 truncate">{node.employee.position}</p>
                          <p className="text-xs text-slate-500 truncate">{node.employee.department}</p>
                        </div>
                      </div>
                    </div>
                  </foreignObject>
                </g>
              );
            })}
          </svg>
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
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-semibold shadow-sm">
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