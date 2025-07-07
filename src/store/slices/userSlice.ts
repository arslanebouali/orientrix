import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Employee {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  department: string;
  position: string;
  startDate: string;
  status: 'active' | 'inactive' | 'pending' | 'onboarding';
  avatar?: string;
  companyId: string;
  managerId?: string;
  onboardingProgress?: number;
  lastLogin?: string;
}

interface UserState {
  employees: Employee[];
  currentEmployee: Employee | null;
  loading: boolean;
  error: string | null;
  filters: {
    department: string;
    status: string;
    search: string;
  };
}

const initialState: UserState = {
  employees: [
    {
      id: '1',
      email: 'sarah.johnson@orientrix.com',
      firstName: 'Sarah',
      lastName: 'Johnson',
      role: 'Software Engineer',
      department: 'Engineering',
      position: 'Senior Developer',
      startDate: '2023-01-15',
      status: 'active',
      companyId: 'comp_1',
      managerId: '4',
      onboardingProgress: 85,
      lastLogin: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      email: 'michael.chen@orientrix.com',
      firstName: 'Michael',
      lastName: 'Chen',
      role: 'Product Manager',
      department: 'Product',
      position: 'Senior PM',
      startDate: '2022-11-20',
      status: 'active',
      companyId: 'comp_1',
      managerId: '5',
      onboardingProgress: 100,
      lastLogin: '2024-01-15T09:15:00Z'
    },
    {
      id: '3',
      email: 'emily.rodriguez@orientrix.com',
      firstName: 'Emily',
      lastName: 'Rodriguez',
      role: 'UX Designer',
      department: 'Design',
      position: 'Lead Designer',
      startDate: '2023-03-10',
      status: 'onboarding',
      companyId: 'comp_1',
      managerId: '5',
      onboardingProgress: 45,
      lastLogin: '2024-01-14T16:45:00Z'
    },
    {
      id: '4',
      email: 'alex.thompson@orientrix.com',
      firstName: 'Alex',
      lastName: 'Thompson',
      role: 'Engineering Manager',
      department: 'Engineering',
      position: 'Engineering Manager',
      startDate: '2021-08-15',
      status: 'active',
      companyId: 'comp_1',
      managerId: '6',
      onboardingProgress: 100,
      lastLogin: '2024-01-15T11:20:00Z'
    },
    {
      id: '5',
      email: 'lisa.wang@orientrix.com',
      firstName: 'Lisa',
      lastName: 'Wang',
      role: 'Product Director',
      department: 'Product',
      position: 'Director of Product',
      startDate: '2020-05-10',
      status: 'active',
      companyId: 'comp_1',
      managerId: '6',
      onboardingProgress: 100,
      lastLogin: '2024-01-15T08:45:00Z'
    },
    {
      id: '6',
      email: 'robert.kim@orientrix.com',
      firstName: 'Robert',
      lastName: 'Kim',
      role: 'CEO',
      department: 'Executive',
      position: 'Chief Executive Officer',
      startDate: '2019-01-01',
      status: 'active',
      companyId: 'comp_1',
      onboardingProgress: 100,
      lastLogin: '2024-01-15T07:30:00Z'
    },
    {
      id: '7',
      email: 'maria.garcia@orientrix.com',
      firstName: 'Maria',
      lastName: 'Garcia',
      role: 'Software Engineer',
      department: 'Engineering',
      position: 'Junior Developer',
      startDate: '2023-09-01',
      status: 'onboarding',
      companyId: 'comp_1',
      managerId: '4',
      onboardingProgress: 30,
      lastLogin: '2024-01-14T14:20:00Z'
    },
    {
      id: '8',
      email: 'david.brown@orientrix.com',
      firstName: 'David',
      lastName: 'Brown',
      role: 'Product Manager',
      department: 'Product',
      position: 'Product Manager',
      startDate: '2023-06-15',
      status: 'active',
      companyId: 'comp_1',
      managerId: '5',
      onboardingProgress: 90,
      lastLogin: '2024-01-15T12:10:00Z'
    }
  ],
  currentEmployee: null,
  loading: false,
  error: null,
  filters: {
    department: 'all',
    status: 'all',
    search: '',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setEmployees: (state, action: PayloadAction<Employee[]>) => {
      state.employees = action.payload;
    },
    addEmployee: (state, action: PayloadAction<Employee>) => {
      state.employees.push(action.payload);
    },
    updateEmployee: (state, action: PayloadAction<{ id: string; updates: Partial<Employee> }>) => {
      const index = state.employees.findIndex(emp => emp.id === action.payload.id);
      if (index !== -1) {
        state.employees[index] = { ...state.employees[index], ...action.payload.updates };
      }
    },
    deleteEmployee: (state, action: PayloadAction<string>) => {
      state.employees = state.employees.filter(emp => emp.id !== action.payload);
    },
    setCurrentEmployee: (state, action: PayloadAction<Employee | null>) => {
      state.currentEmployee = action.payload;
    },
    setFilters: (state, action: PayloadAction<Partial<typeof initialState.filters>>) => {
      state.filters = { ...state.filters, ...action.payload };
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
  setEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  setCurrentEmployee,
  setFilters,
  setLoading,
  setError,
} = userSlice.actions;

export default userSlice.reducer;