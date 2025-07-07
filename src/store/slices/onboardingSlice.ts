import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface OnboardingModule {
  id: string;
  title: string;
  description: string;
  type: 'course' | 'checklist' | 'document' | 'quiz' | 'meeting';
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  isRequired: boolean;
  order: number;
  department?: string;
  role?: string;
  badge?: string;
  lessons?: OnboardingLesson[];
}

export interface OnboardingLesson {
  id: string;
  title: string;
  type: 'video' | 'reading' | 'quiz' | 'interactive';
  duration: number;
  content?: string;
  videoUrl?: string;
  questions?: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple_choice' | 'true_false' | 'text';
  options?: string[];
  correctAnswer: string | number;
  explanation?: string;
}

export interface OnboardingPath {
  id: string;
  name: string;
  description: string;
  targetRole: string;
  targetDepartment: string;
  modules: string[];
  estimatedDuration: number;
  isTemplate: boolean;
  createdBy: string;
  createdAt: string;
}

export interface UserProgress {
  userId: string;
  pathId: string;
  moduleId: string;
  lessonId?: string;
  status: 'not_started' | 'in_progress' | 'completed' | 'skipped';
  progress: number;
  startedAt?: string;
  completedAt?: string;
  score?: number;
}

interface OnboardingState {
  modules: OnboardingModule[];
  paths: OnboardingPath[];
  userProgress: UserProgress[];
  currentModule: OnboardingModule | null;
  loading: boolean;
  error: string | null;
}

const initialState: OnboardingState = {
  modules: [
    {
      id: 'mod_1',
      title: 'IT Security Fundamentals',
      description: 'Learn the basics of cybersecurity and best practices for protecting company data.',
      type: 'course',
      duration: 120,
      difficulty: 'beginner',
      isRequired: true,
      order: 1,
      badge: 'Security Champion',
      lessons: [
        {
          id: 'lesson_1',
          title: 'Introduction to Cybersecurity',
          type: 'video',
          duration: 20,
          videoUrl: 'https://example.com/video1'
        },
        {
          id: 'lesson_2',
          title: 'Password Security',
          type: 'reading',
          duration: 15,
          content: 'Best practices for creating and managing secure passwords...'
        },
        {
          id: 'lesson_3',
          title: 'Security Assessment',
          type: 'quiz',
          duration: 30,
          questions: [
            {
              id: 'q1',
              question: 'What makes a strong password?',
              type: 'multiple_choice',
              options: ['Length only', 'Complexity only', 'Both length and complexity', 'Neither'],
              correctAnswer: 2,
              explanation: 'Strong passwords require both length (12+ characters) and complexity (mix of characters).'
            }
          ]
        }
      ]
    },
    {
      id: 'mod_2',
      title: 'Company Culture & Values',
      description: 'Understand our mission, vision, and the values that drive our organization.',
      type: 'course',
      duration: 90,
      difficulty: 'beginner',
      isRequired: true,
      order: 2,
      badge: 'Culture Ambassador'
    },
    {
      id: 'mod_3',
      title: 'HR Policies & Procedures',
      description: 'Essential policies, procedures, and guidelines for all employees.',
      type: 'document',
      duration: 60,
      difficulty: 'beginner',
      isRequired: true,
      order: 3,
      badge: 'Policy Expert'
    }
  ],
  paths: [
    {
      id: 'path_1',
      name: 'Software Engineer Onboarding',
      description: 'Complete onboarding path for software engineers',
      targetRole: 'Software Engineer',
      targetDepartment: 'Engineering',
      modules: ['mod_1', 'mod_2', 'mod_3'],
      estimatedDuration: 270,
      isTemplate: true,
      createdBy: 'hr_1',
      createdAt: '2024-01-01T00:00:00Z'
    }
  ],
  userProgress: [
    {
      userId: '1',
      pathId: 'path_1',
      moduleId: 'mod_1',
      status: 'completed',
      progress: 100,
      startedAt: '2024-01-10T09:00:00Z',
      completedAt: '2024-01-12T17:30:00Z',
      score: 95
    },
    {
      userId: '1',
      pathId: 'path_1',
      moduleId: 'mod_2',
      status: 'in_progress',
      progress: 65,
      startedAt: '2024-01-13T10:00:00Z'
    }
  ],
  currentModule: null,
  loading: false,
  error: null,
};

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setModules: (state, action: PayloadAction<OnboardingModule[]>) => {
      state.modules = action.payload;
    },
    addModule: (state, action: PayloadAction<OnboardingModule>) => {
      state.modules.push(action.payload);
    },
    updateModule: (state, action: PayloadAction<{ id: string; updates: Partial<OnboardingModule> }>) => {
      const index = state.modules.findIndex(mod => mod.id === action.payload.id);
      if (index !== -1) {
        state.modules[index] = { ...state.modules[index], ...action.payload.updates };
      }
    },
    setCurrentModule: (state, action: PayloadAction<OnboardingModule | null>) => {
      state.currentModule = action.payload;
    },
    updateUserProgress: (state, action: PayloadAction<UserProgress>) => {
      const index = state.userProgress.findIndex(
        p => p.userId === action.payload.userId && 
            p.moduleId === action.payload.moduleId
      );
      if (index !== -1) {
        state.userProgress[index] = action.payload;
      } else {
        state.userProgress.push(action.payload);
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setModules,
  addModule,
  updateModule,
  setCurrentModule,
  updateUserProgress,
  setLoading,
  setError,
} = onboardingSlice.actions;

export default onboardingSlice.reducer;