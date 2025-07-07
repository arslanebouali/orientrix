import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AccessRequest {
  id: string;
  requesterId: string;
  requesterName: string;
  resourceName: string;
  resourceType: 'software' | 'platform' | 'repository' | 'documents' | 'server';
  reason: string;
  status: 'pending' | 'approved' | 'rejected' | 'expired';
  requestDate: string;
  approver?: string;
  approvalDate?: string;
  urgency: 'low' | 'medium' | 'high';
  expiryDate?: string;
  companyId: string;
}

export interface UserAccess {
  id: string;
  userId: string;
  resourceName: string;
  resourceType: string;
  grantedDate: string;
  expiryDate?: string;
  status: 'active' | 'expired' | 'revoked' | 'pending';
  grantedBy: string;
  companyId: string;
}

interface AccessState {
  requests: AccessRequest[];
  userAccesses: UserAccess[];
  loading: boolean;
  error: string | null;
  filters: {
    status: string;
    urgency: string;
    resourceType: string;
    search: string;
  };
}

const initialState: AccessState = {
  requests: [
    {
      id: 'req_1',
      requesterId: '1',
      requesterName: 'Sarah Johnson',
      resourceName: 'Database Admin Tools',
      resourceType: 'software',
      reason: 'Need access to manage customer database for new project',
      status: 'pending',
      requestDate: '2024-01-15T10:00:00Z',
      urgency: 'high',
      companyId: 'comp_1'
    },
    {
      id: 'req_2',
      requesterId: '2',
      requesterName: 'Michael Chen',
      resourceName: 'Marketing Analytics Dashboard',
      resourceType: 'platform',
      reason: 'Required for quarterly campaign analysis',
      status: 'approved',
      requestDate: '2024-01-14T14:30:00Z',
      approver: 'John Doe',
      approvalDate: '2024-01-15T09:00:00Z',
      urgency: 'medium',
      companyId: 'comp_1'
    }
  ],
  userAccesses: [
    {
      id: 'access_1',
      userId: '1',
      resourceName: 'Email System',
      resourceType: 'platform',
      grantedDate: '2023-01-15T00:00:00Z',
      status: 'active',
      grantedBy: 'hr_1',
      companyId: 'comp_1'
    },
    {
      id: 'access_2',
      userId: '1',
      resourceName: 'Project Management Tool',
      resourceType: 'software',
      grantedDate: '2023-01-15T00:00:00Z',
      status: 'active',
      grantedBy: 'hr_1',
      companyId: 'comp_1'
    }
  ],
  loading: false,
  error: null,
  filters: {
    status: 'all',
    urgency: 'all',
    resourceType: 'all',
    search: '',
  },
};

const accessSlice = createSlice({
  name: 'access',
  initialState,
  reducers: {
    setRequests: (state, action: PayloadAction<AccessRequest[]>) => {
      state.requests = action.payload;
    },
    addRequest: (state, action: PayloadAction<AccessRequest>) => {
      state.requests.push(action.payload);
    },
    updateRequest: (state, action: PayloadAction<{ id: string; updates: Partial<AccessRequest> }>) => {
      const index = state.requests.findIndex(req => req.id === action.payload.id);
      if (index !== -1) {
        state.requests[index] = { ...state.requests[index], ...action.payload.updates };
      }
    },
    setUserAccesses: (state, action: PayloadAction<UserAccess[]>) => {
      state.userAccesses = action.payload;
    },
    addUserAccess: (state, action: PayloadAction<UserAccess>) => {
      state.userAccesses.push(action.payload);
    },
    updateUserAccess: (state, action: PayloadAction<{ id: string; updates: Partial<UserAccess> }>) => {
      const index = state.userAccesses.findIndex(access => access.id === action.payload.id);
      if (index !== -1) {
        state.userAccesses[index] = { ...state.userAccesses[index], ...action.payload.updates };
      }
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
  setRequests,
  addRequest,
  updateRequest,
  setUserAccesses,
  addUserAccess,
  updateUserAccess,
  setFilters,
  setLoading,
  setError,
} = accessSlice.actions;

export default accessSlice.reducer;