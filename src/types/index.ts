export interface Employee {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  department: string;
  position: string;
  avatar?: string;
  startDate: string;
  status: 'active' | 'inactive' | 'pending' | 'onboarding';
  companyId: string;
  managerId?: string;
  onboardingProgress?: number;
  lastLogin?: string;
}

export interface OrgNode {
  employee: Employee;
  children: OrgNode[];
  level: number;
  x: number;
  y: number;
  width: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  progress: number;
  badge?: string;
  completed: boolean;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'reading' | 'quiz';
  duration: number;
  completed: boolean;
}

export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
  passingScore: number;
  attempts: number;
  maxAttempts: number;
  badge?: string;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  earnedDate?: string;
}

export interface Document {
  id: string;
  title: string;
  category: string;
  type: 'pdf' | 'doc' | 'img' | 'video';
  size: string;
  uploadDate: string;
  tags: string[];
  url: string;
}

export interface AccessRequest {
  id: string;
  requesterId: string;
  requesterName: string;
  resourceName: string;
  resourceType: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  requestDate: string;
  approver?: string;
  approvalDate?: string;
  urgency: 'low' | 'medium' | 'high';
}

export interface Access {
  id: string;
  resourceName: string;
  resourceType: string;
  grantedDate: string;
  expiryDate?: string;
  status: 'active' | 'expired' | 'revoked';
}