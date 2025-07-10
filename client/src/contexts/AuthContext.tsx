import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { apiClient, type User, type AuthApiResponse, handleApiError } from '../utils/api';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    const token = apiClient.getToken();
    if (token) {
      try {
        const response = await apiClient.getUserProfile();
        if (response.success && response.data) {
          setUser(response.data);
        } else {
          // Invalid token, clear it
          apiClient.clearToken();
        }
      } catch (error) {
        // Network error or invalid token
        apiClient.clearToken();
      }
    }
    setLoading(false);
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await apiClient.login({ email, password });
      
      if (response.success && response.data) {
        const userData: User = {
          _id: response.data._id || '',
          name: response.data.name || '',
          email: response.data.email || '',
          isAdmin: response.data.user?.isAdmin,
        };
        setUser(userData);
        return { success: true };
      } else {
        return { success: false, error: handleApiError(response.error) };
      }
    } catch (error) {
      return { success: false, error: 'Network error occurred' };
    }
  };

  const register = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await apiClient.register({ name, email, password });
      
      if (response.success && response.data) {
        const userData: User = {
          _id: response.data._id || '',
          name: response.data.name || name,
          email: response.data.email || email,
          isAdmin: response.data.user?.isAdmin,
        };
        setUser(userData);
        return { success: true };
      } else {
        return { success: false, error: handleApiError(response.error) };
      }
    } catch (error) {
      return { success: false, error: 'Network error occurred' };
    }
  };

  const logout = () => {
    apiClient.logout();
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Component for protecting routes that require authentication
interface ProtectedRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return fallback || (
      <div className="container mt-5">
        <div className="alert alert-warning" role="alert">
          <h4 className="alert-heading">Authentication Required</h4>
          <p>You need to be logged in to access this page.</p>
          <a href="/login" className="btn btn-primary">Login</a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
