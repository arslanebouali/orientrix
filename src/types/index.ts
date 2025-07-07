export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  avatar?: string;
  startDate: string;
  status: 'active' | 'inactive' | 'pending';
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