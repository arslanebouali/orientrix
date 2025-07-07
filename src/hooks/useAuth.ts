import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const useAuth = () => {
  const auth = useSelector((state: RootState) => state.auth);
  
  const hasRole = (roles: string | string[]) => {
    if (!auth.user) return false;
    const roleArray = Array.isArray(roles) ? roles : [roles];
    return roleArray.includes(auth.user.role);
  };

  const isAdmin = () => hasRole('admin');
  const isHRManager = () => hasRole(['admin', 'hr_manager']);
  const isITAdmin = () => hasRole(['admin', 'it_admin']);
  const canManageUsers = () => hasRole(['admin', 'hr_manager']);
  const canManageAccess = () => hasRole(['admin', 'hr_manager', 'it_admin']);

  return {
    ...auth,
    hasRole,
    isAdmin,
    isHRManager,
    isITAdmin,
    canManageUsers,
    canManageAccess,
  };
};